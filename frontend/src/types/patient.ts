export type RiskLevel = "low" | "medium" | "high";

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastScan: string;
  totalScans: number;
  riskLevel: RiskLevel;
  conditions: string[];
}
