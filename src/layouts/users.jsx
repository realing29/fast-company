import { useParams } from "react-router-dom";
import UserEditPage from "../components/page/userEditPage/userEditPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;

  return (
    <div className="container">
      <div className="row gutters-sm">
        {userId ? edit ? <UserEditPage /> : <UserPage userId={userId} /> : <UsersListPage />}
      </div>
    </div>
  );
};

export default Users;
