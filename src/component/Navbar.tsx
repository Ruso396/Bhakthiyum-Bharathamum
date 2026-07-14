// components/Navbar.tsx
import React from 'react';

const navLinks = [
  { label: 'நிகழ்வு முன்னோட்டம்', href: '#video', icon: 'fas fa-video' },
  { label: 'படத்தொகுப்பு தருணங்கள்', href: '#gallery', icon: 'fas fa-images' },
  { label: 'நிகழ்வு விவரங்கள்', href: '#details', icon: 'fas fa-info-circle' },
  { label: 'பதிவு செய்க', href: '#register', icon: 'fas fa-pen-alt' },
];

const Navbar: React.FC = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/97 backdrop-blur-custom border-b-3 border-gold py-3 shadow-[0_4px_24px_rgba(108,46,31,0.08)]">
      <div className="container-custom flex items-center justify-center flex-wrap gap-1 md:gap-2 lg:gap-3">
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
    </header>
  );
};

export default Navbar;
