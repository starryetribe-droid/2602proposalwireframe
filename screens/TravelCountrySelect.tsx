import React, { useState } from 'react';
import Header from '../components/Header';
import BottomButton from '../components/BottomButton';
import { Home, Info } from 'lucide-react';

interface TravelCountrySelectProps {
  onBack: () => void;
}

const POPULAR_COUNTRIES = ['일본', '베트남', '태국', '필리핀', '대만', '중국', '미국', '호주', '인도네시아'];

const TravelCountrySelect: React.FC<TravelCountrySelectProps> = ({ onBack }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setSearchText(country);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    // If user types, clear explicit selection unless it matches exactly
    if (selectedCountry && e.target.value !== selectedCountry) {
        setSelectedCountry(null);
    }
  };

  return (
    <>
      <Header 
        title="여행정보" 
        onBack={onBack} 
        rightIcon={
          <button className="p-1 -mr-1 text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
            <Home size={24} strokeWidth={1.5} />
          </button>
        }
      />
      
      <main className="flex-1 px-5 pt-4 pb-32 flex flex-col">
        <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
          어느 나라로<br/>여행가세요?
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          여러 나라를 여행한다면, 그 중 한 곳을 알려주세요.
        </p>

        {/* Search Input */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="나라명 입력"
            value={searchText}
            onChange={handleInputChange}
            className="w-full px-5 py-4 bg-gray-50 rounded-2xl text-lg text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
          />
        </div>

        {/* Popular Countries Chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {POPULAR_COUNTRIES.map((country) => {
            const isSelected = selectedCountry === country;
            return (
              <button
                key={country}
                onClick={() => handleCountrySelect(country)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                  isSelected
                    ? 'border-gray-900 bg-white text-gray-900 ring-1 ring-gray-900'
                    : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                }`}
              >
                {country}
              </button>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="flex items-start gap-2.5 px-1">
          <Info size={18} className="text-gray-400 mt-0.5 shrink-0" />
          <p className="text-xs text-gray-500 leading-relaxed">
            입력한 여행 국가를 포함하여 모든 국가에서 보장받을 수 있어요. (외교부에서 지정한 출국권고/여행금지 지역 제외)
          </p>
        </div>
      </main>

      <BottomButton 
        disabled={!searchText} 
        onClick={() => alert(`다음 단계로 이동: ${searchText}`)}
      />
    </>
  );
};

export default TravelCountrySelect;