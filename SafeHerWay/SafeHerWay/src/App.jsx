import "./App.css";
import Nav from "./Components/Nav/Nav";
import Index from "./Components/Pages/index";
import RegisterLogin from "./Components/Pages/RegisterLogin";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/RegisterLogin" element={<RegisterLogin />} />
      </Routes>
    </>
  );
}

export default App;
