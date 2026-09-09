import { useEffect, useRef } from 'react';
import { Check, X, MessageCircle, ArrowRight } from 'lucide-react';
import './Pricing.css';

const plans = [
  {
    name: 'FREE',
    price: '₦0',
    period: 'forever',
    description: 'Try before you commit - 30-day trial with limits',
    features: [
      { text: '50 product limit', included: true },
      { text: '100 transactions/month', included: true },
      { text: 'Basic debt tracking', included: true },
      { text: 'WhatsApp capture', included: true },
      { text: 'No reports', included: false },
      { text: 'No staff accounts', included: false },
      { text: 'No daily summaries', included: false },
      { text: 'No expiry tracking', included: false }
    ],
    popular: false,
    target: 'Trial users'
  },
  {
    name: 'TRADER',
    price: '₦3,500',
    period: '/month',
    description: 'For single-location shops and market traders',
    features: [
      { text: 'Unlimited products', included: true },
      { text: 'Unlimited transactions', included: true },
      { text: 'Full debt ledger + auto-reminders', included: true },
      { text: 'WhatsApp + Web dashboard', included: true },
      { text: 'Daily sales summary', included: true },
      { text: '1 staff account', included: true },
      { text: 'Monthly report', included: true },
      { text: 'Expiry tracking', included: false }
    ],
    popular: true,
    target: 'General trade owners'
  },
  {
    name: 'BUSINESS',
    price: '₦8,500',
    period: '/month',
    description: 'For growing businesses with staff and multiple locations',
    features: [
      { text: 'Everything in TRADER', included: true },
      { text: '5 staff accounts', included: true },
      { text: 'Multi-location view', included: true },
      { text: 'Cash flow summary', included: true },
      { text: 'Export to Excel & PDF', included: true },
      { text: 'Supplier directory', included: true },
      { text: 'Priority support', included: true },
      { text: 'Expiry tracking', included: false }
    ],
    popular: false,
    target: 'Multi-location businesses'
  },
  {
    name: 'PHARMACY',
    price: '₦15,000',
    period: '/month',
    description: 'Specialized plan for registered pharmacies',
    features: [
      { text: 'Everything in BUSINESS', included: true },
      { text: 'Batch & expiry tracking', included: true },
      { text: 'NAFDAC compliance fields', included: true },
      { text: 'PCN compliance log', included: true },
      { text: 'Near-expiry WhatsApp alerts', included: true },
      { text: 'Shift-based sales tracking', included: true },
      { text: 'Supplier invoice OCR (200+ items)', included: true },
      { text: 'Dedicated pharmacy support', included: true }
    ],
    popular: false,
    target: 'Registered pharmacies'
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
          <h2>Honest, Transparent Pricing</h2>
          <p>Start with a free trial. Upgrade when you see the value. One recovered debt pays for itself.</p>
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
                <p className="plan-target">{plan.target}</p>
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
