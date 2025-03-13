import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import backgroundImage from "../assets/university-bg.jpg"; // Background Image

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;
  color: white;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 900px;
  text-align: center;
  color: black;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  width: 70%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const SearchButton = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const UniversityList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const UniversityCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const UniversityImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 6px;
`;

const UniversityName = styled.h3`
  font-size: 18px;
  margin: 10px 0;
  color: #007bff;
`;

const UniversityDetail = styled.p`
  font-size: 14px;
  color: #333;
`;

const VisitButton = styled.a`
  display: inline-block;
  margin-top: 10px;
  padding: 8px 12px;
  font-size: 14px;
  background-color: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 5px;

  &:hover {
    background-color: #218838;
  }
`;

const Universities = () => {
  const [universities, setUniversities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUniversities, setFilteredUniversities] = useState([]);

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/universities");
      setUniversities(res.data);
      setFilteredUniversities(res.data); // Initialize filtered list
    } catch (error) {
      console.error("Error fetching universities:", error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredUniversities(universities);
    } else {
      const results = universities.filter((uni) =>
        uni.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUniversities(results);
    }
  };

  return (
    <Container>
      <Card>
        <h1>Universities in Sri Lanka</h1>

        {/* Search Box */}
        <SearchContainer>
          <SearchBar
            type="text"
            placeholder="Search for a university..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>Search</SearchButton>
        </SearchContainer>

        {/* University List */}
        <UniversityList>
          {filteredUniversities.length > 0 ? (
            filteredUniversities.map((uni) => (
              <UniversityCard key={uni._id}>
                <UniversityImage src={uni.image} alt={uni.name} />
                <UniversityName>{uni.name}</UniversityName>
                <UniversityDetail>
                  <strong>Faculty:</strong> {uni.faculty}
                </UniversityDetail>
                <UniversityDetail>
                  <strong>Degree:</strong> {uni.degree}
                </UniversityDetail>
                <UniversityDetail>
                  <strong>Min Z-Score:</strong> {uni.minZScore}
                </UniversityDetail>
                <VisitButton href={uni.website} target="_blank" rel="noopener noreferrer">
                  Visit Website
                </VisitButton>
              </UniversityCard>
            ))
          ) : (
            <p>No universities found.</p>
          )}
        </UniversityList>
      </Card>
    </Container>
  );
};

export default Universities;
