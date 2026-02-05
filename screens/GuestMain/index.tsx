import React, { useState } from 'react';
import { 
  Search, 
  Menu, 
  Fingerprint, 
  FolderOpen, 
  AlertTriangle, 
  FileSearch, 
  Phone, 
  Megaphone, 
  ChevronRight,
  KeyRound,
  Grid3x3
} from 'lucide-react';

interface GuestMainProps {
  onBack: () => void;
}

const GuestMain: React.FC<GuestMainProps> = ({ onBack }) => {
  // Default to ON as requested
  const [simpleMode, setSimpleMode] = useState(true);

  return (
    <div className="flex flex-col min-h-full bg-white relative pb-10">
      
      {/* Header */}
      <header className="px-4 py-4 bg-white sticky top-0 z-30 flex justify-between items-center border-b border-gray-100 gap-2">
        <h1 
            className="text-xl font-bold text-gray-900 tracking-tight cursor-pointer shrink-0"
            onClick={onBack}
        >
            NH농협손해보험
        </h1>
        
        <div className="flex items-center gap-2 shrink-0">
          {/* Simple Mode Toggle */}
          <button 
            onClick={() => setSimpleMode(!simpleMode)}
            className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-all ${simpleMode ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-200 text-gray-500'}`}
          >
             <div className={`w-4 h-4 rounded-full transition-colors border ${simpleMode ? 'bg-green-400 border-green-400' : 'bg-gray-200 border-gray-300'}`}></div>
             <span className="text-base font-bold leading-none pt-0.5 whitespace-nowrap">{simpleMode ? '간편모드 ON' : '간편모드 OFF'}</span>
          </button>

           <button className="text-gray-900 p-1">
             <Search size={28} strokeWidth={1.5} />
          </button>
          <button className="text-gray-900 p-1 mr-1">
             <Menu size={28} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col px-5 pt-6">
        
        {/* Welcome Section */}
        <section className="mb-6 shrink-0">
           <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl animate-bounce">👋</span>
              <h2 className="text-3xl font-bold text-gray-900">반갑습니다!</h2>
           </div>
           <p className="text-gray-500 text-base leading-relaxed">
             로그인하시면<br/>
             내 보험 정보를 바로 확인할 수 있어요
           </p>
        </section>

        {/* Login Card */}
        <section className="mb-10 shrink-0 relative z-10">
           <button className="w-full bg-gray-900 rounded-[1.5rem] p-6 text-white shadow-xl relative overflow-hidden group active:scale-[0.99] transition-transform text-left block">
              {/* Decorative Blur */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gray-800 rounded-full blur-3xl opacity-50 pointer-events-none group-hover:opacity-70 transition-opacity"></div>
              
              <div className="relative z-10 flex flex-col justify-between gap-6">
                 <div>
                    <h3 className="text-2xl font-bold mb-2">쉬운 로그인</h3>
                    <p className="text-gray-400 text-base font-medium">지문, 간편번호, 패턴으로 손쉽게 로그인할 수 있어요</p>
                 </div>
                 <div className="self-end flex gap-3">
                    <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                        <Fingerprint size={28} className="text-white" />
                    </div>
                    <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                        <KeyRound size={28} className="text-white" />
                    </div>
                    <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                        <Grid3x3 size={28} className="text-white" />
                    </div>
                 </div>
              </div>
           </button>
        </section>

        {/* Quick Actions Grid */}
        <section className="mb-8 shrink-0 relative z-0">
           <h3 className="text-xl font-bold text-gray-900 mb-4">바로 가기</h3>
           <div className="grid grid-cols-2 gap-3">
              <button className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-start gap-4 hover:border-gray-400 hover:shadow-md transition-all active:scale-[0.98] group h-full">
                 <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-colors shrink-0">
                    <FolderOpen size={24} />
                 </div>
                 <div className="text-left">
                    <p className="font-bold text-gray-900 text-base leading-tight">보험금<br/>청구 안내</p>
                 </div>
              </button>

              <button className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-start gap-4 hover:border-gray-400 hover:shadow-md transition-all active:scale-[0.98] group h-full">
                 <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors shrink-0">
                    <AlertTriangle size={24} />
                 </div>
                 <div className="text-left">
                    <p className="font-bold text-gray-900 text-base leading-tight">고장/사고<br/>접수</p>
                 </div>
              </button>

              <button className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-start gap-4 hover:border-gray-400 hover:shadow-md transition-all active:scale-[0.98] group h-full">
                 <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-colors shrink-0">
                    <FileSearch size={24} />
                 </div>
                 <div className="text-left">
                    <p className="font-bold text-gray-900 text-base leading-tight">내게 맞는<br/>보험 찾기</p>
                 </div>
              </button>

              <button className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-start gap-4 hover:border-gray-400 hover:shadow-md transition-all active:scale-[0.98] group h-full">
                 <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-colors shrink-0">
                    <Phone size={24} />
                 </div>
                 <div className="text-left">
                    <p className="font-bold text-gray-900 text-base leading-tight">전화 상담<br/>연결</p>
                 </div>
              </button>
           </div>
        </section>

        {/* Notice Banner */}
        <section className="shrink-0 pb-8">
           <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 border border-gray-100 shadow-sm active:scale-[0.99] transition-transform cursor-pointer">
              <div className="shrink-0 text-blue-600">
                 <Megaphone size={24} />
              </div>
              <div className="flex-1 min-w-0">
                 <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-base font-bold bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded">안내</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="text-base text-gray-400 truncate">2024.05.20</span>
                 </div>
                 <p className="text-base font-bold text-gray-800">보험금 청구 서류, 미리 준비하세요!</p>
              </div>
              <ChevronRight size={20} className="text-gray-400 shrink-0" />
           </div>
        </section>

      </main>
    </div>
  );
};

export default GuestMain;