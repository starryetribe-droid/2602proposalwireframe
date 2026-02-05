
import React from 'react';
import { 
  Search, 
  FileText, 
  User, 
  ChevronRight, 
  MessageCircle,
  FileSignature,
  Folder,
  Headphones,
  CheckCircle2,
  Globe,
  ToggleLeft,
  ArrowRight,
  HelpCircle,
  LogIn
} from 'lucide-react';

interface TaskMainProps {
  onBack: () => void;
}

const TaskMain: React.FC<TaskMainProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-24 relative">
      
      {/* [Zone 1] Minimal Header */}
      <header className="px-5 py-4 bg-white sticky top-0 z-20 flex justify-between items-center border-b border-gray-100">
        <h1 
            className="text-lg font-bold text-gray-900 tracking-tight cursor-pointer"
            onClick={onBack}
        >
            NH농협손해보험
        </h1>
        <button className="flex items-center gap-1 text-sm font-bold text-gray-900 border border-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-50 transition-colors">
             <LogIn size={14} />
             로그인
        </button>
      </header>

      <main className="flex-1 flex flex-col gap-8 px-5 pt-6">
        
        {/* [Zone 2] Universal Search Bar */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">
            무엇을<br/>도와드릴까요?
          </h2>
          
          <div className="relative mb-3">
            <input 
                type="text" 
                placeholder="보험금 청구 방법, 암보험 등" 
                className="w-full pl-5 pr-12 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all text-base"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-900 p-1 bg-gray-100 rounded-full">
                <Search size={20} />
            </button>
          </div>

          {/* Recent/Popular Keywords */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {['#보험금청구', '#여행자보험', '#내보험조회'].map((tag) => (
                <button key={tag} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-500 whitespace-nowrap active:bg-gray-50">
                    {tag}
                </button>
            ))}
          </div>
        </section>

        {/* [Zone 3] Task Portal Cards (2x2 Grid) */}
        <section>
            <div className="grid grid-cols-2 gap-3">
                {/* 1. Join Product */}
                <button className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start gap-4 active:scale-[0.98] transition-transform group hover:border-gray-300">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                        <FileSignature size={20} />
                    </div>
                    <div className="text-left">
                        <span className="block text-base font-bold text-gray-900 mb-1">상품 가입하기</span>
                        <span className="text-xs text-gray-500">나에게 맞는 보험 찾기</span>
                    </div>
                </button>

                {/* 2. Claim */}
                <button className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start gap-4 active:scale-[0.98] transition-transform group hover:border-gray-300">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                        <FileText size={20} />
                    </div>
                    <div className="text-left">
                        <span className="block text-base font-bold text-gray-900 mb-1">보험금 청구하기</span>
                        <span className="text-xs text-gray-500">간편하게 청구하세요</span>
                    </div>
                </button>

                {/* 3. Manage */}
                <button className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start gap-4 active:scale-[0.98] transition-transform group hover:border-gray-300">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                        <Folder size={20} />
                    </div>
                    <div className="text-left">
                        <span className="block text-base font-bold text-gray-900 mb-1">내 보험 관리하기</span>
                        <span className="text-xs text-gray-500">계약 조회 및 변경</span>
                    </div>
                </button>

                {/* 4. Consult */}
                <button className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start gap-4 active:scale-[0.98] transition-transform group hover:border-gray-300">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                        <Headphones size={20} />
                    </div>
                    <div className="text-left">
                        <span className="block text-base font-bold text-gray-900 mb-1">보험 상담하기</span>
                        <span className="text-xs text-gray-500">상담원과 연결</span>
                    </div>
                </button>
            </div>
        </section>

        {/* [Zone 4] Popular Products Carousel */}
        <section>
            <div className="flex justify-between items-center mb-3 px-1">
                <h3 className="text-lg font-bold text-gray-900">많이 찾는 보험</h3>
                <button className="text-xs font-medium text-gray-400 flex items-center gap-0.5 hover:text-gray-900">
                    전체 상품 보기 <ChevronRight size={14} />
                </button>
            </div>

            <div className="flex overflow-x-auto gap-3 pb-4 -mx-5 px-5 no-scrollbar snap-x snap-mandatory">
                {[
                    { name: 'NH 가성비굿 건강보험', benefit: '암 진단 시 최대 5천만원', price: '월 15,000원~' },
                    { name: 'NH 헤아림 운전자보험', benefit: '교통사고 처리지원금 보장', price: '월 12,000원~' },
                    { name: '다이렉트 해외여행보험', benefit: '휴대품 손해 완벽 보장', price: '일 3,500원~' },
                ].map((item, idx) => (
                    <div key={idx} className="snap-center shrink-0 w-[200px] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group cursor-pointer active:scale-[0.98] transition-transform">
                        {/* Thumbnail Placeholder */}
                        <div className="h-28 bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                            <span className="text-xs text-gray-400">상품 이미지</span>
                        </div>
                        <div className="p-4">
                            <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">{item.name}</h4>
                            <p className="text-xs text-gray-500 mb-3 line-clamp-1">{item.benefit}</p>
                            <p className="text-sm font-bold text-gray-900">{item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* [Zone 5] First-Timer Guide Banner */}
        <section>
             <div className="bg-indigo-50 rounded-2xl p-5 flex items-center justify-between relative overflow-hidden">
                <div className="relative z-10">
                    <h4 className="font-bold text-gray-900 mb-1 text-lg">보험이 처음이신가요?</h4>
                    <p className="text-xs text-gray-600 mb-3">나에게 꼭 필요한 보장만 찾아보세요</p>
                    <button className="bg-indigo-600 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors">
                        보장 분석 시작
                    </button>
                </div>
                {/* Illustration Placeholder */}
                <div className="w-20 h-20 bg-white/50 rounded-full flex items-center justify-center shrink-0 border border-white/50">
                    <HelpCircle size={32} className="text-indigo-300" />
                </div>
             </div>
        </section>

        {/* [Zone 6] Login Incentive Section (Conditional) */}
        <section className="bg-white -mx-5 px-5 py-8 border-t border-gray-100">
             <div className="text-center mb-6">
                 <h3 className="text-lg font-bold text-gray-900 mb-2">로그인하고 더 많은 혜택을 받으세요</h3>
                 <div className="flex justify-center gap-2 mb-6">
                    <div className="flex items-center gap-1">
                        <CheckCircle2 size={12} className="text-green-500" />
                        <span className="text-xs text-gray-500">간편 청구</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <CheckCircle2 size={12} className="text-green-500" />
                        <span className="text-xs text-gray-500">보험 관리</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <CheckCircle2 size={12} className="text-green-500" />
                        <span className="text-xs text-gray-500">맞춤 추천</span>
                    </div>
                 </div>
                 
                 <div className="flex flex-col gap-3">
                    <button className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold text-sm shadow-md active:scale-[0.99] transition-transform">
                        로그인하기
                    </button>
                    <button className="w-full bg-yellow-400 text-gray-900 py-3.5 rounded-xl font-bold text-sm shadow-sm active:scale-[0.99] transition-transform">
                        카카오로 3초만에 시작하기
                    </button>
                 </div>
             </div>
        </section>

        {/* [Zone 8] Footer with Accessibility Options */}
        <footer className="px-5 pb-8 text-center bg-gray-50">
            <div className="flex flex-col gap-4 items-center">
                {/* Switches */}
                <div className="flex gap-3 w-full max-w-xs justify-center">
                   <button className="flex-1 flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                      <div className="flex items-center gap-2">
                         <Globe size={14} className="text-gray-500" />
                         <span className="text-xs font-medium text-gray-700">한국어</span>
                      </div>
                      <ChevronRight size={14} className="text-gray-400" />
                   </button>
                   <button className="flex-1 flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                      <span className="text-xs font-medium text-gray-700">간편모드</span>
                      <ToggleLeft size={24} className="text-gray-300" />
                   </button>
                </div>

                {/* Links */}
                <div className="flex justify-center gap-4 text-xs text-gray-400 mt-2">
                    <button className="hover:text-gray-600">고객센터</button>
                    <span className="w-px h-3 bg-gray-300 self-center"></span>
                    <button className="hover:text-gray-600">이용약관</button>
                    <span className="w-px h-3 bg-gray-300 self-center"></span>
                    <button className="hover:text-gray-600">개인정보처리방침</button>
                </div>
            </div>
        </footer>

      </main>

      {/* [Zone 7] Floating Chatbot Button */}
      <div className="fixed bottom-6 right-5 z-30">
        <button className="flex items-center justify-center w-14 h-14 bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 transition-all active:scale-95 group relative">
            <MessageCircle size={24} className="text-white" />
            {/* Tooltip */}
            <div className="absolute right-full mr-3 bg-white px-3 py-1.5 rounded-lg shadow-md border border-gray-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <span className="text-xs font-bold text-gray-900">무엇을 도와드릴까요?</span>
                <div className="absolute top-1/2 -right-1 w-2 h-2 bg-white transform rotate-45 -translate-y-1/2 border-t border-r border-gray-100"></div>
            </div>
        </button>
      </div>

    </div>
  );
};

export default TaskMain;
