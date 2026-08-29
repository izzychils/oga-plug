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
          <span className="badge">Business Operating System - Africa</span>
          <h1>
            <span className="highlight">Oga Plug</span>
            <br />
            Smartest Business Assistant
          </h1>
          <p className="hero-description">
            Run your entire business from WhatsApp. Record sales, manage inventory, 
            track debts, and get daily reports all through simple chat commands.
          </p>
          
          <div className="hero-buttons">
            <a href="#cta" className="btn-primary">
              <MessageCircle size={20} />
              Start on WhatsApp
              <ArrowRight size={18} />
            </a>
            <a href="#features" className="btn-secondary">
              See How it Works
            </a>
          </div>
          
          <div className="hero-stats">
            <div className="stat">
              <Store size={18} />
              <span><AnimatedCounter end={10000} suffix="+" /> Businesses</span>
            </div>
            <div className="stat">
              <BarChart3 size={18} />
              <span><AnimatedCounter end={2} prefix="₦" suffix="B+" /> Sales Tracked</span>
            </div>
            <div className="stat">
              <Package size={18} />
              <span><AnimatedCounter end={500} suffix="K+" /> Products</span>
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
                  <span>Welcome back! Here's your summary:</span>
                </div>
                <div className="message bot summary">
                  <div className="summary-item">
                    <span className="label">Sales today:</span>
                    <span className="value">₦45,200</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Low stock:</span>
                    <span className="value">3 items</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Pending debts:</span>
                    <span className="value">₦12,500</span>
                  </div>
                </div>
                <div className="message bot">
                  <span>What would you like to do?</span>
                </div>
                <div className="message options">
                  <span className="option">1. Record Sale</span>
                  <span className="option">2. Check Stock</span>
                  <span className="option">3. View Reports</span>
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
