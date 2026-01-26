import { useState } from "react";
import {
  Users,
  Clock,
  CheckCircle,
  BarChart3,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ===== TYPES (GIỐNG BACKEND) ===== */
type TaskType = "review" | "waiting" | "appointment";

interface Task {
  id: string;
  type: TaskType;
  title: string;
}

interface Activity {
  id: string;
  content: string;
  time: string;
}

/* ===== COLORS ===== */
const COLORS = {
  blue: "#3b82f6",
  green: "#22c55e",
  orange: "#f97316",
  grid: "#e5e7eb",
  text: "#374151",
};

export default function Overview() {
  /* ===== MOCK DATA (SAU NÀY = API) ===== */
  const stats = {
    totalPatients: 48,
    todayCases: 12,
    avgResponse: "2.4h",
  };

  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", type: "review", title: "Phân tích chờ duyệt" },
    { id: "2", type: "waiting", title: "Bệnh nhân chưa phản hồi" },
    { id: "3", type: "appointment", title: "Lịch hẹn hôm nay" },
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "a1",
      content: "Đã duyệt phân tích cho Nguyễn Văn An",
      time: "10 phút trước",
    },
    {
      id: "a2",
      content: "Đã phản hồi bệnh nhân Trần Thị Bình",
      time: "30 phút trước",
    },
  ]);

  const weeklyCases = [
    { day: "T2", value: 8 },
    { day: "T3", value: 12 },
    { day: "T4", value: 10 },
    { day: "T5", value: 15 },
    { day: "T6", value: 14 },
    { day: "T7", value: 9 },
    { day: "CN", value: 5 },
  ];

  /* ===== ACTIONS ===== */
  const completeTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    setActivities((prev) => [
      {
        id: crypto.randomUUID(),
        content: "✔️ Đã xử lý xong một công việc",
        time: "Vừa xong",
      },
      ...prev,
    ]);
  };

  return (
    <div className="space-y-8">
      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-2xl font-semibold mb-1">
          Xin chào, Bác sĩ 👋
        </h1>
        <p className="text-gray-600">
          Đây là tổng quan hoạt động hôm nay của bạn
        </p>
      </div>

      {/* ===== STATS ===== */}
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard
          label="Tổng bệnh nhân"
          value={stats.totalPatients}
          icon={<Users />}
        />
        <StatCard
          label="Chờ xác nhận"
          value={tasks.length}
          icon={<Clock />}
          highlight="warning"
        />
        <StatCard
          label="Ca hôm nay"
          value={stats.todayCases}
          icon={<CheckCircle />}
          highlight="success"
        />
        <StatCard
          label="Phản hồi TB"
          value={stats.avgResponse}
          icon={<BarChart3 />}
        />
      </div>

      {/* ===== TODO + ACTIVITY ===== */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* ===== TASKS ===== */}
        <div className="bg-white border rounded-xl p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="text-orange-500" />
            Việc cần xử lý ({tasks.length})
          </h3>

          {tasks.length === 0 ? (
            <p className="text-sm text-gray-500">
              🎉 Không còn việc nào cần xử lý
            </p>
          ) : (
            <ul className="space-y-3 text-sm">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex justify-between items-center"
                >
                  <span>🔔 {task.title}</span>
                  <button
                    onClick={() => completeTask(task.id)}
                    className="text-xs text-green-600 hover:underline"
                  >
                    Xác nhận
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ===== ACTIVITY ===== */}
        <div className="bg-white border rounded-xl p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <MessageCircle className="text-blue-500" />
            Hoạt động gần đây
          </h3>

          <ul className="space-y-3 text-sm text-gray-600">
            {activities.map((act) => (
              <li key={act.id}>
                {act.content}
                <span className="block text-xs text-gray-400">
                  {act.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ===== MINI CHART ===== */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="font-semibold mb-4">
          Số ca xử lý trong tuần
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyCases}>
            <CartesianGrid stroke={COLORS.grid} strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fill: COLORS.text }} />
            <YAxis tick={{ fill: COLORS.text }} />
            <Tooltip />
            <Bar
              dataKey="value"
              fill={COLORS.blue}
              radius={[6, 6, 0, 0]}
              name="Số ca"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ===== STAT CARD ===== */
function StatCard({
  label,
  value,
  icon,
  highlight,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  highlight?: "success" | "warning";
}) {
  const highlightColor =
    highlight === "success"
      ? "text-green-600"
      : highlight === "warning"
      ? "text-orange-600"
      : "text-gray-700";

  return (
    <div className="bg-white border rounded-xl p-6">
      <div className="flex justify-between items-center mb-2 text-gray-600">
        <span className="text-sm">{label}</span>
        <span className={highlightColor}>{icon}</span>
      </div>
      <p className="text-3xl font-semibold text-gray-800">
        {value}
      </p>
    </div>
  );
}
