import { useParams } from "react-router-dom";
import UserEditForm from "../../ui/userEditForm";

const UserEditPage = () => {
  const params = useParams();
  const { userId } = params;
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <UserEditForm userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default UserEditPage;
