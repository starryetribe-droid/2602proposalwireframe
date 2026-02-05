import React from 'react';

interface BottomButtonProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const BottomButton: React.FC<BottomButtonProps> = ({ 
  label = "다음", 
  onClick, 
  disabled = false 
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full max-w-[375px] mx-auto p-4 bg-gradient-to-t from-white via-white to-transparent z-30">
      <button 
        onClick={onClick}
        disabled={disabled}
        className={`w-full font-bold text-lg py-4 rounded-xl transition-all active:scale-[0.99] shadow-lg ${
          disabled 
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
            : 'bg-gray-900 text-white hover:bg-gray-800'
        }`}
      >
        {label}
      </button>
    </div>
  );
};

export default BottomButton;