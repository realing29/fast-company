const Bookmark = ({ bookmark, _id, handleFavorites }) => {
  const className = "bi bi-bookmark" + (bookmark ? "-fill" : "");
  return (
    <button onClick={() => handleFavorites(_id)}>
      <i className={className}></i>
    </button>
  );
};

export default Bookmark;
