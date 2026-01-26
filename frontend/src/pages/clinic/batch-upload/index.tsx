import React, { useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Download,
} from "lucide-react";

type UploadFile = {
  id: string;
  name: string;
  patientId: string;
  status: "pending" | "uploading" | "completed" | "error";
  progress: number;
};

const BatchUpload: React.FC = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);

  /* ================= HANDLERS ================= */

  const handleUploadCSV = () => {
    alert(
      "Demo: tải CSV metadata\n(Thực tế sẽ parse CSV và map với hình ảnh)"
    );
  };

  const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles: UploadFile[] = Array.from(e.target.files).map(
      (file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        patientId: file.name.split("_")[0] || "Unknown",
        status: "pending",
        progress: 0,
      })
    );

    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleBatchUpload = () => {
    setFiles((prev) =>
      prev.map((file) => ({
        ...file,
        status: "uploading",
        progress: 0,
      }))
    );

    // Fake upload progress
    files.forEach((file) => {
      const interval = setInterval(() => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id
              ? {
                  ...f,
                  progress: Math.min(f.progress + 20, 100),
                  status:
                    f.progress + 20 >= 100 ? "completed" : "uploading",
                }
              : f
          )
        );
      }, 400);

      setTimeout(() => clearInterval(interval), 2200);
    });
  };

  /* ================= UI ================= */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold mb-1">Tải lên Hàng loạt</h2>
        <p className="text-gray-600">
          Upload nhiều hình ảnh võng mạc cho phòng khám cùng lúc
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="flex items-center gap-2 mb-3 font-medium">
          <FileText className="w-5 h-5 text-blue-600" />
          Hướng dẫn tải lên
        </h3>
        <ol className="list-decimal ml-6 space-y-2 text-sm text-blue-900">
          <li>Tạo file CSV chứa thông tin bệnh nhân</li>
          <li>
            Đặt tên ảnh theo dạng:{" "}
            <code className="bg-blue-100 px-2 py-1 rounded">
              PatientID_Eye_Date.jpg
            </code>
          </li>
          <li>Tải CSV metadata trước</li>
          <li>Tải lên toàn bộ ảnh tương ứng</li>
          <li>Hệ thống tự động xử lý và phân tích</li>
        </ol>

        <button
          onClick={() => alert("Tải template CSV")}
          className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          <Download className="w-4 h-4" />
          Tải template CSV
        </button>
      </div>

      {/* Step 1 */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-lg font-medium mb-4">
          Bước 1: Tải lên CSV Metadata
        </h3>
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="mb-3">Chọn file CSV thông tin bệnh nhân</p>
          <button
            onClick={handleUploadCSV}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Chọn file CSV
          </button>
        </div>
      </div>

      {/* Step 2 */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-lg font-medium mb-4">
          Bước 2: Tải lên Hình ảnh
        </h3>

        <div className="border-2 border-dashed rounded-lg p-8 text-center mb-4">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="mb-3">Chọn nhiều ảnh võng mạc</p>

          <input
            type="file"
            multiple
            accept="image/*"
            id="batch-upload"
            className="hidden"
            onChange={handleSelectImages}
          />
          <label
            htmlFor="batch-upload"
            className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer"
          >
            Chọn nhiều file
          </label>

          <p className="text-sm text-gray-500 mt-2">
            Tối đa 100 file / lần
          </p>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div>
            <div className="flex justify-between mb-3">
              <span className="text-sm text-gray-600">
                {files.length} file đã chọn
              </span>
              <button
                onClick={handleBatchUpload}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
              >
                Bắt đầu xử lý
              </button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="border rounded-lg p-3 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      Patient ID: {file.patientId}
                    </p>
                  </div>

                  {file.status === "completed" && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  {file.status === "error" && (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  {file.status === "uploading" && (
                    <span className="text-sm text-blue-600">
                      {file.progress}%
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchUpload;
