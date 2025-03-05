import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import registerBackground from "../assets/register-background.jpg"; // New background image

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url(${registerBackground});
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
  const navigate = useNavigate(); // Use react-router-dom navigation

  return (
    <RegisterContainer>
      <RegisterForm>
        <h2>Register</h2>

        <Input type="text" placeholder="Full Name" required />
        <Input type="email" placeholder="Email" required />
        <Input type="password" placeholder="Password" required />
        <Input type="tel" placeholder="Phone Number" required />
        <Input type="text" placeholder="Z-Score" required />

        <Select required>
        <option value="">Select District</option>
  <option value="Ampara">Ampara</option>
  <option value="Anuradhapura">Anuradhapura</option>
  <option value="Badulla">Badulla</option>
  <option value="Batticaloa">Batticaloa</option>
  <option value="Colombo">Colombo</option>
  <option value="Galle">Galle</option>
  <option value="Gampaha">Gampaha</option>
  <option value="Hambantota">Hambantota</option>
  <option value="Jaffna">Jaffna</option>
  <option value="Kalutara">Kalutara</option>
  <option value="Kandy">Kandy</option>
  <option value="Kegalle">Kegalle</option>
  <option value="Kilinochchi">Kilinochchi</option>
  <option value="Kurunegala">Kurunegala</option>
  <option value="Mannar">Mannar</option>
  <option value="Matale">Matale</option>
  <option value="Matara">Matara</option>
  <option value="Monaragala">Monaragala</option>
  <option value="Mullaitivu">Mullaitivu</option>
  <option value="Nuwara Eliya">Nuwara Eliya</option>
  <option value="Polonnaruwa">Polonnaruwa</option>
  <option value="Puttalam">Puttalam</option>
  <option value="Ratnapura">Ratnapura</option>
  <option value="Trincomalee">Trincomalee</option>
  <option value="Vavuniya">Vavuniya</option>
        </Select>

        <Select required>
          <option value="">Select A/L Stream</option>
          <option value="Physical Science">Physical Science</option>
          <option value="Biological Science">Biological Science</option>
          <option value="Commerce">Commerce</option>
          <option value="Arts">Arts</option>
          <option value="Technology">Technology</option>
        </Select>

        <h3>A/L Results</h3>
        <Input type="text" placeholder="Subject 1 Name" required />
        <Select required>
          <option value="">Grade</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="S">S</option>
          <option value="F">F</option>
        </Select>

        <Input type="text" placeholder="Subject 2 Name" required />
        <Select required>
          <option value="">Grade</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="S">S</option>
          <option value="F">F</option>
        </Select>

        <Input type="text" placeholder="Subject 3 Name" required />
        <Select required>
          <option value="">Grade</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="S">S</option>
          <option value="F">F</option>
        </Select>

        <p>Select Your Interests:</p>
        <CheckboxLabel>
          <input type="checkbox" value="Engineering" /> Engineering
        </CheckboxLabel>
        <CheckboxLabel>
          <input type="checkbox" value="Medicine" /> Medicine
        </CheckboxLabel>
        <CheckboxLabel>
          <input type="checkbox" value="Business" /> Business
        </CheckboxLabel>

        <Button type="submit">Register</Button>

        <p>Already have an account?</p>
        <Button type="button" onClick={() => navigate("/signin")}>Sign In</Button>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default Register;
