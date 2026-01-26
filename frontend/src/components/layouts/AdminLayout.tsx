import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  Eye,
  Home,
  Users,
  Settings,
  LogOut,
  Activity,
  User
} from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();

  const menu = [
    { to: "/admin", label: "Tổng quan", icon: Home },
    { to: "/admin/users", label: "Người dùng", icon: Users },
    { to: "/admin/ai-config", label: "Cấu hình AI", icon: Settings }
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gradient-to-b from-orange-600 to-red-600 text-white fixed h-full flex flex-col">
        {/* LOGO */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Eye />
            </div>
            <div>
              <h1 className="font-semibold">AURA Admin</h1>
              <p className="text-xs opacity-80">System Administration</p>
            </div>
          </div>
        </div>

        {/* STATUS */}
        <div className="mx-4 mt-4 flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg text-sm">
          <Activity className="w-4 h-4" />
          <span>Uptime: 99.8%</span>
        </div>

        {/* MENU */}
        <nav className="p-4 space-y-1 flex-1">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:bg-white/10"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* USER */}
        <div className="p-4 border-t border-white/20">
          <div className="flex gap-3 items-center mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <User />
            </div>
            <div>
              <p className="text-sm">Admin</p>
              <p className="text-xs opacity-70">Administrator</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex gap-2 items-center justify-center py-2 hover:bg-white/10 rounded-lg"
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
