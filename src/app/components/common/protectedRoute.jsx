import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import PropTypes from "prop-types";

const ProtectedRoute = ({ component: Component, children, render, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        }
        if (children) {
          return children;
        }
        if (Component) {
          return <Component {...props} />;
        }
        if (render) {
          return render(props);
        }
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func,
  render: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  location: PropTypes.object,
};

export default ProtectedRoute;
