import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";

const CommentsContext = createContext();

export const useComments = () => useContext(CommentsContext);

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const { userId: pageId } = useParams();
  const { currentUser } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getComments();
  }, [pageId]);

  async function createComment(data) {
    const comment = {
      _id: nanoid(),
      ...data,
      pageId,
      created_at: Date.now(),
      userId: currentUser._id,
    };
    try {
      const { content } = await commentService.createComment(comment);
      setComments((prev) => [...prev, content]);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function getComments() {
    try {
      const { content } = await commentService.getComments(pageId);
      setComments(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function removeComment(id) {
    try {
      const { content } = await commentService.removeComment(id);
      if (content === null) {
        setComments((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  return (
    <CommentsContext.Provider value={{ comments, createComment, removeComment, isLoading }}>
      {children}
    </CommentsContext.Provider>
  );
};

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
