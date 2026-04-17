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
import EditModule from "./pages/modules/EditModule";
import { SubmoduleList } from "./pages/submodules/SubmoduleList";
import { CreateSubModule } from "./pages/submodules/CreateSubModule";
import { EditSubModule } from "./pages/submodules/EditSubModule";
import StepsList from "./pages/steps/StepsList";
import StepsCreate from "./pages/steps/StepsCreate";
import StepsUpdate from "./pages/steps/StepsUpdate";

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
        <Route path="/edit-module" element={<EditModule />} />
        <Route path="/module-details" element={<ModuleDetails />} />

        <Route path="/sub-module-list" element={<SubmoduleList />} />
        <Route path="/create-sub-module" element={<CreateSubModule />} />
        <Route path="/edit-sub-module" element={<EditSubModule />} />
        
        <Route path="/university-list" element={<UniversityList />} />
        <Route path="/create-university" element={<CreateUniversity />} />

        <Route path="/steps-list" element={<StepsList />} />
        <Route path="/steps-create" element={<StepsCreate />} />
        <Route path="/steps-edit" element={<StepsUpdate />} />
      </Routes>
    </div>
  );
}

export default App;
