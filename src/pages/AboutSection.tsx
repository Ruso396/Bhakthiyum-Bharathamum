import React from "react";
import { useTranslation } from 'react-i18next';
import AboutVideo from "../assets/barathamvideo.mp4";
const VideoSection: React.FC = () => {
  const { t } = useTranslation();

 

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

        {/* Left Video */}
<div className="flex justify-center lg:justify-start">
  <video
   
 className="
  w-[320px]
  md:w-[360px]
  lg:w-[380px]
  h-[460px]
  object-cover
  rounded-2xl
  shadow-lg
  border border-gold/20
"
  controls
  playsInline
  preload="metadata"
>
    <source src={AboutVideo} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

          {/* Right Content */}
          <div className="text-center lg:text-left">

            {/* <span className="inline-flex items-center gap-2 bg-gold/15 text-gold border border-gold/30 rounded-full px-5 py-2 text-sm font-bold mb-5">
              <i className="fas fa-video"></i>
              EVENT PREVIEW
            </span> */}

           <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight text-maroon mb-5">
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