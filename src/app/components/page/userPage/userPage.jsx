import PropTypes from "prop-types";
import Comments from "../../ui/comments";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import { useUser } from "../../../hooks/useUsers";
import { CommentsProvider } from "../../../hooks/useComments";

const UserPage = ({ userId }) => {
  const { getUserById } = useUser();
  const user = getUserById(userId);

  if (user) {
    return (
      <>
        <div className="col-md-4 mb-3">
          <UserCard user={user} />
          <QualitiesCard data={user.qualities} />
          <MeetingsCard value={user.completedMeetings} />
        </div>
        <div className="col-md-8">
          <CommentsProvider>
            <Comments />
          </CommentsProvider>
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
