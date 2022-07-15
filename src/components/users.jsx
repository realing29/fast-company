import User from "./user";

const Users = (props) => {
  const { users, handleDelete, handleFavorites } = props;
  return (
    <>
      {users.length ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз </th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User
                key={user._id}
                {...user}
                handleDelete={handleDelete}
                handleFavorites={handleFavorites}
              />
            ))}
          </tbody>
        </table>
      ) : null}
    </>
  );
};

export default Users;
