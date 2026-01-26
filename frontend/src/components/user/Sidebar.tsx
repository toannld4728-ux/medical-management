import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6">
      
      {/* LOGO */}
      <Link
        to="/user"
        className="flex items-center gap-2 mb-10 cursor-pointer select-none"
      >
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
          A
        </div>
        <span className="text-2xl font-bold hover:text-blue-500 transition">
          AURA
        </span>
      </Link>

      {/* MENU */}
      <nav className="space-y-2">
        <NavLink
          to="/user"
          end
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg ${
              isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
            }`
          }
        >
          Tổng quan
        </NavLink>

        <NavLink to="/user/upload" className="block px-4 py-2 rounded-lg hover:bg-gray-100">
          Upload
        </NavLink>

        <NavLink to="/user/history" className="block px-4 py-2 rounded-lg hover:bg-gray-100">
          Lịch sử
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
