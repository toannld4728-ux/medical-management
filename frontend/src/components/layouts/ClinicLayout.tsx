import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  Eye,
  Home,
  Upload,
  FileText,
  BarChart3,
  Package,
  LogOut,
  User,
} from "lucide-react";

export default function ClinicLayout() {
  const navigate = useNavigate();

  const tabs = [
    { to: "/clinic", label: "Tổng quan", icon: Home },
    { to: "/clinic/batch-upload", label: "Tải hàng loạt", icon: Upload },
    { to: "/clinic/reports", label: "Báo cáo", icon: FileText },
    { to: "/clinic/analytics", label: "Phân tích", icon: BarChart3 },
    { to: "/clinic/subscription", label: "Gói dịch vụ", icon: Package },
  ];

  const handleLogout = () => {
    // sau này có token thì clear ở đây
    // localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r fixed h-full flex flex-col">
        {/* LOGO */}
        <div className="p-6 border-b flex gap-3 items-center">
          <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
            <Eye className="text-white" />
          </div>
          <div>
            <h1 className="text-purple-600 font-semibold">AURA</h1>
            <p className="text-xs text-gray-500">Clinic Portal</p>
          </div>
        </div>

        {/* MENU */}
        <nav className="p-4 space-y-1 flex-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <NavLink
                key={tab.to}
                to={tab.to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? "bg-purple-50 text-purple-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </NavLink>
            );
          })}
        </nav>

        {/* USER + LOGOUT */}
        <div className="p-4 border-t">
          <div className="flex gap-3 items-center mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <User className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Clinic Admin</p>
              <p className="text-xs text-gray-500">admin@clinic.com</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex gap-2 items-center justify-center text-gray-600 hover:bg-gray-50 py-2 rounded-lg"
          >
            <LogOut className="w-4 h-4" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}
