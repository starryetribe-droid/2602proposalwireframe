import React from 'react';
import { PlanData } from '../types';

interface PlanCardProps {
  plan: PlanData;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  return (
    <div className="relative px-6 pt-8 pb-8 bg-gray-100 rounded-[2rem] overflow-hidden">
      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-gray-800">{plan.label} 플랜</h2>
            <p className="text-sm text-gray-500">{plan.description}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 line-through text-sm font-medium">
              {plan.originalPrice.toLocaleString()}원
            </span>
            <div className="bg-gray-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {plan.discountPercent}%
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-gray-900 tracking-tight">
              {plan.price.toLocaleString()}
            </span>
            <span className="text-xl font-medium text-gray-900">원</span>
          </div>
        </div>
      </div>

      {/* Illustration Placeholder Text */}
      <div className="absolute right-4 bottom-6 z-10 w-24 h-24 flex items-center justify-center border border-dashed border-gray-300 rounded-lg bg-gray-50/50">
        <span className="text-xs text-gray-400 text-center leading-relaxed">
          illust
        </span>
      </div>
    </div>
  );
};

export default PlanCard;