import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import InputField from "../../components/auth/InputField";
import { Mail, Lock } from "lucide-react";
import { login } from "../../services/authService";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");
    setAuthError("");

    let hasError = false;

    if (!email) {
      setEmailError("Vui lòng nhập email");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Vui lòng nhập mật khẩu");
      hasError = true;
    }

    if (hasError) return;

    try {
      setLoading(true);

      const res = await login({ email, password });

      // 👉 Lưu token
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      // 👉 Điều hướng theo role
      switch (res.user.role) {
        case "admin":
          navigate("/admin");
          break;
        case "doctor":
          navigate("/doctor");
          break;
        case "clinic":
          navigate("/clinic");
          break;
        default:
          navigate("/user");
      }
    } catch (err: any) {
      setAuthError(
        err?.response?.data?.error || "Email hoặc mật khẩu không đúng"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="bg-sky-100 rounded-xl p-8">
        <h2 className="text-center text-2xl font-bold text-blue-600 mb-8">
          Đăng nhập
        </h2>

        <div className="space-y-4">
          <div>
            <InputField
              label="Email"
              placeholder="Email"
              icon={<Mail size={18} />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <InputField
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={<Lock size={18} />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
          </div>

          {authError && (
            <p className="text-red-600 text-sm text-center">{authError}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          <p className="text-center text-sm text-slate-500 mt-4">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-blue-600 font-medium">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
