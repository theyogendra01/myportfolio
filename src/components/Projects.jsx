import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// Typing Test images
import typingTestImg from '../assets/typing-test/ty1.png';
import typingTestImg2 from '../assets/typing-test/ty2.png';
import typingTestImg3 from '../assets/typing-test/ty3.png';
// Image Search images
import imgSearchImg from '../assets/img-search/thumnail-img.png';
import imgSearchImg2 from '../assets/img-search/2.png';
import imgSearchImg3 from '../assets/img-search/3.png';
import imgSearchImg4 from '../assets/img-search/4.png';

const projectsData = [
    {
        id: 1,
        title: 'Typy Test',
        description: 'A modern, React-based typing speed test application that measures typing speed (WPM), accuracy, and provides real-time feedback. The app features multiple test modes including word count and quotes, with a clean interface and support for both light and dark themes. Users can track their performance and share their results across various social platforms.',
        technologies: ['React.js', 'JavaScript (ES6+)', 'CSS Modules', 'HTML5'],
        image: typingTestImg,
        additionalImages: [typingTestImg2, typingTestImg3],
        liveLink: 'https://typing-test-beryl-seven.vercel.app',
        githubLink: 'https://github.com/theyogendra01/Typing-test'
    },
    {
        id: 2,
        title: 'Image Search',
        description: 'Developed a dynamic image search web application that allows users to search for images. Designed a responsive and user-friendly interface using CSS for better accessibility. Ensured optimized loading of images by implementing pagination or lazy loading.',
        technologies: ['HTML5', 'CSS3', 'JavaScript'],
        image: imgSearchImg,
        additionalImages: [imgSearchImg2, imgSearchImg3, imgSearchImg4],
        liveLink: 'https://theyogendra01.github.io/Image-Search/',
        githubLink: 'https://github.com/theyogendra01/Image-Search'
    }
];

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

    const nextImage = (e, project) => {
        e.stopPropagation();
        const totalImages = [project.image, ...project.additionalImages].length;
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
    };

    const prevImage = (e, project) => {
        e.stopPropagation();
        const totalImages = [project.image, ...project.additionalImages].length;
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
    };

    return (
        <section className="projects-section" id="projects" ref={ref}>
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
                            onClick={() => {
                                setSelectedProject(project);
                                setCurrentImageIndex(0);
                            }}
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
                            <div className="image-gallery">
                                <button className="gallery-nav prev" onClick={(e) => prevImage(e, selectedProject)}>‹</button>
                                <img
                                    src={
                                        currentImageIndex === 0
                                            ? selectedProject.image
                                            : selectedProject.additionalImages[currentImageIndex - 1]
                                    }
                                    alt={`${selectedProject.title} - View ${currentImageIndex + 1}`}
                                />
                                <button className="gallery-nav next" onClick={(e) => nextImage(e, selectedProject)}>›</button>
                                <div className="image-indicators">
                                    {[selectedProject.image, ...selectedProject.additionalImages].map((_, index) => (
                                        <span
                                            key={index}
                                            className={`indicator ${currentImageIndex === index ? 'active' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCurrentImageIndex(index);
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
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