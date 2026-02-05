import React from 'react';
import { PlanType } from '../types';
import { PLANS, POPULAR_PERCENTAGE } from '../constants';
import { Star } from 'lucide-react';

interface TabSelectorProps {
  currentPlan: PlanType;
  onChange: (plan: PlanType) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ currentPlan, onChange }) => {
  const tabs = [
    { id: PlanType.LIGHT, label: PLANS[PlanType.LIGHT].label },
    { id: PlanType.STANDARD, label: PLANS[PlanType.STANDARD].label },
    { id: PlanType.PREMIUM, label: PLANS[PlanType.PREMIUM].label },
  ];

  return (
    <div className="relative mt-8 mb-8">
      {/* Floating Badge - Design System 2 Style (White pill with shadow) */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center gap-1.5 bg-white border border-gray-100 px-3 py-1.5 rounded-full shadow-sm">
          <Star size={12} className="fill-gray-700 text-gray-700" />
          <span className="text-xs font-semibold text-gray-700">
            가입자의 {POPULAR_PERCENTAGE}%가 선택
          </span>
        </div>
      </div>

      {/* Tab Container */}
      <div className="flex p-1 bg-gray-50 rounded-xl">
        {tabs.map((tab) => {
          const isActive = currentPlan === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-100'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabSelector;