import { Fragment, useEffect, useRef, useState } from 'react';
import {
  Mic, Camera, CreditCard, Check, ArrowRight, MessageCircle, User,
  ShieldCheck, Database, Clock, UserPlus, CheckCircle, Play, RotateCcw
} from 'lucide-react';
import './HowItWorks.css';

const onboardingSteps = [
  {
    icon: MessageCircle,
    title: 'Send "Hi"',
    text: 'Message the Oga Plug WhatsApp number'
  },
  {
    icon: UserPlus,
    title: 'Quick Registration',
    text: 'Answer 3 simple questions about your business'
  },
  {
    icon: CheckCircle,
    title: 'Account Live',
    text: 'Start recording sales immediately'
  }
];

const onboardingScript = [
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

const flows = [
  {
    id: 'voice',
    icon: Mic,
    title: 'Voice Note Sale',
    subtitle: 'Record a sale in 10 seconds',
    color: '#25D366',
    steps: [
      {
        actor: 'user',
        message: 'I sell 4 carton Malt, 7,200 naira, customer pay cash',
        type: 'voice',
        icon: Mic
      },
      {
        actor: 'bot',
        message: 'Got it',
        details: '4 cartons Malt sold — ₦7,200\nPayment: Cash\nStock updated: 16 cartons remaining\n\nConfirm?',
        actions: ['Yes, correct', 'Edit']
      },
      {
        actor: 'user',
        action: 'Taps "Yes, correct"',
        type: 'action'
      },
      {
        actor: 'bot',
        message: 'Sale recorded. Books updated.',
        type: 'success',
        icon: Check
      }
    ]
  },
  {
    id: 'receipt',
    icon: Camera,
    title: 'Receipt Scanning',
    subtitle: 'Photograph receipt, update stock instantly',
    color: '#FF6B35',
    steps: [
      {
        actor: 'user',
        message: '[Photo of Dangote delivery waybill]',
        type: 'image',
        icon: Camera
      },
      {
        actor: 'bot',
        message: 'Reading waybill...',
        type: 'processing'
      },
      {
        actor: 'bot',
        message: 'FOUND:',
        details: 'Supplier: Dangote Flour Mills\nDate: 12 Apr 2026\nItems:\n• 50kg bag cement × 40 = ₦280,000\n• 50kg Dangote Sugar × 20 = ₦94,000\nTotal: ₦374,000\n\nLog as purchase? Stock will be added.',
        actions: ['Log it', 'Edit first']
      },
      {
        actor: 'user',
        action: 'Taps "Log it"',
        type: 'action'
      },
      {
        actor: 'bot',
        message: 'Purchase logged',
        details: '40 bags cement added to stock\n20 bags sugar added to stock\nExpense: ₦374,000 recorded',
        type: 'success',
        icon: Check
      }
    ]
  },
  {
    id: 'debt',
    icon: CreditCard,
    title: 'Debt Collection',
    subtitle: 'Automated WhatsApp reminders',
    color: '#128C7E',
    steps: [
      {
        actor: 'user',
        message: 'Emeka collect 2 bags rice on credit, ₦24,000',
        type: 'voice',
        icon: Mic
      },
      {
        actor: 'bot',
        message: 'Credit sale recorded',
        details: 'Emeka owes: ₦24,000\nDue date: 19 Apr 2026\n\nI will remind him on due date.',
        type: 'success',
        icon: Check
      },
      {
        actor: 'system',
        message: '[7 days later, automatic reminder sent]',
        type: 'system'
      },
      {
        actor: 'customer',
        name: 'To: Emeka',
        message: 'Hello Emeka, hope you are well. This is a reminder from Alhaji Store. Your balance is ₦24,000. Kindly settle by Friday. Thank you.',
        type: 'reminder'
      },
      {
        actor: 'system',
        message: '[Customer sends bank transfer]',
        type: 'system'
      },
      {
        actor: 'user',
        message: '[Forwards transfer screenshot]',
        type: 'image',
        icon: Camera
      },
      {
        actor: 'bot',
        message: 'Payment detected',
        details: '₦24,000 received from Emeka\n\nMatch to outstanding invoice?\nInvoice #INV-0031 — ₦24,000 (overdue 3 days)',
        actions: ['Yes, match it']
      },
      {
        actor: 'user',
        action: 'Taps "Yes, match it"',
        type: 'action'
      },
      {
        actor: 'bot',
        message: 'Debt cleared',
        details: "Emeka's balance: ₦0",
        type: 'success',
        icon: Check
      }
    ]
  }
];

function HowItWorks() {
  const [activeFlow, setActiveFlow] = useState('voice');
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState([]);

  const sectionRef = useRef(null);
  const onboardRef = useRef(null);
  const messagesRef = useRef(null);
  const demoPlayedRef = useRef(false);

  const startDemo = () => {
    demoPlayedRef.current = true;
    setIsPlaying(true);
    setVisibleMessages([]);
    setCurrentStep(0);
  };

  const resetDemo = () => {
    demoPlayedRef.current = true;
    setIsPlaying(false);
    setVisibleMessages([]);
    setCurrentStep(0);
  };

  // Reveal panels on scroll
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

    sectionRef.current
      ?.querySelectorAll('.how-item')
      .forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  // Autoplay the onboarding demo once, when it scrolls into view
  useEffect(() => {
    const node = onboardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !demoPlayedRef.current) {
            demoPlayedRef.current = true;
            setIsPlaying(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Step ticker for the onboarding demo
  useEffect(() => {
    if (!isPlaying || currentStep >= onboardingScript.length) return;

    const timer = setTimeout(() => {
      setVisibleMessages((prev) => [...prev, onboardingScript[currentStep]]);
      setCurrentStep((prev) => prev + 1);
    }, currentStep === 0 ? 600 : 1100);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep]);

  // Keep the demo chat scrolled to the newest message
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [visibleMessages]);

  const currentFlow = flows.find(f => f.id === activeFlow);

  return (
    <section id="how-it-works" className="how-it-works" ref={sectionRef}>
      <div className="how-container">
        <div className="section-header how-item">
          <span className="section-badge">How It Works</span>
          <h2>From "Hi" to a live business in 2 minutes</h2>
          <p>
            No email verification, no complex setup. One WhatsApp number runs your
            entire back office — here is exactly how it works, step by step.
          </p>
        </div>

        {/* Step 1 — Onboarding */}
        <div className="hiw-panel hiw-onboard how-item" ref={onboardRef}>
          <div className="hiw-subhead">
            <span className="subhead-num">1</span>
            <div>
              <h3>Get started in 2 minutes</h3>
              <p>No forms, no downloads. Just send a WhatsApp message and your business is live.</p>
            </div>
          </div>

          <div className="onboard-grid">
            <div className="onboard-left">
              <div className="onboard-steps">
                {onboardingSteps.map((step, i) => (
                  <Fragment key={i}>
                    <div className="onboard-step">
                      <div className="onboard-icon">
                        <step.icon size={22} />
                      </div>
                      <div className="onboard-text">
                        <h4>{step.title}</h4>
                        <p>{step.text}</p>
                      </div>
                    </div>
                    {i < onboardingSteps.length - 1 && (
                      <div className="onboard-connector">
                        <ArrowRight size={20} />
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>

              <div className="onboard-cta">
                <button className="btn-primary" onClick={startDemo}>
                  <Play size={18} />
                  Watch Demo
                </button>
                <button className="btn-ghost" onClick={resetDemo}>
                  <RotateCcw size={16} />
                  Reset
                </button>
              </div>
            </div>

            <div className="onboard-phone">
              <div className="demo-phone">
                <div className="demo-screen">
                  <div className="demo-header">
                    <div className="demo-avatar">OP</div>
                    <div className="demo-info">
                      <span className="demo-name">Oga Plug</span>
                      <span className="demo-status">Online</span>
                    </div>
                  </div>

                  <div className="demo-messages" ref={messagesRef}>
                    {visibleMessages.length === 0 && (
                      <div className="demo-idle">
                        <MessageCircle size={22} />
                        <span>Tap "Watch Demo" to see registration happen live</span>
                      </div>
                    )}

                    {visibleMessages.map((msg, index) => (
                      <div key={index} className={`demo-message ${msg.type}`}>
                        {msg.type === 'bot' && (
                          <div className="bot-avatar">
                            <MessageCircle size={14} />
                          </div>
                        )}
                        <div className="demo-bubble">
                          <span>{msg.message}</span>
                          {msg.options && (
                            <div className="demo-options">
                              {msg.options.map((opt, i) => (
                                <span key={i} className="demo-option">{opt}</span>
                              ))}
                            </div>
                          )}
                          {msg.summary && (
                            <div className="demo-summary">
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

                    {currentStep >= onboardingScript.length && (
                      <div className="demo-complete">
                        <CheckCircle size={20} />
                        <span>Registered in under 2 minutes — free plan</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 — The actual flows */}
        <div className="hiw-panel hiw-flows how-item">
          <div className="hiw-subhead">
            <span className="subhead-num">2</span>
            <div>
              <h3>Then run your business by voice</h3>
              <p>The actual WhatsApp flows — no marketing fluff. Pick one to see it play out.</p>
            </div>
          </div>

          <div className="flow-selector">
            {flows.map((flow) => (
              <button
                key={flow.id}
                className={`flow-tab ${activeFlow === flow.id ? 'active' : ''}`}
                onClick={() => setActiveFlow(flow.id)}
                style={{ '--flow-color': flow.color }}
              >
                <flow.icon size={24} />
                <div className="flow-tab-text">
                  <span className="flow-tab-title">{flow.title}</span>
                  <span className="flow-tab-subtitle">{flow.subtitle}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flow-display">
            <div className="flow-phone">
              <div className="phone-header">
                <div className="phone-notch"></div>
                <div className="phone-status">
                  <span>9:41</span>
                  <div className="phone-icons">
                    <div className="signal"></div>
                    <div className="wifi"></div>
                    <div className="battery"></div>
                  </div>
                </div>
              </div>

              <div className="phone-chat">
                <div className="chat-header-bar">
                  <div className="chat-avatar-small">OP</div>
                  <div className="chat-title">
                    <span className="chat-name">Oga Plug</span>
                    <span className="chat-status-text">Online</span>
                  </div>
                </div>

                <div className="chat-messages-flow">
                  {currentFlow.steps.map((step, index) => (
                    <div
                      key={index}
                      className={`message-step ${step.type || 'normal'} ${
                        step.actor === 'user' ? 'user' : step.actor === 'customer' ? 'customer' : 'bot'
                      }`}
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      {step.actor === 'bot' && (
                        <div className="step-label">
                          <div className="bot-avatar-small">
                            <MessageCircle size={12} />
                          </div>
                          <span>Oga Plug</span>
                        </div>
                      )}

                      {step.actor === 'system' && (
                        <div className="system-label">
                          <Clock size={12} />
                          <span>System</span>
                        </div>
                      )}

                      {step.actor === 'customer' && step.name && (
                        <div className="customer-label">
                          <User size={12} />
                          <span>{step.name}</span>
                        </div>
                      )}

                      {step.message && (
                        <div className="message-bubble">
                          {step.icon && (
                            <div className="message-icon">
                              <step.icon size={14} />
                            </div>
                          )}
                          <div className="message-content">
                            <div className="message-text">{step.message}</div>
                            {step.details && (
                              <div className="message-details">{step.details}</div>
                            )}
                          </div>
                        </div>
                      )}

                      {step.action && (
                        <div className="message-action">
                          <ArrowRight size={12} />
                          <span>{step.action}</span>
                        </div>
                      )}

                      {step.actions && (
                        <div className="message-actions">
                          {step.actions.map((action, i) => (
                            <button key={i} className="action-button">
                              {action}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flow-explanation">
              <h3>{currentFlow.title}</h3>
              <p className="flow-desc">{currentFlow.subtitle}</p>

              <div className="flow-highlights">
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <ShieldCheck size={18} />
                  </div>
                  <span>Confirmation required before logging</span>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <Database size={18} />
                  </div>
                  <span>Stock and books update automatically</span>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <Check size={18} />
                  </div>
                  <span>Full audit trail for every transaction</span>
                </div>
              </div>

              <div className="flow-note">
                <div className="note-icon">
                  <MessageCircle size={20} />
                </div>
                <div className="note-content">
                  <h4>The Safety Net</h4>
                  <p>
                    Every piece of data Oga Plug extracts from voice notes, photos, or screenshots
                    is shown back to you for confirmation. Nothing logs without your approval.
                    OCR mistakes happen—we built the system to never corrupt your records.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
