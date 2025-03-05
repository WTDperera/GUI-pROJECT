import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import backgroundImage from "../assets/signup-background.jpg"; // Ensure correct path

const SignInContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const SignInForm = styled.form`
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

const SignIn = () => {
  return (
    <SignInContainer>
      <SignInForm>
        <h2>Sign In</h2>

        <Input type="email" placeholder="Email" required />
        <Input type="password" placeholder="Password" required />

        <Button type="submit">Login</Button>

        <p>Don't have an account?</p>
        <Link to="/register">
          <Button type="button">Register</Button>
        </Link>
      </SignInForm>
    </SignInContainer>
  );
};

export default SignIn;
