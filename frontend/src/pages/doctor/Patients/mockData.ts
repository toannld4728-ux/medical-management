export interface PatientDetailData {
  id: string;
  name: string;
  age: number;
  gender: "Nam" | "Nữ";
  riskLevel: "Thấp" | "Trung bình" | "Cao";
  symptoms: string[];
  aiAssessment: string;
  doctorDiagnosis?: string;
  doctorAdvice?: string;
}

export const mockPatientsDetail: PatientDetailData[] = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    age: 45,
    gender: "Nam",
    riskLevel: "Cao",
    symptoms: [
      "Mờ mắt",
      "Đau nhức mắt",
      "Nhìn kém vào ban đêm",
    ],
    aiAssessment:
      "Hệ thống AI phát hiện nguy cơ cao mắc bệnh Glaucoma. Chỉ số áp suất mắt vượt ngưỡng bình thường.",
    doctorDiagnosis:
      "Bệnh nhân có dấu hiệu nghi ngờ Glaucoma giai đoạn sớm.",
    doctorAdvice:
      "Khuyến nghị bệnh nhân đo nhãn áp định kỳ, dùng thuốc nhỏ mắt theo chỉ định và tái khám sau 2 tuần.",
  },
];
