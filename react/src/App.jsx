import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import SignupForm from './components/SignupForm';
import CtaStrip from './components/CtaStrip';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-s3 focus:left-s3 focus:z-[100]
                                  focus:bg-surface-muted focus:text-on-accent focus:px-s3 focus:py-s1 focus:rounded-xs">
        Skip to main content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
        <SignupForm />
        <CtaStrip />
      </main>
      <Footer />
    </>
  );
}