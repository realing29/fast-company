import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import UserEditPage from "../components/page/userEditPage/userEditPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import { useAuth } from "../hooks/useAuth";
import UserProvider from "../hooks/useUsers";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  const history = useHistory();
  const { currentUser } = useAuth();
  useEffect(() => {
    if (edit && currentUser._id !== userId) {
      history.replace("/users/" + currentUser._id + "/edit");
    }
  }, []);

  return (
    <div className="container">
      <div className="row gutters-sm">
        <UserProvider>
          {userId ? edit ? <UserEditPage /> : <UserPage userId={userId} /> : <UsersListPage />}
        </UserProvider>
      </div>
    </div>
  );
};

export default Users;
