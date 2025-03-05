import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignIn";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Universities from "./pages/Universities";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/universities" element={<Universities />} />
      </Routes>
    </>
  );
}

export default App;
