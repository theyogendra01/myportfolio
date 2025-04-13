import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import profileImage from '../assets/profile.jpg';

const About = () => {
    const [ref, inView] = useInView({
        threshold: 0.3,
        triggerOnce: true
    });

    return (
        <motion.section
            ref={ref}
            className="about-section"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="about-content">
                <motion.div
                    className="about-text"
                    initial={{ x: -50 }}
                    animate={inView ? { x: 0 } : { x: -50 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2>About Me</h2>
                    <p>
                        "Engineering Ideas into Digital Reality."
                    </p>
                    <p>
                        Hi, I'm Yogendra — a developer who brings imagination to life with code and creativity,
                        building not just apps, but experiences.
                    </p>
                    <div className="resume-link">
                        <a
                            href="https://drive.google.com/file/d/1UPib5xjk5h5rFXshr8O13AOvpOMe3EZa/view?usp=drive_link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View My Resume
                        </a>
                    </div>
                    <div className="tech-stack">
                        <h3>My Tech Stack</h3>
                        <div className="tech-categories">
                            <div className="tech-category">
                                <h4>Languages</h4>
                                <div className="tech-items">
                                    <span>Java</span>
                                    <span>JavaScript</span>
                                    <span>HTML5</span>
                                    <span>CSS3</span>
                                </div>
                            </div>
                            <div className="tech-category">
                                <h4>Frameworks & Libraries</h4>
                                <div className="tech-items">
                                    <span>React</span>
                                    <span>Spring Boot</span>
                                    <span>Bootstrap</span>
                                    <span>Tailwind</span>
                                </div>
                            </div>
                            <div className="tech-category">
                                <h4>Tools</h4>
                                <div className="tech-items">
                                    <span>GitHub</span>
                                    <span>Postman</span>
                                    <span>VS Code</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="about-image"
                    initial={{ x: 50 }}
                    animate={inView ? { x: 0 } : { x: 50 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="image-container">
                        <img src={profileImage} alt="Yogendra" className="profile-image" />
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default About;