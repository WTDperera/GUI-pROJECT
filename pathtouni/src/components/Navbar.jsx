import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <Nav>
      <Logo src={logo} alt="PathToUni" />
      <NavLinks>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/universities">Universities</StyledLink>
        <StyledLink to="/dashboard">Dashboard</StyledLink>
        <StyledLink to="/signup">Sign In</StyledLink>
        <StyledLink to="/register">Register</StyledLink>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background: #1a1a2e;
  color: white;
`;

const Logo = styled.img`
  height: 50px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  color: white;
  font-size: 1.1rem;
  &:hover {
    text-decoration: underline;
  }
`;
