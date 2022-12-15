import columnTypes from "./columnTypes";

const initialState = {
  columns: [],
};

export const columnReducer = (state = initialState, action) => {
  switch (action.type) {
    case columnTypes.ADDCOLS:
      return {
        ...state,
        columns: [...state.columns, action.payload],
      };
    case columnTypes.UPDATECOLS:
      const index = state.columns.findIndex(
        (col) => col.id === action.payload.id
      );
      const newArray = [...state.columns];
      newArray[index].changes = action.payload.changes;
      return {
        ...state,
        columns: newArray,
      };
    case columnTypes.RESETCOL:
      return {
        ...state,
        columns: action.payload,
      };
    case columnTypes.CLEARCOLS:
      return initialState;
    default:
      return state;
  }
};
