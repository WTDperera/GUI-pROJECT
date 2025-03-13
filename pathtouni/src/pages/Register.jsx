import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import registerBackground from "../assets/register-background.jpg";

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  max-width: 450px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 10px;
  transition: 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const subjectOptions = {
  "Physical Science": ["Physics", "Chemistry", "Combined Mathematics"],
  "Biological Science": ["Biology", "Chemistry", "Physics"],
  Commerce: ["Accounting", "Business Studies", "Economics"],
  Arts: ["Political Science", "Sinhala", "Buddhism"],
  Technology: ["Engineering Technology", "Science for Technology", "ICT"],
};

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    zScore: "",
    district: "",
    stream: "",
    subjects: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      let updatedData = { ...prev, [name]: value };

      if (name === "stream") {
        updatedData.subjects = subjectOptions[value] || [];
      }

      return updatedData;
    });
  };

  const handleGradeChange = (index, value) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects[index] = { ...updatedSubjects[index], grade: value };
    setFormData((prev) => ({ ...prev, subjects: updatedSubjects }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        alert("Registration successful!");
        navigate("/dashboard");
      } else {
        alert("Registration failed.");
      }
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <RegisterContainer $bgImage={registerBackground}>
      <Card>
        <Title>Register</Title>
        <form onSubmit={handleSubmit}>
          <Input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} />
          <Input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
          <Input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} />
          <Input type="tel" name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} />
          <Input type="text" name="zScore" placeholder="Z-Score" required value={formData.zScore} onChange={handleChange} />

          <Select name="district" required value={formData.district} onChange={handleChange}>
            <option value="">Select District</option>
            {["Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"].map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </Select>

          <Select name="stream" required value={formData.stream} onChange={handleChange}>
            <option value="">Select A/L Stream</option>
            {Object.keys(subjectOptions).map((stream) => (
              <option key={stream} value={stream}>
                {stream}
              </option>
            ))}
          </Select>

          {formData.subjects.length > 0 && (
            <>
              <h4>A/L Results:</h4>
              {formData.subjects.map((subject, index) => (
                <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                  <Input type="text" value={subject} disabled />
                  <Select value={subject.grade || ""} onChange={(e) => handleGradeChange(index, e.target.value)}>
                    <option value="">Grade</option>
                    {["A", "B", "C", "S", "F"].map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </Select>
                </div>
              ))}
            </>
          )}

          <Button type="submit">Register</Button>
          <p>Already have an account?</p>
          <Button type="button" onClick={() => navigate("/signin")}>
            Sign In
          </Button>
        </form>
      </Card>
    </RegisterContainer>
  );
};

export default Register;
