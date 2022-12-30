import * as FaIcons from "react-icons/fa";
import { useState } from "react";
import "./SearchFilters.css";
const GlobalFilter = ({ handleSearch }) => {
  const [filter, setFilter] = useState("");

  return (
    <div className="search-box ms-3">
      <input
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        className="searchInput ms-1"
      />

      <FaIcons.FaSearch
        className="SearchButton"
        size={51.5}
        onClick={() => handleSearch(filter)}
      />
    </div>
  );
};

export default GlobalFilter;
