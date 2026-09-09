import { useEffect, useRef } from 'react';
import { 
  Store, 
  Pill,
  ArrowRight,
  Check,
  Clock
} from 'lucide-react';
import './BusinessTypes.css';

const primaryBusinesses = [
  { 
    icon: Store, 
    name: 'General Trade', 
    color: '#25D366',
    description: 'Fast-moving consumer goods, market stalls, shops',
    features: [
      'Voice note sales in Pidgin',
      'Receipt scanning for purchases',
      'Customer debt tracking',
      'Daily profit summaries'
    ],
    location: 'Mile 3 Port Harcourt, Ariaria Aba, New Owerri',
    revenue: '₦500K - ₦5M monthly'
  },
  { 
    icon: Pill, 
    name: 'Pharmacy', 
    color: '#FF6B35',
    description: 'Registered pharmacies with 500-2000 product lines',
    features: [
      'Batch & expiry date tracking',
      'Supplier invoice OCR (200+ items)',
      'NAFDAC & PCN compliance',
      'Near-expiry WhatsApp alerts'
    ],
    location: 'GRA Port Harcourt, Commercial areas Owerri',
    revenue: '₦1M - ₦10M monthly'
  }
];

const phaseTwo = [
  'Agriculture (produce sellers, farm cooperatives)',
  'Bookshops (termly supply to schools)',
  'Hardware stores (cement, building materials)',
  'Restaurants & food vendors',
  'Fashion designers & textile merchants',
  'Healthcare clinics',
  'Wholesale distribution',
  'Microfinance banks'
];

function BusinessTypes() {
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

    const items = sectionRef.current?.querySelectorAll('.business-card');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="business-types" ref={sectionRef}>
      <div className="business-container">
        <div className="section-header">
          <span className="section-badge">MVP Target Users</span>
          <h2>Built for Two Businesses First</h2>
          <p>The MVP launches in Port Harcourt and Owerri, targeting the users with the clearest pain and highest transaction frequency.</p>
        </div>
        
        <div className="primary-businesses">
          {primaryBusinesses.map((business, index) => (
            <div 
              key={index} 
              className="business-card primary"
              style={{ '--accent-color': business.color }}
            >
              <div className="business-header">
                <div className="business-icon">
                  <business.icon size={36} />
                </div>
                <div className="business-title">
                  <h3>{business.name}</h3>
                  <p className="business-subtitle">{business.description}</p>
                </div>
              </div>
              
              <div className="business-details">
                <div className="detail-row">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{business.location}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Typical Revenue:</span>
                  <span className="detail-value">{business.revenue}</span>
                </div>
              </div>
              
              <ul className="business-features">
                {business.features.map((feature, i) => (
                  <li key={i}>
                    <Check size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a href="#pricing" className="business-cta">
                <span>See Pricing</span>
                <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
        
        <div className="phase-two-section">
          <span className="phase-badge">
            <Clock size={14} />
            Phase 2 — Post-MVP
          </span>
          <h3>More Industries on the Roadmap</h3>
          <p>After validating the core product with general trade and pharmacy users, we'll expand to:</p>
          <div className="phase-two-grid">
            {phaseTwo.map((industry, index) => (
              <div key={index} className="phase-two-item">
                <span>{industry}</span>
              </div>
            ))}
          </div>
          <p className="phase-two-note">
            <strong>Why wait?</strong> Each industry has unique workflows. The MVP proves the core system works before adding industry-specific complexity.
          </p>
        </div>
      </div>
    </section>
  );
}

export default BusinessTypes;
