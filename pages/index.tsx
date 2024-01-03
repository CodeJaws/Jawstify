import Nav from '@/components/Landing/Nav';
import HeroSection from '@/components/Landing/Hero';
import PointSection from '@/components/Landing/Point';
import CardSection from '@/components/Landing/Card';
import Footer from '@/components/Landing/Footer';
import useRedirectByLogin from '@/hooks/useRedirectByLogin';

function Landing() {
  useRedirectByLogin();
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
