import { MessageCircle, ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import './CTA.css';

function CTA() {
  return (
    <section id="cta" className="cta">
      <div className="cta-container">
        <div className="cta-content">
          <div className="cta-text">
            <span className="cta-badge">Get Started Today</span>
            <h2>Ready to Transform Your Business?</h2>
            <p>
              Join thousands of African businesses already using Oga Plug. 
              Set up in 2 minutes, no credit card required.
            </p>
            
            <div className="cta-features">
              <div className="cta-feature">
                <Zap size={20} />
                <span>2-minute setup</span>
              </div>
              <div className="cta-feature">
                <Shield size={20} />
                <span>No credit card required</span>
              </div>
              <div className="cta-feature">
                <Globe size={20} />
                <span>Works on any phone</span>
              </div>
            </div>
            
            <div className="cta-buttons">
              <a href="https://wa.me/2348001234567" className="btn-primary btn-large">
                <MessageCircle size={24} />
                Start on WhatsApp
                <ArrowRight size={20} />
              </a>
              <a href="#features" className="btn-secondary">
                Learn More
              </a>
            </div>
          </div>
          
          <div className="cta-visual">
            <div className="cta-phone">
              <div className="phone-notch"></div>
              <div className="phone-screen">
                <div className="phone-header">
                  <div className="phone-avatar">OP</div>
                  <div className="phone-info">
                    <span className="phone-name">Oga Plug</span>
                    <span className="phone-status">Online</span>
                  </div>
                </div>
                
                <div className="phone-messages">
                  <div className="message user">
                    <span>Hi</span>
                  </div>
                  <div className="message bot">
                    <span>Welcome to Oga Plug! Let's set up your business in 2 minutes.</span>
                  </div>
                  <div className="message bot">
                    <span>What is your business name?</span>
                  </div>
                </div>
                
                <div className="phone-input">
                  <input type="text" placeholder="Type a message..." disabled />
                  <button className="send-btn">
                    <MessageCircle size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
