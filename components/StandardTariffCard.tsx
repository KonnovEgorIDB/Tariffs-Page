import React from 'react';
import { Tariff } from '../types/tariff';

interface Props {
  tariff: Tariff;
  isSelected: boolean;
  onSelect: () => void;
  isDiscountActive: boolean;
}

export const StandardTariffCard = ({ tariff, isSelected, onSelect, isDiscountActive }: Props) => {
  const discount = Math.round(((tariff.full_price - tariff.price) / tariff.full_price) * 100);

  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-[32px] p-6 relative transition-all duration-300 border-[2px]
        ${isSelected ? 'border-[#F89336] bg-[#2E2E32]' : 'border-zinc-700 bg-[#29292C] hover:border-zinc-500'}
      `}
    >
      <div className={`md:hidden absolute -top-[14px] right-6 bg-[#FF5B5B] text-white px-2 py-0.5 rounded text-[13px] font-bold z-10 transition-opacity duration-500 ${isDiscountActive ? 'opacity-100' : 'opacity-0'}`}>
        -{discount}%
      </div>

      <div className={`hidden md:block absolute -top-[14px] left-6 bg-[#FF5B5B] text-white px-2 py-0.5 rounded text-[13px] font-bold z-10 transition-opacity duration-500 ${isDiscountActive ? 'opacity-100' : 'opacity-0'}`}>
        -{discount}%
      </div>

      <div className="flex flex-row md:flex-col justify-between items-center md:items-start gap-4">
        <div className="flex-1 md:w-full">
          <h3 className="text-[18px] font-medium mb-1 md:mb-3">{tariff.period}</h3>
          <div className="flex flex-col items-start min-h-[50px] justify-center">
            {isDiscountActive ? (
              <>
                <div className="font-bold text-[30px] md:text-[34px] leading-none text-white">{tariff.price} ₽</div>
                <div className="text-zinc-500 line-through text-[15px] mt-1">{tariff.full_price} ₽</div>
              </>
            ) : (
                <div className="font-bold text-[30px] md:text-[34px] leading-none text-white transition-all duration-500">{tariff.full_price} ₽</div>
            )}
          </div>
        </div>
        <div className="flex-1 md:w-full text-[#A2A2A2] text-[13px] leading-tight text-left md:mt-2">
          {tariff.text}
        </div>
      </div>
    </div>
  );
};
