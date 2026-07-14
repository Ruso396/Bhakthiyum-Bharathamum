import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: "ta", label: "தமிழ்" },
    { code: "en", label: "EN" },
  ];

  const currentIndex = languages.findIndex(
    (lang) => lang.code === i18n.language
  );

  const currentLanguage =
    currentIndex >= 0 ? languages[currentIndex] : languages[0];

  const handleLanguageChange = () => {
    const nextIndex = (currentIndex + 1) % languages.length;
    i18n.changeLanguage(languages[nextIndex].code);
  };

  return (
  <button
  onClick={handleLanguageChange}
  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37] text-white font-semibold transition"
>
  <i className="fas fa-globe"></i>
  <span>{currentLanguage.label}</span>
</button>
  );
};

export default LanguageSwitcher;