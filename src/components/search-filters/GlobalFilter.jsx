import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SearchFilters.css";
const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  
  return (
    <div className="search-box ms-3">
      <input
        type="text"
        value={globalFilter || ""}
        onChange={(event) => setGlobalFilter(event.target.value)}
        className="searchInput ms-1"
      />
      <FontAwesomeIcon icon={faSearch} className="SearchButton" />
    </div>
  );
};

export default GlobalFilter;
