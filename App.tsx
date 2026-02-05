import React from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import InsuranceCalculator from './screens/InsuranceCalculator/index';
import ScreenList from './screens/ScreenList/index';
import TravelCountrySelect from './screens/TravelCountrySelect/index';
import CaffeineTracker from './screens/CaffeineTracker/index';
import RelationshipMain from './screens/RelationshipMain/index';
import TaskMain from './screens/TaskMain/index';
import ProductSubscription from './screens/ProductSubscription/index';
import InsuranceClaim from './screens/InsuranceClaim/index';
import GuestMain from './screens/GuestMain/index';
import CustomerMain from './screens/CustomerMain/index';

// Screen Configuration
const SCREENS = [
  { id: 'customer-main', path: '/customer', title: 'D안: 고객 맞춤형 메인 (요청사항)', component: CustomerMain },
  { id: 'guest-main', path: '/guest', title: 'C안: 비로그인(게스트) 메인', component: GuestMain },
  { id: 'task-main', path: '/task', title: 'B안: 목적 중심형 메인', component: TaskMain },
  { id: 'relationship-main', path: '/relationship', title: 'A안: 관계 중심형 메인', component: RelationshipMain },
  { id: 'product-sub', path: '/product', title: '상품 가입 프로세스 (4단계)', component: ProductSubscription },
  { id: 'insurance-claim', path: '/claim', title: '보험금 청구 프로세스 (4단계)', component: InsuranceClaim },
  { id: 'calculator', path: '/calculator', title: '보험료 계산', component: InsuranceCalculator },
  { id: 'country-select', path: '/country', title: '여행 국가 선택', component: TravelCountrySelect },
  { id: 'caffeine-tracker', path: '/caffeine', title: '카페인 리포트', component: CaffeineTracker },
];

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ScreenList
              screens={SCREENS.map(({ id, path, title }) => ({ id, path, title }))}
            />
          }
        />
        {SCREENS.map((screen) => (
          <Route
            key={screen.id}
            path={screen.path}
            element={<ScreenWrapper component={screen.component} />}
          />
        ))}
      </Routes>
    </HashRouter>
  );
}

// Wrapper to handle onBack with navigate
function ScreenWrapper({ component: Component }: { component: React.FC<any> }) {
  const navigate = useNavigate();
  return <Component onBack={() => navigate('/')} />;
}

export default App;