import React from 'react';
import { Eye, Calendar, AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';

interface AnalysisHistoryProps {
  onSelectAnalysis: (id: string) => void;
  limit?: number;
}

interface AnalysisRecord {
  id: string;
  date: string;
  eye: 'left' | 'right' | 'both';
  status: 'completed' | 'pending' | 'reviewed';
  riskLevel: 'low' | 'medium' | 'high';
  findings: string[];
  doctor?: string;
}

export function AnalysisHistory({ onSelectAnalysis, limit }: AnalysisHistoryProps) {
  // Mock data
  const analyses: AnalysisRecord[] = [
    {
      id: 'AN-2024-012',
      date: '2024-12-18',
      eye: 'both',
      status: 'pending',
      riskLevel: 'low',
      findings: ['Đang xử lý'],
      doctor: undefined
    },
    {
      id: 'AN-2024-011',
      date: '2024-12-15',
      eye: 'both',
      status: 'reviewed',
      riskLevel: 'low',
      findings: ['Không phát hiện bất thường', 'Mạch máu võng mạc ổn định'],
      doctor: 'BS. Trần Thị Bình'
    },
    {
      id: 'AN-2024-010',
      date: '2024-12-10',
      eye: 'right',
      status: 'reviewed',
      riskLevel: 'medium',
      findings: ['Tăng áp lực mạch máu nhẹ', 'Đề xuất theo dõi'],
      doctor: 'BS. Trần Thị Bình'
    },
    {
      id: 'AN-2024-009',
      date: '2024-12-05',
      eye: 'both',
      status: 'reviewed',
      riskLevel: 'low',
      findings: ['Không có dấu hiệu bệnh lý'],
      doctor: 'BS. Lê Văn Cường'
    },
    {
      id: 'AN-2024-008',
      date: '2024-11-28',
      eye: 'left',
      status: 'reviewed',
      riskLevel: 'low',
      findings: ['Tình trạng bình thường'],
      doctor: 'BS. Trần Thị Bình'
    },
    {
      id: 'AN-2024-007',
      date: '2024-11-20',
      eye: 'both',
      status: 'reviewed',
      riskLevel: 'low',
      findings: ['Khám định kỳ - không vấn đề'],
      doctor: 'BS. Trần Thị Bình'
    }
  ];

  const displayedAnalyses = limit ? analyses.slice(0, limit) : analyses;

  const getRiskBadge = (level: string) => {
    const styles = {
      low: 'bg-green-100 text-green-700',
      medium: 'bg-orange-100 text-orange-700',
      high: 'bg-red-100 text-red-700'
    };
    const labels = {
      low: 'Thấp',
      medium: 'Trung bình',
      high: 'Cao'
    };
    return (
      <span className={`px-2 py-1 rounded text-xs ${styles[level as keyof typeof styles]}`}>
        {labels[level as keyof typeof labels]}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const config = {
      completed: { label: 'Hoàn thành', icon: CheckCircle, color: 'text-blue-600' },
      pending: { label: 'Đang xử lý', icon: Clock, color: 'text-orange-600' },
      reviewed: { label: 'Đã xem xét', icon: CheckCircle, color: 'text-green-600' }
    };
    const { label, icon: Icon, color } = config[status as keyof typeof config];
    return (
      <span className={`flex items-center gap-1 text-sm ${color}`}>
        <Icon className="w-4 h-4" />
        {label}
      </span>
    );
  };

  return (
    <div className="space-y-3">
      {displayedAnalyses.map((analysis) => (
        <div
          key={analysis.id}
          onClick={() => onSelectAnalysis(analysis.id)}
          className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{analysis.id}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{new Date(analysis.date).toLocaleDateString('vi-VN')}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              {getStatusBadge(analysis.status)}
              <div className="mt-2">
                {getRiskBadge(analysis.riskLevel)}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Eye className="w-4 h-4" />
              {analysis.eye === 'both' ? 'Cả hai mắt' : analysis.eye === 'left' ? 'Mắt trái' : 'Mắt phải'}
            </div>
            
            <div className="text-sm">
              {analysis.findings.map((finding, idx) => (
                <div key={idx} className="text-gray-600">• {finding}</div>
              ))}
            </div>

            {analysis.doctor && (
              <div className="text-sm text-gray-500 pt-2 border-t">
                Xem xét bởi: {analysis.doctor}
              </div>
            )}
          </div>
        </div>
      ))}

      {displayedAnalyses.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Eye className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Chưa có phân tích nào</p>
        </div>
      )}
    </div>
  );
}
