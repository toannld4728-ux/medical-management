import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Activity,
  AlertTriangle,
  BarChart3,
} from "lucide-react";
import React from "react";

/* ===== TYPES ===== */

interface CardProps {
  title: string;
  children: React.ReactNode;
}

interface StatCardProps {
  title: string;
  value: string;
  note: string;
  icon: React.ReactNode;
  danger?: boolean;
}

/* ===== MAIN ===== */

export default function ClinicAnalytics() {
  /* ===== MOCK DATA ===== */

  const monthlyScans = [
    { month: "T7", scans: 412, patients: 185 },
    { month: "T8", scans: 445, patients: 198 },
    { month: "T9", scans: 478, patients: 212 },
    { month: "T10", scans: 498, patients: 225 },
    { month: "T11", scans: 498, patients: 235 },
    { month: "T12", scans: 542, patients: 248 },
  ];

  const riskDistribution = [
    { name: "Rủi ro thấp", value: 420, color: "#22c55e" },
    { name: "Rủi ro trung bình", value: 110, color: "#f97316" },
    { name: "Rủi ro cao", value: 12, color: "#ef4444" },
  ];

  const conditionBreakdown = [
    { condition: "Bình thường", count: 420 },
    { condition: "Bệnh võng mạc tiểu đường", count: 48 },
    { condition: "Tăng huyết áp võng mạc", count: 52 },
    { condition: "Thoái hóa hoàng điểm", count: 18 },
    { condition: "Khác", count: 4 },
  ];

  const ageDistribution = [
    { age: "18-30", count: 45 },
    { age: "31-40", count: 72 },
    { age: "41-50", count: 85 },
    { age: "51-60", count: 68 },
    { age: "61+", count: 42 },
  ];

  const doctorPerformance = [
    { name: "BS. Trần Thị Bình", reviews: 342, avgTime: 2.1 },
    { name: "BS. Lê Văn Cường", reviews: 198, avgTime: 2.5 },
    { name: "BS. Phạm Văn Đức", reviews: 85, avgTime: 3.2 },
  ];

  /* ===== UI ===== */

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Phân tích & Thống kê</h1>
        <p className="text-gray-600">
          Tổng quan hiệu suất và hoạt động phòng khám
        </p>
      </div>

      {/* KPI */}
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard
          title="Tăng trưởng"
          value="+18%"
          note="So tháng trước"
          icon={<TrendingUp className="text-green-600" />}
        />
        <StatCard
          title="Tỷ lệ phát hiện"
          value="22.5%"
          note="Có bất thường"
          icon={<Activity className="text-blue-600" />}
        />
        <StatCard
          title="TB quét / BN"
          value="2.2"
          note="Lần / năm"
          icon={<BarChart3 className="text-purple-600" />}
        />
        <StatCard
          title="Nguy cơ cao"
          value="12"
          note="Cần theo dõi"
          danger
          icon={<AlertTriangle className="text-red-600" />}
        />
      </div>

      {/* CHART ROW 1 */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Xu hướng 6 tháng">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyScans}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="scans"
                stroke="#8b5cf6"
                strokeWidth={2}
                name="Số lần quét"
              />
              <Line
                type="monotone"
                dataKey="patients"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Bệnh nhân"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Phân bố mức độ rủi ro">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistribution}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                }
              >
                {riskDistribution.map((item, i) => (
                  <Cell key={i} fill={item.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* CHART ROW 2 */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Phân loại tình trạng">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conditionBreakdown} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="condition" type="category" width={150} />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Phân bố độ tuổi">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="age" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* DOCTOR TABLE */}
      <Card title="Hiệu suất Bác sĩ">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm text-gray-600">
                  Bác sĩ
                </th>
                <th className="px-4 py-3 text-sm text-gray-600">
                  Số xem xét
                </th>
                <th className="px-4 py-3 text-sm text-gray-600">
                  TG TB (giờ)
                </th>
                <th className="px-4 py-3 text-sm text-gray-600">
                  Hiệu suất
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {doctorPerformance.map((d, i) => {
                const percent = Math.round((d.reviews / 342) * 100);
                return (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{d.name}</td>
                    <td className="px-4 py-3">{d.reviews}</td>
                    <td className="px-4 py-3">{d.avgTime}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 h-2 rounded-full">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">
                          {percent}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ===== SMALL COMPONENTS ===== */

function Card({ title, children }: CardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border">
      <h3 className="text-lg mb-4">{title}</h3>
      {children}
    </div>
  );
}

function StatCard({
  title,
  value,
  note,
  icon,
  danger,
}: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">{title}</span>
        {icon}
      </div>
      <p className={`text-3xl ${danger ? "text-red-600" : ""}`}>
        {value}
      </p>
      <p
        className={`text-sm ${
          danger ? "text-red-600" : "text-gray-600"
        }`}
      >
        {note}
      </p>
    </div>
  );
}
