import React from 'react';
import Header from '../components/Header';
import { ChevronRight, Layout } from 'lucide-react';

interface ScreenListProps {
  screens:Array<{ id: string; title: string }>;
  onNavigate: (screenId: string) => void;
}

const ScreenList: React.FC<ScreenListProps> = ({ screens, onNavigate }) => {
  return (
    <>
      <Header title="화면 목록" showInfo={false} />
      
      <main className="flex-1 px-5 py-6">
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-400 mb-2">PAGES</h2>
          <div className="flex flex-col gap-3">
            {screens.map((screen) => (
              <button
                key={screen.id}
                onClick={() => onNavigate(screen.id)}
                className="flex items-center justify-between w-full p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-gray-200 hover:shadow-md transition-all active:scale-[0.99]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600">
                    <Layout size={20} />
                  </div>
                  <span className="text-lg font-bold text-gray-800">{screen.title}</span>
                </div>
                <ChevronRight size={20} className="text-gray-300" />
              </button>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
            <p className="text-xs text-gray-300">Design System Applied</p>
        </div>
      </main>
    </>
  );
};

export default ScreenList;