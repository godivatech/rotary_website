import React, { useState } from 'react';
import { Play, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Home({ setCurrentPage }) {
    const [selectedAmount, setSelectedAmount] = useState(50);
    const [customAmount, setCustomAmount] = useState('50');
    const [activeFaq, setActiveFaq] = useState(0);

    const presetAmounts = [10, 50, 100, 500];

    const faqItems = [
        {
            q: "How can I join the Rotary Club of Madurai?",
            a: "Membership is by invitation or expression of interest. We welcome professionals, business owners, and community leaders who align with our motto of 'Service Above Self'."
        },
        {
            q: "When and where do your meetings take place?",
            a: "We meet on the 2nd and 4th Saturday of every month at 8:30 PM for fellowship, project reviews, and community planning."
        },
        {
            q: "How do I know my contribution is used effectively?",
            a: "We maintain audit-grade records for all service projects. Over 90% of all public contributions are directly routed to project services, with less than 10% applied to administration expenses."
        },
        {
            q: "What are the primary focus areas of the club?",
            a: "We focus on clean environment (such as Miyawaki urban afforestation), healthcare screenings, basic education and literacy support for government schools, and women's empowerment initiatives."
        }
    ];

    const handleAmountClick = (amount) => {
        setSelectedAmount(amount);
        setCustomAmount(amount.toString());
    };

    const handleCustomAmountChange = (e) => {
        const val = e.target.value;
        setCustomAmount(val);
        setSelectedAmount(null);
    };

    const handleDonationSubmit = (e) => {
        e.preventDefault();
        alert(`Thank you for your generous contribution of $${customAmount} to Rotary projects!`);
    };

    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-grid">
                    <div className="hero-content reveal-up">
                        <span className="badge">Service Above Self since 1938</span>
                        <h1>Pioneering fellowship and community service.</h1>
                        <p>As the first and oldest Rotary club in Madurai (District 3000), we have worked for over 85 years to establish dense Miyawaki forests, organize free healthcare clinics, and support local government school classrooms.</p>
                        <div className="hero-buttons">
                            <a href="#donate" className="btn btn-primary">Support Projects</a>
                            <button onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn btn-outline">Our History</button>
                        </div>
                    </div>
                    <div className="hero-image-wrapper reveal-clip mouse-parallax" data-parallax-speed="-15" style={{ transitionDelay: '0.2s' }}>
                        <img className="hero-image" src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=600" alt="Rotary community service project" />
                        <div className="hero-shape"></div>
                    </div>
                </div>
            </section>

            {/* Intro / Quote Section */}
            <section className="intro section-padding section-bg-light">
                <div className="container intro-grid">
                    <div className="intro-image reveal-scale mouse-parallax" data-parallax-speed="10">
                        <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600" alt="Children supported by Rotary education project" style={{ borderRadius: '20px' }} />
                    </div>
                    <div className="intro-content reveal-up" style={{ transitionDelay: '0.2s' }}>
                        <span className="badge">Who We Are</span>
                        <h2>Sustainable impact for local community needs.</h2>
                        <blockquote>
                            "Service Above Self is more than a motto; it is our way of life, guiding our fellowship to build a stronger and more sustainable Madurai."
                        </blockquote>
                        <cite>Rotary Club of Madurai Board</cite>
                    </div>
                </div>
            </section>

            {/* Initiatives Preview */}
            <section className="section-padding section-bg-white">
                <div className="container">
                    <div className="initiatives-header reveal-up">
                        <span className="badge">Our Focus Areas</span>
                        <h2>Empowering Madurai through dedicated action.</h2>
                    </div>
                    <div className="initiatives-grid">
                        {/* Initiative 1 */}
                        <div className="initiative-card tilt-card reveal-up">
                            <div className="card-img-wrapper">
                                <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600" alt="Education support" />
                                <span className="card-tag">Education</span>
                            </div>
                            <div className="card-content">
                                <h3>Basic Education & Literacy Support</h3>
                                <p>Supplying textbooks, smart class televisions, classroom kits, and sponsoring local school fees for underprivileged children in government schools.</p>
                                <div className="card-footer">
                                    <button
                                        onClick={() => { setCurrentPage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                        className="card-link"
                                    >
                                        Read More <span>→</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Initiative 2 */}
                        <div className="initiative-card tilt-card reveal-up" style={{ transitionDelay: '0.1s' }}>
                            <div className="card-img-wrapper">
                                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600" alt="Health Camp" />
                                <span className="card-tag">Healthcare</span>
                            </div>
                            <div className="card-content">
                                <h3>Rural Health Camps & Screenings</h3>
                                <p>Organizing medical checkups, pediatric screening, and free distribution of essential medications to rural sub-centers around Madurai.</p>
                                <div className="card-footer">
                                    <button
                                        onClick={() => { setCurrentPage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                        className="card-link"
                                    >
                                        Read More <span>→</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Initiative 3 */}
                        <div className="initiative-card tilt-card reveal-up" style={{ transitionDelay: '0.2s' }}>
                            <div className="card-img-wrapper">
                                <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=600" alt="Miyawaki Forest" />
                                <span className="card-tag">Environment</span>
                            </div>
                            <div className="card-content">
                                <h3>Miyawaki Urban Afforestation Drive</h3>
                                <p>Planting thousands of native saplings at Kappalur SIDCO, Vandiyur Park, and Madura College to create dense, self-sustaining green lung spaces.</p>
                                <div className="card-footer">
                                    <button
                                        onClick={() => { setCurrentPage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                        className="card-link"
                                    >
                                        Read More <span>→</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Ripple Section */}
            <section className="video-section">
                <div className="video-content">
                    <div className="play-btn-wrapper">
                        <div className="play-btn"><Play size={24} fill="white" /></div>
                        <div className="play-pulse"></div>
                        <div className="play-pulse play-pulse-2"></div>
                        <div className="play-pulse play-pulse-3"></div>
                    </div>
                    <h2>Eighty-Five Years of Legacy.</h2>
                    <p>Watch our service projects and fellowship milestones across Madurai.</p>
                </div>
            </section>

            {/* Donation Forms */}
            <section id="donate" className="section-padding bg-light">
                <div className="container donate-section-grid">
                    <div className="donate-info">
                        <span className="badge">Support Our Work</span>
                        <h2>Empower community development today.</h2>
                        <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>Your financial contributions directly support regional outreach and global grant projects. We maintain complete operational transparency so you see exactly how every single contribution is optimized to build better futures.</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <div style={{ color: 'var(--primary)', padding: '6px', backgroundColor: 'var(--primary-light)', borderRadius: '8px' }}>
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--secondary)', fontSize: '1.1rem', marginBottom: '4px' }}>100% Secured Transactions</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>All contribution channels utilize modern secure payment gateway standards.</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <div style={{ color: 'var(--primary)', padding: '6px', backgroundColor: 'var(--primary-light)', borderRadius: '8px' }}>
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--secondary)', fontSize: '1.1rem', marginBottom: '4px' }}>Tax Deductible Support</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Donations to our charity trust qualify for applicable local tax relief certificates.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="donation-form-wrapper" style={{ transitionDelay: '0.2s' }}>
                        <h3 style={{ marginBottom: '24px', fontSize: '1.5rem' }}>Select Contribution Amount</h3>
                        <div className="donate-amount-grid" style={{ marginBottom: '24px' }}>
                            {presetAmounts.map(amt => (
                                <button
                                    key={amt}
                                    type="button"
                                    className={`amount-btn ${selectedAmount === amt ? 'active' : ''}`}
                                    onClick={() => handleAmountClick(amt)}
                                    style={{
                                        border: selectedAmount === amt ? '2px solid var(--primary)' : '1.5px solid var(--border-color)',
                                        backgroundColor: selectedAmount === amt ? 'var(--primary)' : '#F8FAFC',
                                        color: selectedAmount === amt ? 'white' : 'var(--secondary)',
                                        padding: '14px',
                                        borderRadius: '10px',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        transition: 'var(--transition)'
                                    }}
                                >
                                    ${amt}
                                </button>
                            ))}
                        </div>
                        <form onSubmit={handleDonationSubmit}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="custom-amount">Or Enter Custom Amount ($)</label>
                                <input
                                    type="number"
                                    id="custom-amount"
                                    className="form-control"
                                    value={customAmount}
                                    onChange={handleCustomAmountChange}
                                    min="1"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="fullname">Full Name</label>
                                <input type="text" id="fullname" className="form-control" placeholder="John Doe" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="email">Email Address</label>
                                <input type="email" id="email" className="form-control" placeholder="john@example.com" required />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>Complete Contribution</button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Accordion FAQ & Google Reviews */}
            <section id="faqs" className="section-padding">
                <div className="container faq-section-grid">
                    <div className="review-badge-container fade-in-up">
                        <div className="google-review-badge">
                            <div style={{ fontWeight: '800', fontSize: '1.6rem', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                                <span style={{ color: '#4285F4' }}>G</span><span style={{ color: '#EA4335' }}>o</span><span style={{ color: '#FBBC05' }}>o</span><span style={{ color: '#4285F4' }}>g</span><span style={{ color: '#34A853' }}>l</span><span style={{ color: '#EA4335' }}>e</span>
                            </div>
                            <div className="stars">★★★★★</div>
                            <div className="badge-rating" style={{ fontSize: '2.5rem', fontWeight: 800 }}>5.0/5</div>
                            <div className="badge-desc">Trusted by local partners, institutions, and the Madurai community for integrity and transparency.</div>
                        </div>
                    </div>

                    <div className="faq-accordion fade-in-up" style={{ transitionDelay: '0.2s' }}>
                        <span className="badge">Frequently Asked Questions</span>
                        <h2 style={{ marginBottom: '30px' }}>Answers to your common queries.</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {faqItems.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`faq-item ${activeFaq === idx ? 'active' : ''}`}
                                    style={{
                                        borderRadius: '12px',
                                        border: activeFaq === idx ? '1.5px solid var(--primary)' : '1.5px solid var(--border-color)',
                                        backgroundColor: 'white',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <button
                                        type="button"
                                        className="faq-trigger"
                                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '20px 24px',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            fontSize: '1.1rem',
                                            fontWeight: '700',
                                            color: activeFaq === idx ? 'var(--primary)' : 'var(--secondary)'
                                        }}
                                    >
                                        {item.q}
                                        <span style={{
                                            backgroundColor: activeFaq === idx ? 'var(--primary)' : '#F1F5F9',
                                            color: activeFaq === idx ? 'white' : 'var(--text-muted)',
                                            width: '28px',
                                            height: '28px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'transform 0.3s',
                                            transform: activeFaq === idx ? 'rotate(45deg)' : 'none'
                                        }}>+</span>
                                    </button>
                                    <div
                                        style={{
                                            maxHeight: activeFaq === idx ? '200px' : '0',
                                            overflow: 'hidden',
                                            transition: 'max-height 0.3s ease-out'
                                        }}
                                    >
                                        <p style={{ padding: '0 24px 20px 24px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>{item.a}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Partner Grid */}
            <section className="partners-section" style={{ padding: '60px 0', borderTop: '1px solid var(--border-color)' }}>
                <div className="container partners-grid fade-in-up" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '30px' }}>
                    <img style={{ opacity: 0.4, height: '40px' }} src="https://images.unsplash.com/photo-1599305445671-ac291c95aba9?q=80&w=120" alt="Partner Logo" />
                    <img style={{ opacity: 0.4, height: '40px' }} src="https://images.unsplash.com/photo-1599305446868-59b861c36dcf?q=80&w=120" alt="Partner Logo" />
                    <img style={{ opacity: 0.4, height: '40px' }} src="https://images.unsplash.com/photo-1599305446908-41712a52efc1?q=80&w=120" alt="Partner Logo" />
                    <img style={{ opacity: 0.4, height: '40px' }} src="https://images.unsplash.com/photo-1599305446059-e93540c1a967?q=80&w=120" alt="Partner Logo" />
                </div>
            </section>
        </div>
    );
}
