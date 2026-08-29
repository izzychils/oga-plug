import { useEffect, useRef } from 'react';
import { 
  Store, 
  Pill, 
  Leaf, 
  BookOpen, 
  Hammer, 
  UtensilsCrossed, 
  Shirt, 
  Heart, 
  Box, 
  Landmark 
} from 'lucide-react';
import './BusinessTypes.css';

const businessTypes = [
  { icon: Store, name: 'General Store', color: '#25D366' },
  { icon: Pill, name: 'Pharmacy', color: '#FF6B35' },
  { icon: Leaf, name: 'Agriculture', color: '#128C7E' },
  { icon: BookOpen, name: 'Bookshop', color: '#FFD700' },
  { icon: Hammer, name: 'Hardware', color: '#FF4444' },
  { icon: UtensilsCrossed, name: 'Restaurant', color: '#9B59B6' },
  { icon: Shirt, name: 'Fashion', color: '#E91E63' },
  { icon: Heart, name: 'Healthcare', color: '#00BCD4' },
  { icon: Box, name: 'Wholesale', color: '#FF9800' },
  { icon: Landmark, name: 'Finance/MFB', color: '#3F51B5' }
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

    const items = sectionRef.current?.querySelectorAll('.business-item');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="business-types" ref={sectionRef}>
      <div className="business-container">
        <div className="section-header">
          <span className="section-badge">Business Types</span>
          <h2>Built for Every African Business</h2>
          <p>Whether you run a pharmacy or a fashion store, Oga Plug adapts to your needs.</p>
        </div>
        
        <div className="business-grid">
          {businessTypes.map((business, index) => (
            <div 
              key={index} 
              className="business-item"
              style={{ '--accent-color': business.color }}
            >
              <div className="business-icon">
                <business.icon size={32} />
              </div>
              <span className="business-name">{business.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BusinessTypes;
