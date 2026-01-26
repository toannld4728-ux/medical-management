import { Routes, Route } from "react-router-dom";

// user
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ChatPage from "../pages/user/Chat";

// doctor
import DoctorLayout from "../components/layouts/DoctorLayout";
import DoctorOverview from "../pages/doctor/Overview";
import DoctorChatPage from "../pages/doctor/Chat";
import PatientsPage from "../pages/doctor/Patients";
import StatisticsPage from "../pages/doctor/Statistics";

const AppRoutes = () => {
  return (
    <Routes>
      {/* USER */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/chat" element={<ChatPage />} />

      {/* DOCTOR */}
      <AppRoutes />
    </Routes>
  );
};

export default AppRoutes;
