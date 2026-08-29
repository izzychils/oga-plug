import { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <MessageCircle className="logo-icon" size={28} />
          <span className="logo-text">Oga Plug</span>
        </div>
        
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a></li>
          <li><a href="#onboarding" onClick={() => setIsMenuOpen(false)}>How it Works</a></li>
          <li><a href="#whatsapp" onClick={() => setIsMenuOpen(false)}>WhatsApp</a></li>
          <li><a href="#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</a></li>
          <li><a href="#testimonials" onClick={() => setIsMenuOpen(false)}>Testimonials</a></li>
          <li className="nav-actions">
            <a href="#cta" className="cta-button" onClick={() => setIsMenuOpen(false)}>
              Get Started Free
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
