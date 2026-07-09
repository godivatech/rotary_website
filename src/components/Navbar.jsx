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
        { id: 'services', label: 'Areas of Focus' },
        { id: 'projects', label: 'Our Projects' },
        { id: 'contact', label: 'Contact Us' }
    ];

    const handleNavClick = (pageId, sectionId = null) => {
        setCurrentPage(pageId, sectionId);
        setIsMobileMenuOpen(false);
        setIsDropdownOpen(false);
        if (!sectionId) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
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
                padding: isSticky ? '12px 24px' : '20px 24px',
                transition: 'all 0.3s ease'
            }}>
                <a href="#home" onClick={() => handleNavClick('home')} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textDecoration: 'none'
                }}>
                    {/* Left Side: Logo Text */}
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.1 }}>
                        <span style={{ 
                            fontSize: '1.75rem', 
                            fontWeight: 800, 
                            color: '#003DA5', 
                            fontFamily: 'var(--font-heading)',
                            letterSpacing: '-0.3px'
                        }}>
                            Rotary
                        </span>
                        <span style={{ 
                            fontSize: '0.82rem', 
                            fontWeight: 800, 
                            color: '#0F172A', 
                            letterSpacing: '0.3px'
                        }}>
                            CLUB OF MADURAI
                        </span>
                        <span style={{ 
                            fontSize: '0.62rem', 
                            fontWeight: 600, 
                            color: '#3B82F6', 
                            letterSpacing: '0.1px',
                            marginTop: '2px'
                        }}>
                            Rotary International District 3000
                        </span>
                        <span style={{ 
                            fontSize: '0.62rem', 
                            fontWeight: 600, 
                            color: '#0F172A', 
                            letterSpacing: '0.1px',
                            marginTop: '1px'
                        }}>
                            Chartered on 27th December 1938
                        </span>
                    </div>

                    {/* Right Side: Chakra PNG */}
                    <img 
                        src="/images/Logo chakra.png" 
                        alt="Rotary Club of Madurai Logo" 
                        style={{ 
                            height: '56px', 
                            width: '56px', 
                            objectFit: 'contain'
                        }} 
                    />
                </a>

                {/* Desktop Nav */}
                <nav style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                    <ul style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        listStyle: 'none'
                    }}>
                        {/* Home Link */}
                        <li style={{ position: 'relative' }}>
                            <button
                                onClick={() => handleNavClick('home')}
                                className={`nav-link-item ${currentPage === 'home' ? 'active' : ''}`}
                                style={{
                                    outline: 'none',
                                    boxShadow: 'none',
                                    border: 'none'
                                }}
                            >
                                Home
                            </button>
                        </li>

                        {/* About Us Dropdown */}
                        <li style={{ position: 'relative' }}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`nav-link-item ${isDropdownOpen || ['about', 'members', 'genealogy'].includes(currentPage) ? 'active' : ''}`}
                                style={{
                                    outline: 'none',
                                    boxShadow: 'none',
                                    border: 'none',
                                    gap: '4px'
                                }}
                            >
                                About Us <ChevronDown size={14} style={{
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
                                    minWidth: '220px',
                                    borderRadius: '10px',
                                    padding: '10px 0',
                                    boxShadow: 'var(--shadow-lg)',
                                    listStyle: 'none',
                                    marginTop: '8px',
                                    animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                                    zIndex: 1000
                                }}>
                                    <li>
                                        <button 
                                            onClick={() => handleNavClick('about')} 
                                            style={{
                                                width: '100%',
                                                textAlign: 'left',
                                                background: 'none',
                                                border: 'none',
                                                padding: '10px 20px',
                                                color: 'rgba(255,255,255,0.8)',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem',
                                                fontWeight: '600'
                                            }}
                                            onMouseEnter={(e) => { e.target.style.color = 'white'; e.target.style.backgroundColor = 'var(--primary)'; }}
                                            onMouseLeave={(e) => { e.target.style.color = 'rgba(255,255,255,0.8)'; e.target.style.backgroundColor = 'transparent'; }}
                                        >
                                            Our Club
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleNavClick('members')} 
                                            style={{
                                                width: '100%',
                                                textAlign: 'left',
                                                background: 'none',
                                                border: 'none',
                                                padding: '10px 20px',
                                                color: 'rgba(255,255,255,0.8)',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem',
                                                fontWeight: '600'
                                            }}
                                            onMouseEnter={(e) => { e.target.style.color = 'white'; e.target.style.backgroundColor = 'var(--primary)'; }}
                                            onMouseLeave={(e) => { e.target.style.color = 'rgba(255,255,255,0.8)'; e.target.style.backgroundColor = 'transparent'; }}
                                        >
                                            Club Members & Leaders
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleNavClick('genealogy')} 
                                            style={{
                                                width: '100%',
                                                textAlign: 'left',
                                                background: 'none',
                                                border: 'none',
                                                padding: '10px 20px',
                                                color: 'rgba(255,255,255,0.8)',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem',
                                                fontWeight: '600'
                                            }}
                                            onMouseEnter={(e) => { e.target.style.color = 'white'; e.target.style.backgroundColor = 'var(--primary)'; }}
                                            onMouseLeave={(e) => { e.target.style.color = 'rgba(255,255,255,0.8)'; e.target.style.backgroundColor = 'transparent'; }}
                                        >
                                            District Genealogy
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Remaining navItems */}
                        {navItems.filter(item => item.id !== 'home').map(item => (
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
                    </ul>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button 
                            onClick={() => handleNavClick('home', 'join')} 
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
                    <button
                        onClick={() => handleNavClick('home')}
                        style={{
                            textAlign: 'left',
                            background: 'none',
                            border: 'none',
                            outline: 'none',
                            boxShadow: 'none',
                            padding: '8px 12px',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            color: currentPage === 'home' ? 'var(--primary)' : 'var(--secondary)',
                            cursor: 'pointer'
                        }}
                    >
                        Home
                    </button>

                    {/* About Submenu on Mobile */}
                    <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '8px', 
                        paddingLeft: '12px',
                        borderLeft: '2px solid rgba(0, 61, 165, 0.1)'
                    }}>
                        <span style={{ 
                            fontSize: '0.75rem', 
                            fontWeight: '800', 
                            textTransform: 'uppercase', 
                            color: 'var(--primary)', 
                            letterSpacing: '1px', 
                            marginBottom: '4px',
                            display: 'block'
                        }}>
                            About Us
                        </span>
                        <button
                            onClick={() => handleNavClick('about')}
                            style={{
                                textAlign: 'left',
                                background: 'none',
                                border: 'none',
                                outline: 'none',
                                boxShadow: 'none',
                                padding: '6px 12px',
                                fontSize: '1.05rem',
                                fontWeight: '600',
                                color: currentPage === 'about' ? 'var(--primary)' : 'var(--secondary)',
                                cursor: 'pointer'
                            }}
                        >
                            Our Club
                        </button>
                        <button
                            onClick={() => handleNavClick('members')}
                            style={{
                                textAlign: 'left',
                                background: 'none',
                                border: 'none',
                                outline: 'none',
                                boxShadow: 'none',
                                padding: '6px 12px',
                                fontSize: '1.05rem',
                                fontWeight: '600',
                                color: currentPage === 'members' ? 'var(--primary)' : 'var(--secondary)',
                                cursor: 'pointer'
                            }}
                        >
                            Club Members & Leaders
                        </button>
                        <button
                            onClick={() => handleNavClick('genealogy')}
                            style={{
                                textAlign: 'left',
                                background: 'none',
                                border: 'none',
                                outline: 'none',
                                boxShadow: 'none',
                                padding: '6px 12px',
                                fontSize: '1.05rem',
                                fontWeight: '600',
                                color: currentPage === 'genealogy' ? 'var(--primary)' : 'var(--secondary)',
                                cursor: 'pointer'
                            }}
                        >
                            District Genealogy
                        </button>
                    </div>

                    {navItems.filter(item => item.id !== 'home').map(item => (
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
                        onClick={() => handleNavClick('home', 'join')} 
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
