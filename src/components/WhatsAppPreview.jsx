import { useEffect, useRef, useState } from 'react';
import { 
  Send, 
  Calendar, 
  ShoppingCart, 
  Search, 
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import './WhatsAppPreview.css';

const features = [
  {
    icon: Send,
    title: 'Send "Hi" to Start',
    description: 'Just message the Oga Plug number and you\'re connected instantly.'
  },
  {
    icon: Calendar,
    title: 'Daily Snapshots',
    description: 'Get automatic daily summaries of your sales, stock, and debts.'
  },
  {
    icon: ShoppingCart,
    title: 'Record Sales',
    description: 'Log sales in seconds with simple chat commands.'
  },
  {
    icon: Search,
    title: 'Check Inventory',
    description: 'Query your stock levels anytime, anywhere.'
  }
];

function WhatsAppPreview() {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="whatsapp" className="whatsapp-preview" ref={sectionRef}>
      <div className="whatsapp-container">
        <div className="whatsapp-content">
          <div className="section-header">
            <span className="section-badge">
              <MessageCircle size={16} />
              WhatsApp Integration
            </span>
            <h2>Your Business, Now on WhatsApp</h2>
            <p>Run your entire business through the app you already use daily. No downloads, no learning curve.</p>
          </div>
          
          <div className="whatsapp-features">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`whatsapp-feature ${index === activeFeature ? 'active' : ''}`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="feature-icon">
                  <feature.icon size={24} />
                </div>
                <div className="feature-text">
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <a href="#cta" className="btn-primary">
            <MessageCircle size={20} />
            Start on WhatsApp
            <ArrowRight size={18} />
          </a>
        </div>
        
        <div className="whatsapp-demo">
          <div className="demo-container">
            <div className="chat-window">
              <div className="chat-header">
                <div className="chat-avatar">OP</div>
                <div className="chat-info">
                  <span className="chat-name">Oga Plug</span>
                  <span className="chat-status">Online</span>
                </div>
              </div>
              
              <div className="chat-messages">
                <div className="message user">
                  <span>Hi</span>
                </div>
                <div className="message bot">
                  <span>Welcome back! Here's your business summary:</span>
                </div>
                <div className="message bot summary">
                  <div className="summary-item">
                    <Calendar size={14} />
                    <span>Sales today: ₦45,200</span>
                  </div>
                  <div className="summary-item">
                    <ShoppingCart size={14} />
                    <span>Low stock: 3 items</span>
                  </div>
                  <div className="summary-item">
                    <Search size={14} />
                    <span>Pending debts: ₦12,500</span>
                  </div>
                </div>
                <div className="message bot">
                  <span>What would you like to do?</span>
                </div>
                <div className="message options">
                  <span className="option">1. Record Sale</span>
                  <span className="option">2. Check Stock</span>
                  <span className="option">3. View Reports</span>
                  <span className="option">4. Send Invoice</span>
                </div>
              </div>
              
              <div className="chat-input">
                <input type="text" placeholder="Type a message..." disabled />
                <button className="send-button">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhatsAppPreview;
