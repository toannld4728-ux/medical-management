import React, { useState } from "react";
import {
  Brain,
  RefreshCw,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

/* ================= TYPES ================= */
type ModelStatus = "active" | "testing" | "deprecated";

type AIModel = {
  version: string;
  status: ModelStatus;
  accuracy: number;
  deployedDate: string;
  performance: string;
  description: string;
};

type Thresholds = {
  lowRisk: number;
  mediumRisk: number;
  highRisk: number;
};

/* ================= COMPONENT ================= */
export default function AIConfiguration() {
  const [selectedModel, setSelectedModel] = useState("v2.3.1");

  const [thresholds, setThresholds] = useState<Thresholds>({
    lowRisk: 30,
    mediumRisk: 60,
    highRisk: 80,
  });

  /* ================= MOCK DATA ================= */
  const models: AIModel[] = [
    {
      version: "v2.3.1",
      status: "active",
      accuracy: 94.2,
      deployedDate: "2024-12-01",
      performance: "Excellent",
      description: "Latest stable model with improved vascular detection",
    },
    {
      version: "v2.3.0",
      status: "deprecated",
      accuracy: 93.5,
      deployedDate: "2024-11-01",
      performance: "Good",
      description: "Previous stable version",
    },
    {
      version: "v2.4.0-beta",
      status: "testing",
      accuracy: 95.1,
      deployedDate: "2024-12-15",
      performance: "Testing",
      description: "Beta version with enhanced diabetic retinopathy detection",
    },
  ];

  const activeModel = models.find((m) => m.version === selectedModel);

  /* ================= HANDLERS ================= */
  const handleDeployModel = (version: string) => {
    setSelectedModel(version);
    alert(`Deploy model ${version} thành công (mock)`);
  };

  const handleRetrainModel = () => {
    alert("Bắt đầu retrain model với dataset mới nhất (mock)");
  };

  const handleSaveThresholds = () => {
    alert("Lưu cấu hình ngưỡng rủi ro thành công (mock)");
  };

  /* ================= RENDER ================= */
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Cấu hình AI</h2>
        <p className="text-gray-600">
          Quản lý model AI và tham số phân tích rủi ro
        </p>
      </div>

      {/* ACTIVE MODEL */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-xl">
        <div className="flex justify-between">
          <div>
            <h3 className="text-xl mb-2">
              Active Model: AURA {selectedModel}
            </h3>
            <p className="opacity-90 mb-4">
              Production model – Accuracy {activeModel?.accuracy}%
            </p>
            <div className="flex gap-6 text-sm">
              <div>
                <span className="opacity-75">Deployed:</span>{" "}
                {activeModel?.deployedDate}
              </div>
              <div>
                <span className="opacity-75">Performance:</span>{" "}
                {activeModel?.performance}
              </div>
            </div>
          </div>
          <Brain className="w-16 h-16 opacity-70" />
        </div>
      </div>

      {/* MODEL LIST */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-lg font-medium mb-4">Model Versions</h3>

        <div className="space-y-4">
          {models.map((model) => (
            <div
              key={model.version}
              className="border rounded-lg p-4 flex justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg">AURA {model.version}</h4>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      model.status === "active"
                        ? "bg-green-100 text-green-700"
                        : model.status === "testing"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {model.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  {model.description}
                </p>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Accuracy</span>
                    <p className="text-lg">{model.accuracy}%</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Performance</span>
                    <p className="text-lg">{model.performance}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Deployed</span>
                    <p>
                      {new Date(model.deployedDate).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                {model.status === "active" ? (
                  <span className="flex items-center gap-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">
                    <CheckCircle size={16} /> In Use
                  </span>
                ) : (
                  <button
                    onClick={() => handleDeployModel(model.version)}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm"
                  >
                    Deploy
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RISK THRESHOLDS */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-lg font-medium mb-4">
          Risk Assessment Thresholds
        </h3>

        <div className="space-y-4">
          {(
            [
              ["lowRisk", "Low Risk", "green"],
              ["mediumRisk", "Medium Risk", "orange"],
              ["highRisk", "High Risk", "red"],
            ] as const
          ).map(([key, label, color]) => (
            <div key={key}>
              <div className="flex justify-between mb-1">
                <label className="text-sm">{label}</label>
                <span className={`text-sm text-${color}-600`}>
                  {thresholds[key]}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={thresholds[key]}
                onChange={(e) =>
                  setThresholds({
                    ...thresholds,
                    [key]: Number(e.target.value),
                  })
                }
                className="w-full"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSaveThresholds}
          className="w-full mt-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          Lưu thay đổi
        </button>
      </div>

      {/* TRAINING & PERFORMANCE */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border p-6">
          <h3 className="text-lg font-medium mb-4">Model Training</h3>

          <div className="space-y-3 mb-4 text-sm">
            <div className="flex justify-between border-b py-2">
              <span className="text-gray-600">Dataset Size</span>
              <span>24,582 images</span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span className="text-gray-600">Last Training</span>
              <span>15 ngày trước</span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span className="text-gray-600">Duration</span>
              <span>48 giờ</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Next Scheduled</span>
              <span>01/01/2025</span>
            </div>
          </div>

          <button
            onClick={handleRetrainModel}
            className="w-full flex items-center justify-center gap-2 py-2 border rounded-lg hover:bg-gray-50"
          >
            <RefreshCw size={16} />
            Retrain Model
          </button>
        </div>

        <div className="bg-white rounded-xl border p-6">
          <h3 className="text-lg font-medium mb-4">Performance Metrics</h3>

          {[
            ["Accuracy", 94.2, "bg-green-600"],
            ["Precision", 92.8, "bg-blue-600"],
            ["Recall", 95.6, "bg-purple-600"],
            ["F1 Score", 94.1, "bg-orange-600"],
          ].map(([label, value, color]) => (
            <div key={label} className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">{label}</span>
                <span>{value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${color} h-2 rounded-full`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WARNING */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertCircle className="text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-900 mb-1">
              Lưu ý khi thay đổi cấu hình AI
            </h4>
            <p className="text-sm text-yellow-800">
              Thay đổi model hoặc threshold có thể ảnh hưởng trực tiếp đến kết
              quả phân tích. Hãy kiểm tra kỹ trước khi deploy production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
