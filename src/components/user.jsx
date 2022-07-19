import Bookmark from "./bookmark";
import Qualitie from "./qualitie";

const User = (props) => {
  const {
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    handleDelete,
    bookmark,
    handleFavorites,
  } = props;

  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((qualitie) => (
          <Qualitie key={qualitie._id} {...qualitie} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        <Bookmark
          bookmark={bookmark}
          handleFavorites={handleFavorites}
          _id={_id}
        />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDelete(_id)}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default User;
