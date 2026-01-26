import { useState } from "react";
import {
  Package,
  Check,
  Zap,
  TrendingUp,
  Calendar,
  AlertCircle,
} from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: number;
  scans: number;
  features: string[];
  recommended?: boolean;
  current?: boolean;
}

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const currentPlan = {
    name: "Professional",
    scansUsed: 542,
    scansTotal: 800,
    renewDate: "01/01/2025",
  };

  const plans: Plan[] = [
    {
      id: "starter",
      name: "Starter",
      price: 5000000,
      scans: 200,
      features: [
        "200 lượt phân tích / tháng",
        "Tối đa 2 bác sĩ",
        "Báo cáo cơ bản",
        "Hỗ trợ email",
      ],
    },
    {
      id: "pro",
      name: "Professional",
      price: 15000000,
      scans: 800,
      recommended: true,
      current: true,
      features: [
        "800 lượt phân tích / tháng",
        "Tối đa 10 bác sĩ",
        "Báo cáo nâng cao",
        "Tải hàng loạt",
        "API access",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 35000000,
      scans: 2000,
      features: [
        "2000 lượt phân tích / tháng",
        "Không giới hạn bác sĩ",
        "Hỗ trợ 24/7",
        "Tích hợp hệ thống",
      ],
    },
  ];

  const usagePercent =
    (currentPlan.scansUsed / currentPlan.scansTotal) * 100;

  return (
    <div className="space-y-8">
      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-2xl font-semibold">Gói dịch vụ</h1>
        <p className="text-gray-600">
          Theo dõi mức sử dụng và nâng cấp gói phù hợp
        </p>
      </div>

      {/* ===== CURRENT PLAN ===== */}
      <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl p-6">
        <div className="flex justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Package />
              <h2 className="text-xl">{currentPlan.name}</h2>
            </div>
            <p className="opacity-90">Đang hoạt động</p>
          </div>

          <div className="text-right">
            <p className="text-3xl">15.000.000</p>
            <p className="text-sm opacity-80">VNĐ / tháng</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <InfoBox label="Đã sử dụng" value={`${currentPlan.scansUsed} lượt`} />
          <InfoBox
            label="Còn lại"
            value={`${currentPlan.scansTotal - currentPlan.scansUsed} lượt`}
          />
          <InfoBox label="Gia hạn" value={currentPlan.renewDate} />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Mức sử dụng</span>
            <span>{usagePercent.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-white/30 h-3 rounded-full">
            <div
              className="bg-green-400 h-3 rounded-full"
              style={{ width: `${usagePercent}%` }}
            />
          </div>
        </div>

        {usagePercent > 80 && (
          <div className="mt-4 bg-yellow-400/20 border border-yellow-300/30 rounded-lg p-3 flex gap-2">
            <AlertCircle />
            <p className="text-sm">
              Bạn đã sử dụng hơn 80% giới hạn tháng này.
            </p>
          </div>
        )}
      </div>

      {/* ===== AVAILABLE PLANS ===== */}
      <div>
        <h2 className="text-xl mb-4">Các gói dịch vụ</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-xl border p-6 ${
                plan.recommended
                  ? "border-purple-600 shadow-lg"
                  : "border-gray-200"
              }`}
            >
              {plan.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-xs">
                  Khuyến nghị
                </span>
              )}

              {plan.current && (
                <span className="absolute -top-3 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs">
                  Đang dùng
                </span>
              )}

              <h3 className="text-xl mb-2">{plan.name}</h3>

              <div className="flex items-end gap-1 mb-4">
                <span className="text-3xl">
                  {(plan.price / 1_000_000).toFixed(1)}
                </span>
                <span className="text-gray-600">triệu</span>
              </div>

              <div className="flex items-center gap-2 text-purple-600 mb-4">
                <Zap size={18} />
                <span>{plan.scans} lượt / tháng</span>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <Check className="text-green-600 w-4" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                disabled={plan.current}
                onClick={() => setSelectedPlan(plan)}
                className={`w-full py-3 rounded-lg ${
                  plan.current
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : plan.recommended
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "border border-gray-300 hover:border-purple-600"
                }`}
              >
                {plan.current ? "Gói hiện tại" : "Chọn gói"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ===== INFO ===== */}
      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard
          icon={<TrendingUp className="text-white" />}
          title="Nâng cấp linh hoạt"
          desc="Có thể nâng cấp bất kỳ lúc nào theo nhu cầu sử dụng."
          color="bg-blue-600"
        />
        <InfoCard
          icon={<Calendar className="text-white" />}
          title="Không ràng buộc"
          desc="Hủy bất kỳ lúc nào, không phí phát sinh."
          color="bg-green-600"
        />
      </div>
    </div>
  );
}

/* ===== COMPONENTS ===== */

function InfoBox({ label, value }: any) {
  return (
    <div className="bg-white/10 rounded-lg p-4">
      <p className="text-sm opacity-80">{label}</p>
      <p className="text-xl">{value}</p>
    </div>
  );
}

function InfoCard({ icon, title, desc, color }: any) {
  return (
    <div className="bg-white border rounded-xl p-6 flex gap-4">
      <div
        className={`w-10 h-10 ${color} rounded-full flex items-center justify-center`}
      >
        {icon}
      </div>
      <div>
        <h4 className="mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  );
}
