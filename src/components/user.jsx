import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../api";
import QualitiesList from "./qualitiesList";

const User = () => {
  const { userId } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.fetchOnly(userId).then((data) => setUser(data));
  }, []);

  const history = useHistory();
  const handleRouteUsers = () => {
    history.push("/users");
  };

  if (user) {
    return (
      <>
        <h1>{user.name}</h1>
        <h2>{`Профессия: ${user.profession.name}`}</h2>
        <QualitiesList qualities={user.qualities} />
        <p>{`completedMeetings: ${user.completedMeetings}`}</p>
        <h2>{`Rate: ${user.rate}`}</h2>
        <button type="button" onClick={handleRouteUsers}>
          Все пользователи
        </button>
      </>
    );
  }
  return <h1>loading</h1>;
};

export default User;
