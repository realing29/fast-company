import PropTypes from "prop-types";
import Comment from "./comment";

const CommentsList = ({ comments, handleCommentsRemove }) => {
  return (
    <>
      {comments
        .sort((a, b) => b.created_at - a.created_at)
        .map((comment) => (
          <Comment key={comment._id} {...comment} handleCommentsRemove={handleCommentsRemove} />
        ))}
    </>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array,
  handleCommentsRemove: PropTypes.func,
};

export default CommentsList;
