import columnTypes from "./columnTypes";

//action creators
export const addCols = (columns) => {
  return {
    type: columnTypes.ADDCOLS,
    payload: columns,
  };
};

export const updateCols = (columns) => {
  return {
    type: columnTypes.UPDATECOLS,
    payload: columns,
  };
};

export const clearCols = () => {
  return{
    type: columnTypes.CLEARCOLS,
  }
}
