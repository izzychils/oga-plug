import { 
  MessageCircle, 
  Globe, 
  ExternalLink, 
  Link, 
  Mail, 
  Phone, 
  MapPin,
  Heart
} from 'lucide-react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand-logo">
              <MessageCircle size={28} />
              <span className="brand-name">Oga Plug</span>
            </div>
            <p className="brand-description">
              Africa's smartest business assistant. Run your entire business through WhatsApp.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Website">
                <Globe size={20} />
              </a>
              <a href="#" className="social-link" aria-label="External Link">
                <ExternalLink size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Contact">
                <Link size={20} />
              </a>
            </div>
          </div>
          
          <div className="footer-links">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#whatsapp">WhatsApp</a></li>
              <li><a href="#">USSD Access</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press Kit</a></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h4>Contact</h4>
            <ul>
              <li>
                <Mail size={16} />
                <a href="mailto:hello@ogaplug.com">hello@ogaplug.com</a>
              </li>
              <li>
                <Phone size={16} />
                <a href="tel:+2348001234567">+234 800 123 4567</a>
              </li>
              <li>
                <MapPin size={16} />
                <span>Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            <span>&copy; 2026 MecurixTech Limited. All rights reserved.</span>
          </div>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
          <div className="footer-made">
            <span>Made with</span>
            <Heart size={14} className="heart-icon" />
            <span>in Africa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
