import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../api";
import QualitiesList from "./qualitiesList";

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.fetchOnly(userId).then((data) => setUser(data));
  }, []);

  const history = useHistory();
  const handleClick = () => {
    history.push("/users");
  };

  if (user) {
    return (
      <>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <QualitiesList qualities={user.qualities} />
        <p>completedMeetings: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>
        <button onClick={handleClick}>Все пользователи</button>
      </>
    );
  }
  return <h1>loading</h1>;
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserPage;
