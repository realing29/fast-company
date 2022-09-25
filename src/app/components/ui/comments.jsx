import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";
import AddCommentsForm from "../common/comments/addCommentsForm";
import CommentsList from "../common/comments/commentsList";

const Comments = () => {
  const { userId } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.comments.fetchCommentsForUser(userId).then((data) => {
      setComments(data);
      setIsLoading(false);
    });
  }, []);

  const handleCommentsRemove = (commentId) => {
    API.comments.remove(commentId);
    const updateComments = comments.filter((comment) => comment._id !== commentId);
    setComments(updateComments);
  };

  const handleCommentAdd = (data) => {
    API.comments.add(data).then((newComment) => setComments((prev) => [...prev, newComment]));
  };

  return (
    <>
      <div className="card mb-2">
        {" "}
        <div className="card-body ">
          <h2>New comments</h2>
          <AddCommentsForm handleCommentAdd={handleCommentAdd} />
        </div>
      </div>
      {isLoading ? (
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
