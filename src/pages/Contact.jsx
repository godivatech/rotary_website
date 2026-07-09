import React from 'react';
import { MapPin, Mail, Phone, Send } from 'lucide-react';

export default function Contact() {
    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert('Thank you! Your message has been sent successfully.');
        e.target.reset();
    };

    return (
        <div className="animate-fade-in">
            {/* Page Header */}
            <section style={{
                background: "linear-gradient(rgba(15, 23, 42, 0.82), rgba(15, 23, 42, 0.82)), url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1920') center/cover no-repeat",
                padding: '140px 0 70px 0',
                textAlign: 'center',
                color: 'white'
            }}>
                <div className="container">
                    <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '8px' }}>Contact Us</h1>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>Home / Contact Us</p>
                </div>
            </section>

            {/* Contact details & Form */}
            <section className="section section-bg-white">
                <div className="container grid-2" style={{ alignItems: 'start' }}>

                    {/* Left Column - Contact info */}
                    <div className="reveal-up">
                        <span className="badge">Get in touch</span>
                        <h2>We would love to hear from you</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '40px', marginTop: '15px' }}>
                            Have questions about our initiatives, sponsorship models, or volunteer sign-ups? Send us a message and our support team will reach out.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            {/* Address */}
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '12px',
                                    backgroundColor: 'var(--primary-light)',
                                    color: 'var(--primary)'
                                }}>
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Our Office</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Rotary Club Hall, Madurai, Tamil Nadu, India</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '12px',
                                    backgroundColor: 'var(--primary-light)',
                                    color: 'var(--primary)'
                                }}>
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Email Address</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                                        <a href="mailto:rotaryclubofmaduraiofficial@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>rotaryclubofmaduraiofficial@gmail.com</a>
                                    </p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '12px',
                                    backgroundColor: 'var(--primary-light)',
                                    color: 'var(--primary)'
                                }}>
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Phone Number</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>+91 95853 99000</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="reveal-up" style={{ transitionDelay: '0.2s', backgroundColor: 'white', border: '1.5px solid var(--border-color)', borderRadius: '20px', padding: '40px', boxShadow: 'var(--shadow-md)' }}>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '24px' }}>Send a Message</h3>
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="name">Full Name</label>
                                <input type="text" id="name" className="form-control" placeholder="Enter your name" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="email">Email Address</label>
                                <input type="email" id="email" className="form-control" placeholder="Enter your email address" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="subject">Subject</label>
                                <input type="text" id="subject" className="form-control" placeholder="Enter subject" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="message">Message</label>
                                <textarea id="message" className="form-control" rows="5" placeholder="Enter your message here..." required style={{ resize: 'vertical' }}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', gap: '10px' }}>
                                Send Message <Send size={16} />
                            </button>
                        </form>
                    </div>

                </div>
            </section>
        </div>
    );
}
