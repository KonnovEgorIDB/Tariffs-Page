import React from 'react';

interface HeaderProps {
  timeLeft: number;
  isCritical: boolean;
}

export const Header = ({ timeLeft, isCritical }: HeaderProps) => {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <header className="fixed top-0 left-0 w-full bg-[#2B4338] py-3 z-50 flex justify-center items-center gap-2 text-[15px] font-medium shadow-md">
      <span className="text-white">Успейте открыть пробную неделю</span>
      <span className={`text-[#F89336] font-bold tracking-widest ${isCritical ? 'animate-blink-red' : ''}`}>
        + {minutes} : {seconds} +
      </span>
    </header>
  );
};
