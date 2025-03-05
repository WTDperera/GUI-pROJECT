import styled from "styled-components";

const Dashboard = () => {
  return (
    <Container>
      <h1>Welcome to Your Dashboard</h1>
      <p>Select your interests and start exploring universities.</p>
    </Container>
  );
};

export default Dashboard;

const Container = styled.div`
  text-align: center;
  padding: 50px;
`;
