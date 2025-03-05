import { useState, useEffect } from "react";
import axios from "axios";

const Universities = () => {
  const [universities, setUniversities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/universities");
      setUniversities(res.data);
    } catch (error) {
      console.error("Error fetching universities:", error);
    }
  };

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      fetchUniversities();
      return;
    }
    try {
      const res = await axios.get(`http://localhost:5000/api/universities/search?query=${e.target.value}`);
      setUniversities(res.data);
    } catch (error) {
      console.error("Error searching universities:", error);
    }
  };

  return (
    <div className="container">
      <h1>Universities</h1>
      <input
        type="text"
        placeholder="Search for a university..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="university-list">
        {universities.map((uni) => (
          <div key={uni._id} className="university-card">
            <img src={uni.image} alt={uni.name} className="university-image" />
            <h3>{uni.name}</h3>
            <p>Faculty: {uni.faculty}</p>
            <p>Degree: {uni.degree}</p>
            <p>Min Z-Score: {uni.minZScore}</p>
            <a href={uni.website} target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Universities;
