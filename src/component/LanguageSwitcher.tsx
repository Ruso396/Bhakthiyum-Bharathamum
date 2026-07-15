import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const isTamil = i18n.language === "ta";

  const handleLanguageChange = () => {
    i18n.changeLanguage(isTamil ? "en" : "ta");
  };

  return (
   <button
  onClick={handleLanguageChange}
  className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:opacity-90"
  style={{ backgroundColor: "#6c2e1f" }}
>
  <i
    className="fas fa-globe"
    style={{ color: "#ffff" }}
  ></i>

  <span style={{ color: "#ffff" }}>
    {isTamil ? "EN" : "தமிழ்"}
  </span>
</button>
  );
};

export default LanguageSwitcher;