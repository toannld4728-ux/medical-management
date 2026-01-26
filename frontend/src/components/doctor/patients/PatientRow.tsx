import { User } from "lucide-react";
import { Patient } from "../../../types/patient";
import PatientRiskBadge from "./PatientRiskBadge";

interface Props {
  patient: Patient;
  onSelect: (id: string) => void;
}

export default function PatientRow({ patient, onSelect }: Props) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="font-medium">{patient.name}</p>
            <p className="text-xs text-gray-500">{patient.id}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        {patient.age} tuổi • {patient.gender}
      </td>

      <td className="px-6 py-4">
        {new Date(patient.lastScan).toLocaleDateString("vi-VN")}
      </td>

      <td className="px-6 py-4 font-medium">{patient.totalScans}</td>

      <td className="px-6 py-4">
        <PatientRiskBadge level={patient.riskLevel} />
      </td>

      <td className="px-6 py-4">
        <button
          onClick={() => onSelect(patient.id)}
          className="text-green-600 hover:underline"
        >
          Xem chi tiết →
        </button>
      </td>
    </tr>
  );
}
