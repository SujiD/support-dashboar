import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

      <FontAwesomeIcon
        icon={faSearch}
        className="SearchButton"
        onClick={() => handleSearch(filter)}
      />
    </div>
  );
};

export default GlobalFilter;
