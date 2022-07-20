import PropTypes from "prop-types";
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

User.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  qualities: PropTypes.array.isRequired,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  bookmark: PropTypes.bool.isRequired,
  handleFavorites: PropTypes.func.isRequired,
};

export default User;
