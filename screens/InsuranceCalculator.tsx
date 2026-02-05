import React, { useState } from 'react';
import Header from '../components/Header';
import PlanCard from '../components/PlanCard';
import TabSelector from '../components/TabSelector';
import CoverageSection from '../components/CoverageSection';
import BottomButton from '../components/BottomButton';
import { PLANS, COVERAGE_OPTIONS } from '../constants';
import { PlanType } from '../types';

interface InsuranceCalculatorProps {
  onBack: () => void;
}

const InsuranceCalculator: React.FC<InsuranceCalculatorProps> = ({ onBack }) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(PlanType.LIGHT);
  const [coverageAmount, setCoverageAmount] = useState<number>(COVERAGE_OPTIONS[0].value);

  const currentPlanData = PLANS[selectedPlan];

  return (
    <>
      <Header title="보험료 계산" onBack={onBack} />
      
      <main className="flex-1 px-5 pb-8 flex flex-col">
        {/* Main Hero Card */}
        <section className="mt-2">
          <PlanCard plan={currentPlanData} />
        </section>

        {/* Tab Selection */}
        <TabSelector 
          currentPlan={selectedPlan} 
          onChange={setSelectedPlan} 
        />

        {/* Divider line style */}
        <div className="h-px w-full bg-gray-100 mb-6"></div>

        {/* Coverage Details */}
        <CoverageSection 
          selectedAmount={coverageAmount}
          onSelectAmount={setCoverageAmount}
        />
      </main>

      <BottomButton />
    </>
  );
};

export default InsuranceCalculator;