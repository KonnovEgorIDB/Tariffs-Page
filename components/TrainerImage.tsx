import React from 'react';
import Image from 'next/image';

export const TrainerImage = () => {
  return (
    <div className="w-full md:w-[40%] flex justify-center order-2 md:order-1 relative z-20 pointer-events-none md:self-start md:sticky md:top-[100px] -mb-[30px] md:mb-0">
      <Image
        src="/trainer.png"
        alt="Фитнес тренер"
        width={400}
        height={600}
        className="w-auto h-[320px] md:h-[480px] object-contain object-bottom"
        priority
      />
    </div>
  );
};
