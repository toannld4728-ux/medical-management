import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, User, Eye, CheckCircle } from "lucide-react";

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

interface Image {
  id: number;
  url: string;
}

interface Diagnosis {
  id: number;
  result: string;
  created_at: string;
}

const BACKEND_URL = "http://127.0.0.1:9999";

export default function PatientDetail() {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [analyses, setAnalyses] = useState<DoctorCase[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] =
    useState<DoctorCase | null>(null);

  const [diagnosis, setDiagnosis] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState<Image[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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

      setImages(data.images || []);
      setDiagnoses(data.diagnoses || []);

      if (data.notes) {
        setDiagnosis(data.notes);
      } else if (data.diagnoses?.length > 0) {
        setDiagnosis(data.diagnoses[0].result);
      } else {
        setDiagnosis("");
      }

      setConfirmed(status === "reviewed");
    } catch (err) {
      console.error("Load history failed", err);
    }
  };

  // ================= CONFIRM =================
  const handleConfirm = async () => {
    if (!selectedAnalysis) return;

    setError(null);
    setSuccess(null);

    try {
      setLoading(true);

      const userStr = localStorage.getItem("user");

      if (!userStr) {
        setError("Không tìm thấy user trong localStorage");
        return;
      }

      const user = JSON.parse(userStr);

      // 🔥 FIX CUỐI: Ưu tiên doctor_id, fallback id
      const doctorId =
        user.doctor_id ?? user.id;

      if (!doctorId) {
        setError("Không tìm thấy doctor_id");
        return;
      }

      console.log("CONFIRM WITH doctorId =", doctorId);

      await confirmDiagnosis(
        selectedAnalysis.record_id,
        doctorId,
        diagnosis
      );

      setSuccess("Đã xác nhận kết quả!");

      await loadCases();
      await loadHistory(selectedAnalysis.record_id, "reviewed");

      setConfirmed(true);
    } catch (err: any) {
      console.error(err);

      const msg =
        err?.response?.data?.error ||
        "Xác nhận thất bại";

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // ================= FILTER =================
  const filteredAnalyses = patientId
    ? analyses.filter((a) => String(a.patient_id) === patientId)
    : [];

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
                  selectedAnalysis?.record_id === a.record_id
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
            <h3 className="text-lg">
              Record #{selectedAnalysis.record_id}
            </h3>

            {/* Images */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img) => (
                <img
                  key={img.id}
                  src={
                    img.url.startsWith("http")
                      ? img.url
                      : `${BACKEND_URL}/${img.url}`
                  }
                  className="rounded"
                />
              ))}
            </div>

            {/* STATUS */}
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 text-green-700 p-3 rounded">
                {success}
              </div>
            )}

            {/* Doctor confirm */}
            <div className="border-t pt-4 space-y-3">
              <textarea
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                disabled={confirmed}
                rows={4}
                className="w-full border rounded p-3"
                placeholder="AI đã gợi ý kết luận — bác sĩ có thể chỉnh sửa..."
              />

              {!confirmed ? (
                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="bg-green-600 text-white px-5 py-2 rounded disabled:opacity-50"
                >
                  {loading ? "Đang gửi..." : "Xác nhận"}
                </button>
              ) : (
                <div className="text-green-600 flex gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Đã xác nhận
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="md:col-span-2 bg-white border rounded-xl p-12 text-center text-gray-500">
            <Eye className="mx-auto mb-3" />
            Chọn một bản ghi
          </div>
        )}
      </div>
    </div>
  );
}