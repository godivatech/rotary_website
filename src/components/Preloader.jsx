import React, { useState, useEffect, useRef } from 'react';

export default function Preloader({ onComplete }) {
    const [year, setYear] = useState('1938');
    const [subtitle, setSubtitle] = useState('Since 1938');
    const [showSince, setShowSince] = useState(false);
    const [milestoneStep, setMilestoneStep] = useState(0);
    const [isCollapsing, setIsCollapsing] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const canvasRef = useRef(null);

    // 1. Year Counter & Milestones Animation
    useEffect(() => {
        // Prevent scroll on mount
        document.body.style.overflow = 'hidden';

        const startYear = 1938;
        const endYear = 2026;
        const duration = 2800; // Slower, highly legible 2.8s duration
        const startDelay = 800; // 800ms initial pause on 1938 so users can read it clearly first
        let startTime = null;
        let animationFrameId;
        let t1, t2, t3, t4, t5, t6, t7;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;

            if (elapsed < startDelay) {
                // Keep showing 1938 during initial pause
                setYear(startYear);
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            const progress = elapsed - startDelay;
            const percentage = Math.min(progress / duration, 1);

            // easeInOutQuad formula: slower start and end to make the years readable
            const easedPercentage = percentage < 0.5
                ? 2 * percentage * percentage
                : 1 - Math.pow(-2 * percentage + 2, 2) / 2;

            const currentYear = Math.floor(startYear + (endYear - startYear) * easedPercentage);

            setYear(currentYear);

            if (progress < duration) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setYear("1938 - 2026");
                setSubtitle("89 Years of Service & Fellowship");
                setShowSince(true);

                // Stagger milestone reveals after counting finishes
                t1 = setTimeout(() => setMilestoneStep(1), 400);
                t2 = setTimeout(() => setMilestoneStep(2), 900);
                t3 = setTimeout(() => setMilestoneStep(3), 1400);
                t4 = setTimeout(() => setMilestoneStep(4), 2000);

                // Start collapsing the content (Chakra logo zooms in and fades)
                t6 = setTimeout(() => {
                    setIsCollapsing(true);
                }, 12000); // 10 seconds after the last milestone/tagline finishes showing (2000 + 10000 = 12000)

                // Wait for collapse transition to complete, then exit the full screen overlay
                t7 = setTimeout(() => {
                    setIsExiting(true);
                }, 13500); // 1500ms after isCollapsing (12000 + 1500 = 13500)
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
            clearTimeout(t6);
            clearTimeout(t7);
        };
    }, []);

    // 2. Lightweight Ambient Particle System
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let animationId;
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        const particles = [];
        const colors = [
            'rgba(255, 184, 0, 0.25)', // soft gold (increased from 0.12)
            'rgba(0, 61, 165, 0.16)',  // soft primary blue (increased from 0.08)
            'rgba(15, 23, 42, 0.10)',   // soft slate (increased from 0.05)
            'rgba(255, 184, 0, 0.38)', // glowing gold small (increased from 0.22)
            'rgba(255, 255, 255, 0.95)'  // bright white dust (increased from 0.8)
        ];

        for (let i = 0; i < 90; i++) { // increased count from 70 to 90
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: -Math.random() * 0.4 - 0.1, // slowly drift upwards
                size: Math.random() * 4 + 1.5, // increased size slightly from * 3 + 1
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Render particles
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                // Loop particles when they drift offscreen
                if (p.y < -10) {
                    p.y = height + 10;
                    p.x = Math.random() * width;
                }
                if (p.x < -10 || p.x > width + 10) {
                    p.x = Math.random() * width;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.shadowBlur = p.size > 2 ? 8 : 0;
                ctx.shadowColor = p.color;
                ctx.fill();
            });

            ctx.shadowBlur = 0; // reset
            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    const handleTransitionEnd = (e) => {
        // Prevent event bubbling from children's transitions
        if (e.target !== e.currentTarget) return;

        // Trigger onComplete when the main overlay finishes animating
        if (e.propertyName === 'opacity' || e.propertyName === 'transform') {
            document.body.style.overflow = '';
            onComplete();
        }
    };

    return (
        <div
            className={`preloader-overlay ${isExiting ? 'exit-active' : ''}`}
            onTransitionEnd={handleTransitionEnd}
        >
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />

            <div className={`preloader-content ${isCollapsing ? 'collapse-active' : ''}`} style={{ position: 'relative', zIndex: 1 }}>
                <div className="preloader-chakra-wrapper">
                    <img
                        src="/images/Logo%20chakra.png"
                        alt="Rotary Chakra Wheel"
                        className="preloader-chakra"
                    />
                </div>

                <div className="preloader-year">
                    {year}
                </div>

                <div className={`preloader-subtitle ${showSince ? 'show' : ''}`} style={{ marginBottom: '16px' }}>
                    {subtitle.split('').map((char, index) => (
                        <span
                            key={index}
                            className="preloader-char"
                            style={{
                                animationDelay: `${index * 0.03}s`,
                                marginRight: char === ' ' ? '8px' : '0px'
                            }}
                        >
                            {char}
                        </span>
                    ))}
                </div>

                <div className="preloader-milestones">
                    <div className={`preloader-milestone ${milestoneStep >= 1 ? 'show' : ''}`}>
                        <span className="milestone-bullet"></span>
                        <span><strong className="milestone-highlight">India's 3rd</strong> Rotary Club</span>
                    </div>
                    <div className={`preloader-milestone ${milestoneStep >= 2 ? 'show' : ''}`}>
                        <span className="milestone-bullet"></span>
                        <span><strong className="milestone-highlight">Tamil Nadu's 2nd</strong> Rotary Club</span>
                    </div>
                    <div className={`preloader-milestone ${milestoneStep >= 3 ? 'show' : ''}`}>
                        <span className="milestone-bullet"></span>
                        <span><strong className="milestone-highlight">RID 3000's First</strong> Club</span>
                    </div>
                </div>
                <div className="preloader-taglines" style={{
                    marginTop: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'all 0.6s cubic-bezier(0.76, 0, 0.24, 1)',
                    opacity: isCollapsing ? 0 : 1,
                    transform: isCollapsing ? 'scale(0.9) translateY(-15px)' : 'none'
                }}>
                    <div className={`preloader-tagline ${milestoneStep >= 4 ? 'show' : ''}`} style={{
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        color: 'var(--primary)',
                        opacity: milestoneStep >= 4 ? 1 : 0,
                        transform: milestoneStep >= 4 ? 'translateY(0)' : 'translateY(15px)',
                        transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        textAlign: 'center',
                        lineHeight: '1.4'
                    }}>
                        A Role Model for Rotary Clubs Across Madurai
                    </div>
                </div>
            </div>
        </div>
    );
}
