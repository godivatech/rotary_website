import React, { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
    const [year, setYear] = useState(1938);
    const [showSince, setShowSince] = useState(false);
    const [milestoneStep, setMilestoneStep] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Prevent scroll on mount
        document.body.style.overflow = 'hidden';

        const startYear = 1938;
        const endYear = 2026;
        const duration = 1800; // 1.8 seconds counting duration
        let startTime = null;
        let animationFrameId;
        let t1, t2, t3, t4;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            
            // easeOutExpo function for a very smooth ending deceleration
            const easedPercentage = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
            const currentYear = Math.floor(startYear + (endYear - startYear) * easedPercentage);
            
            setYear(currentYear);

            if (progress < duration) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setYear(endYear);
                setShowSince(true);
                
                // Stagger milestone reveals
                t1 = setTimeout(() => setMilestoneStep(1), 600);
                t2 = setTimeout(() => setMilestoneStep(2), 1200);
                t3 = setTimeout(() => setMilestoneStep(3), 1800);
                
                // Wait for the full reveal to be read, then exit
                t4 = setTimeout(() => {
                    setIsExiting(true);
                }, 3800);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };
    }, []);

    const handleTransitionEnd = (e) => {
        // Prevent event bubbling from children's transitions
        if (e.target !== e.currentTarget) return;

        // Trigger onComplete when the main overlay finishing animating
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
            <div className="preloader-content">
                <img 
                    src="/images/Logo%20chakra.png" 
                    alt="Rotary Chakra Wheel" 
                    className="preloader-chakra"
                />
                
                <div className="preloader-year">
                    {year}
                </div>
                
                <div className={`preloader-subtitle ${showSince ? 'show' : ''}`} style={{ marginBottom: '25px' }}>
                    {"Since 1938".split('').map((char, index) => (
                        <span 
                            key={index} 
                            className="preloader-char" 
                            style={{ 
                                animationDelay: `${index * 0.08}s`,
                                marginRight: char === ' ' ? '10px' : '0px'
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
                        <span><strong className="milestone-highlight">Madurai's 1st</strong> Rotary Club</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
