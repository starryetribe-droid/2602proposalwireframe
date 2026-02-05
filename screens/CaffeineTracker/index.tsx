import React, { useState } from 'react';
import Header from '../../components/Header';
import { ChevronLeft, ChevronRight, Moon, Zap, Coffee, Calendar } from 'lucide-react';

interface CaffeineTrackerProps {
  onBack: () => void;
}

const CaffeineTracker: React.FC<CaffeineTrackerProps> = ({ onBack }) => {
  // Mock Data
  const MAX_CAFFEINE = 400;
  const currentCaffeine = 245;
  const percentage = Math.min((currentCaffeine / MAX_CAFFEINE) * 100, 100);

  const historyData = [
    { id: 1, time: '14:30', brand: '스타벅스', menu: '아이스 아메리카노 (Tall)', amount: 150 },
    { id: 2, time: '10:15', brand: '동서식품', menu: '카누 디카페인 스틱 1개', amount: 4 },
    { id: 3, time: '08:30', brand: '성수동 커피랩', menu: '디카페인 카페라떼', amount: 10 },
  ];

  return (
    <>
      <Header
        title="카페인 리포트"
        onBack={onBack}
        rightIcon={
          <button className="p-1 -mr-1 text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
            <Calendar size={24} strokeWidth={1.5} />
          </button>
        }
      />

      <main className="flex-1 px-5 pb-8 flex flex-col bg-white">

        {/* Header: Date Controller */}
        <div className="flex items-center justify-center py-6 mb-2">
          <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <span className="mx-4 text-lg font-bold text-gray-900">2024년 5월 22일 (수)</span>
          <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Section 1: Summary Card */}
        <section className="mb-8">
          <div className="bg-gray-900 rounded-[2rem] p-7 shadow-lg text-white relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gray-800 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-sm font-medium text-gray-400 mb-2">오늘의 총 카페인 섭취량</h2>

              <div className="flex items-end gap-2 mb-6">
                <span className="text-5xl font-bold tracking-tight">{currentCaffeine}</span>
                <span className="text-xl font-medium text-gray-400 mb-1">/ {MAX_CAFFEINE} mg</span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              <div className="flex items-start gap-2 mt-2">
                <div className="mt-0.5">😊</div>
                <p className="text-sm text-gray-300 leading-snug">
                  오늘 수면 시간(11PM)까지 안전해요!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Timeline History */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-lg font-bold text-gray-900">섭취 기록</h3>
            <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
              {historyData.length}건
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {historyData.map((item, index) => (
              <div key={item.id} className="relative flex gap-5 group">
                {/* Time Column */}
                <div className="flex flex-col items-center">
                  <span className="text-xs font-semibold text-gray-500 w-10 text-center">{item.time}</span>
                  {/* Vertical Line */}
                  {index !== historyData.length - 1 && (
                    <div className="w-px h-full bg-gray-200 my-1"></div>
                  )}
                </div>

                {/* Content Card */}
                <div className="flex-1 pb-4">
                  <div className="bg-gray-50 rounded-2xl p-5 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-bold text-gray-500 mb-1 block">{item.brand}</span>
                      <span className="text-sm font-bold text-gray-900">{item.amount}mg</span>
                    </div>
                    <h4 className="text-base font-medium text-gray-800">{item.menu}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Analysis Report */}
        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-4 px-1">분석 리포트</h3>
          <div className="grid grid-cols-2 gap-3">
            {/* Left Card */}
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                <Zap size={16} fill="currentColor" />
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">현재 체내 잔류량</p>
                <p className="text-lg font-bold text-gray-900">약 120mg</p>
              </div>
            </div>

            {/* Right Card */}
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white">
                <Moon size={16} fill="currentColor" />
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">예상 소멸 시간</p>
                <p className="text-lg font-bold text-gray-900">오전 03:00</p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default CaffeineTracker;