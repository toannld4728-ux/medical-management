import React from "react";
import { Link } from "react-router-dom";
import fileImg from "../../assets/eye.png";

import {
  Brain,
  Activity,
  Search,
  Zap,
  LineChart,
  Stethoscope,
} from "lucide-react";

interface Stat {
  value: string;
  label: string;
}

interface Feature {
  title: string;
  desc: string;
  color: string;
  icon: React.ElementType;
}

interface ProcessStep {
  id: number;
  title: string;
  desc: string;
}

const stats: Stat[] = [
  { value: "99%", label: "Độ chính xác" },
  { value: "<30s", label: "Thời gian phân tích" },
  { value: "10k+", label: "Phân tích thành công" },
];

const features: Feature[] = [
  {
    title: "AI phân tích thông minh",
    desc: "Công nghệ AI tiên tiến giúp phát hiện sớm các dấu hiệu bệnh lý.",
    icon: Brain,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Không xâm lấn",
    desc: "Quy trình đơn giản, không gây đau đớn cho bệnh nhân.",
    icon: Activity,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Phát hiện sớm",
    desc: "Phát hiện nguy cơ tim mạch, tiểu đường, đột quỵ.",
    icon: Search,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Nhanh chóng",
    desc: "Kết quả phân tích chỉ trong vài chục giây.",
    icon: Zap,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Theo dõi liên tục",
    desc: "Lưu trữ và theo dõi kết quả theo thời gian.",
    icon: LineChart,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Hỗ trợ chuyên nghiệp",
    desc: "Được hỗ trợ bởi đội ngũ chuyên gia y khoa.",
    icon: Stethoscope,
    color: "bg-blue-100 text-blue-600",
  },
];

const processes: ProcessStep[] = [
  {
    id: 1,
    title: "Tải ảnh lên",
    desc: "Upload hình ảnh võng mạc lên hệ thống một cách dễ dàng",
  },
  {
    id: 2,
    title: "AI phân tích",
    desc: "AI xử lý và phân tích mạch máu, phát hiện các dấu hiệu bất thường",
  },
  {
    id: 3,
    title: "Nhận kết quả",
    desc: "Xem báo cáo chi tiết và được bác sĩ tư vấn nếu cần thiết",
  },
];

const Home: React.FC = () => {
  return (
    <>
      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-bold text-blue-600 text-lg">AURA</div>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Đăng nhập
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-sky-50">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              Hệ thống sàng lọc sức khoẻ <br />
              mạch máu võng mạc
            </h1>

            <p className="mt-4 text-slate-600 max-w-xl">
              Phát hiện nguy cơ tim mạch, tiểu đường và đột quỵ thông qua phân tích
              hình ảnh võng mạc bằng AI
            </p>

            <Link
              to="/register"
              className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
            >
              Khám phá ngay →
            </Link>

            <div className="mt-8 flex gap-8">
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="text-blue-600 font-bold">{s.value}</div>
                  <div className="text-sm text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <img
            src={fileImg}
            alt="Retinal analysis"
            className="w-full h-72 object-cover rounded-2xl shadow"
          />
        </div>
      </section>

      {/* WHY AURA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Tại sao chọn AURA?
          </h2>
          <p className="text-slate-500 mt-2">
            Công nghệ AI tiên tiến kết hợp với chuyên môn y khoa
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-semibold text-slate-900 mb-1">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-600">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-sky-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Quy trình đơn giản
            </h2>
            <p className="text-slate-600 text-lg">
              Chỉ 3 bước để có kết quả phân tích chi tiết
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {processes.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white text-2xl font-bold flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                  {item.id}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 max-w-xs">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEW SECTION: Footer --- */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-2xl">
              <div className="p-2 bg-blue-600 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path
                    fillRule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                AURA
                <span className="block text-sm font-normal text-slate-400">
                  AI Retinal Analysis
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mt-4">
              Hệ thống sàng lọc sức khỏe mạch máu võng mạc bằng AI, giúp phát
              hiện sớm nguy cơ tim mạch.
            </p>
          </div>

          {/* Col 2 Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Về AURA</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">Giới thiệu</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Công nghệ</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Đội ngũ</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Liên hệ</a></li>
            </ul>
          </div>

          {/* Col 3 Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Hỗ trợ</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">Hướng dẫn</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Điều khoản sử dụng</a></li>
            </ul>
          </div>

          {/* Col 4 Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Mạng xã hội</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition flex items-center gap-2">Facebook</a></li>
              <li><a href="#" className="hover:text-blue-400 transition flex items-center gap-2">LinkedIn</a></li>
              <li><a href="#" className="hover:text-blue-400 transition flex items-center gap-2">Twitter</a></li>
              <li><a href="#" className="hover:text-blue-400 transition flex items-center gap-2">Instagram</a></li>
            </ul>
          </div>
        </div>
        
        
      </footer>
    </>
  );
};

export default Home;
