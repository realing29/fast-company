import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import api from "../../../api";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import Search from "../../ui/serch";
import { useUser } from "../../../hooks/useUsers";

const UsersListPage = () => {
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const { users } = useUser();

  const handleDelete = (userId) => {
    // setUsers(users.filter(({ _id }) => _id !== userId));
    console.log(userId);
  };

  const handleToggleBookMark = (id) => {
    const newUsers = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark };
      }
      return user;
    });
    // setUsers(newUsers);
    console.log(newUsers);
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfessions(data);
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (item) => {
    if (search !== "") {
      setSearch("");
    }
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleSearch = (text) => {
    if (selectedProf !== undefined) {
      setSelectedProf();
    }
    setSearch(text);
  };

  if (users) {
    let filteredUsers;

    if (selectedProf) {
      filteredUsers = users.filter((user) => user.profession === selectedProf._id);
    } else if (search) {
      filteredUsers = users.filter((user) => new RegExp(search, "i").test(user.name));
    } else {
      filteredUsers = users;
    }

    const count = filteredUsers.length;
    const sorteredUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sorteredUsers, currentPage, pageSize);

    const clearFilter = () => {
      setSelectedProf();
    };
    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus number={count} />
          <Search onSearch={handleSearch} searсh={search} />
          {count > 0 && (
            <UserTable
              users={usersCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return "loading...";
};

UsersListPage.propTypes = { users: PropTypes.array };

export default UsersListPage;
