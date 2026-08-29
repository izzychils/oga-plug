import { useState, useEffect } from 'react';
import { UserPlus, CheckCircle, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import './OnboardingDemo.css';

const steps = [
  {
    type: 'user',
    message: 'Hi',
    icon: MessageCircle
  },
  {
    type: 'bot',
    message: "Welcome to Oga Plug! Let's set up your business in 2 minutes.",
    icon: MessageCircle
  },
  {
    type: 'bot',
    message: 'What is your business name?',
    icon: MessageCircle
  },
  {
    type: 'user',
    message: 'Emeka General Stores',
    icon: MessageCircle
  },
  {
    type: 'bot',
    message: 'What type of business is Emeka General Stores?',
    options: ['General Store', 'Pharmacy', 'Agriculture', 'Bookshop'],
    icon: MessageCircle
  },
  {
    type: 'user',
    message: 'General Store',
    icon: MessageCircle
  },
  {
    type: 'bot',
    message: 'Where is your business located?',
    icon: MessageCircle
  },
  {
    type: 'user',
    message: 'Mile 3 Diobu, Port Harcourt',
    icon: MessageCircle
  },
  {
    type: 'bot',
    message: 'Business account created!',
    summary: {
      business: 'Emeka General Stores',
      location: 'Mile 3 Diobu, Port Harcourt',
      id: 'OGA-PH-00847',
      plan: 'FREE'
    },
    icon: CheckCircle
  }
];

function OnboardingDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState([]);

  const startDemo = () => {
    setIsPlaying(true);
    setVisibleMessages([]);
    setCurrentStep(0);
  };

  const resetDemo = () => {
    setIsPlaying(false);
    setVisibleMessages([]);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length) return;

    const timer = setTimeout(() => {
      setVisibleMessages((prev) => [...prev, steps[currentStep]]);
      setCurrentStep((prev) => prev + 1);
    }, currentStep === 0 ? 500 : 1000);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep]);

  return (
    <section id="onboarding" className="onboarding">
      <div className="onboarding-container">
        <div className="onboarding-content">
          <div className="section-header">
            <span className="section-badge">How it Works</span>
            <h2>Get Started in 2 Minutes</h2>
            <p>No email verification, no complex setup. Just send a WhatsApp message and your business is live.</p>
          </div>
          
          <div className="onboarding-steps">
            <div className="step">
              <div className="step-icon">
                <MessageCircle size={24} />
              </div>
              <div className="step-content">
                <h4>Send "Hi"</h4>
                <p>Message the Oga Plug WhatsApp number</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-icon">
                <UserPlus size={24} />
              </div>
              <div className="step-content">
                <h4>Quick Registration</h4>
                <p>Answer 3 simple questions about your business</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-icon">
                <CheckCircle size={24} />
              </div>
              <div className="step-content">
                <h4>Account Live</h4>
                <p>Start recording sales immediately</p>
              </div>
            </div>
          </div>
          
          <div className="onboarding-cta">
            <button className="btn-primary" onClick={startDemo}>
              <Clock size={20} />
              Watch Demo
            </button>
            <button className="btn-secondary" onClick={resetDemo}>
              Reset
            </button>
          </div>
        </div>
        
        <div className="onboarding-demo">
          <div className="demo-phone">
            <div className="demo-screen">
              <div className="demo-header">
                <div className="demo-avatar">OP</div>
                <div className="demo-info">
                  <span className="demo-name">Oga Plug</span>
                  <span className="demo-status">Online</span>
                </div>
              </div>
              
              <div className="demo-messages">
                {visibleMessages.map((msg, index) => (
                  <div key={index} className={`demo-message ${msg.type}`}>
                    {msg.type === 'bot' && (
                      <div className="bot-avatar">
                        <MessageCircle size={16} />
                      </div>
                    )}
                    <div className="message-bubble">
                      <span>{msg.message}</span>
                      {msg.options && (
                        <div className="message-options">
                          {msg.options.map((opt, i) => (
                            <span key={i} className="message-option">{opt}</span>
                          ))}
                        </div>
                      )}
                      {msg.summary && (
                        <div className="message-summary">
                          <div className="summary-row">
                            <span>Business:</span>
                            <span>{msg.summary.business}</span>
                          </div>
                          <div className="summary-row">
                            <span>Location:</span>
                            <span>{msg.summary.location}</span>
                          </div>
                          <div className="summary-row">
                            <span>ID:</span>
                            <span>{msg.summary.id}</span>
                          </div>
                          <div className="summary-row">
                            <span>Plan:</span>
                            <span>{msg.summary.plan}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {currentStep >= steps.length && (
                  <div className="demo-complete">
                    <CheckCircle size={24} />
                    <span>Registration Complete!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OnboardingDemo;
