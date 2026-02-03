import { api } from "./api";

export interface DoctorCase {
  record_id: number;
  patient_id: number;
  status: string;
  doctor_id: number | null;
}

// ================= LIST CASES =================
export const getDoctorCases = async (): Promise<DoctorCase[]> => {
  const res = await api.get("/doctor/cases");
  return res.data;
};

// ================= CONFIRM =================
export const confirmDiagnosis = async (
  recordId: number,
  doctorId: number,
  result: string
) => {
  const res = await api.post(`/doctor/confirm/${recordId}`, {
    doctor_id: doctorId,
    result,
  });

  return res.data;
};