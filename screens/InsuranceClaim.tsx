
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Search, 
  Check, 
  Camera, 
  MapPin, 
  History, 
  CreditCard, 
  FileText, 
  AlertCircle, 
  X, 
  ChevronDown, 
  ChevronUp,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  MessageSquare
} from 'lucide-react';
import BottomButton from '../components/BottomButton';

interface InsuranceClaimProps {
  onBack: () => void;
}

// --- Mock Data ---
const CONTRACTS = [
  { id: 1, name: 'NH 실손의료비보험', insured: '김농협', status: 'NORMAL', number: '2023-12345678' },
  { id: 2, name: 'NH 헤아림 운전자보험', insured: '김농협', status: 'NORMAL', number: '2024-87654321' },
  { id: 3, name: '무배당 행복가득 저축보험', insured: '김농협', status: 'LAPSED', number: '2020-11223344' }, // 실효
];

const CLAIM_TYPES = [
  { id: 'disease', label: '질병 (입원/통원)', icon: '🏥', desc: '병원 치료를 받으셨나요?' },
  { id: 'injury', label: '상해 (사고)', icon: '🤕', desc: '다쳐서 치료를 받으셨나요?' },
  { id: 'cancer', label: '암 진단', icon: '📝', desc: '암 진단을 받으셨나요?' },
  { id: 'other', label: '기타', icon: '❓', desc: '위 항목에 해당하지 않는 경우' },
];

const BANKS = [
  { id: 'nh', name: '농협' },
  { id: 'kb', name: '국민' },
  { id: 'shinhan', name: '신한' },
  { id: 'woori', name: '우리' },
  { id: 'hana', name: '하나' },
  { id: 'ibk', name: '기업' },
  { id: 'kakao', name: '카카오' },
  { id: 'toss', name: '토스' },
];

const InsuranceClaim: React.FC<InsuranceClaimProps> = ({ onBack }) => {
  const [step, setStep] = useState(1); // 1: Select, 2: Info, 3: Docs, 4: Finish
  const [subStep, setSubStep] = useState(1); // Internal step navigation
  
  // Data State
  const [selectedContract, setSelectedContract] = useState<number | null>(null);
  const [claimType, setClaimType] = useState<string | null>(null);
  
  const [accidentInfo, setAccidentInfo] = useState({
    date: '',
    place: '',
    desc: ''
  });
  
  const [account, setAccount] = useState({
    type: 'existing', // existing, new
    bank: 'nh',
    number: '302-1234-5678-91',
    verified: true
  });

  const [docs, setDocs] = useState<{id: string, name: string, status: 'pending' | 'scanning' | 'uploaded' | 'verified'}[]>([
    { id: 'receipt', name: '진료비 영수증', status: 'pending' },
    { id: 'diagnosis', name: '진단서/처방전', status: 'pending' },
  ]);

  const [showCamera, setShowCamera] = useState(false);
  const [currentScanningDoc, setCurrentScanningDoc] = useState<string | null>(null);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  // --- Helpers ---
  
  const handleNext = () => {
    if (step === 1) {
      if (subStep === 1 && selectedContract) setSubStep(2);
      else if (subStep === 2 && claimType) setStep(2);
    } else if (step === 2) {
      if (subStep === 1) setSubStep(2);
      else if (subStep === 2) setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const autoFillAccident = () => {
    setAccidentInfo({
      date: '2025-01-20 14:30',
      place: '서울시 서대문구 (현재 위치)',
      desc: '계단에서 넘어져 발목 통증 발생'
    });
  };

  const startScanning = (docId: string) => {
    setCurrentScanningDoc(docId);
    setShowCamera(true);
    
    // Simulate OCR & AI Verification
    setTimeout(() => {
      setShowCamera(false);
      setDocs(prev => prev.map(d => d.id === docId ? { ...d, status: 'verified' } : d));
      setCurrentScanningDoc(null);
    }, 3000);
  };

  // --- Render Steps ---

  // [Step 1] Selection
  const renderStep1 = () => {
    if (subStep === 1) {
      return (
        <div className="flex flex-col h-full px-5 pt-4 pb-24">
           <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-2">
             청구하실 계약을<br/>선택해주세요
           </h2>
           <p className="text-sm text-gray-500 mb-6">최근 3년 내 사고만 조회됩니다.</p>

           <div className="flex flex-col gap-3">
              {CONTRACTS.map(c => {
                 const isLapsed = c.status === 'LAPSED';
                 const isSelected = selectedContract === c.id;
                 return (
                   <button 
                     key={c.id}
                     disabled={isLapsed}
                     onClick={() => setSelectedContract(c.id)}
                     className={`text-left p-5 rounded-2xl border transition-all ${
                        isLapsed ? 'bg-gray-100 border-transparent opacity-60' : 
                        isSelected ? 'bg-gray-900 text-white border-gray-900 shadow-lg' : 'bg-white border-gray-200 text-gray-900 hover:border-gray-400'
                     }`}
                   >
                      <div className="flex justify-between items-start mb-2">
                         <span className={`text-xs font-bold px-2 py-0.5 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                           {c.status === 'NORMAL' ? '정상' : '실효(청구불가)'}
                         </span>
                         {isSelected && <CheckCircle2 size={18} className="text-green-400" />}
                      </div>
                      <h3 className="text-lg font-bold mb-1">{c.name}</h3>
                      <p className={`text-xs ${isSelected ? 'text-gray-400' : 'text-gray-500'}`}>{c.number} | {c.insured}</p>
                   </button>
                 );
              })}
           </div>
           
           <div className="mt-6 text-center">
              <button className="text-sm text-gray-500 underline decoration-gray-300">
                 피보험자가 본인이 아닌가요? (대리청구)
              </button>
           </div>

           <BottomButton label="다음" disabled={!selectedContract} onClick={handleNext} />
        </div>
      );
    }
    
    // Type Selection
    return (
      <div className="flex flex-col h-full px-5 pt-4 pb-24">
         <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-6">
           어떤 사고로<br/>청구하시나요?
         </h2>

         <div className="grid grid-cols-2 gap-3">
            {CLAIM_TYPES.map(type => (
               <button 
                 key={type.id}
                 onClick={() => setClaimType(type.id)}
                 className={`p-5 rounded-2xl border flex flex-col items-center justify-center text-center gap-3 transition-all h-40 ${
                    claimType === type.id 
                    ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' 
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                 }`}
               >
                  <span className="text-3xl">{type.icon}</span>
                  <div>
                     <span className="block font-bold text-gray-900 mb-1">{type.label}</span>
                     <span className="block text-xs text-gray-500 break-keep">{type.desc}</span>
                  </div>
               </button>
            ))}
         </div>
         
         <div className="mt-4 flex justify-center">
            <button className="flex items-center gap-1 text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">
               <AlertCircle size={12} />
               어떤 유형인지 모르겠어요
            </button>
         </div>

         <BottomButton label="다음" disabled={!claimType} onClick={handleNext} />
      </div>
    );
  };

  // [Step 2] Info Input
  const renderStep2 = () => {
    if (subStep === 1) {
       return (
         <div className="flex flex-col h-full px-5 pt-4 pb-24">
            <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-6">
               사고 정보를<br/>입력해주세요
            </h2>

            <div className="space-y-6">
               {/* Date */}
               <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">사고 일시</label>
                  <input 
                    type="datetime-local" 
                    value={accidentInfo.date}
                    onChange={(e) => setAccidentInfo({...accidentInfo, date: e.target.value})}
                    className="w-full p-4 bg-gray-50 rounded-xl text-gray-900 border border-gray-100 focus:bg-white focus:border-gray-900 outline-none transition-colors"
                  />
               </div>

               {/* Place */}
               <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">사고 장소</label>
                  <div className="relative">
                     <input 
                       type="text" 
                       placeholder="예: 서울시 중구 자택"
                       value={accidentInfo.place}
                       onChange={(e) => setAccidentInfo({...accidentInfo, place: e.target.value})}
                       className="w-full p-4 bg-gray-50 rounded-xl text-gray-900 border border-gray-100 focus:bg-white focus:border-gray-900 outline-none transition-colors pr-12"
                     />
                     <button 
                        onClick={() => setAccidentInfo({...accidentInfo, place: '서울시 서대문구 충정로'})}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                     >
                        <MapPin size={20} />
                     </button>
                  </div>
               </div>

               {/* Desc */}
               <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">사고 내용</label>
                  <textarea 
                     rows={4}
                     placeholder="예: 계단에서 넘어져 발목을 다쳤습니다."
                     value={accidentInfo.desc}
                     onChange={(e) => setAccidentInfo({...accidentInfo, desc: e.target.value})}
                     className="w-full p-4 bg-gray-50 rounded-xl text-gray-900 border border-gray-100 focus:bg-white focus:border-gray-900 outline-none transition-colors resize-none"
                  />
               </div>

               {/* Auto Fill Trigger */}
               <button 
                  onClick={autoFillAccident}
                  className="flex items-center gap-2 text-blue-600 text-xs font-bold bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors w-fit"
               >
                  <History size={14} />
                  최근 이력으로 자동 입력
               </button>
            </div>

            <BottomButton 
              label="다음" 
              disabled={!accidentInfo.date || !accidentInfo.place || !accidentInfo.desc} 
              onClick={handleNext} 
            />
         </div>
       );
    }

    // Account Selection
    return (
      <div className="flex flex-col h-full px-5 pt-4 pb-24">
         <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-6">
            보험금을 받을 계좌를<br/>알려주세요
         </h2>

         {/* Existing Account */}
         <div 
           onClick={() => setAccount({...account, type: 'existing'})}
           className={`p-5 rounded-2xl border cursor-pointer mb-4 transition-all ${account.type === 'existing' ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-900'}`}
         >
            <div className="flex justify-between items-center mb-1">
               <span className="text-sm font-bold">이전에 사용한 계좌</span>
               {account.type === 'existing' && <CheckCircle2 size={18} className="text-green-400" />}
            </div>
            <div className="text-lg font-bold">농협 302-1234-5678-91</div>
            <div className={`text-xs mt-1 ${account.type === 'existing' ? 'text-gray-400' : 'text-gray-500'}`}>김농협</div>
         </div>

         {/* New Account Accordion */}
         <div className={`rounded-2xl border overflow-hidden transition-all ${account.type === 'new' ? 'border-gray-900 bg-white ring-1 ring-gray-900' : 'border-gray-200 bg-white'}`}>
            <button 
               onClick={() => setAccount({...account, type: 'new'})}
               className="w-full p-5 flex justify-between items-center bg-white"
            >
               <span className="font-bold text-gray-900">새 계좌 등록하기</span>
               {account.type === 'new' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {account.type === 'new' && (
               <div className="px-5 pb-5 pt-0 bg-white">
                  <p className="text-xs text-gray-500 mb-3">은행 선택</p>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                     {BANKS.map(b => (
                        <button 
                           key={b.id}
                           onClick={() => setAccount({...account, bank: b.id})}
                           className={`py-2 rounded-lg text-xs font-medium border ${account.bank === b.id ? 'bg-gray-100 border-gray-400 text-gray-900' : 'bg-white border-gray-100 text-gray-500'}`}
                        >
                           {b.name}
                        </button>
                     ))}
                  </div>
                  <input 
                     type="text" 
                     placeholder="계좌번호 입력 ('-' 제외)"
                     className="w-full p-3 bg-gray-50 rounded-xl text-sm mb-2 focus:outline-none"
                  />
                  <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                     <CheckCircle2 size={12} />
                     예금주 실명 확인 완료: 김농협
                  </div>
               </div>
            )}
         </div>

         <BottomButton label="다음" onClick={handleNext} />
      </div>
    );
  };

  // [Step 3] Docs
  const renderStep3 = () => {
    // OCR Camera Overlay
    if (showCamera) {
       return (
         <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
            <div className="w-full max-w-[90%] aspect-[3/4] border-2 border-white/50 rounded-xl relative overflow-hidden mb-8">
               <div className="absolute inset-0 border-t-2 border-blue-500 animate-scan"></div>
               {/* Grid Guidelines */}
               <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                  <div className="border-r border-b border-white/20"></div>
                  <div className="border-r border-b border-white/20"></div>
                  <div className="border-b border-white/20"></div>
                  <div className="border-r border-b border-white/20"></div>
                  <div className="border-r border-b border-white/20"></div>
                  <div className="border-b border-white/20"></div>
                  <div className="border-r border-white/20"></div>
                  <div className="border-r border-white/20"></div>
                  <div></div>
               </div>
               <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">서류의 네 모서리를 맞춰주세요</span>
               </div>
            </div>
            <div className="text-white text-center">
               <Camera className="mx-auto mb-4 p-4 bg-white rounded-full text-black cursor-pointer active:scale-95 transition-transform" size={72} strokeWidth={1.5} />
               <p className="text-sm font-medium">자동으로 인식됩니다</p>
            </div>
            <button 
               onClick={() => setShowCamera(false)}
               className="absolute top-4 right-4 text-white p-2"
            >
               <X size={24} />
            </button>
         </div>
       );
    }

    const allVerified = docs.every(d => d.status === 'verified');

    return (
       <div className="flex flex-col h-full px-5 pt-4 pb-24">
          <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-2">
             다음 서류를<br/>준비해주세요
          </h2>
          <p className="text-sm text-gray-500 mb-6">AI가 서류를 자동으로 분류하고 검사합니다.</p>

          <div className="flex flex-col gap-4">
             {docs.map(doc => (
                <div key={doc.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                   <div className="p-4 flex justify-between items-center">
                      <div>
                         <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-gray-900">{doc.name}</span>
                            <span className="text-[10px] bg-red-50 text-red-500 font-bold px-1.5 py-0.5 rounded">필수</span>
                         </div>
                         {doc.status === 'verified' ? (
                            <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                               <CheckCircle2 size={12} /> AI 검수 완료 (금액 인식됨)
                            </p>
                         ) : (
                            <p className="text-xs text-gray-400">촬영 또는 파일 업로드가 필요합니다</p>
                         )}
                      </div>
                      
                      {doc.status === 'verified' ? (
                         <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center relative">
                            <FileText size={24} className="text-gray-400" />
                            <button 
                               onClick={() => setDocs(prev => prev.map(d => d.id === doc.id ? { ...d, status: 'pending' } : d))}
                               className="absolute -top-2 -right-2 bg-gray-200 text-gray-500 rounded-full p-1"
                            >
                               <X size={12} />
                            </button>
                         </div>
                      ) : (
                         <button 
                           onClick={() => startScanning(doc.id)}
                           className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white shadow-md active:scale-90 transition-transform"
                         >
                            <Camera size={20} />
                         </button>
                      )}
                   </div>
                </div>
             ))}

             {/* Auto-generated Doc Info */}
             <div className="bg-blue-50 rounded-xl p-4 flex gap-3 items-start">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shrink-0 mt-0.5">
                   <Check size={12} className="text-blue-600" />
                </div>
                <div>
                   <p className="text-sm font-bold text-gray-900">가족관계증명서 자동 발급</p>
                   <p className="text-xs text-blue-600 mt-0.5">공공 마이데이터 연동으로 별도 제출이 필요 없습니다.</p>
                </div>
             </div>
          </div>

          <BottomButton label={allVerified ? "청구 제출하기" : "서류를 모두 등록해주세요"} disabled={!allVerified} onClick={handleNext} />
       </div>
    );
  };

  // [Step 4] Finish & Status
  const renderStep4 = () => {
     return (
        <div className="flex flex-col h-full bg-gray-50 px-5 pt-8 overflow-y-auto">
           {/* Success Header */}
           <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
                 <Check size={40} className="text-white" strokeWidth={3} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">청구가 완료되었습니다</h2>
              <p className="text-gray-500 text-sm">접수번호: 2026-0122-0001</p>
           </div>

           {/* Timeline Tracker */}
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center justify-between">
                 진행 상태
                 <span className="text-xs font-normal text-blue-600 bg-blue-50 px-2 py-1 rounded">예상 심사 기간: 3일</span>
              </h3>
              
              <div className="relative pl-4 space-y-8 before:absolute before:left-[21px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                 {/* Step 1: Active */}
                 <div className="relative flex gap-4">
                    <div className="absolute -left-[21px] w-3 h-3 rounded-full bg-green-500 ring-4 ring-white"></div>
                    <div>
                       <p className="text-sm font-bold text-gray-900">청구 접수 완료</p>
                       <p className="text-xs text-gray-400 mt-0.5">2026.01.22 14:30</p>
                    </div>
                 </div>

                 {/* Step 2: Processing */}
                 <div className="relative flex gap-4">
                    <div className="absolute -left-[21px] w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white animate-pulse"></div>
                    <div>
                       <p className="text-sm font-bold text-blue-600">서류 심사 중</p>
                       <p className="text-xs text-gray-400 mt-0.5">담당자가 서류를 확인하고 있습니다.</p>
                       <div className="mt-2 bg-gray-50 p-3 rounded-lg text-xs text-gray-600 flex gap-2">
                          <MessageSquare size={14} className="shrink-0 mt-0.5" />
                          "제출해주신 영수증 금액을 확인 중입니다."
                       </div>
                    </div>
                 </div>

                 {/* Step 3: Pending */}
                 <div className="relative flex gap-4 opacity-40">
                    <div className="absolute -left-[21px] w-3 h-3 rounded-full bg-gray-300 ring-4 ring-white"></div>
                    <div>
                       <p className="text-sm font-bold text-gray-900">지급 승인</p>
                       <p className="text-xs text-gray-400 mt-0.5">심사 완료 후 진행</p>
                    </div>
                 </div>

                 {/* Step 4: Pending */}
                 <div className="relative flex gap-4 opacity-40">
                    <div className="absolute -left-[21px] w-3 h-3 rounded-full bg-gray-300 ring-4 ring-white"></div>
                    <div>
                       <p className="text-sm font-bold text-gray-900">보험금 지급</p>
                       <p className="text-xs text-gray-400 mt-0.5">승인 후 2일 이내</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Est Amount */}
           <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-8">
              <div className="flex justify-between items-center mb-1">
                 <span className="text-sm text-gray-500">지급 예상 금액</span>
                 <span className="text-lg font-bold text-gray-900">약 145,000원</span>
              </div>
              <p className="text-[10px] text-gray-400 text-right">*심사 결과에 따라 달라질 수 있습니다.</p>
           </div>

           <div className="flex flex-col gap-3 pb-8">
              <button className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg">
                 진행 상태 상세 보기
              </button>
              <button onClick={onBack} className="w-full bg-white text-gray-900 font-bold py-4 rounded-xl border border-gray-200">
                 메인으로 가기
              </button>
           </div>
        </div>
     );
  };

  return (
    <div className="flex flex-col min-h-full bg-white relative">
      {/* Header with Progress (Only for steps 1-3) */}
      {step < 4 && (
         <header className="bg-white sticky top-0 z-40 border-b border-gray-100">
            <div className="px-4 py-3 flex items-center justify-between">
               <button onClick={step === 1 && subStep === 1 ? onBack : () => {
                  if (subStep === 2) setSubStep(1);
                  else if (step > 1) setStep(step - 1);
               }} className="p-1 -ml-1 text-gray-500 hover:bg-gray-100 rounded-full">
                  <ChevronLeft size={24} />
               </button>
               <h1 className="text-sm font-bold text-gray-900">보험금 청구</h1>
               <div className="w-8"></div>
            </div>
            <div className="h-1 w-full bg-gray-100">
               <div className="h-full bg-gray-900 transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
         </header>
      )}

      <main className="flex-1 relative bg-white">
         {step === 1 && renderStep1()}
         {step === 2 && renderStep2()}
         {step === 3 && renderStep3()}
         {step === 4 && renderStep4()}
      </main>
    </div>
  );
};

export default InsuranceClaim;
