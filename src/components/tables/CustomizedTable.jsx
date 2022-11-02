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
} from "../../redux/page/pageAction";
import { useEffect } from "react";

const CustomizedTable = ({ loading, setLoading }) => {
  const [showTicketPopup, setShowTicketPopup] = useState(false);
  const [facetData, setFacetData] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [apiClient] = useState(() => new APIClient());
  const { setError } = useContext(ErrorContext);
  const dispatch = useDispatch();

  const facetTableData = useSelector((state) => {
    return state.facet.facets;
  });

  const pageStoreData = useSelector((state) => {
    return state.pageData;
  });

  let pageSizeValue = pageStoreData.pageSize;

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
    // nextPage,
    // previousPage,
    // canNextPage,
    // canPreviousPage,
    pageOptions,
    gotoPage,
    // pageCount,
    setPageSize,
    allColumns,
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
  const { globalFilter, pageIndex, pageSize } = state;

  useEffect(() => {
    setPageSize(pageSizeValue);
  }, [pageSizeValue, setPageSize]);

  const handleFilter = (columnName) => {
    const facetValues = facetTableData.facets[columnName.Header]?.values;
    if (facetValues && Object.keys(facetValues).length > 0) {
      setTitle(columnName.Header);
      setFacetData({
        labels: Object.keys(facetValues).map((key) => key),
        datasets: [
          {
            label: columnName.Header.split("-")[1],
            data: Object.values(facetValues).map((value) => value.currentCount),
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
    setPageSize(Number(e.target.value));
    setLoading(true);
    reqBody.pageLength = e.target.value;
    apiClient.entityService
      .getAllSearchData(reqBody)
      .then((res) => {
        dispatch(
          updatePageDataPageSize({
            pageSize: res.data["page-length"],
            totalLength: res.data.total,
            numOfPages: Math.floor(res.data.total / res.data["page-length"]),
            next: pageStoreData.next,
            prev: pageStoreData.prev,
            start: res.data.start,
          })
        );
        dispatch(fetchFacetsSuccess(res.data));
        dispatch(fetchFacetsUpdate(res.data));
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  const paginationHelper = (next, prev, start) => {
    setLoading(true);
    reqBody.start = `${start}`;
    apiClient.entityService
      .getAllSearchData(reqBody)
      .then((res) => {
        dispatch(
          updatePageDataNextPrev({
            pageSize: pageStoreData.pageSize,
            totalLength: res.data.total,
            numOfPages: Math.floor(res.data.total / pageStoreData.pageSize),
            next: next,
            prev: prev,
            start: res.data.start,
          })
        );
        dispatch(fetchFacetsSuccess(res.data));
        dispatch(fetchFacetsUpdate(res.data));
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
        pageStoreData.start + pageStoreData.pageSize
      );
    }
  };

  const gotoLastPage = () => {
    paginationHelper(
      pageStoreData.numOfPages,
      pageStoreData.numOfPages,
      pageStoreData.numOfPages * pageStoreData.pageSize + 1
    );
  };

  const gotoStartPage = () => {
    if (pageStoreData.prev !== 0) {
      paginationHelper(1, 1, 1);
    }
  };

  const handlePrevPage = () => {
    if (pageStoreData.prev !== 1) {
      paginationHelper(
        pageStoreData.next - 1,
        pageStoreData.prev - 1,
        pageStoreData.start - pageStoreData.pageSize
      );
    }
  };
  return (
    <>
      <div className="d-flex justify-content-between my-3 mt-5 px-2">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div
          className="d-flex gap-5 justify-content-center"
          style={{ width: "350px" }}
        >
          <div className="checkbox d-flex">
            <Checkbox {...getToggleHideAllColumnsProps()} id="all-hidden" />
            <label htmlFor="all-hidden">Toggle All</label>
          </div>
          <FontAwesomeIcon
            icon={faGear}
            onClick={() => setShowTicketPopup(true)}
            style={{ cursor: "pointer" }}
            className="fa-2x mx-3"
          />
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
                    <div>
                      {/* {column.canFilter ? column.render("Filter") : null} */}
                    </div>
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
            {pageStoreData.next} of {pageStoreData.numOfPages}
          </strong>
        </span>
        <span>
          | Go To Page{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            min={pageIndex > 0 ? pageIndex : pageIndex + 1}
            max={pageOptions.length}
            style={{ width: "50px" }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => handlePageSize(e)}
          className="select-btn mx-2"
        >
          {[10, 25, 50].map((size) => (
            <option key={size} value={size}>
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
            pageStoreData.next === pageStoreData.numOfPages
              ? "disable-btn"
              : "main-btn"
          }
          // className="main-btn"
          onClick={handleNextPage}
          disabled={pageStoreData.next === pageStoreData.numOfPages}
        >
          Next
        </button>
        <button
          className={
            pageStoreData.next === pageStoreData.numOfPages
              ? "disable-btn"
              : "main-btn"
          }
          // className="main-btn"
          onClick={gotoLastPage}
          disabled={pageStoreData.next === pageStoreData.numOfPages}
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
