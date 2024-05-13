import CardSection from '@/components/Landing/Card';
import Footer from '@/components/Landing/Footer';
import HeroSection from '@/components/Landing/Hero';
import Nav from '@/components/Landing/Nav';
import PointSection from '@/components/Landing/Point';
import useRedirectByLogin from '@/hooks/Auth/useRedirectByLogin';

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
