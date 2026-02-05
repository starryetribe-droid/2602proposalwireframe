
import React from 'react';
import {
  Menu,
  Bell,
  Settings,
  User,
  ChevronRight,
  Shield,
  CreditCard,
  RefreshCw,
  FileCheck,
  FileText,
  Search,
  Phone,
  Globe,
  Type,
  Layers,
  AlertCircle
} from 'lucide-react';

interface RelationshipMainProps {
  onBack: () => void;
}

const RelationshipMain: React.FC<RelationshipMainProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-10">
      {/* [Zone 1] Header (Global Navigation Bar) */}
      <header className="px-5 py-4 bg-white sticky top-0 z-30 border-b border-gray-100 flex justify-between items-center">
        <button className="text-gray-800 p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors">
          <Menu size={24} />
        </button>
        <h1 
            className="text-lg font-bold text-gray-900 tracking-tight cursor-pointer" 
            onClick={onBack}
        >
          NH농협손해보험
        </h1>
        <div className="flex gap-3">
          <button className="text-gray-800 relative p-1 hover:bg-gray-100 rounded-full transition-colors">
            <Bell size={24} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <button className="text-gray-800 p-1 hover:bg-gray-100 rounded-full transition-colors">
            <Settings size={24} />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col gap-8 px-5 pt-6">

        {/* [Zone 2] User Welcome Area */}
        <section className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                 김농협님,<br/>안녕하세요
               </h2>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 text-xs font-semibold text-gray-700">
              보유 계약 3건
            </span>
          </div>
          <button className="w-14 h-14 rounded-full bg-gray-200 border-4 border-white shadow-sm flex items-center justify-center overflow-hidden">
             <User size={28} className="text-gray-400" />
          </button>
        </section>

        {/* [Zone 3] My Insurance Status Card */}
        <section>
          <div className="flex justify-between items-end mb-3 px-1">
             <h3 className="text-lg font-bold text-gray-900">나의 보험 현황</h3>
             <button className="text-xs font-medium text-gray-500 flex items-center hover:text-gray-800 transition-colors">
               전체보기 <ChevronRight size={14} />
             </button>
          </div>
          
          {/* Snap Container */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-5 px-5 no-scrollbar">
             {/* Card 1 */}
             <div className="snap-center shrink-0 w-[300px] bg-gray-900 rounded-[1.5rem] p-6 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-800 rounded-full blur-3xl opacity-50 -mr-10 -mt-10 pointer-events-none group-hover:opacity-70 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-1 rounded-full border border-green-500/20">정상 유지 중</span>
                    <button><ChevronRight size={20} className="text-gray-400 group-hover:text-white transition-colors" /></button>
                  </div>
                  <h4 className="text-xl font-bold mb-1">NH 헤아림 운전자보험</h4>
                  <p className="text-gray-400 text-sm mb-6">2025.12.31 만기</p>
                  <div className="flex items-center justify-between border-t border-gray-800 pt-4">
                     <div>
                        <p className="text-xs text-gray-400 mb-0.5">다음 납입일</p>
                        <p className="text-sm font-semibold">10월 25일</p>
                     </div>
                     <div className="text-right">
                        <p className="text-xs text-gray-400 mb-0.5">납입 금액</p>
                        <p className="text-sm font-semibold">12,500원</p>
                     </div>
                  </div>
                </div>
             </div>

             {/* Card 2 */}
             <div className="snap-center shrink-0 w-[300px] bg-white border border-gray-200 rounded-[1.5rem] p-6 text-gray-900 shadow-sm relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-full border border-gray-200">정상 유지 중</span>
                    <button><ChevronRight size={20} className="text-gray-300 group-hover:text-gray-500 transition-colors" /></button>
                  </div>
                  <h4 className="text-xl font-bold mb-1">NH 가성비굿 건강보험</h4>
                  <p className="text-gray-500 text-sm mb-6">2040.05.20 만기</p>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                     <div>
                        <p className="text-xs text-gray-400 mb-0.5">다음 납입일</p>
                        <p className="text-sm font-semibold">10월 25일</p>
                     </div>
                     <div className="text-right">
                        <p className="text-xs text-gray-400 mb-0.5">납입 금액</p>
                        <p className="text-sm font-semibold">54,200원</p>
                     </div>
                  </div>
                </div>
             </div>
          </div>
        </section>

        {/* [Zone 4] Action Required Banner */}
        <section>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center justify-between shadow-sm active:scale-[0.99] transition-transform cursor-pointer">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600 shrink-0">
                   <AlertCircle size={20} />
                </div>
                <div>
                   <p className="text-sm font-bold text-gray-900">청구 가능한 보험금이 있어요</p>
                   <p className="text-xs text-blue-600 font-medium mt-0.5">미청구금 확인하기</p>
                </div>
             </div>
             <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-sm hover:bg-blue-700 transition-colors shrink-0">
                청구하기
             </button>
          </div>
        </section>

        {/* [Zone 5] Quick Action Grid */}
        <section>
           <h3 className="text-lg font-bold text-gray-900 mb-3 px-1">주요 업무</h3>
           <div className="grid grid-cols-2 gap-3">
              {[
                { label: '보험금 청구', sub: '간편 서류 촬영', icon: Shield },
                { label: '보험료 납입', sub: '즉시 출금/결제', icon: CreditCard },
                { label: '계약 변경', sub: '정보 수정', icon: RefreshCw },
                { label: '증명서 발급', sub: 'PDF 저장/전송', icon: FileCheck },
              ].map((item, idx) => (
                <button 
                  key={idx}
                  className="bg-gray-900 p-5 rounded-2xl shadow-md flex flex-col items-start gap-4 hover:bg-gray-800 transition-all active:scale-[0.98]"
                >
                   <div className="w-10 h-10 rounded-xl bg-gray-800 text-white flex items-center justify-center border border-gray-700">
                      <item.icon size={20} />
                   </div>
                   <div className="text-left">
                      <p className="font-bold text-white text-base">{item.label}</p>
                      <p className="text-xs text-gray-400 mt-1">{item.sub}</p>
                   </div>
                </button>
              ))}
           </div>
        </section>

        {/* [Zone 6] Personalized Insurance Recommendation */}
        <section>
           <h3 className="text-lg font-bold text-gray-900 mb-3 px-1">김농협님께 추천하는 보장</h3>
           <div className="flex overflow-x-auto gap-3 pb-4 -mx-5 px-5 no-scrollbar">
              {[
                 { title: '암 진단비 보장 업그레이드', desc: '치료비 부담 줄이는 든든한 준비', price: '월 12,000원~' },
                 { title: '해외여행 안심 플랜', desc: '휴대품 손해부터 배상책임까지', price: '일 3,500원~' },
                 { title: '치아보험 특약 추가', desc: '임플란트, 보철치료 걱정 없이', price: '월 8,000원~' },
              ].map((card, i) => (
                 <div key={i} className="shrink-0 w-[240px] bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-[160px] active:scale-[0.98] transition-transform">
                    <div>
                       <h4 className="font-bold text-gray-900 leading-snug mb-2">{card.title}</h4>
                       <p className="text-xs text-gray-500 break-keep">{card.desc}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                       <span className="text-sm font-bold text-gray-900">{card.price}</span>
                       <button className="text-xs font-medium text-gray-500 underline decoration-gray-300">자세히 보기</button>
                    </div>
                 </div>
              ))}
           </div>
        </section>

        {/* [Zone 7] Service Navigation Menu */}
        <section className="py-2">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex justify-between">
               {[
                 { label: '상품 둘러보기', icon: Search },
                 { label: '보험 가이드', icon: FileText },
                 { label: '보장 분석', icon: Shield },
                 { label: '고객센터', icon: Phone },
               ].map((menu, i) => (
                 <button key={i} className="flex flex-col items-center gap-2 group w-1/4">
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-gray-100 transition-colors">
                       <menu.icon size={20} />
                    </div>
                    <span className="text-xs font-medium text-gray-600">{menu.label}</span>
                 </button>
               ))}
            </div>
        </section>
        
        {/* [Zone 8] Footer with Accessibility Options */}
        <footer className="mt-4 border-t border-gray-200 pt-8 pb-10 text-center">
            {/* Accessibility Buttons */}
            <div className="flex justify-center gap-3 mb-8">
               <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-300 transition-colors">
                  <Globe size={14} />
                  Language
               </button>
               <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-300 transition-colors">
                  <Type size={14} />
                  큰글씨
               </button>
               <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-300 transition-colors">
                  <Layers size={14} />
                  간편모드
               </button>
            </div>

            {/* Links */}
            <div className="flex justify-center gap-4 text-xs text-gray-400 mb-4">
               <button className="hover:text-gray-600">이용약관</button>
               <span className="w-px h-3 bg-gray-300 self-center"></span>
               <button className="hover:text-gray-600">개인정보처리방침</button>
               <span className="w-px h-3 bg-gray-300 self-center"></span>
               <button className="hover:text-gray-600">회사소개</button>
            </div>
            
            <p className="text-[10px] text-gray-300">
               © NH NongHyup Property & Casualty Insurance Company, Inc.
            </p>
        </footer>

      </main>
    </div>
  );
};

export default RelationshipMain;
