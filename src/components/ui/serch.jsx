import PropTypes from "prop-types";

const Search = ({ onSearch, searсh }) => {
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search..."
      value={searсh}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

Search.propTypes = {
  onSearch: PropTypes.func,
  searсh: PropTypes.string,
};

export default Search;
