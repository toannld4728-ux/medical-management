import React, { useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  Filter,
  TrendingUp,
  Users,
  Activity,
  AlertTriangle,
} from "lucide-react";

const ClinicReports: React.FC = () => {
  const [reportType, setReportType] = useState<
    "monthly" | "screening" | "risk"
  >("monthly");

  const [dateRange, setDateRange] = useState({
    from: "2024-12-01",
    to: "2024-12-19",
  });

  const reports = [
    {
      id: "RPT-2024-12",
      title: "Báo cáo tháng 12/2024",
      type: "monthly",
      date: "2024-12-01",
      summary: {
        totalScans: 542,
        patients: 248,
        averageRisk: "Thấp",
        findings: "Không có ca nguy hiểm",
      },
    },
    {
      id: "RPT-2024-11",
      title: "Báo cáo tháng 11/2024",
      type: "monthly",
      date: "2024-11-01",
      summary: {
        totalScans: 498,
        patients: 235,
        averageRisk: "Thấp",
        findings: "2 ca cần theo dõi",
      },
    },
  ];

  const handleGenerateReport = () => {
    alert("Đang tạo báo cáo... Báo cáo sẽ được gửi qua email.");
  };

  const handleExportPDF = () => {
    alert("Đang xuất PDF...");
  };

  const handleExportExcel = () => {
    alert("Đang xuất Excel...");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold mb-1">Báo cáo Phòng khám</h2>
        <p className="text-gray-600">
          Tạo, theo dõi và xuất các báo cáo tổng hợp
        </p>
      </div>

      {/* Generator */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-lg font-medium mb-4">Tạo báo cáo mới</h3>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm mb-2">Loại báo cáo</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="monthly">Báo cáo tháng</option>
              <option value="screening">Chiến dịch sàng lọc</option>
              <option value="risk">Phân tích rủi ro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">Khoảng thời gian</label>
            <div className="flex gap-2">
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) =>
                  setDateRange({ ...dateRange, from: e.target.value })
                }
                className="flex-1 px-4 py-2 border rounded-lg"
              />
              <span className="flex items-center">→</span>
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) =>
                  setDateRange({ ...dateRange, to: e.target.value })
                }
                className="flex-1 px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerateReport}
          className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
        >
          <FileText className="w-5 h-5" />
          Tạo báo cáo
        </button>
      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-4 gap-4">
        <SummaryCard
          title="Tổng số quét"
          value="542"
          sub="Tháng này"
          icon={<Activity className="w-5 h-5 text-blue-600" />}
        />
        <SummaryCard
          title="Bệnh nhân"
          value="248"
          sub="Tổng số"
          icon={<Users className="w-5 h-5 text-purple-600" />}
        />
        <SummaryCard
          title="Rủi ro TB"
          value="Thấp"
          sub="12% điểm số TB"
          valueClass="text-green-600"
          icon={<TrendingUp className="w-5 h-5 text-green-600" />}
        />
        <SummaryCard
          title="Cần chú ý"
          value="8"
          sub="Ca nguy cơ cao"
          valueClass="text-orange-600"
          icon={<AlertTriangle className="w-5 h-5 text-orange-600" />}
        />
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Báo cáo đã tạo</h3>
          <button className="p-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {reports.map((report) => (
            <div key={report.id} className="border rounded-lg p-4">
              <div className="flex justify-between mb-3">
                <div>
                  <h4 className="font-medium">{report.title}</h4>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(report.date).toLocaleDateString("vi-VN")}
                  </p>
                </div>

                <button
                  onClick={handleExportPDF}
                  className="p-2 border rounded-lg hover:bg-gray-50"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4 text-sm border-t pt-3">
                <div>
                  <span className="text-gray-600">Số lần quét</span>
                  <p className="text-lg">{report.summary.totalScans}</p>
                </div>
                <div>
                  <span className="text-gray-600">Bệnh nhân</span>
                  <p className="text-lg">{report.summary.patients}</p>
                </div>
                <div>
                  <span className="text-gray-600">Rủi ro TB</span>
                  <p className="text-green-600">
                    {report.summary.averageRisk}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Kết quả</span>
                  <p>{report.summary.findings}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-lg mb-4">Xuất dữ liệu</h3>
        <div className="grid md:grid-cols-3 gap-3">
          <ExportButton label="Xuất PDF" onClick={handleExportPDF} />
          <ExportButton label="Xuất Excel" onClick={handleExportExcel} />
          <ExportButton label="Xuất CSV" onClick={() => alert("Xuất CSV")} />
        </div>
      </div>
    </div>
  );
};

/* ================= COMPONENT PHỤ ================= */

const SummaryCard = ({
  title,
  value,
  sub,
  icon,
  valueClass = "",
}: any) => (
  <div className="bg-white p-6 rounded-xl border">
    <div className="flex justify-between mb-2">
      <span className="text-sm text-gray-600">{title}</span>
      {icon}
    </div>
    <p className={`text-2xl ${valueClass}`}>{value}</p>
    <p className="text-sm text-gray-500">{sub}</p>
  </div>
);

const ExportButton = ({ label, onClick }: any) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center gap-2 py-3 border rounded-lg hover:bg-gray-50"
  >
    <Download className="w-5 h-5" />
    {label}
  </button>
);

export default ClinicReports;
