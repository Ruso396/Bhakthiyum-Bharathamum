import React from 'react';
import { useTranslation } from 'react-i18next';

interface StatCardProps {
  icon: string;
  num: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, num, label }) => (
  <div className="bg-white p-4 md:p-5 lg:p-6 rounded-2xl md:rounded-3xl text-center shadow-[0_12px_40px_rgba(108,46,31,0.10)] border-2 border-gold-light transition-all duration-300 hover:-translate-y-2 hover:border-gold">
    <i className={`${icon} text-2xl md:text-3xl text-gold block mb-1 md:mb-2`} />
    <span className="text-base md:text-lg lg:text-xl font-extrabold text-maroon block">{num}</span>
    <span className="text-xs md:text-sm text-gray-600 font-semibold block mt-1">{label}</span>
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
    <section id="details" className="scroll-mt-20 pt-6 md:pt-10 lg:pt-14">
      <div className="container-custom px-3 md:px-4">
        <div className="max-w-[1200px] mx-auto">
          {/* Heading - "Event" in Dark Brown, "Details" in Golden Yellow */}
          <div className="text-center mb-6 md:mb-8 lg:mb-10">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-wide">
              <span className="text-[#6C2E1F]">{t('stats.eventDetails')}</span>
            </h2>
            {/* Decorative line under heading */}
            <div className="w-20 md:w-28 h-1 bg-gradient-to-r from-maroon-dark to-gold mx-auto mt-3 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
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