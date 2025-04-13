import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skillsData = [
    // Languages
    { name: 'Java', level: 85, color: '#f89820', category: 'Languages' },
    { name: 'JavaScript', level: 90, color: '#f7df1e', category: 'Languages' },
    { name: 'HTML5', level: 95, color: '#e34c26', category: 'Languages' },
    { name: 'CSS3', level: 90, color: '#264de4', category: 'Languages' },

    // Frameworks & Libraries
    { name: 'React', level: 88, color: '#61dafb', category: 'Frameworks' },
    { name: 'Spring Boot', level: 82, color: '#6db33f', category: 'Frameworks' },
    { name: 'Bootstrap', level: 85, color: '#7952b3', category: 'Frameworks' },
    { name: 'Tailwind', level: 80, color: '#38b2ac', category: 'Frameworks' },

    // Tools & Technologies
    { name: 'Git/GitHub', level: 88, color: '#f05032', category: 'Tools' },
    { name: 'VS Code', level: 92, color: '#007acc', category: 'Tools' },
    { name: 'Postman', level: 85, color: '#ff6c37', category: 'Tools' }
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

    // Group skills by category
    const groupedSkills = skillsData.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {});

    return (
        <section className="skills-section" id="skills" ref={ref}>
            <motion.div
                className="skills-container"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                <h2 className="blur-text">Technical Proficiency</h2>
                {Object.entries(groupedSkills).map(([category, skills]) => (
                    <div key={category} className="skills-category">
                        <motion.h3
                            className="blur-text"
                            initial={{ opacity: 0, y: -10 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                        >
                            {category}
                        </motion.h3>
                        <div className="skills-grid">
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    className="skill-card"
                                    variants={itemVariants}
                                    whileHover={{
                                        scale: 1.03,
                                        boxShadow: '0 8px 25px rgba(var(--primary-color-rgb), 0.2)'
                                    }}
                                >
                                    <h4>{skill.name}</h4>
                                    <div className="skill-bar-container">
                                        <motion.div
                                            className="skill-bar"
                                            initial={{ width: 0 }}
                                            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                                            transition={{ duration: 1, delay: index * 0.1 }}
                                            style={{
                                                background: `linear-gradient(90deg, ${skill.color}, var(--accent-color))`
                                            }}
                                        />
                                        <motion.span
                                            className="skill-percentage"
                                            initial={{ opacity: 0 }}
                                            animate={inView ? { opacity: 1 } : { opacity: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                                        >
                                            {skill.level}%
                                        </motion.span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </motion.div>
        </section>
    );
};

export default Skills;