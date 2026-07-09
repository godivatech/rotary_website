import React, { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
    const [year, setYear] = useState(1938);
    const [showSince, setShowSince] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Prevent scroll on mount
        document.body.style.overflow = 'hidden';

        const startYear = 1938;
        const endYear = 2026;
        const duration = 1800; // 1.8 seconds counting duration
        let startTime = null;
        let animationFrameId;

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
                // Wait for the subtitle reveal to sink in, then exit
                setTimeout(() => {
                    setIsExiting(true);
                }, 800);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
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
                    src="/images/Logo chakra.png" 
                    alt="Rotary Chakra Wheel" 
                    className="preloader-chakra"
                />
                
                <div className="preloader-year">
                    {year}
                </div>
                
                <div className={`preloader-subtitle ${showSince ? 'show' : ''}`}>
                    Since 1938
                </div>
            </div>
        </div>
    );
}
