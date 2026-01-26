import { useNavigate } from "react-router-dom";
import { Users, Settings, Shield, Activity } from "lucide-react";

export default function AdminOverview() {
  const navigate = useNavigate();

  const stats = {
    totalUsers: 1247,
    totalClinics: 34,
    totalDoctors: 156,
    activeUsers: 892,
    aiAccuracy: 94.2
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl mb-1">System Overview</h2>
        <p className="text-gray-600">Tổng quan hệ thống AURA</p>
      </div>

      {/* METRICS */}
      <div className="grid md:grid-cols-4 gap-4">
        <Metric title="Tổng người dùng" value={stats.totalUsers} icon={Users} />
        <Metric title="Phòng khám" value={stats.totalClinics} icon={Shield} />
        <Metric title="Bác sĩ" value={stats.totalDoctors} icon={Users} />
        <Metric title="Người dùng hoạt động" value={stats.activeUsers} icon={Activity} />
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid md:grid-cols-2 gap-4">
        <Action
          title="Quản lý người dùng"
          desc="Xem, khóa hoặc phân quyền user"
          icon={Users}
          onClick={() => navigate("/admin/users")}
        />
        <Action
          title="Cấu hình AI"
          desc="Quản lý model và tham số"
          icon={Settings}
          onClick={() => navigate("/admin/ai-config")}
        />
      </div>

      {/* AI INFO */}
      <div className="bg-white border rounded-xl p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Độ chính xác AI hiện tại</span>
          <Shield className="w-5 h-5 text-orange-600" />
        </div>
        <p className="text-3xl">{stats.aiAccuracy}%</p>
        <p className="text-sm text-green-600">+0.8% so với tháng trước</p>
      </div>
    </div>
  );
}

function Metric({ title, value, icon: Icon }: any) {
  return (
    <div className="bg-white border p-6 rounded-xl">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-600">{title}</span>
        <Icon className="w-5 h-5 text-orange-600" />
      </div>
      <p className="text-3xl">{value.toLocaleString()}</p>
    </div>
  );
}

function Action({ title, desc, icon: Icon, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="bg-white border p-6 rounded-xl text-left hover:bg-gray-50 transition"
    >
      <Icon className="w-8 h-8 mb-3 text-orange-600" />
      <h3 className="mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </button>
  );
}
