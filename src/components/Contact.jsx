import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaWhatsapp, FaHackerrank } from 'react-icons/fa';
import { SiGeeksforgeeks, SiLeetcode } from 'react-icons/si';

const Contact = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Simulating form submission delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Reset form after successful submission
            setFormState({
                name: '',
                email: '',
                message: ''
            });
            setSubmitStatus('success');
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const socialLinks = [
        { icon: <FaGithub />, url: 'https://github.com/theyogendra01', label: 'GitHub' },
        { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/yogender-swami-b4a696236', label: 'LinkedIn' },
        { icon: <FaWhatsapp />, url: 'https://wa.me/918559854596', label: 'WhatsApp' },
        { icon: <SiGeeksforgeeks />, url: 'https://www.geeksforgeeks.org/user/yogendrasi915/', label: 'GeeksforGeeks' },
        { icon: <SiLeetcode />, url: 'https://leetcode.com/u/theyogendra01/', label: 'LeetCode' },
        { icon: <FaHackerrank style={{ fontSize: '1.4em' }} />, url: 'https://www.hackerrank.com/profile/yogendraswami297', label: 'HackerRank' }
    ];

    return (
        <div className="contact-container">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                Get In Touch
            </motion.h2>
            <div className="contact-content">
                <motion.div
                    className="contact-info"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h3>Let's Connect</h3>
                    <p>Feel free to reach out for collaborations or just a friendly hello</p>
                    <div className="social-links">
                        {socialLinks.map(({ icon, url, label }) => (
                            <motion.a
                                key={label}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={label}
                            >
                                {icon}
                            </motion.a>
                        ))}
                    </div>
                    <div className="location-info">
                        <h4>Location</h4>
                        <p>Jaipur, Rajasthan</p>
                    </div>
                </motion.div>

                <motion.div
                    className="contact-form"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formState.name}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formState.email}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={formState.message}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <motion.button
                            className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </motion.button>

                        <AnimatePresence>
                            {submitStatus && (
                                <motion.div
                                    className={`submit-status ${submitStatus}`}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    {submitStatus === 'success' ? (
                                        'Message sent successfully!'
                                    ) : (
                                        'Failed to send message. Please try again.'
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;