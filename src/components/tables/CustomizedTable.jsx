import { useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import {
  faSortUp,
  faSortDown,
  faGear,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import GlobalFilter from "../search-filters/GlobalFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import tableMeta from "../../Database/table-meta.json";
import ColumnFilter from "../search-filters/ColumnFilter";
import { Checkbox } from "../checkbox/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import TicketPopup from "../popups/TicketPopup";
import { colors } from "../../Database/Data";
import PieChartPopup from "../popups/PieChartPopup";
import APIClient from "../../api/APIClient";
import { useContext } from "react";
import { ErrorContext } from "../../contexts/ErrorContext";
import {
  fetchFacetsSuccess,
  fetchFacetsUpdate,
} from "../../redux/facet/facetActions";
import {
  updatePageDataNextPrev,
  updatePageDataPageSize,
} from "../../redux/page/pageActions";
import { useEffect } from "react";
import { CSVLink } from "react-csv";

const CustomizedTable = ({ loading, setLoading }) => {
  const [showTicketPopup, setShowTicketPopup] = useState(false);
  const [facetData, setFacetData] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [csvData, setCSVData] = useState([]);
  const [apiClient] = useState(() => new APIClient());
  const { setError } = useContext(ErrorContext);
  const dispatch = useDispatch();

  const facetTableData = useSelector((state) => {
    return state.facet.facets;
  });

  const pageStoreData = useSelector((state) => {
    return state.pageData;
  });

  const runTimeResults = useSelector((state) => {
    return state.runtime.results;
  });
  const ticketCols = tableMeta.results[0].applicationTable.dataFields.map(
    (ticketCol) => {
      return {
        Header: ticketCol.name,
        accessor: ticketCol.field,
        maxWidth: 600,
      };
    }
  );

  // eslint-disable-next-line
  const columns = useMemo(() => ticketCols, []);
  // eslint-disable-next-line
  const ticketData = useMemo(() => facetTableData.results, []);

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    // pageOptions,
    // gotoPage,
    setPageSize,
    allColumns,
    visibleColumns,
    getToggleHideAllColumnsProps,
  } = useTable(
    {
      columns: columns,
      data: ticketData,
      defaultColumn,

      // initialState: {
      //   hiddenColumns:["accesorName"]
      //   }
      //TODO: TO change this later
      initialState: {
        hiddenColumns: [
          "reportType",
          "ticket.modifiedtime",
          "ticket.creationtime",
          "ticket.ticketTitle",
          "creationtime",
          "modifiedtime",
          "ticket.ticketCreator.fullName",
          "ticket.ticketCustomer.organizationName",
          "ticket.ticketEndCustomer.organizationName",
          "ticket.ticketOwner.fullName",
          "ticket.meta.serverVersion",
          "ticket.meta.clusterId",
          "ticket.meta.platform",
          "ticket.meta.component",
          "ticket.meta.legacyId",
          "ticket.meta.dhfVersion",
          "ticket.meta.opsVersion",
          "ticket.meta.cloudServiceId",
          "ticket.meta.cloudMlaasId",
          "ticket.meta.cloudPlatform",
          "ticket.meta.dhsVersion",
          "ticket.meta.environment",
          "ticket.meta.issueNumber",
        ],
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const csvHelper = () => {
    let finalArray = [];
    if (visibleColumns && visibleColumns.length > 0) {
      visibleColumns[0].filteredRows.forEach((row) => {
        prepareRow(row);
        if (row) {
          let rowObject = {};
          row.cells.forEach((cell) => {
            // console.log(cell.value)
            rowObject[cell.column.Header.split("-")[1]] = cell.value;
          });
          finalArray.push(rowObject);
        }
      });
      setCSVData(finalArray);
    }
  };

  useEffect(() => {
    csvHelper();
    // eslint-disable-next-line
  }, [visibleColumns]);

  const { globalFilter } = state;

  useEffect(() => {
    setPageSize(pageStoreData.pageSize);
  }, [pageStoreData.pageSize, setPageSize]);

  const handleFilter = (columnName) => {
    const facetValues = facetTableData.facets[columnName.Header]?.values;
    const runtimeFacetValues = runTimeResults.facets[columnName.Header]?.values;
    const x = Object.values(runtimeFacetValues);
    const y = Object.values(facetValues);
    const r = x.filter((elem) => !y.find(({ text }) => elem.text === text));
    if (r.length > 0) {
      r.forEach((facet) => {
        facet.currentCount = 0;
        y.push(facet);
      });
    }
    if (y && Object.keys(y).length > 0) {
      setTitle(columnName.Header);
      setFacetData({
        labels: Object.values(y).map((value) => value.text), // ['yes', 'no']
        datasets: [
          {
            label: columnName.Header.split("-")[1],
            data: Object.values(y).map((value) => value.currentCount),
            backgroundColor: colors.map((color) => color),
            borderColor: colors.map((color) => color),
            borderWidth: 1,
            hoverOffset: 6,
            hoverBorderColor: "#000",
          },
        ],
      });
      setShowPopup(true);
    } else {
      alert(" No facets to show");
    }
  };

  let reqBody = {
    appPath: "Report",
    q: "0ca72f154fc71e0bc6fa75772b925e7c-reportType:survey",
    start: "1",
    view: "all",
  };

  const handlePageSize = (e) => {
    paginationHelper(
      pageStoreData.next,
      pageStoreData.prev,
      e.target.value,
      "pageSize"
    );
  };

  const paginationHelper = (next, prev, start, type) => {
    let func;
    if (type === "pageSize") {
      func = updatePageDataPageSize;
      reqBody.pageLength = start;
    } else {
      func = updatePageDataNextPrev;
      reqBody.start = `${start}`;
      reqBody.pageLength = `${pageStoreData.pageSize}`;
    }
    setLoading(true);
    reqBody.facets = runTimeResults.facets;
    apiClient.entityService
      .getAllSearchData(reqBody)
      .then((res) => {
        dispatch(
          func({
            pageSize:
              type === "pageSize"
                ? res.data["page-length"]
                : pageStoreData.pageSize,
            totalLength: res.data.total,
            numOfPages:
              type === "pageSize"
                ? Math.ceil(res.data.total / res.data["page-length"])
                : Math.ceil(res.data.total / pageStoreData.pageSize),
            next: next,
            prev: prev,
            start: res.data.start,
          })
        );
        if (Object.keys(res.data.facets).length > 0) {
          dispatch(fetchFacetsSuccess(res.data));
          dispatch(fetchFacetsUpdate(res.data));
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };
  const handleNextPage = () => {
    if (pageStoreData.next !== pageStoreData.numOfPages) {
      paginationHelper(
        pageStoreData.next + 1,
        pageStoreData.prev + 1,
        pageStoreData.start + pageStoreData.pageSize,
        "pagination"
      );
    }
  };

  const gotoLastPage = () => {
    paginationHelper(
      pageStoreData.numOfPages,
      pageStoreData.numOfPages,
      Math.floor(pageStoreData.totalLength / pageStoreData.pageSize) *
        pageStoreData.pageSize +
        1,
      "pagination"
    );
  };

  const gotoStartPage = () => {
    if (pageStoreData.prev !== 0) {
      paginationHelper(1, 1, 1, "pagination");
    }
  };

  const handlePrevPage = () => {
    if (pageStoreData.prev !== 1) {
      paginationHelper(
        pageStoreData.next - 1,
        pageStoreData.prev - 1,
        pageStoreData.start - pageStoreData.pageSize,
        "pagination"
      );
    }
  };

  // const handleGotoPage = (value) => {
  //   if (value <= pageStoreData.numOfPages && value > 1) {
  //     paginationHelper(
  //       value - 1,
  //       value - 1,
  //       1 + pageStoreData.pageSize * value - 1,
  //       "pagination"
  //     );
  //   } else if (value === 1) {
  //     paginationHelper(1, 1, 1, "pagination");
  //   }
  // };

  // console.log(pageStoreData);

  return (
    <>
      <div className="d-flex justify-content-evenly my-3 mt-5 px-2">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div
          className="d-flex gap-5 justify-content-center align-items-center"
          style={{ width: "40%" }}
        >
          <div className="checkbox d-flex mt-3">
            <Checkbox {...getToggleHideAllColumnsProps()} id="all-hidden" />
            <label htmlFor="all-hidden">Toggle All</label>
          </div>
          <FontAwesomeIcon
            icon={faGear}
            onClick={() => setShowTicketPopup(true)}
            style={{ cursor: "pointer" }}
            className="fa-2x mx-3"
          />
          {visibleColumns.length > 0 ? (
            <CSVLink
              data={csvData}
              filename={"support-status-report"}
              className="download-icon"
            >
              Export CSV
            </CSVLink>
          ) : null}
        </div>
      </div>
      <div style={{ overflow: "auto" }}>
        <table {...getTableProps()} className="react-table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column
                      .render("Header")
                      .split("-")[1]
                      .charAt(0)
                      .toUpperCase() +
                      column.render("Header").split("-")[1].slice(1)}
                    <FontAwesomeIcon
                      icon={faFilter}
                      className="ms-1"
                      onClick={() => handleFilter(column)}
                    />
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FontAwesomeIcon icon={faSortUp} />
                      ) : (
                        <FontAwesomeIcon icon={faSortDown} />
                      )
                    ) : (
                      ""
                    )}
                    {/* <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <span>
          Page{" "}
          <strong>
            {pageStoreData.next} of{" "}
            {pageStoreData.numOfPages === 0 ? 1 : pageStoreData.numOfPages}
          </strong>
        </span>
        {/* <span>
          | Go To Page{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => handleGotoPage(e.target.value)}
            min={pageIndex > 1 ? pageIndex : pageIndex + 1}
            max={pageStoreData.numOfPages}
            style={{ width: "50px" }}
          />
        </span> */}
        <select
          value={pageStoreData.pageSize}
          onChange={(e) => handlePageSize(e)}
          className="select-btn mx-2"
        >
          {[10, 25, 50].map((size) => (
            <option
              key={size}
              value={size}
              disabled={!(pageStoreData.totalLength >= size)}
            >
              Show {size}
            </option>
          ))}
        </select>
        <button
          className={pageStoreData.prev === 1 ? "disable-btn" : "main-btn"}
          // className="main-btn"
          onClick={gotoStartPage}
          disabled={pageStoreData.prev === 1}
        >
          {"<<"}
        </button>
        <button
          className={pageStoreData.prev === 1 ? "disable-btn" : "main-btn"}
          // className="main-btn"
          onClick={handlePrevPage}
          disabled={pageStoreData.prev === 1}
        >
          Previous
        </button>
        <button
          className={
            pageStoreData.next ===
            (pageStoreData.numOfPages === 0
              ? pageStoreData.numOfPages + 1
              : pageStoreData.numOfPages)
              ? "disable-btn"
              : "main-btn"
          }
          // className="main-btn"
          onClick={handleNextPage}
          disabled={
            pageStoreData.next ===
            (pageStoreData.numOfPages === 0
              ? pageStoreData.numOfPages + 1
              : pageStoreData.numOfPages)
          }
        >
          Next
        </button>
        <button
          className={
            pageStoreData.next ===
            (pageStoreData.numOfPages === 0
              ? pageStoreData.numOfPages + 1
              : pageStoreData.numOfPages)
              ? "disable-btn"
              : "main-btn"
          }
          // className="main-btn"
          onClick={gotoLastPage}
          disabled={
            pageStoreData.next ===
            (pageStoreData.numOfPages === 0
              ? pageStoreData.numOfPages + 1
              : pageStoreData.numOfPages)
          }
        >
          {">>"}
        </button>
      </div>
      <TicketPopup
        allColumns={allColumns}
        showPopup={showTicketPopup}
        setShowPopup={setShowTicketPopup}
      />
      <PieChartPopup
        facetData={facetData}
        size="lg"
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        title={title}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
};

export default CustomizedTable;
