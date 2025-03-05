import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import heroBg from "../assets/hero-bg.jpg";

const Home = () => {
  return (
    <HeroSection bgImage={heroBg}>
      <Overlay />
      <Content>
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          Your Gateway to Higher Education in Sri Lanka
        </motion.h1>
        <p>
          Choosing the right university is a life-changing decision. PathToUni simplifies the process
          by providing tailored recommendations based on your academic results. Explore degree
          programs, compare options, and make an informed choice with ease.
        </p>
        <Link to="/signup">
          <Button whileHover={{ scale: 1.1 }}>Get Started</Button>
        </Link>
      </Content>
    </HeroSection>
  );
};

export default Home;

const HeroSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url(${(props) => props.bgImage}) no-repeat center center/cover;
  text-align: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Dark overlay */
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  color: white; /* Ensure text is visible */
  font-family: "Poppins", sans-serif;
  padding: 20px;
`;

const Button = styled(motion.button)`
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 1.2rem;
  font-family: "Poppins", sans-serif;
  color: white;
  background: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #0056b3;
  }
`;
