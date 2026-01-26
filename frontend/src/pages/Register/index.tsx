import React from "react";
import { Link } from "react-router-dom";
import { User, Mail, Phone, Lock } from "lucide-react";

import AuthLayout from "../../components/auth/AuthLayout";
import InputField from "../../components/auth/InputField";

const Register: React.FC = () => {
  return (
    <AuthLayout>
      <div className="bg-sky-100 rounded-xl p-8">
        <h2 className="text-center text-2xl font-bold text-blue-600 mb-8">
          Tạo tài khoản mới
        </h2>

        <div className="space-y-4">
          <InputField
            label="Họ và tên"
            placeholder="Nguyễn Văn A"
            icon={<User size={18} />}
          />

          <InputField
            label="Email"
            placeholder="doctor@aura.com"
            icon={<Mail size={18} />}
          />

          <InputField
            label="Phone"
            placeholder="0123456789"
            icon={<Phone size={18} />}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            icon={<Lock size={18} />}
          />

          <InputField
            label="Xác nhận mật khẩu"
            type="password"
            placeholder="••••••••"
            icon={<Lock size={18} />}
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium mt-4">
            Đăng ký
          </button>

          <p className="text-center text-sm text-slate-500 mt-6">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
