import { useEffect, useState } from "react";
import { Eye, Calendar, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import axios from "axios";

interface AnalysisHistoryProps {
  onSelectAnalysis: (id: string) => void;
  limit?: number;
}

interface RecordItem {
  id: number;
  status: string;
  created_at: string;
  notes: string | null;
}

export function AnalysisHistory({ onSelectAnalysis, limit }: AnalysisHistoryProps) {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ⚠️ TEST CỨNG — bỏ localStorage trước
  const patientId = "2";

  useEffect(() => {
    console.log("History mounted");
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      console.log("Calling history API...");

      setLoading(true);
      setError(null);

      const res = await axios.get(
        "http://127.0.0.1:9999/api/user/history",
        {
          params: { patient_id: patientId },
          timeout: 8000,
        }
      );

      console.log("History response:", res.data);

      let data: RecordItem[] = res.data.records || [];

      if (limit) data = data.slice(0, limit);

      setRecords(data);
    } catch (err: any) {
      console.error("Fetch history failed:", err);

      setError(
        err?.response?.data?.error ||
          err?.message ||
          "Không gọi được API"
      );
    } finally {
      setLoading(false);
    }
  };

  const renderStatus = (status: string) => {
    const map: Record<string, any> = {
      pending: { label: "Đang xử lý", icon: Clock, color: "text-orange-600" },
      ai_done: { label: "AI xong", icon: Clock, color: "text-blue-600" },
      reviewed: {
        label: "Đã có bác sĩ",
        icon: CheckCircle,
        color: "text-green-600",
      },
    };

    const config = map[status] || map.pending;
    const Icon = config.icon;

    return (
      <span className={`flex items-center gap-1 text-sm ${config.color}`}>
        <Icon className="w-4 h-4" />
        {config.label}
      </span>
    );
  };

  // ================= UI STATES =================

  if (loading) {
    return (
      <p className="text-sm text-gray-500">
        Đang tải lịch sử...
      </p>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 flex items-center gap-2">
        <AlertTriangle size={18} />
        {error}
      </div>
    );
  }

  if (!records.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Eye className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>Không có dữ liệu lịch sử</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {records.map((record) => (
        <div
          key={record.id}
          onClick={() => onSelectAnalysis(record.id.toString())}
          className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Record #{record.id}
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">
                    {new Date(record.created_at).toLocaleDateString("vi-VN")}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              {renderStatus(record.status)}
            </div>
          </div>

          {record.notes && (
            <div className="text-sm text-gray-600">
              Ghi chú: {record.notes}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}