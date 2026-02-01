import axios from "axios";

const API_BASE = "http://127.0.0.1:9999/api";

export const getUserHistory = async (recordId: number) => {
  const res = await axios.get(
    `${API_BASE}/user/history/${recordId}`
  );

  return res.data;
};

export const uploadMedicalImage = async (formData: FormData) => {
  const res = await axios.post(
    `${API_BASE}/user/upload-medical-image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};
