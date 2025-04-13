import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skillsData = [
    { name: 'Frontend Development', level: 90, color: '#6c63ff' },
    { name: 'React.js', level: 85, color: '#61dafb' },
    { name: 'UI/UX Design', level: 80, color: '#ff6b6b' },
    { name: 'JavaScript', level: 85, color: '#f7df1e' },
    { name: 'CSS/SASS', level: 90, color: '#ff69b4' },
    { name: 'Responsive Design', level: 95, color: '#2ecc71' },
];

const Skills = () => {
    const [ref, inView] = useInView({
        threshold: 0.3,
        triggerOnce: true
    });

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0
        }
    };

    return (
        <section className="skills-section" ref={ref}>
            <motion.div
                className="skills-container"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                <h2>My Skills</h2>
                <div className="skills-grid">
                    {skillsData.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            className="skill-card"
                            variants={itemVariants}
                        >
                            <h3>{skill.name}</h3>
                            <div className="skill-bar-container">
                                <motion.div
                                    className="skill-bar"
                                    initial={{ width: 0 }}
                                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                                    transition={{ duration: 1, delay: index * 0.1 }}
                                    style={{ backgroundColor: skill.color }}
                                />
                                <span className="skill-percentage">{skill.level}%</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Skills;