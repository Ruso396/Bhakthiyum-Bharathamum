import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode';

const QRScanner: React.FC = () => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Use your app's registration route instead of Google Form
  const REGISTRATION_URL = '/registration';

  useEffect(() => {
    if (!canvasRef.current) return;

    // Generate QR code that points to your registration page
    QRCode.toCanvas(canvasRef.current, window.location.origin + REGISTRATION_URL, {
      width: 200,
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
      className="bg-white py-10 md:py-16 lg:py-20 px-4 md:px-6"
    >
      <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-10 xl:gap-12">
        
        {/* Left Side - Premium QR Card */}
        <Link
          to={REGISTRATION_URL}
          className="w-full lg:w-[340px] xl:w-[360px] flex-shrink-0 block group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(212,175,55,0.35)]"
        >
<div className="bg-white rounded-3xl border border-gold/40 overflow-hidden shadow-none">            {/* Maroon Header with Leaf Icons */}
            <div className="bg-maroon px-4 md:px-6 py-3 md:py-4 flex items-center justify-center gap-3">
              <i className="fas fa-leaf text-gold text-sm md:text-base group-hover:scale-110 transition-transform duration-300"></i>
              <h3 className="text-white text-lg md:text-xl lg:text-2xl font-extrabold tracking-wide">
                {t('qr.qrCode')}
              </h3>
              <i className="fas fa-leaf text-gold text-sm md:text-base group-hover:scale-110 transition-transform duration-300"></i>
            </div>

            {/* Scan Instruction Text */}
            <div className="px-4 md:px-6 pt-4 md:pt-5 pb-2 text-center">
              <p className="text-gray-600 text-sm md:text-base font-medium">
                {t('qr.scanText')}
              </p>
            </div>

            {/* QR Code Container */}
            <div className="px-4 md:px-6 pb-3 md:pb-4 flex justify-center">
<div className="inline-block bg-white p-2.5 md:p-3 rounded-2xl border-[3px] border-gold shadow-[0_4px_16px_rgba(212,175,55,0.15)]">                <canvas
                  ref={canvasRef}
                  width={200}
                  height={200}
                  className="block w-[140px] h-[140px] md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px] max-w-full rounded-lg"
                />
              </div>
            </div>

            {/* Helper Info Box */}
            <div className="px-4 md:px-6 pb-4 md:pb-5">
              <div className="bg-gradient-to-r from-[#FFF8F0] to-[#FFF0EC] rounded-xl p-3 md:p-4 flex items-start gap-3 border border-gold/10 group-hover:border-gold/30 transition-all duration-300">
                <div className="bg-gold/20 rounded-full p-2 flex-shrink-0 mt-0.5">
                  <i className="fas fa-info-circle text-gold text-sm group-hover:scale-110 transition-transform duration-300"></i>
                </div>
              <div className="text-xs md:text-sm text-gray-700 leading-relaxed">
  <span className="font-semibold text-maroon">
    {t('qr.scanToRegister')}
  </span>{" "}
  <span className="font-bold text-maroon ">
    {t('qr.registerFee')}
  </span>

  <p className="mt-2 text-[11px] md:text-xs text-maroon font-semibold">
    {t('qr.priorityNote')}
  </p>
</div>
              </div>
            </div>
          </div>
        </Link>

        {/* Right Side - Registration Information Panel */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-3xl border border-gold/40 shadow-[0_12px_40px_rgba(212,175,55,0.2)] p-5 md:p-7 lg:p-8">
            
            {/* Main Heading */}
            <h4 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-maroon mb-5 md:mb-6 text-center lg:text-left">
              <i className="fas fa-feather-alt text-gold mr-2"></i>
              {t('qr.secureYourSpot')}
            </h4>

            {/* Premium Info Cards */}
            <div className="space-y-4 md:space-y-5 mb-6 md:mb-7">
              {/* For Students */}
              <Link
                to={REGISTRATION_URL}
                className="block bg-gradient-to-r from-[#FFF8F0] to-[#FFF0EC] rounded-2xl p-4 md:p-5 lg:p-6 border border-gold/10  transition-all duration-300  cursor-pointer group/card1"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="bg-gold/20 rounded-full p-2.5 md:p-3 flex-shrink-0 group-hover/card1:bg-gold/30 transition-colors duration-300">
                    <i className="fas fa-award text-gold text-base md:text-lg group-hover/card1:scale-110 transition-transform duration-300"></i>
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-bold text-maroon text-sm md:text-base lg:text-lg mb-1">
                      {t('qr.studentAward')}
                    </h5>
                    <p className="text-gray-700 text-xs md:text-sm lg:text-base leading-relaxed">
                      {t('qr.studentAwardText')}
                    </p>
                  </div>
                </div>
              </Link>

              {/* For Families */}
              <Link
                to={REGISTRATION_URL}
                className="block bg-gradient-to-r from-[#FFF8F0] to-[#FFF0EC] rounded-2xl p-4 md:p-5 lg:p-6 border border-gold/10 shadow-[0_2px_8px_rgba(212,175,55,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_8px_24px_rgba(212,175,55,0.15)] cursor-pointer group/card2"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="bg-gold/20 rounded-full p-2.5 md:p-3 flex-shrink-0 group-hover/card2:bg-gold/30 transition-colors duration-300">
                    <i className="fas fa-crown text-gold text-base md:text-lg group-hover/card2:scale-110 transition-transform duration-300"></i>
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-bold text-maroon text-sm md:text-base lg:text-lg mb-1">
                      {t('qr.guruAward')}
                    </h5>
                    <p className="text-gray-700 text-xs md:text-sm lg:text-base leading-relaxed">
                      {t('qr.guruAwardText')}
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Register Button */}
            <div className="text-center">
              <Link
                to={REGISTRATION_URL}
                className="w-full inline-flex items-center justify-center gap-3 bg-maroon text-white px-6 md:px-8 py-3.5 md:py-4 rounded-full font-bold text-sm md:text-base lg:text-lg border-none cursor-pointer transition-all duration-300 shadow-lg hover:bg-gold hover:text-maroon hover:-translate-y-1 hover:shadow-gold/35"
              >
                <i className="fas fa-external-link-alt"></i>
                {t('qr.registerNow')}
              </Link>
              <p className="text-gray-500 text-xs md:text-sm mt-3 flex items-center justify-center gap-1.5">
                <i className="fas fa-users text-gold"></i>
                {t('qr.limitedSeats')}
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default QRScanner;