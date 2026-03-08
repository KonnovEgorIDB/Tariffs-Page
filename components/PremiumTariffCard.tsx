import React from 'react';
import { Tariff } from '../types/tariff';

interface Props {
  tariff: Tariff;
  isSelected: boolean;
  onSelect: () => void;
  isDiscountActive: boolean;
}

export const PremiumTariffCard = ({ tariff, isSelected, onSelect, isDiscountActive }: Props) => {
  const discount = Math.round(((tariff.full_price - tariff.price) / tariff.full_price) * 100);

  return (
    <div 
      onClick={onSelect}
      className={`relative cursor-pointer rounded-[36px] p-6 md:p-8 transition-all duration-300 border-[2px] flex flex-col justify-center
        ${isSelected ? 'border-[#F89336] bg-[#2E2E32]' : 'border-zinc-700 bg-[#29292C] hover:border-zinc-500'}
      `}
    >
      <div className="md:hidden absolute -top-[14px] right-6 flex items-center gap-2 z-10">
        <div className={`bg-[#FF5B5B] text-white px-2 py-0.5 rounded text-[13px] font-bold transition-opacity duration-500 ${isDiscountActive ? 'opacity-100' : 'opacity-0'}`}>
          -{discount}%
        </div>
        <div className="text-[#F89336] font-bold text-[14px] uppercase tracking-wider bg-[#222224] px-1 rounded-sm">хит!</div>
      </div>

      <div className={`hidden md:block absolute -top-[14px] left-8 bg-[#FF5B5B] text-white px-3 py-0.5 rounded text-[13px] font-bold z-10 transition-opacity duration-500 ${isDiscountActive ? 'opacity-100' : 'opacity-0'}`}>
        -{discount}%
      </div>
      
      <div className="hidden md:block absolute top-6 right-8 text-[#F89336] font-bold text-[15px] uppercase tracking-wider">
        хит!
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full mt-2 md:mt-0">
        <div className="flex-1">
          <h3 className="text-[20px] font-medium mb-1 md:mb-2">{tariff.period}</h3>
          <div className="flex flex-col items-start justify-center min-h-[50px]">
            {isDiscountActive ? (
                <>
                  <div className="font-bold text-[36px] md:text-[44px] leading-none text-white">{tariff.price} ₽</div>
                  <div className="text-zinc-500 line-through text-lg mt-1">{tariff.full_price} ₽</div>
                </>
            ) : (
                <div className="font-bold text-[36px] md:text-[44px] leading-none text-white transition-all duration-500">{tariff.full_price} ₽</div>
            )}
          </div>
        </div>
        <div className="flex-1 text-[#A2A2A2] text-[14px] md:text-[15px] leading-snug text-left md:text-right md:pl-8 mt-2 md:mt-0">
          {tariff.text}
        </div>
      </div>
    </div>
  );
};
