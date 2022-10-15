import { useComments } from "../../hooks/useComments";
import AddCommentsForm from "../common/comments/addCommentsForm";
import CommentsList from "../common/comments/commentsList";

const Comments = () => {
  const { createComment, comments, isLoading: isLoadingComments, removeComment } = useComments();

  const handleCommentsRemove = (commentId) => {
    removeComment(commentId);
    // API.comments.remove(commentId);
    // const updateComments = comments.filter((comment) => comment._id !== commentId);
    // setComments(updateComments);
  };

  const handleCommentAdd = (data) => {
    createComment(data);
    // API.comments.add(data).then((newComment) => setComments((prev) => [...prev, newComment]));
  };

  return (
    <>
      <div className="card mb-2">
        {" "}
        <div className="card-body ">
          <h2>New comment</h2>
          <AddCommentsForm handleCommentAdd={handleCommentAdd} />
        </div>
      </div>
      {isLoadingComments ? (
        "Loading"
      ) : comments.length === 0 ? null : (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            <CommentsList comments={comments} handleCommentsRemove={handleCommentsRemove} />
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
