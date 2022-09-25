import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Comments from "../../ui/comments";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);

  if (user) {
    return (
      <>
        <div className="col-md-4 mb-3">
          <UserCard user={user} />
          <QualitiesCard data={user.qualities} />
          <MeetingsCard value={user.completedMeetings} />
        </div>
        <div className="col-md-8">
          <Comments />
        </div>
      </>
    );
  }
  return <h1>loading</h1>;
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserPage;
