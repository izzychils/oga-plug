import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import OnboardingDemo from './components/OnboardingDemo';
import WhatsAppPreview from './components/WhatsAppPreview';
import BusinessTypes from './components/BusinessTypes';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <OnboardingDemo />
        <WhatsAppPreview />
        <BusinessTypes />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
