import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaDownload } from 'react-icons/fa';
import { SiGeeksforgeeks, SiLeetcode, SiHackerrank } from 'react-icons/si';
import profileImage from '../assets/profile.jpg';
import Resume from '../assets/Yogender.pdf';

const About = () => {
    const [ref, inView] = useInView({
        threshold: 0.3,
        triggerOnce: true
    });

    const codingProfiles = [
        {
            icon: <SiGeeksforgeeks />,
            url: 'https://www.geeksforgeeks.org/user/yogendrasi915/',
            label: 'GeeksforGeeks'
        },
        {
            icon: <SiLeetcode />,
            url: 'https://leetcode.com/u/theyogendra01/',
            label: 'LeetCode'
        },
        {
            icon: <SiHackerrank />,
            url: 'https://www.hackerrank.com/profile/yogendraswami297',
            label: 'HackerRank'
        }
    ];

    return (
        <motion.section
            id="about"
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
                    <div className="coding-profiles">
                        <h3>Coding Profiles</h3>
                        <div className="profiles-grid">
                            {codingProfiles.map(({ icon, url, label }) => (
                                <motion.a
                                    key={label}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="profile-card"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="profile-icon">{icon}</span>
                                    <span className="profile-label">{label}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                    <motion.a
                        href={Resume}
                        download="Yogender_Swami_Resume.pdf"
                        className="resume-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaDownload /> My Resume
                    </motion.a>
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