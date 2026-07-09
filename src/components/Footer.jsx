import React from 'react';
import { Globe } from 'lucide-react';

export default function Footer({ setCurrentPage }) {
    const handleNavClick = (pageId) => {
        setCurrentPage(pageId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer style={{
            backgroundColor: '#0F172A',
            color: 'rgba(255,255,255,0.65)',
            padding: '80px 0 30px 0',
            borderTop: '1px solid rgba(255,255,255,0.08)'
        }}>
            <div className="container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '40px',
                marginBottom: '60px'
            }}>
                {/* Col 1 */}
                <div>
                    <a href="#home" onClick={() => handleNavClick('home')} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        textDecoration: 'none',
                        marginBottom: '20px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.1 }}>
                            <span style={{ 
                                fontSize: '1.75rem', 
                                fontWeight: 800, 
                                color: '#FFFFFF', 
                                fontFamily: 'var(--font-heading)',
                                letterSpacing: '-0.3px'
                            }}>
                                Rotary
                            </span>
                            <span style={{ 
                                fontSize: '0.82rem', 
                                fontWeight: 800, 
                                color: '#F8FAFC', 
                                letterSpacing: '0.3px'
                            }}>
                                CLUB OF MADURAI
                            </span>
                            <span style={{ 
                                fontSize: '0.62rem', 
                                fontWeight: 600, 
                                color: '#60A5FA', 
                                letterSpacing: '0.1px',
                                marginTop: '2px'
                            }}>
                                Rotary International District 3000
                            </span>
                            <span style={{ 
                                fontSize: '0.62rem', 
                                fontWeight: 600, 
                                color: '#E2E8F0', 
                                letterSpacing: '0.1px',
                                marginTop: '1px'
                            }}>
                                Chartered on 27th December 1938
                            </span>
                        </div>
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
                    <p style={{ fontSize: '0.95rem', marginBottom: '20px', lineHeight: '1.6' }}>
                        Upholding the motto "Service Above Self" since 1938. The first and oldest Rotary club in Madurai, dedicated to sustainable community development.
                    </p>
                    <div style={{ fontSize: '0.9rem' }}>
                        <p>Email: <span style={{ color: 'white' }}><a href="mailto:rotaryclubofmaduraiofficial@gmail.com" style={{ color: 'white', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>rotaryclubofmaduraiofficial@gmail.com</a></span></p>
                        <p>Phone: <span style={{ color: 'white' }}>+91 95853 99000</span></p>
                    </div>
                </div>

                {/* Col 2 */}
                <div>
                    <h4 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '24px' }}>Quick Links</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {['home', 'about', 'members', 'genealogy', 'services', 'projects', 'contact'].map(page => (
                            <li key={page}>
                                <button
                                    onClick={() => handleNavClick(page)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'rgba(255,255,255,0.65)',
                                        cursor: 'pointer',
                                        fontSize: '0.95rem',
                                        transition: 'all 0.2s',
                                        padding: 0,
                                        textAlign: 'left'
                                    }}
                                    onMouseEnter={(e) => { e.target.style.color = 'var(--primary)'; e.target.style.transform = 'translateX(4px)'; }}
                                    onMouseLeave={(e) => { e.target.style.color = 'rgba(255,255,255,0.65)'; e.target.style.transform = 'translateX(0)'; }}
                                >
                                    {page === 'home' ? 'Home' : page === 'about' ? 'About Us' : page === 'members' ? 'Club Members & Leaders' : page === 'genealogy' ? 'District Genealogy' : page === 'services' ? 'Areas of Focus' : page === 'projects' ? 'Our Projects' : 'Contact Us'}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Col 3 */}
                <div>
                    <h4 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '24px' }}>Our Focus Areas</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {['Miyawaki Urban Forests', 'Disease Prevention', 'Basic Education', 'Community Development'].map(prog => (
                            <li key={prog}>
                                <button
                                    onClick={() => handleNavClick('services')}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'rgba(255,255,255,0.65)',
                                        cursor: 'pointer',
                                        fontSize: '0.95rem',
                                        transition: 'all 0.2s',
                                        padding: 0,
                                        textAlign: 'left'
                                    }}
                                    onMouseEnter={(e) => { e.target.style.color = 'var(--primary)'; e.target.style.transform = 'translateX(4px)'; }}
                                    onMouseLeave={(e) => { e.target.style.color = 'rgba(255,255,255,0.65)'; e.target.style.transform = 'translateX(0)'; }}
                                >
                                    {prog}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Col 4 */}
                <div>
                    <h4 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '24px' }}>Meetings & Fellowship</h4>
                    <p style={{ fontSize: '0.95rem', marginBottom: '20px', lineHeight: '1.6' }}>
                        Join us every 2nd & 4th Saturday of the month at 8:30 PM.
                    </p>
                    <button
                        onClick={() => handleNavClick('contact')}
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '12px', fontSize: '0.9rem' }}
                    >
                        Contact for Details
                    </button>
                </div>
            </div>

            <div className="container" style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                fontSize: '1.05rem'
            }}>
                <p>&copy; {new Date().getFullYear()} Rotary Club of Madurai. All rights reserved. | <strong>Designed and Developed by <a href="https://godivatech.com" target="_blank" rel="noopener noreferrer" style={{ color: '#FFB800', fontWeight: '800', textDecoration: 'none', transition: 'all 0.2s', borderBottom: '1.5px solid rgba(255,184,0,0.3)', paddingBottom: '2px' }} onMouseEnter={(e) => { e.target.style.color = '#FFFFFF'; e.target.style.borderBottomColor = '#FFFFFF'; }} onMouseLeave={(e) => { e.target.style.color = '#FFB800'; e.target.style.borderBottomColor = 'rgba(255,184,0,0.3)'; }}>godivatech</a></strong></p>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <a href="#privacy" style={{ color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}>Privacy Policy</a>
                    <a href="#terms" style={{ color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}>Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
