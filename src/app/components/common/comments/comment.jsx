import PropTypes from "prop-types";
import { useAuth } from "../../../hooks/useAuth";
import { useUser } from "../../../hooks/useUsers";
import displayDate from "../../../utils/displayDate";

const Comment = ({ created_at: created, _id, content, userId, handleCommentsRemove }) => {
  const { getUserById } = useUser();
  const { currentUser } = useAuth();
  const user = getUserById(userId);

  return (
    <div className="bg-light card-body  mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start ">
            <img
              src={user.image}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1 ">
                    {user.name}
                    <span className="small">{" - " + displayDate(created)}</span>
                  </p>
                  {currentUser._id === userId && (
                    <button
                      className="btn btn-sm text-primary d-flex align-items-center"
                      onClick={() => handleCommentsRemove(_id)}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  )}
                </div>
                <p className="small mb-0">{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  created_at: PropTypes.number,
  _id: PropTypes.string,
  content: PropTypes.string,
  userId: PropTypes.string,
  handleCommentsRemove: PropTypes.func,
};

export default Comment;
