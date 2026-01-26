import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import PatientList from "../../../components/doctor/patients/PatientList";
import { Patient } from "../../../types/patient";


export default function DoctorPatientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // ✅ thêm

  const patients: Patient[] = [
    {
      id: "PT-001",
      name: "Nguyễn Văn An",
      age: 45,
      gender: "Nam",
      lastScan: "2024-12-15",
      totalScans: 12,
      riskLevel: "low",
      conditions: [],
    },
    {
      id: "PT-002",
      name: "Trần Thị Bình",
      age: 52,
      gender: "Nữ",
      lastScan: "2024-12-18",
      totalScans: 8,
      riskLevel: "medium",
      conditions: ["Tiểu đường type 2"],
    },
  ];

  const handleSelectPatient = (id: string) => {
    navigate(`/doctor/patients/${id}`); // ✅ ĐÂY LÀ CHÌA KHÓA
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Danh sách bệnh nhân</h2>

      <div className="relative w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm theo tên hoặc mã..."
          className="pl-9 pr-4 py-2 border rounded-lg w-full"
        />
      </div>

      <PatientList
        patients={patients}
        searchTerm={searchTerm}
        onSelectPatient={handleSelectPatient}
      />
    </div>
  );
}
