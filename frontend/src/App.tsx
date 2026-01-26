import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ================= PUBLIC ================= */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

/* ================= USER ================= */
import UserLayout from "./components/layouts/UserLayout";
import UserOverview from "./pages/user/Overview";
import UploadPage from "./pages/user/Upload";
import HistoryPage from "./pages/user/History";
import ChatPage from "./pages/user/Chat";

/* ================= DOCTOR ================= */
import DoctorLayout from "./components/layouts/DoctorLayout";
import DoctorOverview from "./pages/doctor/Overview";
import DoctorChatPage from "./pages/doctor/Chat";
import PatientsPage from "./pages/doctor/Patients";
import StatisticsPage from "./pages/doctor/Statistics";
import PatientDetail from "./pages/doctor/Patients/PatientDetail";

/* ================= CLINIC ================= */
import ClinicLayout from "./components/layouts/ClinicLayout";
import ClinicOverview from "./pages/clinic/overview";
import BatchUpload from "./pages/clinic/batch-upload";
import ClinicReports from "./pages/clinic/reports";
import ClinicAnalytics from "./pages/clinic/analytics";
import Subscription from "./pages/clinic/subscription";

/* ================= ADMIN ================= */
import AdminLayout from "./components/layouts/AdminLayout";
import AdminOverview from "./pages/admin/overview";
import UserManagement from "./pages/admin/users";
import AIConfiguration from "./pages/admin/ai-config";

/* ================= TODO TEST ================= */
import Todo from "./components/TodoPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========= PUBLIC ========= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ========= TODO TEST ========= */}
        <Route path="/todo-test" element={<Todo />} />

        {/* ========= USER ========= */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserOverview />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="chat" element={<ChatPage />} />
        </Route>

        {/* ========= DOCTOR ========= */}
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<DoctorOverview />} />
          <Route path="chat" element={<DoctorChatPage />} />
          <Route path="patients">
            <Route index element={<PatientsPage />} />
            <Route path=":patientId" element={<PatientDetail />} />
          </Route>
          <Route path="statistics" element={<StatisticsPage />} />
        </Route>

        {/* ========= CLINIC ========= */}
        <Route path="/clinic" element={<ClinicLayout />}>
          <Route index element={<ClinicOverview />} />
          <Route path="batch-upload" element={<BatchUpload />} />
          <Route path="reports" element={<ClinicReports />} />
          <Route path="analytics" element={<ClinicAnalytics />} />
          <Route path="subscription" element={<Subscription />} />
        </Route>

        {/* ========= ADMIN ========= */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="ai-config" element={<AIConfiguration />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
