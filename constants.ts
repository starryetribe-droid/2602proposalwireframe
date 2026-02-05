import { PlanType, PlanData, CoverageOption } from './types';

export const PLANS: Record<PlanType, PlanData> = {
  [PlanType.LIGHT]: {
    id: PlanType.LIGHT,
    label: '라이트',
    price: 2430,
    originalPrice: 2500,
    discountPercent: 3,
    description: '꼭 필요한 보장만 모은',
  },
  [PlanType.STANDARD]: {
    id: PlanType.STANDARD,
    label: '스탠다드',
    price: 5200,
    originalPrice: 5500,
    discountPercent: 5,
    description: '가장 많은 분들이 선택하는',
  },
  [PlanType.PREMIUM]: {
    id: PlanType.PREMIUM,
    label: '프리미엄',
    price: 9800,
    originalPrice: 10500,
    discountPercent: 7,
    description: '모든 위험을 완벽하게 대비하는',
  },
};

export const COVERAGE_OPTIONS: CoverageOption[] = [
  { value: 500000, label: '50만원' },
  { value: 1000000, label: '100만원' },
  { value: 2000000, label: '200만원' },
];

export const POPULAR_PERCENTAGE = 45;