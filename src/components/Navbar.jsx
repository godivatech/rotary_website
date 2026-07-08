import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown, Menu, X } from 'lucide-react';

export default function Navbar({ currentPage, setCurrentPage }) {
    const [isSticky, setIsSticky] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About Us' },
        { id: 'services', label: 'Areas of Focus' },
        { id: 'projects', label: 'Our Projects' },
        { id: 'contact', label: 'Contact Us' }
    ];

    const handleNavClick = (pageId) => {
        setCurrentPage(pageId);
        setIsMobileMenuOpen(false);
        setIsDropdownOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <header style={{
            position: isSticky ? 'fixed' : 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: isSticky ? 'rgba(255, 255, 255, 0.92)' : 'transparent',
            backdropFilter: isSticky ? 'blur(10px)' : 'none',
            boxShadow: isSticky ? '0 4px 20px -2px rgba(15, 23, 42, 0.08)' : 'none',
            borderBottom: isSticky ? '1px solid #F1F5F9' : 'none',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: isSticky ? '14px 24px' : '24px 24px',
                transition: 'all 0.3s ease'
            }}>
                <a href="#home" onClick={() => handleNavClick('home')} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#0F172A',
                    textDecoration: 'none'
                }}>
                    <div style={{
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        padding: '6px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Globe size={20} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '1.4rem', fontWeight: 800, lineHeight: 1.1, fontFamily: 'var(--font-heading)' }}>
                            Rotary <span style={{ color: 'var(--primary)' }}>Madurai</span>
                        </span>
                        <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '2px' }}>
                            RI District 3000
                        </span>
                    </div>
                </a>

                {/* Desktop Nav */}
                <nav style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                    <ul style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        listStyle: 'none'
                    }}>
                        {navItems.map(item => (
                            <li key={item.id} style={{ position: 'relative' }}>
                                <button
                                    onClick={() => handleNavClick(item.id)}
                                    className={`nav-link-item ${currentPage === item.id ? 'active' : ''}`}
                                    style={{
                                        outline: 'none',
                                        boxShadow: 'none',
                                        border: 'none'
                                    }}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                        
                        {/* Dropdown Menu Item */}
                        <li style={{ position: 'relative' }}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`nav-link-item ${isDropdownOpen ? 'active' : ''}`}
                                style={{
                                    outline: 'none',
                                    boxShadow: 'none',
                                    border: 'none',
                                    gap: '4px'
                                }}
                            >
                                Links <ChevronDown size={14} style={{
                                    transform: isDropdownOpen ? 'rotate(180deg)' : 'none',
                                    transition: 'transform 0.3s'
                                }} />
                            </button>
                            
                            {isDropdownOpen && (
                                <ul style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    backgroundColor: '#0F172A',
                                    minWidth: '200px',
                                    borderRadius: '10px',
                                    padding: '10px 0',
                                    boxShadow: 'var(--shadow-lg)',
                                    listStyle: 'none',
                                    marginTop: '8px',
                                    animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                                }}>
                                    <li>
                                        <button 
                                            onClick={() => handleNavClick('projects')} 
                                            style={{
                                                width: '100%',
                                                textAlign: 'left',
                                                background: 'none',
                                                border: 'none',
                                                padding: '10px 20px',
                                                color: 'rgba(255,255,255,0.8)',
                                                cursor: 'pointer'
                                            }}
                                            onMouseEnter={(e) => { e.target.style.color = 'white'; e.target.style.backgroundColor = 'var(--primary)'; }}
                                            onMouseLeave={(e) => { e.target.style.color = 'rgba(255,255,255,0.8)'; e.target.style.backgroundColor = 'transparent'; }}
                                        >
                                            Project Gallery
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => { handleNavClick('about'); setTimeout(() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }), 100); }} 
                                            style={{
                                                width: '100%',
                                                textAlign: 'left',
                                                background: 'none',
                                                border: 'none',
                                                padding: '10px 20px',
                                                color: 'rgba(255,255,255,0.8)',
                                                cursor: 'pointer'
                                            }}
                                            onMouseEnter={(e) => { e.target.style.color = 'white'; e.target.style.backgroundColor = 'var(--primary)'; }}
                                            onMouseLeave={(e) => { e.target.style.color = 'rgba(255,255,255,0.8)'; e.target.style.backgroundColor = 'transparent'; }}
                                        >
                                            Testimonials
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => { handleNavClick('home'); setTimeout(() => document.getElementById('faqs')?.scrollIntoView({ behavior: 'smooth' }), 100); }} 
                                            style={{
                                                width: '100%',
                                                textAlign: 'left',
                                                background: 'none',
                                                border: 'none',
                                                padding: '10px 20px',
                                                color: 'rgba(255,255,255,0.8)',
                                                cursor: 'pointer'
                                            }}
                                            onMouseEnter={(e) => { e.target.style.color = 'white'; e.target.style.backgroundColor = 'var(--primary)'; }}
                                            onMouseLeave={(e) => { e.target.style.color = 'rgba(255,255,255,0.8)'; e.target.style.backgroundColor = 'transparent'; }}
                                        >
                                            FAQs
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button 
                            onClick={() => handleNavClick('contact')} 
                            className="btn btn-primary"
                            style={{ padding: '10px 22px', fontSize: '0.9rem' }}
                        >
                            Join Us
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu Icon */}
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                    style={{
                        display: 'none',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--secondary)'
                    }}
                    className="mobile-toggle-btn"
                >
                    {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Drawer */}
            {isMobileMenuOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    padding: '24px',
                    boxShadow: 'var(--shadow-lg)',
                    borderTop: '1px solid #E2E8F0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    animation: 'fadeInUp 0.3s ease forwards'
                }}>
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            style={{
                                textAlign: 'left',
                                background: 'none',
                                border: 'none',
                                outline: 'none',
                                boxShadow: 'none',
                                padding: '8px 12px',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                color: currentPage === item.id ? 'var(--primary)' : 'var(--secondary)',
                                cursor: 'pointer'
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                    <button 
                        onClick={() => handleNavClick('contact')} 
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '12px' }}
                    >
                        Join Us
                    </button>
                </div>
            )}

            {/* Responsive Helper css injected */}
            <style dangerouslySetInnerHTML={{__html: `
                @media (max-width: 991px) {
                    nav { display: none !important; }
                    .mobile-toggle-btn { display: block !important; }
                }
            `}} />
        </header>
    );
}
