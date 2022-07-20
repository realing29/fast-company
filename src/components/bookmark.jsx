import PropTypes from "prop-types";

const Bookmark = ({ bookmark, _id, handleFavorites }) => {
  const className = "bi bi-bookmark" + (bookmark ? "-fill" : "");
  return (
    <button onClick={() => handleFavorites(_id)}>
      <i className={className}></i>
    </button>
  );
};

Bookmark.propTypes = {
  bookmark: PropTypes.bool.isRequired,
  _id: PropTypes.string.isRequired,
  handleFavorites: PropTypes.func.isRequired,
};

export default Bookmark;
