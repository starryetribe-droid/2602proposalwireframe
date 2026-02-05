import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { COVERAGE_OPTIONS } from '../constants';

interface CoverageSectionProps {
  selectedAmount: number;
  onSelectAmount: (amount: number) => void;
}

const CoverageSection: React.FC<CoverageSectionProps> = ({ selectedAmount, onSelectAmount }) => {
  return (
    <div className="mt-2 mb-24">
      <h3 className="text-md font-bold text-gray-800 mb-6 px-1">
        내 물건, 항공편에 문제가 생겼을 때
      </h3>

      <div className="py-2">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
                    <Check size={14} className="text-white" strokeWidth={3} />
                </div>
                <span className="text-sm font-medium text-gray-800">
                    여행 중 휴대품손해(분실 제외)
                </span>
            </div>
            <div className="flex items-center gap-1">
                 <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-1.5 py-0.5 rounded">
                    인기
                 </span>
                 <ChevronRight size={16} className="text-gray-300" />
            </div>
        </div>

        {/* Option Buttons */}
        <div className="grid grid-cols-3 gap-3">
          {COVERAGE_OPTIONS.map((option) => {
            const isSelected = selectedAmount === option.value;
            return (
              <button
                key={option.value}
                onClick={() => onSelectAmount(option.value)}
                className={`py-3 px-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? 'border-gray-900 text-gray-900 bg-white ring-1 ring-gray-900'
                    : 'border-gray-200 text-gray-400 bg-white hover:border-gray-300'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CoverageSection;