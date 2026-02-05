import React, { useState } from 'react';
import InsuranceCalculator from './screens/InsuranceCalculator';
import ScreenList from './screens/ScreenList';
import TravelCountrySelect from './screens/TravelCountrySelect';
import CaffeineTracker from './screens/CaffeineTracker';
import RelationshipMain from './screens/RelationshipMain';
import TaskMain from './screens/TaskMain';
import ProductSubscription from './screens/ProductSubscription';
import InsuranceClaim from './screens/InsuranceClaim';
import GuestMain from './screens/GuestMain';
import CustomerMain from './screens/CustomerMain';

// Screen Configuration
const SCREENS = [
  { id: 'customer-main', title: 'D안: 고객 맞춤형 메인 (요청사항)', component: CustomerMain },
  { id: 'guest-main', title: 'C안: 비로그인(게스트) 메인', component: GuestMain },
  { id: 'task-main', title: 'B안: 목적 중심형 메인', component: TaskMain },
  { id: 'relationship-main', title: 'A안: 관계 중심형 메인', component: RelationshipMain },
  { id: 'product-sub', title: '상품 가입 프로세스 (4단계)', component: ProductSubscription },
  { id: 'insurance-claim', title: '보험금 청구 프로세스 (4단계)', component: InsuranceClaim },
  { id: 'calculator', title: '보험료 계산', component: InsuranceCalculator },
  { id: 'country-select', title: '여행 국가 선택', component: TravelCountrySelect },
  { id: 'caffeine-tracker', title: '카페인 리포트', component: CaffeineTracker },
];

function App() {
  const [currentScreen, setCurrentScreen] = useState<string | null>(null);

  const navigateTo = (screenId: string) => {
    setCurrentScreen(screenId);
  };

  const goBack = () => {
    setCurrentScreen(null);
  };

  // Render the selected screen
  if (currentScreen) {
    const ScreenComponent = SCREENS.find(s => s.id === currentScreen)?.component;
    if (ScreenComponent) {
      return <ScreenComponent onBack={goBack} />;
    }
  }

  // Default: Render Screen List
  return (
    <ScreenList 
      screens={SCREENS.map(({ id, title }) => ({ id, title }))} 
      onNavigate={navigateTo} 
    />
  );
}

export default App;