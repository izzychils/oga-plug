import { useEffect, useState } from 'react';
import { MessageCircle, ArrowRight, Store, BarChart3, Package } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import './Hero.css';

function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className={`hero ${isVisible ? 'visible' : ''}`}>
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <span className="badge">Business Operating System for Africa</span>
          <h1>
            <span className="highlight">41 Million Nigerian Businesses</span>
            <br />
            <span className="secondary-text">Have No Financial Records</span>
          </h1>
          <p className="hero-description">
            Not because they're bad at business. Because no tool was built for how they actually operate.
            Oga Plug changes that. WhatsApp for input. Web dashboard for management. Built for how you work today.
          </p>
          
          <div className="hero-buttons">
            <a href="#cta" className="btn-primary">
              <MessageCircle size={20} />
              Start Free Trial
              <ArrowRight size={18} />
            </a>
            <a href="#how-it-works" className="btn-secondary">
              See How It Works
            </a>
          </div>
          
          <div className="hero-stats">
            <div className="stat">
              <Store size={18} />
              <span>Port Harcourt & Owerri</span>
            </div>
            <div className="stat">
              <BarChart3 size={18} />
              <span>Voice, Photo, Text</span>
            </div>
            <div className="stat">
              <Package size={18} />
              <span>Zero Behavior Change</span>
            </div>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="phone-mockup">
            <div className="phone-screen">
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
                  <span>Welcome back, Mama Ngozi! 👋</span>
                </div>
                <div className="message bot summary">
                  <div className="summary-item">
                    <span className="label">Yesterday's sales:</span>
                    <span className="value">₦184,500</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Low stock:</span>
                    <span className="value warning">8 products</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Overdue debts:</span>
                    <span className="value warning">₦309,000</span>
                  </div>
                </div>
                <div className="message bot">
                  <span>What would you like to do?</span>
                </div>
                <div className="message options">
                  <span className="option">1️⃣ Record Sale</span>
                  <span className="option">2️⃣ Scan Receipt</span>
                  <span className="option">3️⃣ Check Stock</span>
                  <span className="option">4️⃣ Customer Debts</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="floating-icons">
            <div className="float-icon icon-1">
              <Store size={24} />
            </div>
            <div className="float-icon icon-2">
              <BarChart3 size={24} />
            </div>
            <div className="float-icon icon-3">
              <Package size={24} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
