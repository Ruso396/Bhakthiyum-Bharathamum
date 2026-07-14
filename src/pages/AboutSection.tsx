import React from "react";
import { useTranslation } from 'react-i18next';
import About from "../assets/videoleft.png";

const VideoSection: React.FC = () => {
  const { t } = useTranslation();

  const handleVideoClick = () => {
    alert("📽️ விரைவில் காணொளி வெளியாகும்! Video coming soon!");
  };

  return (
    <section id="video" className="pt-4 pb-12 md:pt-6 md:pb-16 lg:pt-8 lg:pb-20 bg-white">
      <div className="container-custom">

        {/* Section Heading */}
        <div className="section-title mb-6 md:mb-8">
          <h2>
            {t('video.eventPreview')}
          </h2>
          <div className="line"></div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left Image */}
          <div
            className="flex justify-center lg:justify-start cursor-pointer"
            onClick={handleVideoClick}
          >
            <img
              src={About}
              alt="Bhakthiyum – Bharathamum Event Preview"
              className="
                w-full
                max-w-[520px]
                h-auto
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
          <div className="text-center lg:text-left">

            <span className="inline-flex items-center gap-2 bg-gold/15 text-gold border border-gold/30 rounded-full px-5 py-2 text-sm font-bold mb-5">
              <i className="fas fa-video"></i>
              EVENT PREVIEW
            </span>

            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-maroon mb-5">
              {t('video.title')}{" "}
              <span className="text-gold">
                {t('video.titleHighlight')}
              </span>
            </h3>

            <p className="text-gray-600 text-base leading-8 mb-8">
              {t('video.description')}
            </p>

            <a
              href="#register"
              className="
                inline-flex
                items-center
                gap-3
                bg-maroon
                text-white
                px-8
                py-4
                rounded-full
                font-bold
                transition-all
                duration-300
                hover:bg-gold
                hover:text-maroon
                hover:-translate-y-1
              "
            >
              <i className="fas fa-arrow-right"></i>
              {t('video.registerNow')}
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};

export default VideoSection;