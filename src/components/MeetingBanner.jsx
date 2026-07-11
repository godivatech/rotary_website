import React, { useState, useEffect } from 'react';
import { Calendar, Clock, X, MapPin, Bell } from 'lucide-react';

export default function MeetingBanner({ onNavigate }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        if (isDismissed) return;

        // Slide in after a brief delay so it doesn't overlap the preloader exit
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, [isDismissed]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            setIsDismissed(true);
        }, 600); // match transition speed
    };

    if (isDismissed) return null;

    return (
        <div className={`floating-meeting-banner ${isVisible ? 'slide-in' : ''}`}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary-light)',
                        color: 'var(--primary)',
                        flexShrink: 0
                    }}>
                        <Bell size={14} className="meeting-bell-icon" />
                    </div>
                    <span style={{
                        fontSize: '0.78rem',
                        fontWeight: '800',
                        color: 'var(--primary)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        Upcoming Meeting
                    </span>
                </div>
                <button 
                    onClick={handleClose}
                    style={{
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <X size={16} />
                </button>
            </div>

            {/* Content */}
            <div style={{ marginBottom: '20px' }}>
                <h4 style={{ 
                    fontSize: '1.08rem', 
                    fontWeight: '800', 
                    color: 'var(--secondary)', 
                    margin: '0 0 12px 0', 
                    lineHeight: '1.35',
                    letterSpacing: '-0.3px'
                }}>
                    Weekly Thursday Meeting
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                        <Calendar size={14} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                        <span style={{ fontWeight: '600' }}>Today (Every Thursday)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                        <Clock size={14} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                        <span style={{ fontWeight: '600' }}>06:30 PM IST</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                        <MapPin size={14} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                        <span style={{ fontWeight: '600' }}>Rotary Hall, Madurai Club</span>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                    onClick={handleClose}
                    style={{
                        flex: 1,
                        padding: '10px 14px',
                        borderRadius: '12px',
                        border: '1.5px solid var(--border-color)',
                        backgroundColor: 'white',
                        color: 'var(--secondary)',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                    Dismiss
                </button>
                <button 
                    onClick={() => {
                        handleClose();
                        onNavigate('contact');
                    }}
                    style={{
                        flex: 1.2,
                        padding: '10px 14px',
                        borderRadius: '12px',
                        border: 'none',
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: '0 4px 12px rgba(0, 61, 165, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#002B7A';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--primary)';
                        e.currentTarget.style.transform = 'none';
                    }}
                >
                    Attend / Join
                </button>
            </div>
        </div>
    );
}
