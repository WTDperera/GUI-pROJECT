import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import dashboardBackground from "../assets/dashboard.jpg";

const Container = styled.div`
  text-align: center;
  padding: 50px;
  background: linear-gradient(
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    ),
    url(${dashboardBackground});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
`;

const SubTitle = styled.h2`
  font-size: 22px;
  margin-bottom: 15px;
  color: #555;
`;

const UserDetails = styled.div`
  margin-bottom: 30px;
`;

const DetailItem = styled.p`
  font-size: 16px;
  margin: 10px 0;
  color: #666;
`;

const UniversityList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const UniversityCard = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const UniversityName = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: #007bff;
`;

const UniversityDetail = styled.p`
  font-size: 14px;
  color: #777;
`;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. Redirect to login.");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/user`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data?.user) {
          setUser(response.data.user);
          fetchUniversities(response.data.user.stream, response.data.user.zScore);
        } else {
          console.error("Invalid user data:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const fetchUniversities = async (stream, zScore) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/universities`,
        { params: { stream, zScore } }
      );
      setUniversities(response.data || []);
    } catch (error) {
      console.error("Failed to fetch universities:", error);
    }
  };

  if (!user) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Card>
        <Title>Welcome to Your Dashboard, {user.name}!</Title>
        <UserDetails>
          <SubTitle>Your Details:</SubTitle>
          <DetailItem><strong>Email:</strong> {user.email}</DetailItem>
          <DetailItem><strong>Phone:</strong> {user.phone}</DetailItem>
          <DetailItem><strong>Z-Score:</strong> {user.zScore}</DetailItem>
          <DetailItem><strong>District:</strong> {user.district}</DetailItem>
          <DetailItem><strong>Stream:</strong> {user.stream}</DetailItem>
          <DetailItem>
            <strong>Subjects:</strong> {Array.isArray(user.subjects) ? user.subjects.join(", ") : "N/A"}
          </DetailItem>
        </UserDetails>

        <SubTitle>Suggested Universities:</SubTitle>
        <UniversityList>
          {universities.length > 0 ? (
            universities.map((university, index) => (
              <UniversityCard key={index}>
                <UniversityName>{university.name}</UniversityName>
                <UniversityDetail><strong>Location:</strong> {university.location}</UniversityDetail>
                <UniversityDetail><strong>Programs:</strong> {university.programs.join(", ")}</UniversityDetail>
                <UniversityDetail><strong>Minimum Z-Score:</strong> {university.minZScore}</UniversityDetail>
              </UniversityCard>
            ))
          ) : (
            <p>No universities found for your profile.</p>
          )}
        </UniversityList>
      </Card>
    </Container>
  );
};

export default Dashboard;
