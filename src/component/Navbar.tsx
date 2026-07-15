import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: t('nav.register'), href: '#register', icon: 'fas fa-pen-alt' },
    { label: t('nav.eventPreview'), href: '#video', icon: 'fas fa-video' },
    { label: t('nav.eventDetails'), href: '#details', icon: 'fas fa-info-circle' },
  ];

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const target = document.querySelector(href) as HTMLElement;

    if (target) {
      const headerHeight = 80;
      const elementPosition =
        target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream/97 backdrop-blur-custom border-b-3 border-gold py-3 shadow-[0_4px_24px_rgba(108,46,31,0.08)]">
        <div className="container-custom flex items-center justify-between flex-wrap gap-2">
          {/* Left side - Hamburger Menu for mobile */}
          <div className="flex items-center gap-2">
            {/* Mobile Toggle Button - visible only on small screens */}
            <button
              onClick={toggleMenu}
              className="
                lg:hidden
                flex flex-col items-center justify-center
                w-10 h-10
                rounded-full
                bg-gold/10
                hover:bg-gold/20
                transition-all duration-300
                focus:outline-none
                relative
              "
              aria-label="Toggle menu"
            >
              {/* Hamburger/Close Icon */}
              <span className={`
                block w-5 h-0.5 bg-maroon absolute
                transition-all duration-300 ease-in-out
                ${isMenuOpen ? 'rotate-45 top-5' : 'rotate-0 top-3'}
              `}></span>
              <span className={`
                block w-5 h-0.5 bg-maroon absolute
                transition-all duration-300 ease-in-out
                ${isMenuOpen ? 'opacity-0' : 'opacity-100 top-5'}
              `}></span>
              <span className={`
                block w-5 h-0.5 bg-maroon absolute
                transition-all duration-300 ease-in-out
                ${isMenuOpen ? '-rotate-45 top-5' : 'rotate-0 top-7'}
              `}></span>
            </button>
          </div>

          {/* Center - Navigation Links - Visible in Desktop, Hidden in Mobile */}
          <div className="hidden lg:flex items-center justify-center flex-1 gap-1 md:gap-2 lg:gap-3">
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

          {/* Brand/Logo - Visible in Mobile */}
          <div className="flex-1 text-center lg:hidden">
            <span className="text-maroon font-bold text-sm md:text-base">
              {/* Add your brand name or logo here */}
            </span>
          </div>

          {/* Right side - Language Switcher */}
          <div className="flex items-center">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Menu Panel - Opens when toggle is clicked - NO GAP */}
        <div
          className={`
            lg:hidden
            absolute left-0 right-0
            bg-cream/98 backdrop-blur-custom
            border-b-3 border-gold
            shadow-[0_8px_32px_rgba(108,46,31,0.12)]
            transition-all duration-300 ease-in-out
            overflow-hidden
            ${isMenuOpen ? 'max-h-96 opacity-100 visible' : 'max-h-0 opacity-0 invisible'}
          `}
          style={{
            top: '100%', // Directly under header - NO GAP
          }}
        >
          <div className="container-custom py-4 flex flex-col items-center gap-2">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="
                  flex items-center gap-3
                  w-full max-w-xs
                  px-6 py-3
                  text-sm font-bold
                  text-maroon
                  rounded-full
                  transition-all duration-300
                  hover:bg-gold hover:text-white
                  hover:-translate-y-0.5
                  active:scale-95
                  justify-center
                "
              >
                <i className={`${link.icon} text-gold text-base`}></i>
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Overlay to close menu when clicking outside */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;