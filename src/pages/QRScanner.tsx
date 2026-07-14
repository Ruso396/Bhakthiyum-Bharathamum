import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import QRCode from 'qrcode';

const QRScanner: React.FC = () => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const FORM_URL = 'https://forms.gle/e8UDGavfZJ8NHKwm7';

  useEffect(() => {
    if (!canvasRef.current) return;

    QRCode.toCanvas(canvasRef.current, FORM_URL, {
      width: 160,
      margin: 2,
      color: {
        dark: "#6C2E1F",
        light: "#FFFFFF",
      },
    }).catch(console.error);
  }, []);

  return (
    <section
      id="register"
      className="bg-white py-8 md:py-12 lg:py-16 px-4 md:px-6"
    >
      <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-14 xl:gap-16">
        
        {/* Left Side - QR Code */}
        <div className="text-center lg:text-center w-full lg:w-auto">
          <h3 className="text-lg md:text-xl lg:text-2xl font-extrabold text-maroon">{t('qr.qrCode')}</h3>
          <p className="text-gray-600 text-sm md:text-base font-medium mb-3 md:mb-4">
            {t('qr.scanText')}
          </p>
          <div className="flex justify-center">
            <div
              className="
                inline-block
                bg-white
                p-3
                rounded-2xl
                border-[3px]
                border-[#D4AF37]
                shadow-[0_8px_30px_rgba(212,175,55,0.25)]
                min-w-[80px]
                min-h-[80px]
              "
            >
              <canvas
                ref={canvasRef}
                width={160}
                height={160}
                className="block w-[120px] h-[120px] md:w-[140px] md:h-[140px] lg:w-[160px] lg:h-[160px] max-w-full rounded-lg"
              />
            </div>
          </div>
          <div className="mt-4 lg:mt-8"></div>
        </div>

        {/* Right Side - Content */}
        <div className="flex-1 min-w-[280px] md:min-w-[300px] lg:min-w-[350px] text-center lg:text-left">
          
          <h4 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-maroon mb-2 md:mb-3">
            <i className="fas fa-feather-alt text-gold mr-2"></i>
            {t('qr.secureYourSpot')}
          </h4>

          {/* Awards & Certificates Section */}
          <div className="bg-gradient-to-r from-[#FFF8F0] to-[#FFF0EC] rounded-2xl p-4 md:p-6 mb-6 border border-gold/20">
            <div className="space-y-3">
              {/* For Students */}
              <div className="flex items-start gap-3">
                <div className="bg-gold/20 rounded-full p-2 mt-0.5 flex-shrink-0">
                  <i className="fas fa-award text-gold text-sm md:text-base"></i>
                </div>
                <div>
                  <span className="font-bold text-maroon">{t('qr.studentAward')}</span>
                  <span className="text-gray-700 text-sm md:text-base">
                    {' '}{t('qr.studentAwardText')}
                  </span>
                </div>
              </div>

              {/* For Gurus */}
              <div className="flex items-start gap-3">
                <div className="bg-gold/20 rounded-full p-2 mt-0.5 flex-shrink-0">
                  <i className="fas fa-crown text-gold text-sm md:text-base"></i>
                </div>
                <div>
                  <span className="font-bold text-maroon">{t('qr.guruAward')}</span>
                  <span className="text-gray-700 text-sm md:text-base">
                    {' '}{t('qr.guruAwardText')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Register Button */}
          <div>
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-3 bg-maroon text-white px-6 md:px-10 lg:px-12 py-3 md:py-4 rounded-full font-bold text-sm md:text-base lg:text-lg border-none cursor-pointer transition-all duration-300 shadow-lg hover:bg-gold hover:text-maroon hover:-translate-y-1 hover:shadow-gold/35"
            >
              <i className="fas fa-external-link-alt"></i>
              {t('qr.registerFee')}
            </a>
            <p className="text-gray-500 text-xs md:text-sm mt-2">
              {t('qr.limitedSeats')}
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default QRScanner;