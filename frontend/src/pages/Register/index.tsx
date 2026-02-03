import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock } from "lucide-react";

import AuthLayout from "../../components/auth/AuthLayout";
import InputField from "../../components/auth/InputField";

import { register } from "../../services/authService";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    if (form.password !== form.confirm_password) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      setLoading(true);

      await register(form);

      //  SHOW SUCCESS UI
      setSuccess(" Đăng ký thành công! Đang chuyển sang đăng nhập...");

      //  REDIRECT SAU 2 GIÂY
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      console.error(err);

      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Đăng ký thất bại";

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit}
        className="bg-sky-100 rounded-xl p-8"
      >
        <h2 className="text-center text-2xl font-bold text-blue-600 mb-8">
          Tạo tài khoản mới
        </h2>

        {/* ERROR */}
        {error && (
          <div className="bg-red-200 text-red-700 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/*  SUCCESS */}
        {success && (
          <div className="bg-green-200 text-green-800 p-3 rounded mb-4 text-sm">
            {success}
          </div>
        )}

        <div className="space-y-4">
          <InputField
            label="Họ và tên"
            placeholder="Nguyễn Văn A"
            icon={<User size={18} />}
            value={form.full_name}
            onChange={(e) =>
              handleChange("full_name", e.target.value)
            }
          />

          <InputField
            label="Email"
            placeholder="doctor@aura.com"
            icon={<Mail size={18} />}
            value={form.email}
            onChange={(e) =>
              handleChange("email", e.target.value)
            }
          />

          <InputField
            label="Phone"
            placeholder="0123456789"
            icon={<Phone size={18} />}
            value={form.phone}
            onChange={(e) =>
              handleChange("phone", e.target.value)
            }
          />

          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            icon={<Lock size={18} />}
            value={form.password}
            onChange={(e) =>
              handleChange("password", e.target.value)
            }
          />

          <InputField
            label="Xác nhận mật khẩu"
            type="password"
            placeholder="••••••••"
            icon={<Lock size={18} />}
            value={form.confirm_password}
            onChange={(e) =>
              handleChange(
                "confirm_password",
                e.target.value
              )
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium mt-4 disabled:opacity-50"
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>

          <p className="text-center text-sm text-slate-500 mt-6">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;