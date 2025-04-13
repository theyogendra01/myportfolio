import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Events, scrollSpy } from 'react-scroll';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ThemeSwitcher from './components/ThemeSwitcher';
import Particles from './components/Particles';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import './styles/global.css';
import './styles/variables.css';
import './styles/loader.css';
import './styles/navigation.css';
import './styles/hero.css';
import './styles/about.css';
import './styles/skills.css';
import './styles/projects.css';
import './styles/contact.css';
import './styles/modal.css';
import './styles/responsive.css';
import './styles/animations.css';
import './styles/patterns.css';
import './styles/scroll-progress.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);
  const [keySequence, setKeySequence] = useState([]);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);

    Events.scrollEvent.register('begin', (to) => {
      setActiveSection(to);
    });

    // Update ScrollSpy when all images and assets are loaded
    window.addEventListener('load', () => {
      scrollSpy.update();
    });

    const handleKeyPress = (e) => {
      const newSequence = [...keySequence, e.key].slice(-4);
      setKeySequence(newSequence);

      if (newSequence.join('') === 'yoga') {
        setIsEasterEggActive(true);
        setTimeout(() => setIsEasterEggActive(false), 3000);
        setKeySequence([]); // Reset sequence after triggering
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      Events.scrollEvent.remove('begin');
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [keySequence]);

  const navLinks = [
    { to: 'home', label: 'Home' },
    { to: 'about', label: 'About' },
    { to: 'projects', label: 'Projects' },
    { to: 'contact', label: 'Contact' }
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.6,
        ease: "easeIn"
      }
    }
  };

  return (
    <div className={`App ${isEasterEggActive ? 'easter-egg-active' : ''}`}>
      {isLoading ? (
        <motion.div
          className="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="loader-content">
            <h1 className="blur-text">Welcome</h1>
            <div className="progress-bar" />
          </div>
        </motion.div>
      ) : (
        <>
          <ScrollProgress />
          <ScrollToTop />
          <nav className="navigation">
            <div className="nav-container">
              <div className="nav-links">
                {navLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={800}
                    delay={100}
                    className={`nav-link ${activeSection === to ? 'active' : ''}`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <ThemeSwitcher />
            </div>
          </nav>

          <main>
            <AnimatePresence mode="wait">
              <motion.section
                id="home"
                className="hero-section"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.3 }}
              >
                <Particles />
                <div className="hero-content">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <motion.h1
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      Hi, I'm{' '}
                      <motion.span
                        className="glitch highlight"
                        data-text="Yogender Swami"
                        animate={{
                          textShadow: [
                            "0 0 4px var(--primary-color)",
                            "0 0 8px var(--primary-color)",
                            "0 0 4px var(--primary-color)"
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity
                        }}
                      >
                        Yogender Swami
                      </motion.span>
                    </motion.h1>
                    <motion.p
                      className="blur-text"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      Full Stack Developer
                    </motion.p>
                  </motion.div>
                </div>
              </motion.section>

              <motion.section
                id="about"
                className="about-section"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.3 }}
              >
                <About />
              </motion.section>

              <motion.section
                id="projects"
                className="projects-section"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.3 }}
              >
                <Projects />
              </motion.section>

              <motion.section
                id="contact"
                className="contact-section"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.3 }}
              >
                <Contact />
              </motion.section>
            </AnimatePresence>
          </main>

          <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Yogender Swami. All rights reserved.</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
