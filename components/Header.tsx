import React from 'react';
import { ChevronLeft, Info } from 'lucide-react';

interface HeaderProps {
  title?: string;
  onBack?: () => void;
  showInfo?: boolean;
  rightIcon?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ 
  title = "보험료 계산", 
  onBack,
  showInfo = true,
  rightIcon
}) => {
  return (
    <header className="flex items-center justify-between px-4 py-4 bg-white sticky top-0 z-20">
      <button 
        onClick={onBack}
        className={`p-1 -ml-1 text-gray-800 hover:bg-gray-100 rounded-full transition-colors ${!onBack ? 'invisible' : ''}`}
      >
        <ChevronLeft size={24} />
      </button>
      <h1 className="text-lg font-bold text-gray-900">{title}</h1>
      <div className="flex items-center justify-end min-w-[32px]">
        {rightIcon ? (
          rightIcon
        ) : (
          <button 
            className={`p-1 -mr-1 text-gray-400 hover:text-gray-600 transition-colors ${!showInfo ? 'invisible' : ''}`}
          >
            <Info size={24} strokeWidth={1.5} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;