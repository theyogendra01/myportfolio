import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
                        I am a passionate web developer with a keen eye for design and a love
                        for creating beautiful, functional websites. With expertise in modern
                        web technologies, I bring ideas to life through clean code and
                        intuitive user experiences.
                    </p>
                    <div className="tech-stack">
                        <h3>My Tech Stack</h3>
                        <div className="tech-items">
                            <span>React</span>
                            <span>JavaScript</span>
                            <span>HTML5</span>
                            <span>CSS3/SASS</span>
                            <span>Node.js</span>
                            <span>Git</span>
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
                        {/* Add your image here */}
                        <div className="placeholder-image" />
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default About;