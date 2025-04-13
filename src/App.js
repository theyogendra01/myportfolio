import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, Events, scrollSpy } from 'react-scroll';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
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

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);

    // Initialize scrollspy
    Events.scrollEvent.register('begin', (to) => {
      setActiveSection(to);
    });

    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove('begin');
    };
  }, []);

  const navLinks = [
    { to: 'home', label: 'Home' },
    { to: 'about', label: 'About' },
    { to: 'projects', label: 'Projects' },
    { to: 'skills', label: 'Skills' },
    { to: 'contact', label: 'Contact' }
  ];

  return (
    <div className="App">
      {isLoading ? (
        <motion.div
          className="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="loader-content">
            <h1>Welcome</h1>
            <div className="progress-bar" />
          </div>
        </motion.div>
      ) : (
        <>
          <nav className="navigation">
            <div className="nav-content">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className={activeSection === to ? 'active' : ''}
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>

          <main>
            <section id="home" className="hero-section">
              <div className="hero-content">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Hi, I'm <span className="highlight">Yogender Swami</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Full Stack Developer
                </motion.p>
              </div>
            </section>

            <About />
            <Projects />
            <Skills />
            <Contact />
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
