
export interface SlaRule {
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  responseMinutes: number;
  resolutionHours: number;
  active: boolean;
}