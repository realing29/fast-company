import { Switch, Route } from "react-router-dom";
import Login from "./components/login";
import MainPage from "./components/mainPage";
import NavBar from "./components/navBar";
import User from "./components/user";
import Users from "./components/users";

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/login" component={Login} />
        <Route exact path="/users" component={Users} />
        <Route path="/users/:userId" component={User} />
      </Switch>
    </>
  );
};

export default App;
