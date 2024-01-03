import Nav from '@/components/Landing/Nav';
import HeroSection from '@/components/Landing/Hero';
import PointSection from '@/components/Landing/Point';
import CardSection from '@/components/Landing/Card';
import Footer from '@/components/Landing/Footer';
import useRedriectByLogin from '@/hooks/useRedriectByLogin';

function Landing() {
  useRedriectByLogin();
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
