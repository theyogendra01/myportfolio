import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const [ref, inView] = useInView({
        threshold: 0.3,
        triggerOnce: true
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitStatus('success');
        setIsSubmitting(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const socialLinks = [
        { icon: <FaGithub />, url: 'https://github.com/yourusername' },
        { icon: <FaLinkedin />, url: 'https://linkedin.com/in/yourusername' },
        { icon: <FaTwitter />, url: 'https://twitter.com/yourusername' },
        { icon: <FaEnvelope />, url: 'mailto:your.email@example.com' }
    ];

    return (
        <section className="contact-section" ref={ref}>
            <motion.div
                className="contact-container"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
            >
                <h2>Get In Touch</h2>

                <div className="contact-content">
                    <motion.div
                        className="contact-form"
                        initial={{ x: -50 }}
                        animate={inView ? { x: 0 } : { x: -50 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <motion.textarea
                                    whileFocus={{ scale: 1.01 }}
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isSubmitting}
                                className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </motion.button>

                            {submitStatus === 'success' && (
                                <motion.div
                                    className="success-message"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    Message sent successfully!
                                </motion.div>
                            )}
                        </form>
                    </motion.div>

                    <motion.div
                        className="contact-info"
                        initial={{ x: 50 }}
                        animate={inView ? { x: 0 } : { x: 50 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h3>Connect With Me</h3>
                        <p>Feel free to reach out through any of these platforms:</p>

                        <div className="social-links">
                            {socialLinks.map((link, index) => (
                                <motion.a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? {
                                        opacity: 1,
                                        y: 0,
                                        transition: { delay: 0.6 + (index * 0.1) }
                                    } : {}}
                                >
                                    {link.icon}
                                </motion.a>
                            ))}
                        </div>

                        <div className="location-info">
                            <h4>Location</h4>
                            <p>Your City, Country</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;