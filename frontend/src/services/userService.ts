import axios from "axios";

const API_BASE = "http://127.0.0.1:9999/api";

export const getUserHistory = async (recordId: number) => {
  const res = await axios.get(
    `${API_BASE}/user/history/${recordId}`
  );

  return res.data;
};
