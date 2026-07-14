import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: React.FC = () => {
  const { t } = useTranslation();

  const navLinks = [
    { label: t('nav.eventPreview'), href: '#video', icon: 'fas fa-video' },
    { label: t('nav.register'), href: '#register', icon: 'fas fa-pen-alt' },
    { label: t('nav.eventDetails'), href: '#details', icon: 'fas fa-info-circle' },
  ];

 const handleClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string
) => {
  e.preventDefault();

  const target = document.querySelector(href) as HTMLElement;

  if (target) {
    const headerHeight = 80; // உங்கள் header height

    const elementPosition =
      target.getBoundingClientRect().top + window.pageYOffset;

    const offsetPosition = elementPosition - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/97 backdrop-blur-custom border-b-3 border-gold py-3 shadow-[0_4px_24px_rgba(108,46,31,0.08)]">
      <div className="container-custom flex items-center justify-between flex-wrap gap-2">
        {/* Left side - Brand or empty for centering */}
        <div className="w-12 md:w-20"></div>

        {/* Center - Navigation Links */}
        <div className="flex items-center justify-center flex-wrap gap-1 md:gap-2 lg:gap-3 flex-1">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="
                flex items-center gap-1.5 md:gap-2
                px-3 md:px-4 lg:px-5 py-2 md:py-2.5
                text-xs md:text-sm lg:text-base font-bold
                text-maroon
                rounded-full
                transition-all duration-300
                hover:bg-gold hover:text-white
                hover:-translate-y-0.5
                active:scale-95
              "
            >
              <i className={`${link.icon} text-gold text-xs md:text-sm lg:text-base`}></i>
              <span>{link.label}</span>
            </a>
          ))}
        </div>

        {/* Right side - Language Switcher */}
        <div className="w-12 md:w-20 flex justify-end">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Navbar;