import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService, { removeAuthData, setTokens } from "../services/localStorage.service";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();

  function logOut() {
    removeAuthData();
    setUser(null);
    history.push("/");
  }

  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const signUp = async ({ email, password, ...rest }) => {
    try {
      const { data } = await httpAuth.post("accounts:signUp", {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
        ...rest,
      });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = { email: "Пользователь с такием Email уже существует" };
          throw errorObject;
        }
      }
    }
  };

  const signIn = async ({ email, password }) => {
    try {
      const { data } = await httpAuth.post("accounts:signInWithPassword", {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      await getUserData();
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === "EMAIL_NOT_FOUND") {
          const errorObject = { email: "Пользователя с таким логином не существует" };
          throw errorObject;
        }
        if (message === "INVALID_PASSWORD") {
          const errorObject = { password: "Неправильный пароль" };
          throw errorObject;
        }
      }
    }
  };

  const changeProfile = async (payload) => {
    try {
      if (currentUser.email !== payload.email) {
        const { data } = await httpAuth.post("accounts:update", {
          email: payload.email,
          returnSecureToken: true,
          idToken: localStorageService.getAccessToken(),
        });
        setTokens(data);
      }
      updateUser(payload);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === "CREDENTIAL_TOO_OLD_LOGIN_AGAIN") {
          const errorObject = { message: "Подтвердите изменение вашего Email введя пароль" };
          throw errorObject;
        }
      }
    }
    // const { email, password, idToken } = data;
  };

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }
  async function updateUser(data) {
    try {
      const { content } = await userService.update(data);
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signUp, currentUser, signIn, logOut, changeProfile }}>
      {!isLoading ? children : "loading"}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default AuthProvider;
