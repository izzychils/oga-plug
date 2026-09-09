import { useEffect, useRef } from 'react';
import { 
  Camera, 
  Package, 
  Users,
  ArrowRight,
  Check
} from 'lucide-react';
import './Features.css';

const features = [
  {
    icon: Camera,
    title: 'Smart Capture Engine',
    description: 'Send a voice note, photo of receipt, or text message. Oga Plug reads it, extracts data, asks you to confirm, then logs everything. Works with handwritten receipts, waybills, and bank transfer screenshots.',
    capabilities: [
      'Voice notes in Pidgin or English',
      'Receipt photo scanning (OCR)',
      'Bank transfer alert reading',
      'Confirmation before every entry'
    ],
    color: '#25D366'
  },
  {
    icon: Package,
    title: 'Inventory & Stock Management',
    description: 'Web dashboard shows current stock, low-stock alerts, and movement history. WhatsApp sends daily low-stock summaries. Pharmacy users get expiry date tracking for every drug.',
    capabilities: [
      'Real-time stock levels',
      'Low stock WhatsApp alerts',
      'Stock movement history',
      'Expiry tracking (pharmacy)'
    ],
    color: '#FF6B35'
  },
  {
    icon: Users,
    title: 'Customer Debt Ledger',
    description: 'Log credit sales by voice. Check any customer\'s balance instantly. Send automated WhatsApp debt reminders. See all overdue debts sorted by amount and days overdue. Never lose money to uncollected credit again.',
    capabilities: [
      'Log credit sales in seconds',
      'Auto debt reminders via WhatsApp',
      'See who owes you and how much',
      'Payment tracking and reconciliation'
    ],
    color: '#128C7E'
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
          <span className="section-badge">MVP Features</span>
          <h2>Three Core Functions. Built Excellently.</h2>
          <p>WhatsApp captures your data. Web dashboard manages your business. Both work together seamlessly.</p>
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
              
              <ul className="feature-capabilities">
                {feature.capabilities.map((capability, i) => (
                  <li key={i}>
                    <Check size={16} />
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
              
              <a href="#how-it-works" className="feature-link">
                See it in action <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
        
        <div className="features-note">
          <p><strong>The Hybrid Architecture:</strong> WhatsApp handles everything conversational and fast (voice notes, quick checks, notifications). The web dashboard handles everything that requires proper navigation (full reports, inventory management, customer lists). You get the best interface for each task.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;
