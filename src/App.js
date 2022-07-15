import { useState } from "react";
import api from "./api";
import SearchStatus from "./components/searchStatus";
import Users from "./components/users";

const App = () => {
  const userInit = api.users.fetchAll().map((user) => {
    user.favorites = false;
    return user;
  });
  const [users, setUsers] = useState(userInit);

  const handleDelete = (userId) => {
    setUsers(users.filter(({ _id }) => _id !== userId));
  };

  const handleFavorites = (id) => {
    const newUsers = users.map((user) => {
      if (user._id == id) {
        return { ...user, favorites: !user.favorites };
      }
      return user;
    });
    setUsers(newUsers);
  };

  return (
    <div>
      <SearchStatus number={users.length} />
      <Users
        users={users}
        handleDelete={handleDelete}
        handleFavorites={handleFavorites}
      />
    </div>
  );
};

export default App;
