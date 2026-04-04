import './Home.css'
import  { useState, useEffect } from 'react';
 import {Cctv,SoapDispenserDroplet,WifiSync } from"lucide-react";
 import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Wrench, Home, Droplets, Zap, ShieldCheck, 
  Hammer, Settings, Paintbrush, Construction 
} from 'lucide-react';
// smoke
 const smokeVariants = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    x: -10, 
    filter: "blur(15px) brightness(2)", // Makes it look like a glowing gas cloud
    scale: 1.2 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    x: 0, 
    filter: "blur(0px) brightness(1)", 
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 50
    }
  }
};

const SmokeText = ({ text }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: 0.04 }} // Creates the "wave" of smoke
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={smokeVariants}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};
const iconsList = [
  { Icon: Wrench, size: 30 }, { Icon: Home, size: 30 }, { Icon: Zap, size: 30 },
  { Icon: Droplets, size: 30 }, { Icon: ShieldCheck, size: 30 }, { Icon: Hammer, size: 30 },
  { Icon: Settings, size: 30 }, { Icon: Paintbrush, size: 30 }, { Icon: Construction, size: 30 }
];
// smoke
function Homes(){
const [count, setCount] = useState(0);

  // Counter Logic: 1 to 2700
  useEffect(() => {
    let start = 0;
    const end = 2700;
    const duration = 2000; 
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, []);

// the smoke
        
const steps = [
    { num: "01", title: "Select the service", desc: "Select service and schedule a time on our app." },
    { num: "02", title: "Send request", desc: "We assign the best-rated Pro for your task." },
    { num: "03", title: "Provide Service", desc: "Professional is en-route and arrives in 30 mins." },
    { num: "04", title: "Solve Problem", desc: "High-quality repairs or maintenance performed." },
    { num: "05", title: "Job Complete", desc: "Service Completed and secure digital payment." }
  ];
    
// recorde

const [isSplit, setIsSplit] = useState(false);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // TEXT 1: Always visible at the top
  // TEXT 2: Starts invisible/low, slides to 0 and STAYS at 1 opacity
  const text2Y = useTransform(scrollYProgress, [0.1, 0.4], [100, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  // TEXT 3: Starts invisible/low, slides to 0 and STAYS at 1 opacity
  const text3Y = useTransform(scrollYProgress, [0.5, 0.8], [100, 0]);
  const text3Opacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  useEffect(() => {
    const timer = setTimeout(() => setIsSplit(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
    <div className="hero-wrapper">
      <div className="hero-container">
        
        <div className="hero-text-side">
          <h1 className="main-title">
            <span className="line-animation line-1">The New</span> <br />
            <span className="line-animation line-2">Level of Care</span> <br />
            <span className="line-animation line-3">For Your Home</span>
          </h1>
          <div className="rating">
            <span className="stars">★★★★★</span>
            <span className="reviews">5.0 (2.7k Reviews)</span>
          </div>
        </div>

        <div className="hero-image-center">
          <img 
            src="https://res.cloudinary.com/dwz6wpvak/image/upload/v1773399541/home_first_mssbd1.png" 
            alt="Service Professional" 
            className="man-image" 
          />
          
          <div className="floating-pill pill-top-right">
            <div className="pill-icon pulse-icon">🛠️</div>
            <div className="pill-text">
              <strong>Pro Tools</strong> <br />
              Expert repair service
            </div>
          </div>

          <div className="floating-pill pill-mid-left">
            <div className="pill-icon pulse-icon">📍</div>
            <div className="pill-text">
              <strong>Local Pros</strong> <br />
              Ready in 30 mins
            </div>
          </div>
        </div>

        <div className="hero-stats-side">
          <div className="stats-card-wrapper">
            <div className="stats-card hero-360-rotation">
              {/* The narrow edge light running around the border */}
              <div className="edge-light-runner"></div>
              
              <div className="user-avatars">
                <div className="avatar"><Cctv size={30}   /></div>
                <div className="avatar"><SoapDispenserDroplet size={30}/></div>
                <div className="avatar"><WifiSync size={30}  /></div>

              </div>
              <h3>{count.toLocaleString()}+</h3>
              <p>Trust us to take care of your home needs</p>
            </div>
          </div>
        </div>

      </div>

      
    </div>
  {/* smoke */}

 <section className="process-section">
  <div className="process-container">
    
    {/* LEFT SIDE: The Man - Moved to bottom */}
    <div className="process-visual">
      <div className="image-bottom-aligner">
        <motion.img 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          src="https://res.cloudinary.com/dwz6wpvak/image/upload/v1775211157/Handyman_with_tools_and_welcoming_gesture_nhqilf.png" 
          alt="Provider" 
          className="provider-image-small"
        />
      </div>
    </div>

    {/* RIGHT SIDE: Roadmap Content */}
    <div className="process-content">
      <div className="content-header">
        <h2 className="content-title">
          <SmokeText text="Comprehensive" />
          <SmokeText text="Home Care" />
        </h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="content-desc"
        >
          From fixing leaks to smart home syncing, we handle everything 
          with expert precision. Your home is in safe hands.
        </motion.p>
      </div>

      <div className="roadmap-path">
        <div className="path-line"></div>
        {steps.map((step, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + (idx * 0.1) }}
            className="roadmap-step"
          >
            <div className="step-dot">{step.num}</div>
            <div className="step-text">
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

  </div>
</section>

    {/* RIGHT SIDE: Roadmap Content */}

 <div ref={containerRef} className="stack-wrapper">
      <div className="stack-sticky">
        
        {/* BOUNCING ICONS LAYER */}
        <div className="stack-physics-bg">
          {iconsList.map((item, i) => (
            <BouncingIcon 
              key={i} 
              Icon={item.Icon} 
              index={i} 
              isSplit={isSplit} 
            />
          ))}
        </div>

        {/* THE STACKING TEXT (No Vanishing) */}
        <div className="stack-content">
          
          {/* Headline 1: Visible immediately after split */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isSplit ? 1 : 0 }}
            className="stack-item"
          >
            <h2 className="stack-num">1,150+</h2>
            <p className="stack-sub">Services and Providers</p>
          </motion.div>

          {/* Headline 2: Slides in and joins the stack */}
          <motion.div 
            style={{ y: text2Y, opacity: text2Opacity }} 
            className="stack-item"
          >
            <h2 className="stack-num">6,02,300</h2>
            <p className="stack-sub">Trust Users..</p>
          </motion.div>

          {/* Headline 3: Slides in and joins the stack */}
          <motion.div 
            style={{ y: text3Y, opacity: text3Opacity }} 
            className="stack-item"
          >
            <h2 className="stack-num">3,21,100</h2>
            <p className="stack-sub">Completed Works</p>
          </motion.div>

        </div>
      </div>
    </div>

    </>
  );
}
const BouncingIcon = ({ Icon, index, isSplit }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const velocity = useRef({
    x: (Math.random() - 0.5) * 1.5,
    y: (Math.random() - 0.5) * 1.5
  });

  const angle = (index / iconsList.length) * Math.PI * 2;
  const startX = Math.cos(angle) * 300;
  const startY = Math.sin(angle) * 200;

  useEffect(() => {
    if (!isSplit) return;
    let x = startX;
    let y = startY;

    const update = () => {
      x += velocity.current.x;
      y += velocity.current.y;

      const limitX = window.innerWidth / 2 - 60;
      const limitY = window.innerHeight / 2 - 60;

      if (Math.abs(x) > limitX) velocity.current.x *= -1;
      if (Math.abs(y) > limitY) velocity.current.y *= -1;

      setPos({ x, y });
      requestAnimationFrame(update);
    };
    const frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [isSplit]);

  return (
    <motion.div
      className="stack-icon-card"
      animate={{
        x: isSplit ? pos.x : 0,
        y: isSplit ? pos.y : 0,
        scale: isSplit ? 1 : 0,
        opacity: isSplit ? 1 : 0
      }}
      transition={isSplit ? { type: "spring", stiffness: 50 } : { duration: 0.5 }}
    >
      <Icon size={24} />
    </motion.div>
  );
};

export default Homes