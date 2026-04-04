import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Fq.css'
function Fq(){

    const [activeId, setActiveId] = useState(null);

  const faqs = [
    { id: 1, q: "How do I book a local service professional?", a: "Simply browse our marketplace, select the service you need, and choose a time slot that works for you. Your pro will be confirmed instantly." },
    { id: 2, q: "Are the service providers background-checked?", a: "Yes, every professional on our platform undergoes a multi-step identity verification and criminal background check." },
    { id: 3, q: "What happens if I need to cancel my booking?", a: "You can cancel up to 24 hours before your appointment for a full refund through your administrative dashboard." },
    { id: 4, q: "How do I pay for the services?", a: "Payments are handled securely through our digital checkout system once the job is marked as complete." },
    { id: 5, q: "Can I track my service professional in real-time?", a: "Yes, once your pro is en-route, you will receive a tracking link to see their arrival time." },
    { id: 6, q: "What if I am not satisfied with the work?", a: "We offer a 100% satisfaction guarantee. If the job isn't right, we will send a pro back to fix it at no extra cost." },
    { id: 7, q: "Do I need to provide the tools for the job?", a: "Most pros bring their own professional tools, but you can specify requirements during the booking process." },
    { id: 8, q: "How do I verify the identity of the pro at my door?", a: "You can view the pro's digital ID and profile photo in your 'Booking Management' section before they arrive." },
    { id: 9, q: "Are there any hidden service fees?", a: "No, the price you see during checkout is the final price. We believe in total transparency." },
    { id: 10, q: "How can I join as a service provider?", a: "You can apply through our 'Provider Portal' by submitting your certifications and business license for review." }
  ];

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="faq-wrapper">
      <div className="faq-container">
        <div className="faq-header">
          <h1 className="faq-title">Questions & Answers</h1>
          <p className="faq-subtitle">Everything you need to know about our home services</p>
        </div>

        <div className="faq-list">
          {faqs.map((faq) => (
            <div key={faq.id} className={`faq-item ${activeId === faq.id ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => toggleFAQ(faq.id)}>
                <span>{faq.q}</span>
                <ChevronDown size={20} className="faq-arrow-icon" />
              </button>

              <div className="faq-answer-container">
                <div className="faq-content">
                  <p>{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}
export default Fq