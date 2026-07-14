import React from 'react';
import { useTranslation } from 'react-i18next';
import HomeBanner from '../assets/baratham2.png';

const HeroBanner: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative w-full aspect-[16/9] md:aspect-[16/7] lg:aspect-[16/6.5] min-h-[180px] md:min-h-[320px] lg:min-h-[420px] overflow-hidden bg-gradient-to-br from-[#2c1a12] to-[#4A1E14] border-b-4 border-gold">
      <img
        src={HomeBanner}
        alt="Bhakthiyum – Bharathamum 2026 Banner"
        className="w-full h-full object-cover block opacity-60"
      />
      <div className="absolute inset-0 hero-gradient flex flex-col items-center justify-center text-center px-4 py-8">
      
        <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-shadow leading-tight">
          {t('hero.title')}
        </h1>
        <p className="text-white/95 text-sm md:text-base lg:text-xl xl:text-2xl font-semibold text-shadow mt-1 md:mt-3 max-w-3xl">
          {t('hero.subtitle')}
        </p>
      </div>
    </section>
  );
};

export default HeroBanner;