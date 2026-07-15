import React from 'react';
import { useTranslation } from 'react-i18next';

interface StatCardProps {
  icon: string;
  num: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, num, label }) => (
  <div
    className="
      bg-white
      p-2.5 sm:p-3 md:p-5 lg:p-6
      rounded-xl sm:rounded-2xl md:rounded-3xl
      text-center
      border-2
      border-[#D4AF37]
      shadow-[0_8px_24px_rgba(212,175,55,0.15)]
      transition-all
      duration-300
      hover:-translate-y-1 sm:hover:-translate-y-2
      hover:border-[#D4AF37]
      hover:shadow-[0_12px_32px_rgba(212,175,55,0.25)]
    "
  >
    <i className={`${icon} text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#D4AF37] block mb-1.5 sm:mb-2`} />
    <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-extrabold text-maroon block leading-tight">
      {num}
    </span>
    <span className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-gray-600 font-semibold block mt-0.5 sm:mt-1">
      {label}
    </span>
  </div>
);

const StatsBar: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: 'fas fa-calendar-day', num: '09-08-2026', label: t('stats.day') },
    { icon: 'fas fa-clock', num: t('stats.time'), label: t('stats.eventDetails') },
    { icon: 'fas fa-map-marked-alt', num: t('stats.location'), label: t('stats.locationDetail') },
    { icon: 'fas fa-users', num: '1008', label: t('stats.artists') },
  ];

  return (
    <section id="details" className="scroll-mt-20 pt-4 sm:pt-6 md:pt-10 lg:pt-14">
      <div className="container-custom px-2.5 sm:px-3 md:px-4">
        <div className="max-w-[1200px] mx-auto">
          {/* Heading - "Event" in Dark Brown, "Details" in Golden Yellow */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-wide">
              <span className="text-[#6C2E1F]">{t('stats.eventDetails')}</span>
            </h2>
            {/* Decorative line under heading */}
            <div className="w-16 sm:w-20 md:w-28 h-0.5 sm:h-1 bg-gradient-to-r from-maroon-dark to-gold mx-auto mt-2 sm:mt-3 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsBar;