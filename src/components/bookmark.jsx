const Bookmark = ({ favorites, _id, handleFavorites }) => {
  const className = "bi bi-bookmark" + (favorites ? "-fill" : "");
  return (
    <button onClick={() => handleFavorites(_id)}>
      <i className={className}></i>
    </button>
  );
};

export default Bookmark;
