import Nav from '@/components/Landing/Nav';
import PointSection from '@/components/Landing/Point';
import CardSection from '@/components/Landing/Card';
import HeroSection from '@/components/Landing/Hero';
import Footer from '@/components/Landing/Footer';

function Landing() {
  return (
    <>
      <Nav />
      <HeroSection />
      <PointSection />
      <CardSection />
      <Footer />
    </>
  );
}

export default Landing;
