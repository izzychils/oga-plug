import { useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  BarChart3, 
  DollarSign, 
  Package, 
  MapPin, 
  Phone,
  ArrowRight
} from 'lucide-react';
import './Features.css';

const features = [
  {
    icon: MessageCircle,
    title: 'WhatsApp Integration',
    description: 'Run your business through simple WhatsApp commands. No app download needed.',
    color: '#25D366'
  },
  {
    icon: BarChart3,
    title: 'Sales Tracking',
    description: 'Record sales instantly and get real-time reports on your business performance.',
    color: '#FF6B35'
  },
  {
    icon: DollarSign,
    title: 'Debt Management',
    description: 'Track customer debts and receive automatic reminders for overdue payments.',
    color: '#128C7E'
  },
  {
    icon: Package,
    title: 'Inventory Control',
    description: 'Manage your stock levels and get alerts when items are running low.',
    color: '#FFD700'
  },
  {
    icon: MapPin,
    title: 'Multi-location Support',
    description: 'Manage multiple business locations from a single WhatsApp number.',
    color: '#FF4444'
  },
  {
    icon: Phone,
    title: 'USSD for Feature Phones',
    description: 'No smartphone? Dial *384# to access core features on any phone.',
    color: '#9B59B6'
  }
];

function Features() {
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

    const cards = sectionRef.current?.querySelectorAll('.feature-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="features" ref={sectionRef}>
      <div className="features-container">
        <div className="section-header">
          <span className="section-badge">Features</span>
          <h2>Everything You Need to Run Your Business</h2>
          <p>Powerful tools designed for African businesses, accessible through the app you already use daily.</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card"
              style={{ '--accent-color': feature.color }}
            >
              <div className="feature-icon">
                <feature.icon size={32} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <a href="#cta" className="feature-link">
                Learn more <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
