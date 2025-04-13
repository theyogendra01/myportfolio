import { useEffect, useRef } from 'react';

const Particles = () => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const colorIntervalRef = useRef(null);
    const colors = [
        '#8b84ff',  // primary
        '#6c63ff',  // accent
        '#00cec9',  // teal
        '#ff7675',  // coral
        '#55efc4',  // mint
        '#a29bfe',  // lavender
        '#ffeaa7'   // yellow
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            particlesRef.current = Array.from({ length: 150 }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1.5, // Increased base size
                speedX: (Math.random() - 0.5) * 2, // Increased speed
                speedY: (Math.random() - 0.5) * 2,
                colorIndex: Math.floor(Math.random() * colors.length),
                opacity: 0.6 + Math.random() * 0.4 // Higher base opacity
            }));
        };

        const updateParticles = () => {
            particlesRef.current.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                const dx = mouseRef.current.x - particle.x;
                const dy = mouseRef.current.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) { // Increased interaction radius
                    particle.x += (dx / distance) * 4;
                    particle.y += (dy / distance) * 4;
                    particle.opacity = Math.min(1, particle.opacity + 0.1);
                } else {
                    particle.opacity = Math.max(0.6, particle.opacity - 0.01);
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

            // Draw connections with increased opacity
            particlesRef.current.forEach((particle, i) => {
                particlesRef.current.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 200) {
                        const gradient = ctx.createLinearGradient(
                            particle.x, particle.y,
                            otherParticle.x, otherParticle.y
                        );
                        gradient.addColorStop(0, colors[particle.colorIndex]);
                        gradient.addColorStop(1, colors[otherParticle.colorIndex]);

                        ctx.beginPath();
                        ctx.strokeStyle = gradient;
                        ctx.globalAlpha = 0.4 * (1 - distance / 200); // Increased line opacity
                        ctx.lineWidth = 2; // Thicker lines
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
                ctx.fillStyle = colors[particle.colorIndex];
                ctx.globalAlpha = particle.opacity;
                ctx.fill();
            });

            ctx.globalAlpha = 1;
            updateParticles();
            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top + window.scrollY
            };
        };

        const handleScroll = () => {
            mouseRef.current.y = window.scrollY;
        };

        const startColorTransition = () => {
            colorIntervalRef.current = setInterval(() => {
                particlesRef.current.forEach(particle => {
                    particle.colorIndex = (particle.colorIndex + 1) % colors.length;
                });
            }, 3000); // Slowed down color transition
        };

        resizeCanvas();
        createParticles();
        draw();
        startColorTransition();

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(animationFrameId);
            if (colorIntervalRef.current) {
                clearInterval(colorIntervalRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1, // Increased z-index
                background: 'var(--bg-color)',
                opacity: 0.9,
                pointerEvents: 'none'
            }}
        />
    );
};

export default Particles;