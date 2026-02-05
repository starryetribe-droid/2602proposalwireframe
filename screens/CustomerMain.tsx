import React, { useState } from 'react';
import {
   Menu,
   Bell,
   ChevronRight,
   Coins,
   CreditCard,
   Landmark,
   FileText
} from 'lucide-react';

interface CustomerMainProps {
   onBack: () => void;
}

const CustomerMain: React.FC<CustomerMainProps> = ({ onBack }) => {
   const [simpleMode, setSimpleMode] = useState(true);

   return (
      <div className="flex flex-col min-h-full bg-white pb-10">

         {/* Header - Design System Match */}
         <header className="px-4 py-4 sticky top-0 z-30 flex justify-between items-center bg-white border-b border-gray-100 gap-2">
            <h1
               className="text-xl font-bold text-gray-900 tracking-tight cursor-pointer shrink-0"
               onClick={onBack}
            >
               NH농협손해보험
            </h1>

            <div className="flex items-center gap-2 shrink-0">
               {/* Toggle Button - Dark Navy Pill Style */}
               <button
                  onClick={() => setSimpleMode(!simpleMode)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${simpleMode ? 'bg-[#1b1b29] text-white' : 'bg-gray-100 text-gray-500'}`}
               >
                  <div className={`w-2.5 h-2.5 rounded-full ${simpleMode ? 'bg-[#2ecc71]' : 'bg-gray-400'}`}></div>
                  <span className="text-sm font-bold pt-0.5">{simpleMode ? '간편모드 ON' : 'OFF'}</span>
               </button>

               <button className="text-gray-900 p-2 relative">
                  <Bell size={24} strokeWidth={1.5} />
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white"></span>
               </button>
               <button className="text-gray-900 p-2 -mr-2">
                  <Menu size={24} strokeWidth={1.5} />
               </button>
            </div>
         </header>

         <main className="flex-1 flex flex-col px-5 pt-6 gap-8">

            {/* Greeting Section */}
            <section>
               <p className="text-base text-gray-500 font-medium mb-1">오늘도 안전한 하루 되세요</p>
               <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                  <span className="text-[#0055ce]">김농협</span> 고객님,<br />안녕하세요! 😊
               </h2>
            </section>

            {/* Contract Status Card - Hero Style (Dark Navy) with updated content */}
            <section className="bg-[#1b1b29] rounded-[1.5rem] p-6 text-white shadow-xl relative overflow-hidden group active:scale-[0.99] transition-transform">
               {/* Decorative Blur */}
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-gray-700 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

               <div className="relative z-10">
                  <div className="flex justify-between items-center mb-5">
                     <h3 className="text-lg font-bold text-white">
                        내 보험
                     </h3>
                     <ChevronRight size={20} className="text-gray-400" />
                  </div>

                  {/* Inner Box mimicking the structure of the attached image but with Dark System styles */}
                  <div className="bg-white/10 rounded-xl p-5 border border-white/10 backdrop-blur-sm">
                     <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-xl font-bold text-white">NH 헤아림 운전자보험</span>
                        <span className="bg-transparent border border-white text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                           정상 유지
                        </span>
                     </div>
                     <p className="text-lg font-medium text-gray-300">
                        다음 납입일<br />
                        <span className="font-bold text-white underline decoration-2 underline-offset-4 decoration-white">10월 25일</span> (5일 남음)
                     </p>
                  </div>
               </div>
            </section>

            {/* Ongoing Tasks Card - White Card Style */}
            <section className="bg-white border border-gray-200 rounded-[1.5rem] p-6 shadow-sm active:scale-[0.99] transition-transform">
               <h3 className="text-lg font-bold text-gray-900 mb-4">보험금 청구 상태</h3>

               <div className="flex items-center gap-3 mb-6">
                  <p className="text-base font-bold text-gray-900 leading-snug">보험금 심사가 진행 중이에요.</p>
               </div>

               {/* Timeline */}
               <div className="relative flex items-center justify-between px-2">
                  {/* Line */}
                  <div className="absolute left-6 right-6 top-[15px] h-1 bg-gray-100 -z-10"></div>
                  <div className="absolute left-6 right-[50%] top-[15px] h-1 bg-[#0055ce] -z-10"></div>

                  {/* Step 1 */}
                  <div className="flex flex-col items-center gap-2">
                     <div className="w-8 h-8 rounded-full bg-[#0055ce] flex items-center justify-center text-white ring-4 ring-white z-10">
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                     </div>
                     <span className="text-sm font-bold text-gray-900">접수</span>
                  </div>

                  {/* Step 2 (Active) */}
                  <div className="flex flex-col items-center gap-2">
                     <div className="w-8 h-8 rounded-full bg-white border-2 border-[#0055ce] flex items-center justify-center ring-4 ring-white z-10">
                        <div className="w-2.5 h-2.5 bg-[#0055ce] rounded-full animate-pulse"></div>
                     </div>
                     <span className="text-sm font-bold text-[#0055ce]">심사중</span>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center gap-2">
                     <div className="w-8 h-8 rounded-full bg-gray-200 ring-4 ring-white z-10"></div>
                     <span className="text-sm font-medium text-gray-400">지급</span>
                  </div>
               </div>
            </section>

            {/* Core Menu Grid - Shortcuts Style */}
            <section className="pb-8">
               <div className="grid grid-cols-2 gap-3">
                  <button className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-start gap-4 hover:border-gray-400 hover:shadow-md transition-all active:scale-[0.98] group h-40">
                     <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900 group-hover:bg-[#1b1b29] group-hover:text-white transition-colors shrink-0">
                        <Coins size={24} strokeWidth={1.5} />
                     </div>
                     <div className="text-left mt-auto">
                        <p className="font-bold text-gray-900 text-base leading-tight">보험금<br />청구</p>
                     </div>
                  </button>

                  <button className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-start gap-4 hover:border-gray-400 hover:shadow-md transition-all active:scale-[0.98] group h-40">
                     <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900 group-hover:bg-[#1b1b29] group-hover:text-white transition-colors shrink-0">
                        <CreditCard size={24} strokeWidth={1.5} />
                     </div>
                     <div className="text-left mt-auto">
                        <p className="font-bold text-gray-900 text-base leading-tight">보험료<br />납입</p>
                     </div>
                  </button>

                  <button className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-start gap-4 hover:border-gray-400 hover:shadow-md transition-all active:scale-[0.98] group h-40">
                     <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900 group-hover:bg-[#1b1b29] group-hover:text-white transition-colors shrink-0">
                        <Landmark size={24} strokeWidth={1.5} />
                     </div>
                     <div className="text-left mt-auto">
                        <p className="font-bold text-gray-900 text-base leading-tight">보험계약<br />대출</p>
                     </div>
                  </button>

                  <button className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-start gap-4 hover:border-gray-400 hover:shadow-md transition-all active:scale-[0.98] group h-40">
                     <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900 group-hover:bg-[#1b1b29] group-hover:text-white transition-colors shrink-0">
                        <FileText size={24} strokeWidth={1.5} />
                     </div>
                     <div className="text-left mt-auto">
                        <p className="font-bold text-gray-900 text-base leading-tight">증명서<br />발급</p>
                     </div>
                  </button>
               </div>
            </section>

         </main>
      </div>
   );
};

export default CustomerMain;