import { NavLink } from "react-router-dom";

const DoctorSidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">Doctor Panel</h2>

      <nav className="space-y-3">
        <NavLink to="/doctor" end className="block">
          Tổng quan
        </NavLink>

        <NavLink to="/doctor/chat" className="block">
          Chat
        </NavLink>

        <NavLink to="/doctor/patients" className="block">
          Bệnh nhân
        </NavLink>

        <NavLink to="/doctor/statistics" className="block">
          Thống kê
        </NavLink>
      </nav>
    </div>
  );
};

export default DoctorSidebar;
