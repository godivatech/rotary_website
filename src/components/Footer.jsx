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
                        gap: '8px',
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: 'white',
                        marginBottom: '20px'
                    }}>
                        <div style={{
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            padding: '4px',
                            borderRadius: '8px',
                            display: 'flex'
                        }}>
                            <Globe size={16} />
                        </div>
                        Rotary <span style={{ color: 'var(--primary)' }}>Madurai</span>
                    </a>
                    <p style={{ fontSize: '0.95rem', marginBottom: '20px', lineHeight: '1.6' }}>
                        Upholding the motto "Service Above Self" since 1938. The first and oldest Rotary club in Madurai, dedicated to sustainable community development.
                    </p>
                    <div style={{ fontSize: '0.9rem' }}>
                        <p>Email: <span style={{ color: 'white' }}>rotaryclubofmadurai1938@gmail.com</span></p>
                        <p>Phone: <span style={{ color: 'white' }}>+91 95853 99000</span></p>
                    </div>
                </div>

                {/* Col 2 */}
                <div>
                    <h4 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '24px' }}>Quick Links</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {['home', 'about', 'services', 'projects', 'contact'].map(page => (
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
                                    {page === 'home' ? 'Home' : page === 'about' ? 'About Us' : page === 'services' ? 'Areas of Focus' : page === 'projects' ? 'Our Projects' : 'Contact Us'}
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
                fontSize: '0.9rem'
            }}>
                <p>&copy; {new Date().getFullYear()} Rotary Club of Madurai. All rights reserved.</p>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <a href="#privacy" style={{ color: 'rgba(255,255,255,0.5)' }}>Privacy Policy</a>
                    <a href="#terms" style={{ color: 'rgba(255,255,255,0.5)' }}>Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
