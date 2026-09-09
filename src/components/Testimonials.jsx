import { useEffect, useRef, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Alhaji Musa Ibrahim',
    business: 'Musa General Merchants',
    location: 'Mile 3 Market, Port Harcourt',
    rating: 5,
    text: 'Before Oga Plug, I no know who dey owe me money well well. Now when customer say "Alhaji I go pay next week," I just send reminder through WhatsApp. I don collect ₦340,000 wey I for forget since I start to use am.',
    avatar: 'AM',
    painPoint: 'Uncollected debts'
  },
  {
    name: 'Mrs. Ngozi Okafor',
    business: 'Ngozi Community Pharmacy',
    location: 'GRA Phase 2, Port Harcourt',
    rating: 5,
    text: 'The expiry tracking saved my business. Last month, Oga Plug alert me say 15 drugs dey expire in 30 days. I run clearance sale sharp sharp. ₦180,000 I would have thrown away, I still sell ₦120,000. That one pain pass.',
    avatar: 'NO',
    painPoint: 'Drug expiry losses'
  },
  {
    name: 'Emeka Okonkwo',
    business: 'Emeka Provisions',
    location: 'Rumuola Market, Port Harcourt',
    rating: 5,
    text: 'I just snap the waybill when Dangote delivery come. Oga Plug read all the 50 items, update my stock. Wetin go take me 2 hours with pen and paper, I don finish in 3 minutes. My wife sef shock when she see am.',
    avatar: 'EO',
    painPoint: 'Manual stock entry'
  },
  {
    name: 'Mama Chioma',
    business: 'Chioma Food Supplies',
    location: 'New Owerri Market',
    rating: 5,
    text: 'I dey sell tomato and pepper. Every evening, Oga Plug send me message say "you sell ₦45,000 today, your profit na ₦12,500." For the first time in 8 years, I sabi how much I dey really make. Na so business suppose be.',
    avatar: 'MC',
    painPoint: 'Unknown profit margins'
  },
  {
    name: 'Dr. Chukwudi Nwosu',
    business: 'MedPlus Pharmacy',
    location: 'Ikenegbu, Owerri',
    rating: 5,
    text: 'PCN came for inspection last week. I open my Oga Plug dashboard, show them controlled substance log, batch numbers, everything correct. 15 minutes, inspection done. My colleague wey no get system, them spend 3 hours with her and still give query.',
    avatar: 'CN',
    painPoint: 'Regulatory compliance'
  }
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
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
    <section id="testimonials" className="testimonials" ref={sectionRef}>
      <div className="testimonials-container">
        <div className="section-header">
          <span className="section-badge">Real Stories</span>
          <h2>Built for Nigerian Business Reality</h2>
          <p>Real businesses. Real pain solved. Real money recovered or saved.</p>
        </div>
        
        <div className="testimonials-carousel">
          <button className="carousel-button prev" onClick={prevTestimonial}>
            <ChevronLeft size={24} />
          </button>
          
          <div className="testimonial-card">
            <div className="quote-icon">
              <Quote size={32} />
            </div>
            
            <div className="testimonial-content">
              <div className="pain-point-badge">{testimonials[currentIndex].painPoint}</div>
              <p className="testimonial-text">{testimonials[currentIndex].text}</p>
              
              <div className="testimonial-rating">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={18} className="star" fill="currentColor" />
                ))}
              </div>
              
              <div className="testimonial-author">
                <div className="author-avatar">
                  {testimonials[currentIndex].avatar}
                </div>
                <div className="author-info">
                  <span className="author-name">{testimonials[currentIndex].name}</span>
                  <span className="author-business">{testimonials[currentIndex].business}</span>
                  <span className="author-location">{testimonials[currentIndex].location}</span>
                </div>
              </div>
            </div>
          </div>
          
          <button className="carousel-button next" onClick={nextTestimonial}>
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="carousel-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
