import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  MessageSquare,
  BarChart3,
  User,
  LogOut,
  Eye,
} from "lucide-react";

export default function DoctorLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
            <Eye className="text-white" />
          </div>
          <div>
            <h1 className="text-green-600 font-semibold">AURA</h1>
            <p className="text-xs text-gray-500">Doctor Portal</p>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1">
          <NavItem to="/doctor" icon={<Home />} label="Tổng quan" />
          <NavItem to="/doctor/chat" icon={<MessageSquare />} label="Chat" />
          <NavItem to="/doctor/patients" icon={<Users />} label="Bệnh nhân" />
          <NavItem to="/doctor/statistics" icon={<BarChart3 />} label="Thống kê" />
        </nav>

        {/* User */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <User className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Bác sĩ</p>
              <p className="text-xs text-gray-500">Doctor</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <LogOut size={16} /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}

function NavItem({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
          isActive
            ? "bg-green-50 text-green-600"
            : "text-gray-600 hover:bg-gray-50"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
