import { RiskLevel } from "../../../types/patient";

interface Props {
  level: RiskLevel;
}

export default function PatientRiskBadge({ level }: Props) {
  const style: Record<RiskLevel, string> = {
    low: "bg-green-100 text-green-700",
    medium: "bg-orange-100 text-orange-700",
    high: "bg-red-100 text-red-700",
  };

  const label: Record<RiskLevel, string> = {
    low: "Thấp",
    medium: "Trung bình",
    high: "Cao",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${style[level]}`}>
      {label[level]}
    </span>
  );
}
