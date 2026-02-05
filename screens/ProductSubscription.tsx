
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  X, 
  Check, 
  Info, 
  Camera, 
  Smartphone, 
  CreditCard, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  ShieldCheck,
  Zap,
  LayoutGrid,
  FileText
} from 'lucide-react';
import BottomButton from '../components/BottomButton';

interface ProductSubscriptionProps {
  onBack: () => void;
}

// --- Mock Data ---
const PRODUCTS = [
  { 
    id: 1, 
    name: 'NH 가성비굿 건강보험', 
    desc: '암/뇌/심장 3대 질병 집중 보장', 
    price: 15000, 
    tags: ['인기', '보장분석 추천'],
    features: ['암 진단비 5천만원', '입원비 1일 3만원', '수술비 회당 50만원']
  },
  { 
    id: 2, 
    name: 'NH 헤아림 운전자보험', 
    desc: '교통사고 법률비용 완벽 대비', 
    price: 12500, 
    tags: [],
    features: ['벌금 최대 3천만원', '변호사 선임비 5천만원', '교통사고 처리지원금']
  },
  { 
    id: 3, 
    name: 'NH 다이렉트 암보험', 
    desc: '필요한 암만 쏙쏙 골라 가입', 
    price: 8900, 
    tags: ['보험료 저렴'],
    features: ['일반암 3천만원', '유사암 1천만원', '항암치료비 지원']
  },
];

const RIDERS = [
  { id: 'r1', name: '표적항암약물허가치료비', desc: '최신 암치료 기술 보장', price: 1200, recommended: true },
  { id: 'r2', name: '가족일상배상책임', desc: '타인의 신체/재물 손해 배상', price: 800, recommended: false },
  { id: 'r3', name: '질병수술비(1-5종)', desc: '수술 종류에 따라 차등 지급', price: 3500, recommended: true },
];

const ProductSubscription: React.FC<ProductSubscriptionProps> = ({ onBack }) => {
  const [step, setStep] = useState(1); // 1: Select, 2: Auth, 3: Confirm, 4: Payment
  const [subStep, setSubStep] = useState<'list' | 'config' | 'compare'>('list'); // For Step 1
  const [authStep, setAuthStep] = useState<'select' | 'ocr' | 'form'>('select'); // For Step 2
  const [paymentStep, setPaymentStep] = useState<'select' | 'success'>('select'); // For Step 4

  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [finalProduct, setFinalProduct] = useState<any>(null);
  const [coverageAmount, setCoverageAmount] = useState(3000); // 만원 단위
  const [selectedRiders, setSelectedRiders] = useState<string[]>(['r1']);
  
  // Auth Form Data
  const [formData, setFormData] = useState({
    name: '',
    birth: '',
    phone: '',
    address: ''
  });

  // Moved state from renderStep3 to here to avoid Hook rule violation
  const [agreed, setAgreed] = useState(false);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  // --- Handlers ---

  const handleProductSelect = (product: any) => {
    setFinalProduct(product);
    setSubStep('config');
  };

  const toggleCompare = (id: number) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(prev => prev.filter(p => p !== id));
    } else {
      if (selectedProducts.length >= 3) return;
      setSelectedProducts(prev => [...prev, id]);
    }
  };

  const handleCoverageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoverageAmount(Number(e.target.value));
  };

  const toggleRider = (id: string) => {
    setSelectedRiders(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    if (!finalProduct) return 0;
    let base = finalProduct.price;
    // Simple logic for slider impact
    base += (coverageAmount - 3000) * 0.5; 
    // Riders
    RIDERS.forEach(r => {
      if (selectedRiders.includes(r.id)) base += r.price;
    });
    return Math.floor(base);
  };

  const startOCR = () => {
    setAuthStep('ocr');
    // Simulate OCR delay
    setTimeout(() => {
      setFormData({
        name: '김농협',
        birth: '1990.05.05',
        phone: '010-1234-5678',
        address: '서울시 중구 통일로 120'
      });
      setAuthStep('form');
    }, 2500);
  };

  // --- Render Steps ---

  // [Step 1] Product Selection & Design
  const renderStep1 = () => {
    if (subStep === 'list') {
      return (
        <div className="flex flex-col h-full">
          <div className="px-5 mb-4">
             <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-4">
               어떤 보험을<br/>찾고 계신가요?
             </h2>
             <div className="flex gap-2 overflow-x-auto no-scrollbar mb-2">
                <button className="px-3 py-1.5 bg-gray-900 text-white rounded-full text-xs font-bold">추천순</button>
                <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-500 rounded-full text-xs font-medium">인기순</button>
                <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-500 rounded-full text-xs font-medium">가격순</button>
             </div>
          </div>

          <div className="flex-1 px-5 overflow-y-auto pb-24 flex flex-col gap-4">
            {PRODUCTS.map(product => (
              <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 relative overflow-hidden">
                {product.tags.includes('보장분석 추천') && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                    보장분석 추천
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
                  <input 
                    type="checkbox" 
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleCompare(product.id)}
                    className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                  />
                </div>
                <p className="text-sm text-gray-500 mb-4">{product.desc}</p>
                
                <div className="bg-gray-50 rounded-xl p-3 mb-4">
                  {product.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 mb-1 last:mb-0">
                      <Check size={12} className="text-blue-600" />
                      <span className="text-xs text-gray-600">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-gray-900">{product.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-500">원/월</span>
                  </div>
                  <button 
                    onClick={() => handleProductSelect(product)}
                    className="bg-gray-900 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    선택
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Compare Floating Button */}
          {selectedProducts.length >= 2 && (
             <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-white via-white to-transparent z-20">
                <button 
                  onClick={() => setSubStep('compare')}
                  className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <LayoutGrid size={18} />
                  {selectedProducts.length}개 상품 비교하기
                </button>
             </div>
          )}
        </div>
      );
    } 
    
    if (subStep === 'compare') {
      const compareList = PRODUCTS.filter(p => selectedProducts.includes(p.id));
      return (
        <div className="absolute inset-0 bg-white z-30 flex flex-col">
          <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
             <h3 className="font-bold text-lg">상품 비교</h3>
             <button onClick={() => setSubStep('list')} className="p-2 -mr-2 text-gray-500">
               <X size={24} />
             </button>
          </div>
          <div className="flex-1 overflow-x-auto p-5">
             <div className="flex gap-4">
               <div className="w-24 shrink-0 pt-36 flex flex-col gap-6 text-sm font-bold text-gray-500">
                  <div>월 보험료</div>
                  <div>주요 보장</div>
                  <div>갱신 유형</div>
               </div>
               {compareList.map(p => (
                 <div key={p.id} className="w-40 shrink-0 flex flex-col gap-4">
                    <div className="h-32 p-4 bg-gray-50 rounded-2xl flex flex-col justify-between">
                       <span className="font-bold text-gray-900 leading-tight">{p.name}</span>
                       <button onClick={() => handleProductSelect(p)} className="w-full bg-gray-900 text-white text-xs py-2 rounded-lg">이 상품 선택</button>
                    </div>
                    <div className="font-bold text-gray-900">{p.price.toLocaleString()}원</div>
                    <div className="text-xs text-gray-600 h-10">{p.features[0]}</div>
                    <div className="text-xs text-gray-600">20년 갱신</div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      );
    }

    // Config View
    return (
      <div className="flex flex-col h-full">
         <div className="px-5 py-2 border-b border-gray-100 sticky top-0 bg-white z-10 flex justify-between items-center">
            <span className="font-bold text-gray-900">{finalProduct.name}</span>
            <div className="text-right">
               <span className="text-xs text-gray-400 block">예상 보험료</span>
               <span className="text-lg font-bold text-blue-600">{calculateTotal().toLocaleString()}원</span>
            </div>
         </div>

         <div className="flex-1 overflow-y-auto p-5 pb-32">
            {/* Main Coverage Slider */}
            <div className="mb-8">
               <div className="flex justify-between items-end mb-4">
                  <h3 className="font-bold text-gray-900">진단비 가입금액</h3>
                  <span className="text-2xl font-bold text-gray-900">{coverageAmount.toLocaleString()} <span className="text-sm font-medium text-gray-500">만원</span></span>
               </div>
               <input 
                 type="range" 
                 min="1000" 
                 max="10000" 
                 step="500" 
                 value={coverageAmount} 
                 onChange={handleCoverageChange}
                 className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
               />
               <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>1천만원</span>
                  <span>1억원</span>
               </div>
            </div>

            <div className="h-px w-full bg-gray-100 mb-6"></div>

            {/* Riders */}
            <h3 className="font-bold text-gray-900 mb-4">특약 선택</h3>
            <div className="flex flex-col gap-3">
               {RIDERS.map(rider => (
                 <div key={rider.id} className={`p-4 rounded-2xl border transition-all ${selectedRiders.includes(rider.id) ? 'border-gray-900 bg-gray-50' : 'border-gray-100 bg-white'}`}>
                    <div className="flex justify-between items-start mb-2">
                       <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">{rider.name}</span>
                          {rider.recommended && <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-bold">추천</span>}
                       </div>
                       <button 
                         onClick={() => toggleRider(rider.id)}
                         className={`w-10 h-6 rounded-full relative transition-colors ${selectedRiders.includes(rider.id) ? 'bg-gray-900' : 'bg-gray-200'}`}
                       >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${selectedRiders.includes(rider.id) ? 'left-5' : 'left-1'}`}></div>
                       </button>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{rider.desc}</p>
                    <p className="text-sm font-bold text-gray-900 text-right">+{rider.price.toLocaleString()}원</p>
                 </div>
               ))}
            </div>
         </div>
         <BottomButton label="다음 단계" onClick={() => setStep(2)} />
      </div>
    );
  };

  // [Step 2] User Info & Auth
  const renderStep2 = () => {
    if (authStep === 'select') {
      return (
        <div className="px-5 pt-4">
           <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-2">
             본인 확인이<br/>필요합니다
           </h2>
           <p className="text-sm text-gray-500 mb-8">안전한 계약을 위해 인증을 진행해주세요.</p>

           <div className="flex flex-col gap-3">
              <button className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-transform">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900">
                       <Smartphone size={24} />
                    </div>
                    <div className="text-left">
                       <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">모바일 신분증</span>
                          <span className="bg-red-100 text-red-500 text-[10px] font-bold px-1.5 py-0.5 rounded">Fast</span>
                       </div>
                       <span className="text-xs text-gray-500">가장 빠르고 간편해요</span>
                    </div>
                 </div>
                 <ChevronLeft size={20} className="rotate-180 text-gray-300" />
              </button>

              <button 
                onClick={startOCR}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-transform"
              >
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900">
                       <Camera size={24} />
                    </div>
                    <div className="text-left">
                       <span className="font-bold text-gray-900 block">신분증 촬영</span>
                       <span className="text-xs text-gray-500">주민등록증 / 운전면허증</span>
                    </div>
                 </div>
                 <ChevronLeft size={20} className="rotate-180 text-gray-300" />
              </button>
           </div>
        </div>
      );
    }

    if (authStep === 'ocr') {
       return (
         <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
            <div className="w-full max-w-xs aspect-[1.58/1] border-2 border-white/50 rounded-xl relative overflow-hidden mb-8">
               <div className="absolute inset-0 border-t-2 border-blue-500 animate-scan"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/80 text-sm font-medium">신분증을 영역에 맞춰주세요</span>
               </div>
            </div>
            <div className="text-white text-center">
               <Camera className="mx-auto mb-2 animate-pulse" size={32} />
               <p className="text-lg font-bold">인식 중입니다...</p>
               <p className="text-sm text-gray-400">잠시만 기다려주세요</p>
            </div>
         </div>
       );
    }

    // Form
    return (
      <div className="flex flex-col h-full">
         <div className="px-5 pt-4 flex-1">
            <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-6">
               계약자 정보를<br/>확인해주세요
            </h2>
            
            <div className="flex flex-col gap-5">
               <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">이름</label>
                  <input type="text" value={formData.name} disabled className="w-full p-4 bg-gray-100 rounded-xl text-gray-900 font-bold border-none" />
               </div>
               <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">생년월일</label>
                  <input type="text" value={formData.birth} disabled className="w-full p-4 bg-gray-100 rounded-xl text-gray-900 font-bold border-none" />
               </div>
               <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">휴대폰 번호</label>
                  <input type="text" defaultValue={formData.phone} className="w-full p-4 bg-white border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-gray-900 focus:outline-none" />
               </div>
               <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">주소</label>
                  <input type="text" defaultValue={formData.address} className="w-full p-4 bg-white border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-gray-900 focus:outline-none" />
               </div>
            </div>
         </div>
         <BottomButton label="다음 단계" onClick={() => setStep(3)} />
      </div>
    );
  };

  // [Step 3] Confirmation
  const renderStep3 = () => {
     // NOTE: Using top-level `agreed` state here

     return (
      <div className="flex flex-col h-full bg-gray-50">
         <div className="px-5 pt-6 pb-24 overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-6">
               계약 내용을<br/>마지막으로 확인해주세요
            </h2>

            {/* Product Summary Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm mb-6 border border-gray-100">
               <h3 className="text-lg font-bold text-gray-900 mb-1">{finalProduct?.name || 'NH 가성비굿 건강보험'}</h3>
               <p className="text-xs text-gray-500 mb-4">{finalProduct?.desc}</p>
               
               <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                     <span className="text-gray-500">계약자</span>
                     <span className="font-medium text-gray-900">{formData.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-gray-500">납입기간</span>
                     <span className="font-medium text-gray-900">20년납 100세만기</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-gray-500">가입금액</span>
                     <span className="font-medium text-gray-900">{coverageAmount.toLocaleString()}만원</span>
                  </div>
               </div>

               <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-700">월 보험료</span>
                  <span className="text-xl font-bold text-blue-600">{calculateTotal().toLocaleString()}원</span>
               </div>
            </div>

            {/* Terms (Positive Friction) */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
               <h4 className="font-bold text-gray-900 mb-4">필수 확인 사항</h4>
               <div className="space-y-4">
                  <div className="flex items-start gap-3">
                     <ShieldCheck size={20} className="text-gray-400 shrink-0 mt-0.5" />
                     <div>
                        <p className="text-sm font-bold text-gray-900">면책기간 안내</p>
                        <p className="text-xs text-gray-500 mt-0.5">가입 후 90일 이내에 진단 시 보장되지 않습니다.</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-3">
                     <FileText size={20} className="text-gray-400 shrink-0 mt-0.5" />
                     <div>
                        <p className="text-sm font-bold text-gray-900">알릴 의무</p>
                        <p className="text-xs text-gray-500 mt-0.5">최근 3개월 내 병원 방문 이력을 정확히 알려주세요.</p>
                     </div>
                  </div>
               </div>

               <div className="mt-6 pt-4 border-t border-gray-100">
                  <label className="flex items-center gap-3 cursor-pointer">
                     <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${agreed ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-300'}`}>
                        <Check size={14} className="text-white" />
                     </div>
                     <input type="checkbox" className="hidden" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                     <span className="text-sm font-bold text-gray-900">위 내용을 모두 확인하였으며 동의합니다</span>
                  </label>
               </div>
            </div>
         </div>
         <BottomButton label="결제하기" disabled={!agreed} onClick={() => setStep(4)} />
      </div>
     );
  };

  // [Step 4] Payment
  const renderStep4 = () => {
    if (paymentStep === 'success') {
       return (
         <div className="flex flex-col h-full items-center justify-center bg-gray-50 px-5 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg animate-bounce">
               <Check size={40} className="text-white" strokeWidth={3} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">가입이 완료되었습니다!</h2>
            <p className="text-gray-500 mb-8 text-sm">김농협님의 안전한 미래를<br/>NH농협손해보험이 함께합니다.</p>

            <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
               <p className="text-xs text-gray-400 mb-1">증권번호</p>
               <p className="text-lg font-mono font-bold text-gray-900 tracking-wider mb-4">2024-12345678</p>
               <div className="h-px bg-gray-100 mb-4"></div>
               <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">상품명</span>
                  <span className="font-bold text-gray-900">{finalProduct?.name}</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span className="text-gray-500">첫 회 보험료</span>
                  <span className="font-bold text-blue-600">{calculateTotal().toLocaleString()}원</span>
               </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
               <button className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg">증권 확인하기</button>
               <button onClick={onBack} className="w-full bg-white text-gray-900 font-bold py-4 rounded-xl border border-gray-200">메인으로 가기</button>
            </div>
         </div>
       );
    }

    return (
       <div className="flex flex-col h-full">
          <div className="px-5 pt-6 pb-24 overflow-y-auto">
             <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-6">
                결제 수단을<br/>선택해주세요
             </h2>
             
             <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
                <div className="flex justify-between items-center mb-2">
                   <span className="text-gray-500 text-sm">결제할 금액</span>
                   <span className="text-xl font-bold text-gray-900">{calculateTotal().toLocaleString()}원</span>
                </div>
                <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-1 rounded font-medium">첫 달 10% 할인 혜택 적용됨</p>
             </div>

             <h3 className="font-bold text-gray-900 mb-3">간편 결제</h3>
             <div className="grid grid-cols-2 gap-3 mb-6">
                {['네이버페이', '카카오페이', '토스페이', '페이코'].map(pay => (
                   <button key={pay} className="bg-white border border-gray-200 rounded-xl py-4 font-bold text-gray-800 hover:border-gray-900 transition-colors">
                      {pay}
                   </button>
                ))}
             </div>

             <h3 className="font-bold text-gray-900 mb-3">일반 결제</h3>
             <div className="flex flex-col gap-3">
                <button className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-4">
                   <CreditCard size={20} className="text-gray-400" />
                   <span className="font-medium text-gray-700">신용/체크카드</span>
                </button>
                <button className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-4">
                   <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center text-[10px] font-serif font-bold text-gray-500">₩</div>
                   <span className="font-medium text-gray-700">실시간 계좌이체</span>
                </button>
             </div>
          </div>
          <BottomButton label={`${calculateTotal().toLocaleString()}원 결제하기`} onClick={() => setPaymentStep('success')} />
       </div>
    );
  };

  const isSuccess = step === 4 && paymentStep === 'success';

  return (
    <div className="flex flex-col min-h-full bg-gray-50 relative">
      {/* Header with Progress (Hidden on Success) */}
      {!isSuccess && (
        <header className="bg-white sticky top-0 z-40 border-b border-gray-100">
           <div className="px-4 py-3 flex items-center justify-between">
              <button onClick={onBack} className="p-1 -ml-1 text-gray-500 hover:bg-gray-100 rounded-full">
                 <ChevronLeft size={24} />
              </button>
              <h1 className="text-sm font-bold text-gray-900">상품 가입</h1>
              <div className="w-8"></div>
           </div>
           {/* Progress Bar */}
           <div className="h-1 w-full bg-gray-100">
              <div className="h-full bg-gray-900 transition-all duration-300" style={{ width: `${progress}%` }}></div>
           </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 relative">
         {step === 1 && renderStep1()}
         {step === 2 && renderStep2()}
         {step === 3 && renderStep3()}
         {step === 4 && renderStep4()}
      </main>
    </div>
  );
};

export default ProductSubscription;
