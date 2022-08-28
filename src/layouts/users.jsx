import { Route, Switch, useParams } from "react-router-dom";
import UserEditPage from "../components/page/userEditPage/userEditPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";

const Users = () => {
  const params = useParams();
  const { userId } = params;
  return (
    <Switch>
      <Route path="/users/:userId?/edit" component={UserEditPage} />
      <Route
        path="/users/:userId?"
        render={() => <>{userId ? <UserPage userId={userId} /> : <UsersListPage />}</>}
      />
    </Switch>
  );
};

export default Users;
