import styled from "styled-components/native";
import ForumAdminCard from "../../../components/Forum/ForumManagement/ForumAdminCard";
import { firebase } from "../../../services/Firebase/Config";
import { AdminPower } from "../../../constants/Admin";

const AdminsScreen = () => {
  const currentUID = firebase.auth().currentUser.uid;

  return (
    <Container>
      <ForumAdminCard
        userId={currentUID}
        authorities={[AdminPower.BAN_USER, AdminPower.DELETE_POSTS]}
      />
    </Container>
  );
};

export default AdminsScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: darkcyan;
`;
