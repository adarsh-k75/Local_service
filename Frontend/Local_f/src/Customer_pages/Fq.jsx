import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Fq.css'
import api from '../api/axios';
function Fq(){

   let [role,setrole]=useState({})

    const [activeId, setActiveId] = useState(null);

    useEffect(()=>{
        api.get("profile/")
        .then((res)=>{
          setrole(res.data.role)
        })
    })

  const faqs = [
     {
    id: 1,
    q: "What is this platform?",
    a: "This platform helps you find and book trusted local service providers for your daily needs quickly and easily."
  },
  {
    id: 2,
    q: "Are the service providers verified?",
    a: "Yes, all service providers go through identity verification and basic background checks before joining."
  },
  {
    id: 3,
    q: "What happens if I cancel my booking?",
    a: "You can cancel your booking before the scheduled time. Refund eligibility depends on the provider's cancellation policy."
  },
  {
    id: 4,
    q: "How do I pay for services?",
    a: "You can pay securely through the platform using available online payment methods after confirming the service."
  },
  {
    id: 5,
    q: "Can I track my service provider?",
    a: "Yes, you can track your service provider in real-time once they are on the way to your location."
  },
  {
    id: 6,
    q: "What if I am not satisfied with the service?",
    a: "If you're not satisfied, you can report the issue and we will help resolve it or arrange a re-service if applicable."
  },
  {
    id: 7,
    q: "Do I need to provide tools?",
    a: "Most service providers bring their own tools, but you can mention any special requirements أثناء booking."
  },
  {
    id: 8,
    q: "How do I verify the service provider?",
    a: "You can check the provider’s profile, ratings, and ID details in your booking section before they arrive."
  },
  {
    id: 9,
    q: "Are there any hidden charges?",
    a: "No, all charges are shown upfront. You will only pay the amount displayed during booking."
  },
  {
    id: 10,
    q: "How can I become a service provider?",
    a: "You can register as a provider by signing up and submitting your details for approval."
  }
  ];

const providerFaqs = [
  {
    id: 1,
    q: "How do I register as a service provider?",
    a: "You can sign up through the provider registration page and submit your personal and service details for approval."
  },
  {
    id: 2,
    q: "What documents are required for verification?",
    a: "You need to provide a valid ID proof, service-related certifications (if any), and basic profile information."
  },
  {
    id: 3,
    q: "How long does the approval process take?",
    a: "Verification usually takes 1–3 business days after submitting all required documents."
  },
  {
    id: 4,
    q: "How do I receive bookings?",
    a: "Once approved, you will start receiving booking requests from users based on your service category and location."
  },
  {
    id: 5,
    q: "Can I accept or reject booking requests?",
    a: "Yes, you have full control to accept or decline booking requests based on your availability."
  },
  {
    id: 6,
    q: "How do I get paid?",
    a: "Payments are transferred to your registered account after successful completion of the service."
  },
  {
    id: 7,
    q: "Can I set my own pricing?",
    a: "Yes, you can set or update your service pricing from your provider dashboard."
  },
  {
    id: 8,
    q: "What if a customer cancels a booking?",
    a: "If a customer cancels, the outcome depends on the cancellation policy set on the platform."
  },
  {
    id: 9,
    q: "How can I improve my visibility on the platform?",
    a: "Maintain good ratings, complete your profile, respond quickly, and provide quality service to attract more customers."
  },
  {
    id: 10,
    q: "Can I update my profile and services later?",
    a: "Yes, you can edit your profile, services, availability, and pricing anytime from your dashboard."
  }
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


      {role==="customer" ?(
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

      ):(

        <div className="faq-list">
          {providerFaqs.map((faq) => (
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
      )}
        





      </div>
    </div>
  );

}
export default Fq