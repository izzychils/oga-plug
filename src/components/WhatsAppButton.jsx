import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import './WhatsAppButton.css';

function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`whatsapp-fab ${isVisible ? 'visible' : ''}`}>
      {isOpen && (
        <div className="fab-tooltip">
          <div className="tooltip-header">
            <div className="tooltip-avatar">OP</div>
            <div className="tooltip-info">
              <span className="tooltip-name">Oga Plug</span>
              <span className="tooltip-status">Typically replies instantly</span>
            </div>
            <button className="tooltip-close" onClick={() => setIsOpen(false)}>
              <X size={16} />
            </button>
          </div>
          <div className="tooltip-body">
            <p>Hi there! How can we help your business today?</p>
          </div>
          <a 
            href="https://wa.me/2348001234567?text=Hi" 
            className="tooltip-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} />
            Start Chat
          </a>
        </div>
      )}
      <button 
        className="fab-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
}

export default WhatsAppButton;
