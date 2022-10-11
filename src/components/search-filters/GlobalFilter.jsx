import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SearchFilters.css";
const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className="search-box ms-3">
      <input
        type="text"
        value={filter || " "}
        onChange={(event) => setFilter(event.target.value)}
        className="searchInput ms-1"
      />
      <FontAwesomeIcon icon={faSearch} className="SearchButton" />
    </div>
  );
};

export default GlobalFilter;
