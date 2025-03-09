import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import registerBackground from "../assets/register-background.jpg";
import axios from "axios";

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

const RegisterForm = styled.form`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const CheckboxLabel = styled.label`
  display: block;
  text-align: left;
  margin: 5px 0;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

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
    results: "",
    interests: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        interests: checked
          ? [...prev.interests, value]
          : prev.interests.filter((interest) => interest !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
      <RegisterForm onSubmit={handleSubmit}>
        <h2>Register</h2>

        <Input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} />
        <Input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
        <Input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} />
        <Input type="tel" name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} />
        <Input type="text" name="zScore" placeholder="Z-Score" required value={formData.zScore} onChange={handleChange} />

        <Select name="district" required value={formData.district} onChange={handleChange}>
          <option value="">Select District</option>
          <option value="Ampara">Ampara</option>
          <option value="Anuradhapura">Anuradhapura</option>
          <option value="Badulla">Badulla</option>
        </Select>

        <Select name="stream" required value={formData.stream} onChange={handleChange}>
          <option value="">Select A/L Stream</option>
          <option value="A">A</option>
          <option value="B">B</option>
        </Select>

        <Input type="text" name="results" placeholder="A/L Results (e.g., A,A,A)" required value={formData.results} onChange={handleChange} />

        <p>Select Your Interests:</p>
        <CheckboxLabel>
          <input type="checkbox" name="interests" value="Engineering" checked={formData.interests.includes("Engineering")} onChange={handleChange} /> Engineering
        </CheckboxLabel>
        <CheckboxLabel>
          <input type="checkbox" name="interests" value="Medicine" checked={formData.interests.includes("Medicine")} onChange={handleChange} /> Medicine
        </CheckboxLabel>
        <CheckboxLabel>
          <input type="checkbox" name="interests" value="Business" checked={formData.interests.includes("Business")} onChange={handleChange} /> Business
        </CheckboxLabel>

        <Button type="submit">Register</Button>
        <p>Already have an account?</p>
        <Button type="button" onClick={() => navigate("/signin")}>
          Sign In
        </Button>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default Register;
