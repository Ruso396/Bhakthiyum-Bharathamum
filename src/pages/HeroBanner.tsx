import React from 'react';
import { useTranslation } from 'react-i18next';
import HomeBanner from '../assets/baratham2.png';

const HeroBanner: React.FC = () => {
  const { t } = useTranslation();

  return (
<section className="relative w-full aspect-[16/9] sm:aspect-[16/7] md:aspect-[16/7] lg:aspect-[16/5.8] xl:aspect-[16/5.5] min-h-[200px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[520px] xl:min-h-[580px] overflow-hidden bg-gradient-to-br from-[#2c1a12] to-[#4A1E14] border-b-4 border-gold">      {/* Background Image */}
      <img
        src={HomeBanner}
        alt="Bhakthiyum – Bharathamum 2026 Banner"
        className="w-full h-full object-cover block opacity-60"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Main Title - Optimized for all mobile sizes */}
        <h1 className="text-white font-extrabold 
          text-[1.5rem]    /* 320px - 24px */
          xs:text-[1.75rem] /* 375px - 28px */
          sm:text-3xl      /* 640px - 30px */
          md:text-4xl      /* 768px - 36px */
          lg:text-5xl      /* 1024px - 48px */
          xl:text-6xl      /* 1280px - 60px */
          2xl:text-7xl     /* 1536px - 72px */
          text-shadow-lg leading-[1.2] sm:leading-tight
          max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-4xl
          mx-auto
        ">
          {t('hero.title')}
        </h1>
        
        {/* Subtitle - Optimized for all mobile sizes */}
        <p className="text-white/95 font-semibold text-shadow
          text-[0.7rem]    /* 320px - 11.2px */
          xs:text-[0.8rem] /* 375px - 12.8px */
          sm:text-sm       /* 640px - 14px */
          md:text-base     /* 768px - 16px */
          lg:text-lg       /* 1024px - 18px */
          xl:text-xl       /* 1280px - 20px */
          2xl:text-2xl     /* 1536px - 24px */
          mt-1 xs:mt-1.5 sm:mt-2 md:mt-2.5 lg:mt-3
          max-w-[90%] xs:max-w-[85%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-3xl
          mx-auto
          px-1
        ">
          {t('hero.subtitle')}
        </p>
      </div>
    </section>
  );
};

export default HeroBanner;