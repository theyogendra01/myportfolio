import { useEffect, useRef } from 'react';

const Particles = () => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            particlesRef.current = Array.from({ length: 100 }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: 0.8 + Math.random() * 2,
                speedX: (Math.random() - 0.5) * 0.8,
                speedY: (Math.random() - 0.5) * 0.8,
                opacity: 0.3 + Math.random() * 0.5
            }));
        };

        const updateParticles = () => {
            particlesRef.current.forEach(particle => {
                // Move particles
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Mouse interaction
                const dx = mouseRef.current.x - particle.x;
                const dy = mouseRef.current.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    particle.x += (dx / distance) * 2;
                    particle.y += (dy / distance) * 2;
                    particle.opacity = Math.min(1, particle.opacity + 0.05);
                } else {
                    particle.opacity = Math.max(0.3, particle.opacity - 0.01);
                }

                // Wrap around screen
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
            });
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');

            // Draw connections
            ctx.beginPath();
            particlesRef.current.forEach((particle, i) => {
                particlesRef.current.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.strokeStyle = `rgba(var(--primary-color-rgb), ${0.2 * (1 - distance / 150)})`;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                    }
                });
            });

            // Draw particles
            particlesRef.current.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(var(--primary-color-rgb), ${particle.opacity})`;
                ctx.fill();
            });

            updateParticles();
            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e) => {
            mouseRef.current = {
                x: e.clientX,
                y: e.clientY
            };
        };

        resizeCanvas();
        createParticles();
        draw();

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

export default Particles;