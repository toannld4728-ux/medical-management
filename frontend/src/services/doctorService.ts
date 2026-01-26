import axios from "axios";

const API_BASE = "http://127.0.0.1:9999/api";

export interface DoctorCase {
  record_id: number;
  patient_id: number;
  status: string;
  doctor_id: number | null;
}

// ================= LIST CASES =================
export const getDoctorCases = async (): Promise<DoctorCase[]> => {
  const res = await axios.get(`${API_BASE}/doctor/cases`);
  return res.data;
};

// ================= CONFIRM =================
export const confirmDiagnosis = async (
  recordId: number,
  doctorId: number,
  result: string
) => {
  const res = await axios.post(
    `${API_BASE}/doctor/confirm/${recordId}`,
    {
      doctor_id: doctorId,
      result,
    }
  );

  return res.data;
};
