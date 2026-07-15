import React from 'react';
import { useTranslation } from 'react-i18next';

const Perks: React.FC = () => {
  const { t } = useTranslation();

  // Only payment note remains
  const perks = [
    { 
      icon: 'fa-photo-video', 
      label: t('perks.paymentNote')
    },
  ];

  return (
    <div id="perks" className="container-custom px-4 my-8 md:my-12">
      
      {/* Premium Maroon Banner Layout containing Payment Note */}
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
          
          {/* Payment Note Block - Centered */}
          <div className="flex-1 flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left w-full justify-center">
            {/* Shield Icon Visualizer */}
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
            `}>
              <i className={`fas ${perks[0].icon} text-gold text-xl md:text-2xl`}></i>
            </div>

            {/* Payment Note Content */}
            <div className="flex-1">
              <h4 className="text-white font-extrabold text-lg md:text-xl lg:text-2xl tracking-wide mb-1">
                {perks[0].label}
              </h4>
            </div>
          </div>

          {/* Action Call To Action Block */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto mt-2 md:mt-0 justify-center md:justify-end">
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
        
        {/* Visual Line Indicators - Only 1 dot now */}
        <div className="flex justify-center gap-1.5 mt-5 md:mt-6">
          <div className="h-1.5 w-6 rounded-full bg-gold" />
        </div>

      </div>
    </div>
  );
};

export default Perks;