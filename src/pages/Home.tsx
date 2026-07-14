import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import HeroBanner from './HeroBanner';
import QRScanner from './QRScanner';
import VideoSection from './AboutSection';
import StatsBar from './StatsBar';
import Gallery from './Gallery';
import Details from './Details';
import Perks from './Perks';
import FeeBox from './FeeBox';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cream font-inter text-[#1a1a1a] overflow-x-hidden w-full max-w-full">
      <Navbar />
      <HeroBanner />
      <QRScanner />
      <FeeBox />
      <VideoSection />
      <StatsBar />
      <Gallery />
      <Details />
      <Perks />
      <Footer />
    </div>
  );
};

export default Home;
