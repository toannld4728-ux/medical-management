import { api } from "./api";

// ================= UPLOAD RETINA =================
export const uploadMedicalImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/user/retina/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// ================= HISTORY =================
export const getUserHistory = async (recordId: number) => {
  const res = await api.get(`/user/history/${recordId}`);
  return res.data;
};