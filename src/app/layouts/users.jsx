import { useParams } from "react-router-dom";
import UserEditPage from "../components/page/userEditPage/userEditPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserProvider from "../hooks/useUsers";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;

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
