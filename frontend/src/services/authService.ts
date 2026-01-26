import { api } from "./api";

// ================= LOGIN =================
export const login = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/login", data); // ✅ BỎ /auth
  return res.data;
};

// ================= REGISTER =================
export const register = async (data: {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
}) => {
  const res = await api.post("/register", data); // ✅ BỎ /auth
  return res.data;
};
