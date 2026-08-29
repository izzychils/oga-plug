import { useEffect, useRef, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Alhaji Musa',
    business: 'Musa General Merchants',
    location: 'Lagos, Nigeria',
    rating: 5,
    text: 'Oga Plug has transformed how I run my business. I can now track all my sales and debts right from WhatsApp. No more manual records!',
    avatar: 'AM'
  },
  {
    name: 'Ngozi Okafor',
    business: 'Ngozi Pharmacy',
    location: 'Port Harcourt, Nigeria',
    rating: 5,
    text: 'As a pharmacist, I need to track inventory carefully. Oga Plug alerts me when stock is low and helps me manage my suppliers efficiently.',
    avatar: 'NO'
  },
  {
    name: 'Ibrahim Abdullahi',
    business: 'Ibrahim Hardware Store',
    location: 'Kano, Nigeria',
    rating: 5,
    text: 'The USSD feature is a game changer. My workers who don\'t have smartphones can still record sales. This is truly built for Africa.',
    avatar: 'IA'
  },
  {
    name: 'Funke Adeyemi',
    business: 'Funke Fashion House',
    location: 'Abuja, Nigeria',
    rating: 5,
    text: 'I love how I can manage my 3 store locations from one WhatsApp number. The daily reports help me make better business decisions.',
    avatar: 'FA'
  },
  {
    name: 'Chukwuemeka Obi',
    business: 'Emeka Bookshop',
    location: 'Enugu, Nigeria',
    rating: 5,
    text: 'Setting up was so easy! Just sent "Hi" and my business was live in 2 minutes. No email verification or complicated forms.',
    avatar: 'CO'
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
          <span className="section-badge">Testimonials</span>
          <h2>Loved by African Businesses</h2>
          <p>Join thousands of businesses already using Oga Plug to grow.</p>
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
              <p className="testimonial-text">{testimonials[currentIndex].text}</p>
              
              <div className="testimonial-rating">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={18} className="star" />
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
