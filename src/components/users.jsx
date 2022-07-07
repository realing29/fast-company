import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter(({ _id }) => _id !== userId));
  };

  const renderPhrase = (number) => {
    let a = "";
    const numberEnding = +number.toString().at(-1);
    if (number < 11 || number > 14) {
      if (numberEnding === 2 || numberEnding === 3 || numberEnding === 4)
        a = "а";
    }

    return (
      <h2>
        {number === 0 ? (
          <span className="badge bg-danger">
            Никто с тобой не тусанет сегодня
          </span>
        ) : (
          <span className="badge bg-primary">
            {number} человек{a} тусанет с тобой сегодня
          </span>
        )}
      </h2>
    );
  };

  return (
    <>
      {renderPhrase(users.length)}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз </th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map(
            ({ _id, name, qualities, profession, completedMeetings, rate }) => (
              <tr key={_id}>
                <td>{name}</td>
                <td>
                  {qualities.map(({ _id, name, color }) => (
                    <span key={_id} className={`badge bg-${color} m-1`}>
                      {name}
                    </span>
                  ))}
                </td>
                <td>{profession.name}</td>
                <td>{completedMeetings}</td>
                <td>{rate}/5</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(_id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
};

export default Users;
