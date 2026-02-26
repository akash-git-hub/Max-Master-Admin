import { Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import UniversityDetail from "./pages/university/UniversityDetail";
import StudentProfile from "./pages/studentProfile/StudentProfile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/university-detail" element={<UniversityDetail />} />
        <Route path="/student-profile" element={<StudentProfile />} />
      </Routes>
    </div>
  );
}

export default App;
