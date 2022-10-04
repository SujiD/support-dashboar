import tableTypes from "./tableTypes";
const initialState = {
  loading: false,
  tableCols: [],
  tableActiveCols: [],
  tableInactiveCols: [],
  error: "",
};

export const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case tableTypes.FETCH_TABLECOLS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case tableTypes.FETCH_TABLECOLS_SUCCESS:
      return {
        loading: false,
        tableCols: action.payload,
        tableActiveCols: [],
        tableInactiveCols: action.payload,
        error: "",
      };
    case tableTypes.UPDATE_TABLECOLS_SUCCESS:
      return {
        ...state,
        loading: false,
        tableActiveCols: [
          ...state.tableActiveCols,
          action.payload.tableActiveCols,
        ],
        tableInactiveCols: [
          state.tableInactiveCols.filter(
            (InactiveCols) =>
              InactiveCols.label !== action.payload.tableInactiveCols.label
          ),
        ],
        error: "",
      };
    case tableTypes.FETCH_TABLECOLS_FAILURE:
      return {
        loading: false,
        tableCols: [],
        error: action.payload,
      };
    case tableTypes.UPDATE_TABLECOLS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
