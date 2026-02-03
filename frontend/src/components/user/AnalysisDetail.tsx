import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  analysisId: string;
}

export default function AnalysisDetail({ analysisId }: Props) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetail();
  }, [analysisId]);

  const fetchDetail = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://127.0.0.1:9999/api/user/history/${analysisId}`
      );

      setData(res.data);
    } catch (err) {
      console.error("Fetch detail failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-sm text-gray-500">Đang tải chi tiết...</p>;

  if (!data) return <p className="text-sm text-red-500">Không có dữ liệu</p>;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Chi tiết phân tích</h3>

      <p className="text-sm text-gray-500">
        Record #{data.record_id}
      </p>

      {/* Images */}
      <div className="space-y-3">
        {data.images.map((img: any) => (
          <div key={img.id} className="border rounded p-3">
            <img
              src={`http://127.0.0.1:9999/${img.url}`}
              className="rounded mb-2"
            />

            {img.ai_results.map((ai: any) => (
              <div key={ai.id} className="text-sm text-gray-600">
                🤖 AI: {ai.raw_output} ({ai.confidence * 100}%)
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Doctor */}
      <div className="border-t pt-3">
        <h4 className="font-medium">Kết luận bác sĩ</h4>

        {data.doctor_diagnoses.map((d: any) => (
          <div key={d.id} className="text-sm text-gray-700 mt-1">
            • {d.result}
          </div>
        ))}
      </div>
    </div>
  );
}