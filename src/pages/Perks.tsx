import React from 'react';
import { useTranslation } from 'react-i18next';

const Perks: React.FC = () => {
  const { t } = useTranslation();

  const perks = [
    { icon: 'fa-certificate', label: t('perks.certificate') },
    { icon: 'fa-award', label: t('perks.appreciation') },
    { icon: 'fa-medal', label: t('perks.medal') },
    { icon: 'fa-photo-video', label: t('perks.paymentNote') },
  ];

  return (
    <div id="perks" className="container-custom">
      <div className="bg-[#6c2e1f] text-white rounded-2xl md:rounded-3xl lg:rounded-[32px] p-6 md:p-8 lg:p-10 my-8 md:my-10 lg:my-12 shadow-[0_15px_44px_rgba(108,46,31,0.25)] border-2 border-gold">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-center mb-4 md:mb-6 text-gold">
          <i className="fas fa-star text-gold mr-2" />
          {t('perks.title')}
        </h3>
        <ul className="flex flex-wrap justify-center gap-2 md:gap-3 lg:gap-4 list-none">
          {perks.map((perk, index) => (
            <li
              key={index}
              className="bg-white/10 backdrop-blur-sm px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3.5 rounded-full font-semibold text-xs md:text-sm lg:text-base border border-gold/30 transition-all duration-300 hover:bg-gold hover:text-maroon hover:scale-105"
            >
              <i className={`fas ${perk.icon} mr-1 md:mr-2`} />
              {perk.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Perks;