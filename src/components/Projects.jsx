import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const projectsData = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'A full-featured online shopping platform with cart functionality and payment integration.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        image: '/projects/ecommerce.jpg',
        liveLink: 'https://example.com',
        githubLink: 'https://github.com/yourusername/project'
    },
    {
        id: 2,
        title: 'Social Media Dashboard',
        description: 'Analytics dashboard for social media metrics with real-time updates.',
        technologies: ['React', 'Firebase', 'Chart.js', 'Material-UI'],
        image: '/projects/dashboard.jpg',
        liveLink: 'https://example.com',
        githubLink: 'https://github.com/yourusername/project'
    },
    {
        id: 3,
        title: 'Task Management App',
        description: 'Collaborative task management tool with drag-and-drop functionality.',
        technologies: ['React', 'Redux', 'Node.js', 'PostgreSQL'],
        image: '/projects/taskapp.jpg',
        liveLink: 'https://example.com',
        githubLink: 'https://github.com/yourusername/project'
    }
];

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const projectVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6
            }
        }
    };

    return (
        <section className="projects-section" ref={ref}>
            <motion.div
                className="projects-container"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                <h2>My Projects</h2>
                <div className="projects-grid">
                    {projectsData.map((project) => (
                        <motion.div
                            key={project.id}
                            className="project-card"
                            variants={projectVariants}
                            whileHover={{
                                scale: 1.03,
                                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                            }}
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="project-image">
                                <img src={project.image} alt={project.title} />
                                <div className="project-overlay">
                                    <motion.div
                                        className="overlay-content"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                    >
                                        <h3>{project.title}</h3>
                                        <p>{project.description}</p>
                                    </motion.div>
                                </div>
                            </div>
                            <div className="project-info">
                                <div className="tech-stack">
                                    {project.technologies.map((tech) => (
                                        <span key={tech} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                                <div className="project-links">
                                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">Live Demo</a>
                                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="project-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            className="modal-content"
                            initial={{ y: 50 }}
                            animate={{ y: 0 }}
                            exit={{ y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="close-button"
                                onClick={() => setSelectedProject(null)}
                            >
                                ×
                            </button>
                            <img src={selectedProject.image} alt={selectedProject.title} />
                            <h3>{selectedProject.title}</h3>
                            <p>{selectedProject.description}</p>
                            <div className="tech-stack">
                                {selectedProject.technologies.map((tech) => (
                                    <span key={tech} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                            <div className="modal-links">
                                <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer">
                                    View Live Demo
                                </a>
                                <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer">
                                    View Source Code
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;