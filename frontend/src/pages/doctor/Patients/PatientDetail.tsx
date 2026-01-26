import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  User,
  Eye,
  CheckCircle,
} from "lucide-react";

import {
  getDoctorCases,
  confirmDiagnosis,
} from "../../../services/doctorService";

import { getUserHistory } from "../../../services/userService";

interface DoctorCase {
  record_id: number;
  patient_id: number;
  status: string;
  doctor_id: number | null;
}

export default function PatientDetail() {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [analyses, setAnalyses] = useState<DoctorCase[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] =
    useState<DoctorCase | null>(null);

  const [diagnosis, setDiagnosis] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= LOAD CASES =================
  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    try {
      const data = await getDoctorCases();
      setAnalyses(data);
    } catch (err) {
      console.error("Load cases failed", err);
    }
  };

  // ================= LOAD HISTORY =================
  const loadHistory = async (recordId: number, status: string) => {
    try {
      const data = await getUserHistory(recordId);

      setDiagnosis(data.notes || "");
      setConfirmed(status === "reviewed");
    } catch (err) {
      console.error("Load history failed", err);
    }
  };

  // ================= CONFIRM =================
  const handleConfirm = async () => {
    if (!selectedAnalysis) return;

    try {
      setLoading(true);

      // TODO: lấy doctor_id từ auth context
      const DOCTOR_ID = selectedAnalysis.doctor_id || 1;

      await confirmDiagnosis(
        selectedAnalysis.record_id,
        DOCTOR_ID,
        diagnosis
      );

      alert("Đã xác nhận kết quả!");

      await loadCases();
      setConfirmed(true);
    } catch (err) {
      console.error(err);
      alert("Xác nhận thất bại");
    } finally {
      setLoading(false);
    }
  };

  // ================= FILTER BY PATIENT =================
  const filteredAnalyses = patientId
    ? analyses.filter(
        (a) => String(a.patient_id) === patientId
      )
    : analyses;

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        onClick={() => navigate("/doctor/patients")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Quay lại danh sách
      </button>

      {/* Patient Info */}
      <div className="bg-white border rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">
              Patient #{patientId}
            </h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Analysis list */}
        <div className="bg-white border rounded-xl p-6">
          <h3 className="text-lg mb-4">
            Lịch sử phân tích ({filteredAnalyses.length})
          </h3>

          <div className="space-y-3">
            {filteredAnalyses.map((a) => (
              <button
                key={a.record_id}
                onClick={() => {
                  setSelectedAnalysis(a);
                  loadHistory(a.record_id, a.status);
                }}
                className={`w-full text-left p-4 rounded-lg border ${
                  selectedAnalysis?.record_id ===
                  a.record_id
                    ? "border-green-600 bg-green-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between">
                  <span className="text-sm">
                    Record #{a.record_id}
                  </span>
                  {a.status === "reviewed" && (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}
                </div>

                <div className="text-xs text-gray-500 mt-1">
                  Status: {a.status}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail */}
        {selectedAnalysis ? (
          <div className="md:col-span-2 bg-white border rounded-xl p-6 space-y-6">
            <div>
              <h3 className="text-lg mb-1">
                Record #{selectedAnalysis.record_id}
              </h3>
            </div>

            {/* Placeholder AI */}
            <div className="p-6 border rounded-lg text-center text-gray-500">
              (Hiển thị ảnh võng mạc + AI chart sau)
            </div>

            {/* Doctor confirm */}
            <div className="border-t pt-6 space-y-4">
              <h4 className="text-lg font-semibold">
                Xác nhận của bác sĩ
              </h4>

              <textarea
                value={diagnosis}
                onChange={(e) =>
                  setDiagnosis(e.target.value)
                }
                rows={4}
                disabled={confirmed}
                className="w-full border rounded-lg p-3"
                placeholder="Nhập chẩn đoán..."
              />

              {!confirmed ? (
                <button
                  disabled={loading}
                  onClick={handleConfirm}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading
                    ? "Đang gửi..."
                    : "Xác nhận kết quả"}
                </button>
              ) : (
                <div className="flex items-center gap-2 text-green-600 font-medium">
                  <CheckCircle className="w-5 h-5" />
                  Đã được bác sĩ xác nhận
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="md:col-span-2 bg-white border rounded-xl p-12 flex justify-center items-center text-gray-500">
            <div className="text-center">
              <Eye className="w-14 h-14 mx-auto mb-3 opacity-50" />
              <p>Chọn một bản ghi để xem chi tiết</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
