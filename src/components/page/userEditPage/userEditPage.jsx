import { useParams } from "react-router-dom";
import UserEditForm from "../../ui/userEditForm";

const UserEditPage = () => {
  const params = useParams();
  const { userId } = params;
  return <UserEditForm userId={userId} />;
};

export default UserEditPage;
