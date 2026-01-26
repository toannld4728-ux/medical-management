interface Props {
  analysisId: string;
}

const AnalysisDetail = ({ analysisId }: Props) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Chi tiết phân tích</h3>
      <p className="text-sm text-gray-500">
        Mã phân tích: <strong>{analysisId}</strong>
      </p>

      <div className="text-sm text-gray-600">
        (Sau này backend sẽ trả về hình ảnh, kết quả AI, đánh giá bác sĩ…)
      </div>
    </div>
  );
};

export default AnalysisDetail;
