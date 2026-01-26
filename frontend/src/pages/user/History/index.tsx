import { useState } from "react";
import { AnalysisHistory } from "../../../components/user/AnalysisHistory";
import AnalysisDetail from "../../../components/user/AnalysisDetail";

const HistoryPage = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold mb-2">Lịch sử phân tích</h1>
        <p className="text-gray-600">
          Danh sách tất cả các lần phân tích võng mạc của bạn
        </p>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-2">
          <AnalysisHistory onSelectAnalysis={setSelectedId} />
        </div>

        {/* Detail */}
        <div className="bg-white border rounded-xl p-4">
          {selectedId ? (
            <AnalysisDetail analysisId={selectedId} />
          ) : (
            <p className="text-gray-500 text-sm">
              Chọn một phân tích để xem chi tiết
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
