import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const UserLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // sau này có auth thì clear token ở đây
    // localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-sky-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white px-6 py-8 flex flex-col">
        <Link
          to="/user"
          className="text-2xl font-bold mb-10 block hover:text-blue-400 transition"
        >
          AURA
        </Link>

        <nav className="space-y-4 flex-1">
          <NavLink
            to="/user"
            end
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive ? "bg-blue-600" : "hover:bg-slate-800"
              }`
            }
          >
            Tổng quan
          </NavLink>

          <NavLink
            to="/user/upload"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive ? "bg-blue-600" : "hover:bg-slate-800"
              }`
            }
          >
            Tải ảnh
          </NavLink>

          <NavLink
            to="/user/history"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive ? "bg-blue-600" : "hover:bg-slate-800"
              }`
            }
          >
            Lịch sử
          </NavLink>

          <NavLink
            to="/user/chat"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive ? "bg-blue-600" : "hover:bg-slate-800"
              }`
            }
          >
            Chat với bác sĩ
          </NavLink>
        </nav>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="mt-6 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800 text-left"
        >
          <LogOut size={16} />
          Đăng xuất
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
