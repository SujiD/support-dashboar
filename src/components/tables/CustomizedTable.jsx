import { useMemo, useState, useContext, useCallback } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import GlobalFilter from "../search-filters/GlobalFilter";
import ColumnFilter from "../search-filters/ColumnFilter";
import { useDispatch, useSelector } from "react-redux";
import TicketPopup from "../popups/TicketPopup";
import { colors } from "../../database/Data";
import PieChartPopup from "../popups/PieChartPopup";
import APIClient from "../../api/APIClient";
import { ErrorContext } from "../../contexts/ErrorContext";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import {
  fetchFacetsSuccess,
  fetchFacetsUpdate,
} from "../../redux/facet/facetActions";
import {
  fetchPageDataSuccess,
  updatePageDataNextPrev,
  updatePageDataPageSize,
} from "../../redux/page/pageActions";
import { useEffect } from "react";
import { CSVLink } from "react-csv";
import { OverlayTrigger, Spinner, Tooltip, Button } from "react-bootstrap";
import {
  changeColSortRuntime,
  initializeColumnSort,
  updateSearch,
} from "../../redux/runtime/runtimeActions";
import { clearCols } from "../../redux/column/columnAction";
import { useNavigate } from "react-router-dom";
import * as ROUTES from "../../common/routes";

const CustomizedTable = ({ loading, setLoading, initialFacets }) => {
  const [showTicketPopup, setShowTicketPopup] = useState(false);
  const [facetData, setFacetData] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [facetId, setFacetId] = useState("");
  const [csvData, setCSVData] = useState([]);
  const [tableFields, setTableFields] = useState([]);
  const [apiClient] = useState(() => new APIClient());
  const { setError } = useContext(ErrorContext);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const facetTableData = useSelector((state) => {
    return state.facet.facets;
  });

  const pageStoreData = useSelector((state) => {
    return state.pageData;
  });

  const runtimeHiddenCols = useSelector((state) => {
    return state.runtime.tableHiddenCols;
  });

  const runTimeResults = useSelector((state) => {
    return state.runtime.results;
  });

  const runtimeSearch = useSelector((state) => {
    return state.runtime.search;
  });

  const columnChanges = useSelector((state) => {
    return state.column.columns;
  });

  const runtimeColumnSorting = useSelector((state) => {
    return state.runtime.columnsort;
  });

  useEffect(() => {
    setLoading(true);
    apiClient.entityService
      .getTableFields()
      .then((res) => {
        setTableFields(res.data.data.dataFields);
        if (parseInt(sessionStorage.getItem("count")) === 1) {
          sessionStorage.setItem("count", 2);
          dispatch(initializeColumnSort({}));
        }
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
    setLoading(false);
  }, [apiClient.entityService, setError, setLoading, dispatch]);

  const ticketCols = useMemo(() => {
    return tableFields.map((ticketCol) => {
      return {
        Header: ticketCol.label,
        name: ticketCol.name,
        accessor: ticketCol.field,
        disableSortBy: true,
        maxWidth: 600,
        sort: "default",
      };
    });
  }, [tableFields]);

  const columns = useMemo(() => ticketCols, [ticketCols]);

  const ticketData = useMemo(
    () => facetTableData.results,
    [facetTableData.results]
  );

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
    // state,
    // setGlobalFilter,
    setPageSize,
    allColumns,
    visibleColumns,
    // getToggleHideAllColumnsProps,
  } = useTable(
    {
      columns: columns,
      data: ticketData,
      defaultColumn,
      initialState: {
        hiddenColumns: runtimeHiddenCols,
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const csvHelper = useCallback(() => {
    let finalArray = [];
    if (visibleColumns && visibleColumns.length > 0) {
      visibleColumns[0].filteredRows.forEach((row) => {
        prepareRow(row);
        if (row) {
          let rowObject = {};
          row.cells.forEach((cell) => {
            rowObject[cell.column.Header] = cell.value;
          });
          finalArray.push(rowObject);
        }
      });
      setCSVData(finalArray);
    }
  }, [visibleColumns, prepareRow]);

  useEffect(() => {
    csvHelper();
  }, [csvHelper]);

  useEffect(() => {
    setPageSize(pageStoreData.pageSize);
  }, [pageStoreData.pageSize, setPageSize]);

  // const { globalFilter } = state;

  const handleFilter = (columnName) => {
    const facetValues = facetTableData.facets[columnName.name]?.values;
    const runtimeFacetValues = runTimeResults.facets[columnName.name]?.values;
    if (facetValues && runtimeFacetValues) {
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
        setFacetId(columnName.name);
        setFacetData({
          labels: Object.values(y).map((value) => value.text), // ['yes', 'no']
          datasets: [
            {
              label: columnName.Header,
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
        alert("No facets to show");
      }
    } else {
      alert("No facets to show");
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
    if (runtimeSearch !== "") {
      reqBody.q = `${reqBody.q} AND ${runtimeSearch}`;
    }
    if (Object.keys(runtimeColumnSorting).length > 0) {
      reqBody.sort = runtimeColumnSorting;
    }
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

  const changeColumnSort = (columnName) => {
    if (runtimeColumnSorting[columnName] === undefined) {
      runtimeColumnSorting[columnName] = "asc";
      dispatch(changeColSortRuntime(runtimeColumnSorting));
    } else if (runtimeColumnSorting[columnName] === "asc") {
      runtimeColumnSorting[columnName] = "desc";
      dispatch(changeColSortRuntime(runtimeColumnSorting));
    } else {
      delete runtimeColumnSorting[columnName];
      dispatch(changeColSortRuntime(runtimeColumnSorting));
    }
    return runtimeColumnSorting;
  };

  const handleSorting = (column) => {
    setLoading(true);
    reqBody.sort = changeColumnSort(column.name);
    apiClient.entityService
      .getAllSearchData(reqBody)
      .then((res) => {
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

  const handleTotalReset = () => {
    setLoading(true);
    dispatch(clearCols());
    dispatch(initializeColumnSort({}));
    dispatch(updateSearch(""));
    reqBody.facets = initialFacets;
    apiClient.entityService
      .getAllSearchData(reqBody)
      .then((res) => {
        dispatch(fetchFacetsUpdate(res.data));
        dispatch(
          fetchPageDataSuccess({
            pageSize: res.data["page-length"],
            totalLength: res.data.total,
            numOfPages: Math.ceil(res.data.total / res.data["page-length"]),
            next: 1,
            prev: 1,
            start: res.data.start,
          })
        );
        setLoading(false);
        setShowPopup(true);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  const handleSearch = (filterValue) => {
    setLoading(true);
    let newQuery = `${reqBody.q} AND ${filterValue}`;
    reqBody.q = newQuery;
    dispatch(updateSearch(filterValue));
    apiClient.entityService
      .getAllSearchData(reqBody)
      .then((res) => {
        dispatch(fetchFacetsUpdate(res.data));
        dispatch(
          fetchPageDataSuccess({
            pageSize: res.data["page-length"],
            totalLength: res.data.total,
            numOfPages: Math.ceil(res.data.total / res.data["page-length"]),
            next: pageStoreData.next,
            prev: pageStoreData.prev,
            start: res.data.start,
          })
        );
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  return (
    <>
      {visibleColumns.length > 0 ? (
        <>
          <div className="d-flex justify-content-evenly my-3 mt-5 px-2">
            <GlobalFilter handleSearch={handleSearch} />
            <div
              className="d-flex gap-5 justify-content-center align-items-center"
              style={{ width: "40%" }}
            >
              {/* <div className="checkbox d-flex mt-3">
                <Checkbox {...getToggleHideAllColumnsProps()} id="all-hidden" />
                <label htmlFor="all-hidden">Toggle All</label>
              </div> */}
              <IoIcons.IoIosSettings
                onClick={() => setShowTicketPopup(true)}
                style={{ cursor: "pointer" }}
                className="fa-2x mx-3"
              />
              {visibleColumns.length > 0 ? (
                <>
                  <CSVLink
                    data={csvData}
                    filename={"support-status-report"}
                    className="download-icon"
                  >
                    Export CSV
                  </CSVLink>
                  <Button
                    onClick={() => handleTotalReset()}
                    className="main-btn"
                  >
                    {" "}
                    <IoIcons.IoIosRefresh /> Reset All
                  </Button>
                </>
              ) : null}
            </div>
          </div>
          <div style={{ overflow: "auto" }}>
            <table {...getTableProps()} className="react-table">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps({ title: undefined })
                        )}
                        className="position-relative"
                        style={{ cursor: "pointer" }}
                      >
                        {columnChanges &&
                          columnChanges.map((cols, index) => {
                            if (
                              cols.id === column.name &&
                              cols.changes.length > 0
                            ) {
                              return (
                                <OverlayTrigger
                                  trigger={["hover", "focus"]}
                                  placement="right"
                                  overlay={(props) => (
                                    <Tooltip className="my-tooltip" {...props}>
                                      {cols.changes.map((col) => col + "  ")}
                                    </Tooltip>
                                  )}
                                  key={index}
                                >
                                  <span
                                    style={{
                                      opacity: 0,
                                      position: "absolute",
                                      left: 0,
                                    }}
                                  >
                                    {column.render("Header")}
                                  </span>
                                </OverlayTrigger>
                              );
                            } else {
                              return null;
                            }
                          })}
                        <span
                          key={column.id}
                          onClick={() => handleSorting(column)}
                        >
                          {column.render("Header")}
                        </span>
                        {runTimeResults.facets[column.name] ? (
                          <FaIcons.FaFilter
                            className="ms-1"
                            onClick={() => handleFilter(column)}
                          />
                        ) : (
                          ""
                        )}

                        {columnChanges.map((cols, index) => {
                          if (
                            cols.id === column.name &&
                            cols.changes.length > 0
                          ) {
                            return (
                              <FaIcons.FaAsterisk
                                key={index}
                                className="ms-1 fa-1x"
                              />
                            );
                          } else {
                            return null;
                          }
                        })}
                        {runtimeColumnSorting[column.name] === "asc" ? (
                          <FaIcons.FaSortDown />
                        ) : runtimeColumnSorting[column.name] === "desc" ? (
                          <FaIcons.FaSortUp />
                        ) : (
                          ""
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.length > 0 &&
                  page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              onClick={() =>
                                navigate(
                                  `${ROUTES.VIEW_REPORT}/${row.original.id}`
                                )
                              }
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {page.length > 0 && visibleColumns.length !== 0 ? null : (
              <span>Sorry no results found!!</span>
            )}
          </div>
          {page.length > 0 && visibleColumns.length !== 0 && (
            <div>
              <span>
                Page{" "}
                <strong>
                  {pageStoreData.next} of{" "}
                  {pageStoreData.numOfPages === 0
                    ? 1
                    : isNaN(pageStoreData.numOfPages)
                    ? 0
                    : pageStoreData.numOfPages}
                </strong>
              </span>
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
                className={
                  pageStoreData.prev === 1
                    ? "disable-btn"
                    : "main-btn main-paginate-btn"
                }
                onClick={gotoStartPage}
                disabled={pageStoreData.prev === 1}
              >
                {"<<"}
              </button>
              <button
                className={
                  pageStoreData.prev === 1
                    ? "disable-btn"
                    : "main-btn main-paginate-btn"
                }
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
                    : "main-btn main-paginate-btn"
                }
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
                    : "main-btn main-paginate-btn"
                }
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
          )}
        </>
      ) : (
        <Spinner animation="border" style={{ color: "#060b26" }} />
      )}
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
        id={facetId}
        loading={loading}
        setLoading={setLoading}
        initialFacets={initialFacets}
      />
    </>
  );
};

export default CustomizedTable;
