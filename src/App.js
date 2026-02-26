import { Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import UniversityDetail from "./pages/university/UniversityDetail";
import StudentProfile from "./pages/studentProfile/StudentProfile";
import ModuleList from "./pages/modules/ModuleList";
import CreateModule from "./pages/modules/CreateModule";
import ModuleDetails from "./pages/modules/ModuleDetails";
import UniversityList from "./pages/university/UniversityList";
import CreateUniversity from "./pages/university/CreateUniversity";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/university-detail" element={<UniversityDetail />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/module-list" element={<ModuleList />} />
        <Route path="/create-module" element={<CreateModule />} />
        <Route path="/module-details" element={<ModuleDetails />} />
        <Route path="/university-list" element={<UniversityList />} />
        <Route path="/create-university" element={<CreateUniversity />} />
      </Routes>
    </div>
  );
}

export default App;
