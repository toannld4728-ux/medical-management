import { User } from "lucide-react";
import { Patient, RiskLevel } from "../../../types/patient";

interface Props {
  patients: Patient[];
  searchTerm: string;
  onSelectPatient: (id: string) => void;
}

export default function PatientList({
  patients,
  searchTerm,
  onSelectPatient,
}: Props) {
  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const riskStyle: Record<RiskLevel, string> = {
    low: "bg-green-100 text-green-700",
    medium: "bg-orange-100 text-orange-700",
    high: "bg-red-100 text-red-700",
  };

  const riskLabel: Record<RiskLevel, string> = {
    low: "Thấp",
    medium: "Trung bình",
    high: "Cao",
  };

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left">Bệnh nhân</th>
            <th className="px-6 py-3 text-left">Tuổi / Giới</th>
            <th className="px-6 py-3 text-left">Quét gần nhất</th>
            <th className="px-6 py-3 text-left">Số lần</th>
            <th className="px-6 py-3 text-left">Rủi ro</th>
            <th className="px-6 py-3 text-left">Tình trạng</th>
            <th className="px-6 py-3 text-left">Thao tác</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {filteredPatients.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50 align-middle">
              {/* Bệnh nhân */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.id}</p>
                  </div>
                </div>
              </td>

              {/* Tuổi / Giới */}
              <td className="px-6 py-4">
                <p>{p.age} tuổi</p>
                <p className="text-xs text-gray-500">{p.gender}</p>
              </td>

              {/* Quét gần nhất */}
              <td className="px-6 py-4">
                {new Date(p.lastScan).toLocaleDateString("vi-VN")}
              </td>

              {/* Số lần */}
              <td className="px-6 py-4 font-medium">
                {p.totalScans}
              </td>

              {/* Rủi ro */}
              <td className="px-6 py-4">
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${riskStyle[p.riskLevel]}`}
                >
                  {riskLabel[p.riskLevel]}
                </span>
              </td>

              {/* Tình trạng */}
              <td className="px-6 py-4">
                {p.conditions.length ? p.conditions.join(", ") : "Không có"}
              </td>

              {/* Thao tác */}
              <td className="px-6 py-4">
                <button
                  onClick={() => onSelectPatient(p.id)}
                  className="text-green-600 hover:underline"
                >
                  Xem chi tiết →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredPatients.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          Không tìm thấy bệnh nhân
        </div>
      )}
    </div>
  );
}
