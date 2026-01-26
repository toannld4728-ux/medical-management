import { useNavigate } from "react-router-dom";
import {
  Users,
  TrendingUp,
  Activity,
  Upload,
  FileText,
  BarChart3,
} from "lucide-react";

export default function ClinicOverview() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-2xl font-semibold">Dashboard Phòng khám</h1>
        <p className="text-gray-600">
          Tổng quan hoạt động của Phòng khám Mắt Sài Gòn
        </p>
      </div>

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Tổng bệnh nhân"
          value="248"
          note="Đang theo dõi"
          icon={<Users className="text-blue-500" />}
        />

        <StatCard
          title="Quét tháng này"
          value="542"
          note="+18% so tháng trước"
          noteColor="text-green-600"
          icon={<TrendingUp className="text-green-500" />}
        />

        <StatCard
          title="Bác sĩ hoạt động"
          value="8"
          note="Đang làm việc"
          icon={<Users className="text-purple-500" />}
        />

        <StatProgress title="Sử dụng gói" value="67%" progress={67} />
      </div>

      {/* ===== MIDDLE ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ACTIVITY */}
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-4">Hoạt động gần đây</h2>

          <ul className="space-y-4 text-sm">
            <ActivityItem
              color="bg-green-500"
              title="BS. Trần Thị Bình xác nhận 12 phân tích"
              time="30 phút trước"
            />
            <ActivityItem
              color="bg-blue-500"
              title="Tải lên 45 hình ảnh mới để phân tích"
              time="2 giờ trước"
            />
            <ActivityItem
              color="bg-purple-500"
              title="Thêm 3 bệnh nhân mới vào hệ thống"
              time="5 giờ trước"
            />
            <ActivityItem
              color="bg-orange-500"
              title="BS. Lê Văn Cường gia nhập phòng khám"
              time="1 ngày trước"
            />
          </ul>
        </div>

        {/* SUBSCRIPTION */}
        <div className="bg-white border rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Gói dịch vụ</h2>
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-sm">
              Professional
            </span>
          </div>

          <div className="space-y-3 text-sm">
            <Row label="Số lượt quét/tháng" value="800 lượt" />
            <Row label="Đã sử dụng" value="542 / 800" />
            <Row
              label="Còn lại"
              value="258 lượt"
              valueColor="text-green-600"
            />
            <Row label="Gia hạn vào" value="01/01/2025" />
          </div>

          <button
            onClick={() => navigate("/clinic/subscription")}
            className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700"
          >
            Quản lý gói dịch vụ
          </button>
        </div>
      </div>

      {/* ===== QUICK ACTIONS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ActionCard
          icon={<Upload size={28} />}
          title="Tải hàng loạt"
          desc="Upload nhiều hình ảnh cùng lúc"
          bg="bg-blue-600"
          text="text-white"
          onClick={() => navigate("/clinic/batch-upload")}
        />

        <ActionCard
          icon={<FileText size={28} />}
          title="Báo cáo"
          desc="Xem báo cáo tổng hợp"
          onClick={() => navigate("/clinic/reports")}
        />

        <ActionCard
          icon={<BarChart3 size={28} />}
          title="Phân tích"
          desc="Thống kê và xu hướng"
          onClick={() => navigate("/clinic/analytics")}
        />
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({
  title,
  value,
  note,
  noteColor,
  icon,
}: any) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600">{title}</span>
        {icon}
      </div>
      <p className="text-3xl font-semibold">{value}</p>
      <p className={`text-sm mt-1 ${noteColor || "text-gray-500"}`}>
        {note}
      </p>
    </div>
  );
}

function StatProgress({ title, value, progress }: any) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <div className="flex justify-between mb-2 text-gray-600">
        <span>{title}</span>
        <Activity className="text-orange-500" />
      </div>
      <p className="text-3xl font-semibold">{value}</p>

      <div className="w-full bg-gray-200 h-2 rounded-full mt-3">
        <div
          className="bg-orange-500 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function ActivityItem({ color, title, time }: any) {
  return (
    <li className="flex gap-3 items-start">
      <span className={`w-2 h-2 mt-2 rounded-full ${color}`} />
      <div>
        <p>{title}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </li>
  );
}

function Row({ label, value, valueColor }: any) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className={valueColor}>{value}</span>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  desc,
  bg,
  text,
  onClick,
}: any) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl p-6 border cursor-pointer transition hover:shadow ${
        bg || "bg-white"
      } ${text || "text-gray-900"}`}
    >
      <div className="mb-3">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm opacity-80">{desc}</p>
    </div>
  );
}
