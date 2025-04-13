import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
    const [hasScrolled, setHasScrolled] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.div
            className="scroll-progress"
            initial={{ opacity: 0 }}
            animate={{ opacity: hasScrolled ? 1 : 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="progress-bar"
                style={{ scaleX }}
            />
        </motion.div>
    );
};

export default ScrollProgress;