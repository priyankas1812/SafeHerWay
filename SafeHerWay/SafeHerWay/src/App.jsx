import "./App.css";
import Nav from "./Components/Nav/Nav";
import Index from "./Components/Pages/index";
import RegisterLogin from "./Components/Pages/RegisterLogin";
import UserLandingpage from "./Components/Pages/UserLandingpage";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/RegisterLogin" element={<RegisterLogin />} />
        <Route path="/UserLandingpage/:userId" element={<UserLandingpage />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
