import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";
import AuthProvider from "./hooks/useAuth";

const App = () => {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <ProfessionProvider>
          <QualityProvider>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route path="/login/:type?" component={Login} />
              <Route path="/users/:userId?/:edit?" component={Users} />
              <Redirect to="/" />
            </Switch>
          </QualityProvider>
        </ProfessionProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
};

export default App;
