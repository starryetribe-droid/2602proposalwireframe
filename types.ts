export enum PlanType {
  LIGHT = 'LIGHT',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
}

export interface PlanData {
  id: PlanType;
  label: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  description: string;
}

export interface CoverageOption {
  value: number; // Amount in Won (e.g., 500000)
  label: string; // Display string (e.g., "50만원")
}