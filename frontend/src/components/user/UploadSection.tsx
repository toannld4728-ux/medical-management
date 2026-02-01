import React, { useState, useRef } from 'react';
import { Upload, X, AlertCircle, CheckCircle, Image as ImageIcon, Eye } from 'lucide-react';
import { api } from "../../services/api";  // for uploading files to backend

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
}

const UploadSection = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      status: 'uploading' as const,
      progress: 0
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // start upload for each new file
    newFiles.forEach((uploadedFile) => {
      uploadImage(uploadedFile);
    });
  };

  const uploadImage = async (fileObj: UploadedFile) => {
    // set initial uploading state
    setUploadedFiles((prev) =>
      prev.map((f) => (f.id === fileObj.id ? { ...f, status: 'uploading', progress: 1 } : f))
    );

    try {
      const form = new FormData();
      form.append('file', fileObj.file);

      const res = await api.post('/medical-images/', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadedFiles((prev) =>
              prev.map((f) => (f.id === fileObj.id ? { ...f, progress: percent } : f))
            );
          }
        },
      });

      console.log('Upload response:', res.data);

      // mark as processing
      setUploadedFiles((prev) =>
        prev.map((f) => (f.id === fileObj.id ? { ...f, status: 'processing', progress: 100 } : f))
      );

      // simulate AI processing completion after short delay
      setTimeout(() => {
        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === fileObj.id ? { ...f, status: 'completed', progress: 100 } : f))
        );
      }, 1500);

      return res.data;
    } catch (err) {
      console.error('Upload failed', err);
      setUploadedFiles((prev) =>
        prev.map((f) => (f.id === fileObj.id ? { ...f, status: 'error' } : f))
      );
      return null;
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Tải lên hình ảnh võng mạc</h2>
        <p className="text-gray-600">Tải lên một hoặc nhiều hình ảnh fundus hoặc OCT để phân tích bằng AI</p>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-12 text-center transition ${
          isDragging
            ? 'border-blue-600 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <p className="text-lg mb-2">Kéo thả hình ảnh vào đây hoặc</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Chọn file
            </button>
          </div>
          <p className="text-sm text-gray-500">Hỗ trợ: JPG, PNG, TIFF (tối đa 10MB mỗi file)</p>
        </div>
      </div>

      {/* Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm mb-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-blue-600" />
          Hướng dẫn chụp ảnh võng mạc
        </h3>
        <ul className="text-sm text-blue-900 space-y-1 ml-6 list-disc">
          <li>Đảm bảo hình ảnh rõ nét, không bị mờ hoặc tối</li>
          <li>Chụp ảnh fundus hoặc OCT từ máy chuyên dụng</li>
          <li>Vùng võng mạc cần được phơi sáng đồng đều</li>
          <li>Không chỉnh sửa hoặc thêm filter vào ảnh</li>
        </ul>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl">Danh sách ảnh đã tải ({uploadedFiles.length})</h3>
          <div className="grid gap-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="bg-white border rounded-lg p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={file.preview}
                      alt={file.file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="truncate">{file.file.name}</p>
                        <p className="text-sm text-gray-500">
                          {(file.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <X className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                    
                    {/* Status */}
                    <div className="space-y-2">
                      {file.status === 'uploading' && (
                        <>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Upload className="w-4 h-4" />
                            Đang tải lên... {file.progress}%
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                        </>
                      )}
                      
                      {file.status === 'processing' && (
                        <div className="flex items-center gap-2 text-sm text-blue-600">
                          <Eye className="w-4 h-4 animate-pulse" />
                          AI đang phân tích hình ảnh...
                        </div>
                      )}
                      
                      {file.status === 'completed' && (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          Phân tích hoàn tất
                        </div>
                      )}
                      
                      {file.status === 'error' && (
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <AlertCircle className="w-4 h-4" />
                          Lỗi khi xử lý
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-gray-50 border rounded-lg p-6">
        <h3 className="mb-4">Sau khi tải ảnh lên</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
              1
            </div>
            <div>
              <p className="mb-1">Hệ thống AI sẽ phân tích hình ảnh võng mạc</p>
              <p className="text-sm text-gray-600">Thời gian: 10-20 giây</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
              2
            </div>
            <div>
              <p className="mb-1">Bác sĩ sẽ xem xét và xác nhận kết quả</p>
              <p className="text-sm text-gray-600">Thời gian: 24-48 giờ</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
              3
            </div>
            <div>
              <p className="mb-1">Bạn sẽ nhận được thông báo khi có kết quả</p>
              <p className="text-sm text-gray-600">Qua email và trong ứng dụng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UploadSection;
