import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaWater, 
  FaLeaf, 
  FaRecycle, 
  FaTruck, 
  FaStar, 
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaSnowflake,
  FaMountain,
  FaSeedling,
  FaGlobe,
  FaWhatsapp,
  FaArrowUp,
  FaHandPointDown
} from 'react-icons/fa';
import './App.css';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Sustainability from './pages/Sustainability';
import FAQ from './pages/FAQ';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
            <Home />
          </motion.div>
        } />
        <Route path="/products" element={
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
            <Products />
          </motion.div>
        } />
        <Route path="/about" element={
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
            <About />
          </motion.div>
        } />
        <Route path="/contact" element={
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
            <Contact />
          </motion.div>
        } />
        <Route path="/sustainability" element={
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
            <Sustainability />
          </motion.div>
        } />
        <Route path="/faq" element={
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
            <FAQ />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [showChatPopup, setShowChatPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollBtn = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScrollBtn);
    return () => window.removeEventListener('scroll', handleScrollBtn);
  }, []);

  // Show 'Chat with us!' popup every time the website is loaded
  useEffect(() => {
    setShowChatPopup(true);
    const timer = setTimeout(() => setShowChatPopup(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Inject Chatbase chatbox script once on mount
  useEffect(() => {
    if (!document.getElementById('IeUcf2UiRIfZo0FZ14NzY')) {
      (function(){
        if(!window.chatbase||window.chatbase("getState")!=="initialized"){
          window.chatbase=(...args)=>{
            if(!window.chatbase.q){window.chatbase.q=[]}
            window.chatbase.q.push(args)
          };
          window.chatbase=new Proxy(window.chatbase,{
            get(target,prop){
              if(prop==="q"){return target.q}
              return(...args)=>target(prop,...args)}
          })
        }
        const onLoad=function(){
          const script=document.createElement("script");
          script.src="https://www.chatbase.co/embed.min.js";
          script.id="IeUcf2UiRIfZo0FZ14NzY";
          script.domain="www.chatbase.co";
          document.body.appendChild(script)
        };
        if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}
      })();
    }
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Navigation */}
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
          <div className="nav-container">
            <motion.div 
              className="nav-logo"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FaWater className="logo-icon" />
              <span>Evo Blue</span>
            </motion.div>
            <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}> 
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/products" onClick={() => setIsMenuOpen(false)}>Products</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link to="/sustainability" onClick={() => setIsMenuOpen(false)}>Sustainability</Link>
              <Link to="/faq" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            </div>
            <div className="nav-actions">
              <button className="cart-btn">
                <FaShoppingCart />
                <span className="cart-count">0</span>
              </button>
              <button 
                className="menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </nav>
        {/* Floating Chatbase Chatbox (positioned above WhatsApp) */}
        {showChatPopup && (
          <div className="chat-popup">
            <span>Chat with us!</span>
            <FaHandPointDown style={{marginLeft: 12, fontSize: '1.7rem', color: '#1e40af'}} />
            <button className="close-chat-popup" onClick={() => setShowChatPopup(false)}>&times;</button>
          </div>
        )}
        <div className="floating-chatbase" />
        {/* Scroll to Top Button */}
        {showScroll && (
          <button className="scroll-to-top" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} title="Scroll to top">
            <FaArrowUp />
          </button>
        )}
        {/* Main Content - Animated page transitions */}
        <AnimatedRoutes />
        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <h3>Evo Blue</h3>
                <p>Your trusted source for premium water-filled plastic bottles. Pure, refreshing water delivered with convenience and care.</p>
              </div>
              <div className="footer-section">
                <h4>Quick Links</h4>
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/about">About</Link>
                <Link to="/sustainability">Sustainability</Link>
                <Link to="/faq">FAQ</Link>
                <Link to="/contact">Contact</Link>
              </div>
              <div className="footer-section">
                <h4>Support</h4>
                <Link to="/faq">FAQ</Link>
                <Link to="/shipping">Shipping</Link>
                <Link to="/returns">Returns</Link>
                <Link to="/size-guide">Size Guide</Link>
              </div>
              <div className="footer-section">
                <h4>Newsletter</h4>
                <p>Subscribe for updates and exclusive offers</p>
                <div className="newsletter-form">
                  <input type="email" placeholder="Enter your email" />
                  <button className="btn-primary">Subscribe</button>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2024 Evo Blue. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
