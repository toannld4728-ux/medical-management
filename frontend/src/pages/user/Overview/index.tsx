import {
  Upload,
  FileText,
  Activity,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnalysisHistory } from "../../../components/user/AnalysisHistory";


const Overview = () => {
  const navigate = useNavigate();

  // Mock stats (sau này lấy từ backend)
  const stats = {
    totalScans: 12,
    pendingResults: 1,
    completedScans: 11,
    riskLevel: "low",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold mb-2">Tổng quan</h1>
        <p className="text-gray-600">
          Tổng quan về tình trạng sức khỏe võng mạc của bạn
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Tổng số lần quét</span>
            <Activity className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl">{stats.totalScans}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Chờ kết quả</span>
            <Clock className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl">{stats.pendingResults}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Đã hoàn thành</span>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl">{stats.completedScans}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Mức độ rủi ro</span>
            <AlertCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-xl text-green-600">Thấp</p>
        </div>
      </div>

      {/* Recent Analysis */}
<AnalysisHistory
  limit={5}
  onSelectAnalysis={(id) => navigate("/user/history")}
/>


      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <button
          onClick={() => navigate("/user/upload")}
          className="bg-blue-600 text-white p-6 rounded-xl hover:bg-blue-700 transition text-left"
        >
          <Upload className="w-8 h-8 mb-3" />
          <h3 className="text-xl mb-2">Tải ảnh mới</h3>
          <p className="opacity-90">
            Tải lên hình ảnh võng mạc để phân tích
          </p>
        </button>

        <button
          onClick={() => navigate("/user/history")}
          className="bg-white border p-6 rounded-xl hover:bg-gray-50 transition text-left"
        >
          <FileText className="w-8 h-8 mb-3 text-blue-600" />
          <h3 className="text-xl mb-2">Xem lịch sử</h3>
          <p className="text-gray-600">
            Truy cập tất cả các phân tích trước đó
          </p>
        </button>
      </div>
    </div>
  );
};

export default Overview;
