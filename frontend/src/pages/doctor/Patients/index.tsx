import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import PatientList from "../../../components/doctor/patients/PatientList";
import { Patient } from "../../../types/patient";

import { getDoctorCases } from "../../../services/doctorService";

export default function DoctorPatientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [patients, setPatients] = useState<Patient[]>([]);

  // ================= LOAD FROM BACKEND =================
  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const cases = await getDoctorCases();

      const map = new Map<number, Patient>();

      cases.forEach((c) => {
        if (!map.has(c.patient_id)) {
          map.set(c.patient_id, {
            id: String(c.patient_id),
            name: `Patient #${c.patient_id}`,
            age: 0, // ✅ tránh null
            gender: "Unknown", // ✅ tránh null
            lastScan: new Date().toISOString().slice(0, 10),
            totalScans: 0,
            riskLevel: "low",
            conditions: [],
          });
        }

        const p = map.get(c.patient_id)!;
        p.totalScans += 1;
      });

      setPatients(Array.from(map.values()));
    } catch (err) {
      console.error("Load patients failed", err);
    }
  };

  const handleSelectPatient = (id: string) => {
    navigate(`/doctor/patients/${id}`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">
        Danh sách bệnh nhân
      </h2>

      <div className="relative w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
        <input
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          placeholder="Tìm theo mã bệnh nhân..."
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