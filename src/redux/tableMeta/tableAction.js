import tableTypes from "./tableTypes";

// action creators

export const fetchTableReq = () => {
  return {
    type: tableTypes.FETCH_TABLECOLS_REQUEST,
  };
};

export const fetchTableCols = (tableCols) => {
  return {
    type: tableTypes.FETCH_TABLECOLS_SUCCESS,
    payload: tableCols,
  };
};

export const updateTableCols = (tableActiveCols, tableInactiveCols) => {
  return {
    type: tableTypes.UPDATE_TABLECOLS_SUCCESS,
    payload: { tableActiveCols, tableInactiveCols },
  };
};

export const fetchTableColsFailure = (error) => {
  return {
    type: tableTypes.FETCH_TABLECOLS_FAILURE,
    payload: error,
  };
};

export const updateTableColsFailure = (error) => {
  return {
    type: tableTypes.UPDATE_TABLECOLS_FAILURE,
    payload: error,
  };
};
