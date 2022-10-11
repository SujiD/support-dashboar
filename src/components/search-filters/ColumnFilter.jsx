const ColumnFilter = ({ column }) => {
  const { filter, setFilter } = column;

  return (
    <span>
      Search:{" "}
      <input
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
    </span>
  );
};

export default ColumnFilter;
