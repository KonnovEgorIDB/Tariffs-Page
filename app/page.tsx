'use client';

import React, { useState, useEffect } from 'react';
import { Tariff } from '../types/tariff';
import { Header } from '../components/Header';
import { TrainerImage } from '../components/TrainerImage';
import { PremiumTariffCard } from '../components/PremiumTariffCard';
import { StandardTariffCard } from '../components/StandardTariffCard';

export default function TariffsPage() {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isAgreed, setIsAgreed] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTariffs = async () => {
      try {
        const res = await fetch('https://t-core.fit-hub.pro/Test/GetTariffs');
        const data: Tariff[] = await res.json();
        setTariffs(data);
        const bestTariff = data.find((t) => t.is_best);
        if (bestTariff) setSelectedId(`${bestTariff.id}-${bestTariff.period}`);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTariffs();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const isTimerCritical = timeLeft <= 30 && timeLeft > 0;
  const isDiscountActive = timeLeft > 0;

  const handleBuyClick = () => {
    if (!isAgreed) {
      setCheckboxError(true);
      return;
    }
    setCheckboxError(false);
    alert('Переход к оплате!');
  };

  if (isLoading) return <div className="min-h-screen bg-[#222224] flex items-center justify-center text-white">Загрузка...</div>;

  const topTariff = tariffs.find(t => t.period === 'Навсегда');
  const standardTariffs = tariffs.filter(t => t.period !== 'Навсегда').reverse();

  return (
    <div className="min-h-screen bg-[#222224] text-white font-sans relative pb-20 selection:bg-orange-500/30 overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blinkButton { 0%, 49% { background-color: #F89336; color: #000; transform: scale(1); } 50%, 100% { background-color: #e87b1c; color: #000; transform: scale(0.98); } }
        .animate-blink-btn { animation: blinkButton 1s step-end infinite; }
        @keyframes blinkRed { 0%, 49% { color: #ef4444; } 50%, 100% { color: #F89336; } }
        .animate-blink-red { animation: blinkRed 1s step-end infinite; }
      `}} />

      <Header timeLeft={timeLeft} isCritical={isTimerCritical} />

      <main className="max-w-5xl mx-auto pt-24 md:pt-28 px-4 flex flex-col md:flex-row gap-4 md:gap-10">
        
        <h1 className="md:hidden text-[32px] font-bold text-center leading-tight mt-2 z-0 relative">
          Выбери подходящий для себя <br/><span className="text-[#F89336]">тариф</span>
        </h1>

        <TrainerImage />

        <div className="w-full md:w-[60%] flex flex-col order-3 md:order-2 relative z-10">
          <h1 className="hidden md:block text-4xl font-bold mb-8 text-left">
            Выбери подходящий для себя <span className="text-[#F89336]">тариф</span>
          </h1>

          <div className="flex flex-col gap-4">
            {topTariff && (
              <PremiumTariffCard 
                tariff={topTariff} 
                isSelected={selectedId === `${topTariff.id}-${topTariff.period}`}
                onSelect={() => setSelectedId(`${topTariff.id}-${topTariff.period}`)}
                isDiscountActive={isDiscountActive}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              {standardTariffs.map((tariff, index) => (
                <StandardTariffCard 
                  key={`${tariff.id}-${index}`}
                  tariff={tariff} 
                  isSelected={selectedId === `${tariff.id}-${tariff.period}`}
                  onSelect={() => setSelectedId(`${tariff.id}-${tariff.period}`)}
                  isDiscountActive={isDiscountActive}
                />
              ))}
            </div>
          </div>

          <div className="bg-[#2B2B2E] p-4 rounded-[16px] flex items-start gap-4 text-[13px] text-[#A2A2A2] mt-6 border border-zinc-700/50">
            <span className="text-[#F89336] text-xl font-bold leading-none mt-0.5">!</span>
            <p>Следуя плану на 3 месяца и более, люди получают в 2 раза лучший результат, чем за 1 месяц</p>
          </div>

          <div className="mt-6 flex flex-col gap-5">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5">
                <input type="checkbox" className="peer sr-only" checked={isAgreed} onChange={(e) => { setIsAgreed(e.target.checked); if (e.target.checked) setCheckboxError(false); }} />
                <div className={`w-[22px] h-[22px] rounded-[4px] border-[1.5px] transition-colors flex items-center justify-center ${checkboxError ? 'border-red-500 animate-pulse' : 'border-zinc-500 group-hover:border-zinc-400'} ${isAgreed ? '!border-[#F89336] bg-transparent' : 'bg-transparent'}`}>
                  {isAgreed && <svg className="w-4 h-4 text-[#F89336]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>}
                </div>
              </div>
              <p className={`text-[14px] leading-tight mt-[1px] ${checkboxError ? 'text-red-400' : 'text-[#A2A2A2]'}`}>
                Я согласен с <a href="#" className="underline hover:text-white">офертой рекуррентных платежей</a> и <a href="#" className="underline hover:text-white">Политикой конфиденциальности</a>
              </p>
            </label>

            <button onClick={handleBuyClick} className={`w-full font-bold text-[22px] py-[18px] rounded-full transition-transform ${isAgreed ? 'animate-blink-btn' : 'bg-[#F89336] text-black hover:scale-[1.02]'} ${checkboxError && !isAgreed ? '!border-2 !border-red-500 bg-transparent text-red-500' : ''}`}>
              Купить
            </button>
            <p className="text-[12px] text-[#71717A] text-left leading-snug mt-1">
              Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой карты будут сохранены для осуществления покупок дополнительных услуг сервиса в случае желания пользователя.
            </p>
          </div>

          <div className="mt-8 border border-zinc-700 bg-[#29292C]/50 rounded-[32px] p-6 md:p-8">
            <div className="inline-block border border-[#7BD28F] rounded-full px-5 py-2 mb-4 text-[16px] font-medium text-[#7BD28F]">гарантия возврата 30 дней</div>
            <p className="text-[15px] text-white leading-relaxed font-light">Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели! Мы даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки, если ты не получишь видимых результатов.</p>
          </div>

        </div>
      </main>
    </div>
  );
}
