import React from 'react';
import { Link } from 'react-router-dom';
// Importing specific icons from Font Awesome and Material Design
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdSend, MdPhone } from 'react-icons/md';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-row">
          
          {/* Column 1: Brand Info */}
          <div className="footer-col brand-info">
            <h2 className="footer-logo">Just</h2>
            <p>
              Subscribe to Easy Tutorials YouTube channel to 
              watch more videos on website development 
              and press the bell icon to get immediate 
              notifications of latest videos.
            </p>
          </div>

          {/* Column 2: Office */}
          <div className="footer-col">
            <h3 className="col-title">Office</h3>
            <div className="title-underline"><span></span></div>
            <p>ITPL Road</p>
            <p>Whitefield, Bangalore</p>
            <p>Karnataka, PIN 560066, India</p>
            <p className="footer-link-text underline">avinashdm@outlook.com</p>
            <p className="footer-link-text">+91 - 0123456789</p>
          </div>

          {/* Column 3: Links */}
          <div className="footer-col">
            <h3 className="col-title">Links</h3>
            <div className="title-underline"><span></span></div>
            <ul className="footer-nav-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/contacts">Contacts</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Socials */}
          <div className="footer-col">
            <h3 className="col-title">Newsletter</h3>
            <div className="title-underline"><span></span></div>
            <form className="newsletter-input-group">
              <MdEmail size={18} className="input-icon" />
              <input type="email" placeholder="Enter your email id" />
              <button type="submit" className="submit-arrow"><MdSend size={18} /></button>
            </form>
            
            <div className="social-media-row">
              <div className="social-icon-circle"><FaFacebookF size={16} /></div>
              <div className="social-icon-circle"><FaInstagram size={16} /></div>
              <div className="social-icon-circle"><FaLinkedinIn size={16} /></div>
              <div className="social-icon-circle"><FaYoutube size={16} /></div>
            </div>
          </div>

        </div>

        <hr className="footer-divider-line" />
        <p className="copyright-notice">Easy Tutorials © 2021 - All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;