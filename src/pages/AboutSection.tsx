import React from "react";
import { useTranslation } from 'react-i18next';
import About from "../assets/certificate.jpeg";

const VideoSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="video" className="pt-3 pb-8 sm:pt-4 sm:pb-12 md:pt-6 md:pb-16 lg:pt-8 lg:pb-20 bg-white">
      <div className="container-custom px-3 sm:px-4">

        {/* Section Heading */}
        <div className="section-title mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            {t('video.eventPreview')}
          </h2>
          <div className="line"></div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">

          {/* Left Image */}
          <div className="flex justify-center lg:justify-start">
            <img
              src={About}
              alt="Bhakthiyum – Bharathamum Event Preview"
              className="
                w-full
                max-w-[320px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[520px]
                h-[200px] sm:h-[280px] md:h-[340px] lg:h-[380px]
                object-contain
                bg-transparent
                shadow-none
                rounded-none
                select-none
              "
              draggable={false}
            />
          </div>

          {/* Right Content */}
          <div className="text-center lg:text-left px-1 sm:px-0">

            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight text-maroon mb-3 sm:mb-4 md:mb-5">
              {t('video.title')}{" "}
              <span className="text-gold">
                {t('video.titleHighlight')}
              </span>
            </h3>

            <p className="text-gray-600 text-sm sm:text-base leading-6 sm:leading-7 md:leading-8 mb-5 sm:mb-6 md:mb-8">
              {t('video.description')}
            </p>

            <a
              href="#register"
              className="
                inline-flex
                items-center
                gap-2 sm:gap-3
                bg-maroon
                text-white
                px-5 sm:px-6 md:px-8
                py-3 sm:py-3.5 md:py-4
                rounded-full
                font-bold
                text-sm sm:text-base
                transition-all
                duration-300
                hover:bg-gold
                hover:text-maroon
                hover:-translate-y-1
              "
            >
              <i className="fas fa-arrow-right text-xs sm:text-sm"></i>
              {t('video.registerNow')}
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};

export default VideoSection;