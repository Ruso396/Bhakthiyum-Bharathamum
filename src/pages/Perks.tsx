import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Perks: React.FC = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Totall-ah 4 points (including the payment/banner note info dynamically rolled)
  const perks = [
    { 
      icon: 'fa-certificate', 
      label: t('perks.certificate'),
      desc: 'Official world record certification from Patanjali Book of World Records'
    },
    { 
      icon: 'fa-award', 
      label: t('perks.appreciation'),
      desc: 'Personalized appreciation certificate recognizing your contribution'
    },
    { 
      icon: 'fa-medal', 
      label: t('perks.medal'),
      desc: 'Sri Rajendra Cholan Memorial Medal as a token of honor'
    },
    { 
      icon: 'fa-photo-video', 
      label: t('perks.paymentNote'),
      desc: t('qr.limitedSeats')
    },
  ];

  const handleNext = () => {
    if (isFading) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % perks.length);
      setIsFading(false);
    }, 300);
  };

  const handlePrev = () => {
    if (isFading) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + perks.length) % perks.length);
      setIsFading(false);
    }, 300);
  };

  return (
    <div id="perks" className="container-custom px-4 my-8 md:my-12">
      
      {/* Premium Maroon Banner Layout containing all 4 Points natively */}
      <div className="
        relative
        bg-gradient-to-r
        from-[#6c2e1f]
        via-[#7a3424]
        to-[#5c2417]
        rounded-2xl
        md:rounded-3xl
        p-6
        md:p-8
        lg:p-10
        shadow-[0_15px_40px_rgba(108,46,31,0.35)]
        border-2
        border-gold/50
        overflow-hidden
      ">
        {/* Subtle Luxury Background Glows */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gold/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Navigation Controls: Left Arrow */}
          <button 
            onClick={handlePrev}
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-black/20 border border-gold/30 text-gold hover:bg-gold hover:text-maroon transition-all duration-300"
            aria-label="Previous perk"
          >
            <i className="fas fa-chevron-left text-sm"></i>
          </button>

          {/* Active Sliding Point Block */}
          <div className="flex-1 flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left w-full">
            {/* Dynamic Shield Icon Visualizer */}
            <div className={`
              w-14 h-14 md:w-16 md:h-16
              flex-shrink-0
              rounded-full
              bg-gold/20
              border-2
              border-gold
              flex
              items-center
              justify-center
              shadow-[0_0_15px_rgba(212,175,55,0.2)]
              transition-all duration-300 transform
              ${isFading ? 'scale-75 opacity-0' : 'scale-100 opacity-100'}
            `}>
              <i className={`fas ${perks[activeIndex].icon} text-gold text-xl md:text-2xl`}></i>
            </div>

            {/* Fading Content Text */}
            <div className={`flex-1 transition-all duration-300 ${isFading ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
              <div className="inline-block text-[10px] bg-gold/20 border border-gold/40 text-gold px-2 py-0.5 rounded font-black tracking-widest mb-1 uppercase">
                Perk 0{activeIndex + 1} / 04
              </div>
              <h4 className="text-white font-extrabold text-lg md:text-xl lg:text-2xl tracking-wide mb-1">
                {perks[activeIndex].label}
              </h4>
              <p className="text-gold/80 text-xs md:text-sm font-medium max-w-xl">
                {perks[activeIndex].desc}
              </p>
            </div>
          </div>

          {/* Mobile Navigation Row & Action Call To Action Block */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto mt-2 md:mt-0 justify-center md:justify-end">
            
            {/* Mobile-only Chevron Navigation Buttons */}
            <div className="flex md:hidden gap-3 mb-2 sm:mb-0">
              <button 
                onClick={handlePrev} 
                className="w-10 h-10 rounded-full bg-black/20 border border-gold/30 text-gold active:bg-gold active:text-maroon flex items-center justify-center"
              >
                <i className="fas fa-arrow-left"></i>
              </button>
              <button 
                onClick={handleNext} 
                className="w-10 h-10 rounded-full bg-black/20 border border-gold/30 text-gold active:bg-gold active:text-maroon flex items-center justify-center"
              >
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>

            {/* Desktop-only Right Arrow Control */}
            <button 
              onClick={handleNext}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-black/20 border border-gold/30 text-gold hover:bg-gold hover:text-maroon transition-all duration-300 mr-2"
              aria-label="Next perk"
            >
              <i className="fas fa-chevron-right text-sm"></i>
            </button>

            {/* Register Action Button */}
            <a
              href="#register"
              className="
                w-full sm:w-auto
                inline-flex
                items-center
                justify-center
                gap-2
                bg-gold
                text-maroon
                px-6
                py-3
                rounded-full
                font-black
                text-sm
                tracking-wider
                shadow-[0_4px_15px_rgba(212,175,55,0.3)]
                transition-all
                duration-300
                hover:bg-white
                hover:scale-105
                active:scale-95
              "
            >
              <span>{t('qr.registerNow')}</span>
              <i className="fas fa-arrow-right text-xs"></i>
            </a>
          </div>

        </div>
        
        {/* Visual Line Indicators under the slider */}
        <div className="flex justify-center gap-1.5 mt-5 md:mt-6">
          {perks.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-gold' : 'w-1.5 bg-white/20'}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Perks;