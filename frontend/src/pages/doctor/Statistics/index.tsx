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
import { TrendingUp, Users, CheckCircle, Clock } from "lucide-react";

/* ===== COLORS (DỄ ĐỔI – CHUẨN Y TẾ) ===== */
const COLORS = {
  blue: "#3b82f6",
  green: "#22c55e",
  orange: "#f97316",
  red: "#ef4444",
  grid: "#e5e7eb",
  text: "#374151",
};

/* ===== TYPES ===== */
type WeeklyReview = {
  day: string;
  reviews: number;
  avgTime: number;
};

type RiskItem = {
  name: string;
  value: number;
  color: string;
};

export default function DoctorStatisticsPage() {
  /* ===== MOCK DATA (SAU NÀY = API RESPONSE) ===== */
  const weeklyReviews: WeeklyReview[] = [
    { day: "T2", reviews: 8, avgTime: 2.1 },
    { day: "T3", reviews: 12, avgTime: 1.8 },
    { day: "T4", reviews: 10, avgTime: 2.3 },
    { day: "T5", reviews: 15, avgTime: 2.0 },
    { day: "T6", reviews: 14, avgTime: 1.9 },
    { day: "T7", reviews: 9, avgTime: 2.5 },
    { day: "CN", reviews: 5, avgTime: 3.2 },
  ];

  const riskDistribution: RiskItem[] = [
    { name: "Rủi ro thấp", value: 65, color: COLORS.green },
    { name: "Rủi ro trung bình", value: 28, color: COLORS.orange },
    { name: "Rủi ro cao", value: 7, color: COLORS.red },
  ];

  return (
    <div className="space-y-6">
      {/* ===== SUMMARY ===== */}
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard title="Tổng ca đã xem" value={342} icon={<CheckCircle />} />
        <StatCard title="Thời gian TB (giờ)" value={2.4} icon={<Clock />} />
        <StatCard title="Bệnh nhân mới" value={8} icon={<Users />} />
        <StatCard title="Độ chính xác AI" value="94.2%" icon={<TrendingUp />} />
      </div>

      {/* ===== CHART ROW ===== */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* ===== BAR CHART ===== */}
        <div className="bg-white p-6 rounded-xl border">
          <h3 className="text-lg mb-4">Số ca xem xét theo tuần</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyReviews}>
              <CartesianGrid stroke={COLORS.grid} strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fill: COLORS.text }} />
              <YAxis tick={{ fill: COLORS.text }} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="reviews"
                name="Số ca"
                fill={COLORS.blue}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ===== PIE CHART ===== */}
        <div className="bg-white p-6 rounded-xl border">
          <h3 className="text-lg mb-4">Phân bố mức độ rủi ro</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
                label={({ name, percent }) =>
                  name && percent !== undefined
                    ? `${name}: ${(percent * 100).toFixed(0)}%`
                    : ""
                }
              >
                {riskDistribution.map((item, index) => (
                  <Cell key={index} fill={item.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== LINE CHART ===== */}
      <div className="bg-white p-6 rounded-xl border">
        <h3 className="text-lg mb-4">
          Thời gian phản hồi trung bình (giờ)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyReviews}>
            <CartesianGrid stroke={COLORS.grid} strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fill: COLORS.text }} />
            <YAxis tick={{ fill: COLORS.text }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="avgTime"
              name="Thời gian TB"
              stroke={COLORS.green}
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ===== CARD ===== */
function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white p-6 rounded-xl border">
      <div className="flex justify-between items-center mb-2 text-gray-600">
        <span className="text-sm">{title}</span>
        {icon}
      </div>
      <p className="text-3xl text-gray-800 font-semibold">{value}</p>
    </div>
  );
}
