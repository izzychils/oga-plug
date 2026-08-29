import { useEffect, useRef } from 'react';
import { Check, X, MessageCircle, ArrowRight } from 'lucide-react';
import './Pricing.css';

const plans = [
  {
    name: 'FREE',
    price: '₦0',
    period: 'forever',
    description: 'Perfect for small businesses getting started',
    features: [
      { text: 'Up to 100 products', included: true },
      { text: 'Basic POS features', included: true },
      { text: 'Daily sales reports', included: true },
      { text: 'WhatsApp integration', included: true },
      { text: 'USSD access', included: true },
      { text: 'Advanced analytics', included: false },
      { text: 'Multi-location', included: false },
      { text: 'Priority support', included: false }
    ],
    popular: false
  },
  {
    name: 'PRO',
    price: '₦5,000',
    period: '/month',
    description: 'For growing businesses that need more power',
    features: [
      { text: 'Unlimited products', included: true },
      { text: 'Advanced POS features', included: true },
      { text: 'Real-time analytics', included: true },
      { text: 'WhatsApp integration', included: true },
      { text: 'USSD access', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Multi-location (up to 5)', included: true },
      { text: 'Priority support', included: false }
    ],
    popular: true
  },
  {
    name: 'ENTERPRISE',
    price: '₦15,000',
    period: '/month',
    description: 'For large businesses and franchises',
    features: [
      { text: 'Unlimited products', included: true },
      { text: 'Custom POS setup', included: true },
      { text: 'AI-powered insights', included: true },
      { text: 'WhatsApp integration', included: true },
      { text: 'USSD access', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Unlimited locations', included: true },
      { text: '24/7 priority support', included: true }
    ],
    popular: false
  }
];

function Pricing() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('.pricing-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" className="pricing" ref={sectionRef}>
      <div className="pricing-container">
        <div className="section-header">
          <span className="section-badge">Pricing</span>
          <h2>Simple, Transparent Pricing</h2>
          <p>Start free, upgrade when you're ready. No hidden fees, no surprises.</p>
        </div>
        
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <div className="plan-header">
                <h3>{plan.name}</h3>
                <div className="price">
                  <span className="amount">{plan.price}</span>
                  <span className="period">{plan.period}</span>
                </div>
                <p className="plan-description">{plan.description}</p>
              </div>
              
              <ul className="plan-features">
                {plan.features.map((feature, i) => (
                  <li key={i} className={feature.included ? 'included' : 'excluded'}>
                    {feature.included ? (
                      <Check size={16} className="check-icon" />
                    ) : (
                      <X size={16} className="x-icon" />
                    )}
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
              
              <a href="#cta" className={`plan-button ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}>
                <MessageCircle size={18} />
                Get Started
                <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
