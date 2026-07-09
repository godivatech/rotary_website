import React, { useState, useEffect, useRef } from 'react';
import { Play, CheckCircle2, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Home({ setCurrentPage }) {
    const [membershipForm, setMembershipForm] = useState({
        name: '',
        email: '',
        phone: '',
        profession: '',
        message: ''
    });
    const [activeFaq, setActiveFaq] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);

    const heroSlides = [
        {
            badge: "SERVICE ABOVE SELF",
            title: "Fellowship that inspires service",
            desc: "Bringing leaders and communities together to create lasting change through fellowship, integrity, and service.",
            image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=600",
            primaryBtn: { text: "Join Our Club", isLink: true, action: "#join" },
            secondaryBtn: { text: "Discover Our Story", isLink: false, action: "about" }
        },
        {
            badge: "PEOPLE OF ACTION",
            title: "Turning compassion into action",
            desc: "From healthcare and education to the environment and community development, we take action where it matters most.",
            image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600",
            primaryBtn: { text: "Our Projects", isLink: false, action: "projects" },
            secondaryBtn: { text: "Get Involved", isLink: true, action: "#join" }
        },
        {
            badge: "DOING GOOD IN THE WORLD",
            title: "Creating lasting change together",
            desc: "United with Rotary clubs worldwide, we advance peace, fight disease, support education, and build stronger communities.",
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600",
            primaryBtn: { text: "Explore Our Impact", isLink: false, action: "services" },
            secondaryBtn: { text: "About Rotary", isLink: false, action: "about" }
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % heroSlides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const parallaxBgRef = useRef(null);

    useEffect(() => {
        const bgEl = parallaxBgRef.current;
        if (!bgEl) return;

        let ticking = false;

        const updateParallax = () => {
            if (!bgEl) return;
            const parentEl = bgEl.parentElement;
            if (!parentEl) return;
            const rect = parentEl.getBoundingClientRect();
            const viewHeight = window.innerHeight;

            if (rect.bottom < 0 || rect.top > viewHeight) return;

            const parentHeight = rect.height;
            const totalRange = viewHeight + parentHeight;
            const currentPosition = viewHeight - rect.top;
            const progress = Math.max(0, Math.min(1, currentPosition / totalRange));
            
            const maxTranslate = 180; // offset in px
            const translateVal = (0.5 - progress) * 2 * maxTranslate;
            
            bgEl.style.transform = `translate3d(0, ${translateVal}px, 0)`;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        updateParallax();

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

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

    const handleMembershipSubmit = (e) => {
        e.preventDefault();
        alert(`Thank you, ${membershipForm.name}! Your membership request has been submitted. The club secretary will get in touch with you shortly.`);
        setMembershipForm({
            name: '',
            email: '',
            phone: '',
            profession: '',
            message: ''
        });
    };

    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-slides-container">
                    {heroSlides.map((slide, idx) => (
                        <div 
                            key={idx} 
                            className={`hero-slide ${currentSlide === idx ? 'active' : ''}`}
                        >
                            {/* Slide Background Image with Premium Dark Overlay */}
                            <div 
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.5) 100%), url(${slide.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    zIndex: 1
                                }}
                            />
                            
                            {/* Slide Content aligned to main container grid */}
                            <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
                                <div className="hero-content" style={{ maxWidth: '650px' }}>
                                    <span className="badge" style={{ backgroundColor: 'var(--primary)', color: 'white', borderColor: 'transparent' }}>
                                        {slide.badge}
                                    </span>
                                    <h1 style={{ color: 'white', marginTop: '16px' }}>{slide.title}</h1>
                                    <p style={{ color: 'rgba(255, 255, 255, 0.85)' }}>{slide.desc}</p>
                                    <div className="hero-buttons">
                                        {slide.primaryBtn.isLink ? (
                                            <a href={slide.primaryBtn.action} className="btn btn-primary">
                                                {slide.primaryBtn.text}
                                            </a>
                                        ) : (
                                            <button 
                                                onClick={() => { setCurrentPage(slide.primaryBtn.action); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                                                className="btn btn-primary"
                                            >
                                                {slide.primaryBtn.text}
                                            </button>
                                        )}

                                        {slide.secondaryBtn.isLink ? (
                                            <a 
                                                href={slide.secondaryBtn.action} 
                                                className="btn btn-outline"
                                                style={{ borderColor: 'white', color: 'white' }}
                                            >
                                                {slide.secondaryBtn.text}
                                            </a>
                                        ) : (
                                            <button 
                                                onClick={() => { setCurrentPage(slide.secondaryBtn.action); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                                                className="btn btn-outline"
                                                style={{ borderColor: 'white', color: 'white' }}
                                            >
                                                {slide.secondaryBtn.text}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Navigation Dots */}
                    <div className="hero-dots" style={{
                        position: 'absolute',
                        bottom: '30px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '12px',
                        zIndex: 10
                    }}>
                        {heroSlides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                aria-label={`Go to slide ${idx + 1}`}
                                style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    backgroundColor: currentSlide === idx ? 'var(--primary)' : 'rgba(255, 255, 255, 0.4)',
                                    opacity: 1,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                    padding: 0
                                }}
                            />
                        ))}
                    </div>
                </div>
            </section>


            {/* Intro / Quote Section */}
            <section className="intro section-padding section-bg-light" style={{ position: 'relative', overflow: 'hidden' }}>
                <img 
                    src="/images/Logo%20chakra.png" 
                    alt="Chakra watermark" 
                    className="chakra-watermark" 
                    style={{ 
                        right: '-150px', 
                        bottom: '-150px', 
                        width: '450px', 
                        height: '450px'
                    }} 
                />
                <div className="container intro-grid" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="intro-image reveal-scale mouse-parallax" data-parallax-speed="10">
                        <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600" alt="Children supported by Rotary education project" style={{ borderRadius: '20px' }} />
                    </div>
                    <div className="intro-content reveal-up" style={{ transitionDelay: '0.2s' }}>
                        <span className="badge">Who We Are</span>
                        <h2>Sustainable impact for local community needs</h2>
                        <blockquote>
                            "Service Above Self is more than a motto, it is our way of life, guiding our fellowship to build a stronger and more sustainable Madurai."
                        </blockquote>
                        <cite>Rotary Club of Madurai Board</cite>
                    </div>
                </div>
            </section>

            {/* Values & Focus Ticker Section */}
            <div className="ticker-container" style={{ margin: '30px 0 0 0' }}>
                {/* Upper Row: White background, Static Centered Text */}
                <div className="ticker-row-upper-static">
                    <span className="ticker-item-upper-static">Service Above Self</span>
                    <Heart size={18} fill="#F59E0B" style={{ stroke: 'none', color: '#F59E0B' }} />
                    <span className="ticker-item-upper-static">Fellowship</span>
                    <Heart size={18} fill="#F59E0B" style={{ stroke: 'none', color: '#F59E0B' }} />
                    <span className="ticker-item-upper-static">Integrity</span>
                    <Heart size={18} fill="#F59E0B" style={{ stroke: 'none', color: '#F59E0B' }} />
                    <span className="ticker-item-upper-static">Diversity</span>
                    <Heart size={18} fill="#F59E0B" style={{ stroke: 'none', color: '#F59E0B' }} />
                    <span className="ticker-item-upper-static">Leadership</span>
                </div>

                {/* Lower Row: Rotary Blue Gradient Background, Small White Scrolling Text */}
                <div className="ticker-wrap ticker-row-lower">
                    <div className="ticker-track-reverse">
                        {[1, 2, 3, 4].map((i) => (
                            <React.Fragment key={i}>
                                <span className="ticker-item-lower">
                                    <span style={{ marginRight: '8px' }}>✦</span>
                                    Peace Promotion
                                </span>
                                <span className="ticker-item-lower">
                                    <span style={{ marginRight: '8px' }}>✦</span>
                                    Disease Prevention
                                </span>
                                <span className="ticker-item-lower">
                                    <span style={{ marginRight: '8px' }}>✦</span>
                                    Clean Water & Sanitation
                                </span>
                                <span className="ticker-item-lower">
                                    <span style={{ marginRight: '8px' }}>✦</span>
                                    Maternal & Child Health
                                </span>
                                <span className="ticker-item-lower">
                                    <span style={{ marginRight: '8px' }}>✦</span>
                                    Basic Education & Literacy
                                </span>
                                <span className="ticker-item-lower">
                                    <span style={{ marginRight: '8px' }}>✦</span>
                                    Community Economic Development
                                </span>
                                <span className="ticker-item-lower">
                                    <span style={{ marginRight: '8px' }}>✦</span>
                                    Environmental Support
                                </span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            {/* Initiatives Preview */}
            <section className="section-padding section-bg-white">
                <div className="container">
                    <div className="initiatives-header reveal-up">
                        <span className="badge">Our Focus Areas</span>
                        <h2>Empowering <span className="shiny-text">Madurai</span> through dedicated action</h2>
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
                <div 
                    ref={parallaxBgRef}
                    className="video-parallax-bg" 
                    style={{
                        position: 'absolute',
                        top: '-40%',
                        left: 0,
                        width: '100%',
                        height: '180%',
                        backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.72), rgba(15, 23, 42, 0.72)), url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1920')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 1,
                        willChange: 'transform'
                    }}
                />
                <div className="video-content reveal-up" style={{ position: 'relative', zIndex: 2 }}>
                    <div className="play-btn-wrapper">
                        <div className="play-btn"><Play size={24} fill="white" /></div>
                        <div className="play-pulse"></div>
                        <div className="play-pulse play-pulse-2"></div>
                        <div className="play-pulse play-pulse-3"></div>
                    </div>
                    <h2>Eighty-Nine Years of <span className="shiny-text">Legacy</span></h2>
                    <p>Watch our service projects and fellowship milestones across Madurai.</p>
                </div>
            </section>

            {/* Membership Inquiry Section */}
            <section id="join" className="section-padding bg-light" style={{ position: 'relative', overflow: 'hidden' }}>
                <img 
                    src="/images/Logo%20chakra.png" 
                    alt="Chakra watermark" 
                    className="chakra-watermark" 
                    style={{ 
                        left: '-150px', 
                        bottom: '-150px', 
                        width: '500px', 
                        height: '500px'
                    }} 
                />
                <div className="container donate-section-grid" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="donate-info reveal-up">
                        <span className="badge">Become a Rotarian</span>
                        <h2>Join the global network of <span className="shiny-text">community leaders</span></h2>
                        <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>Membership in the Rotary Club of Madurai opens doors to lifelong friendships, professional networking, and directly leading local service initiatives. Fill out the application details to express your interest, and our membership chair will reach out to you.</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <div style={{ color: 'var(--primary)', padding: '6px', backgroundColor: 'var(--primary-light)', borderRadius: '8px' }}>
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--secondary)', fontSize: '1.1rem', marginBottom: '4px' }}>Professional Classifications</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>We invite diverse business, corporate, and vocational professionals to keep our club classification system representative of local trades.</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <div style={{ color: 'var(--primary)', padding: '6px', backgroundColor: 'var(--primary-light)', borderRadius: '8px' }}>
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--secondary)', fontSize: '1.1rem', marginBottom: '4px' }}>Active Community Leadership</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Our members are actively involved in designing, budgeting, and delivering community service projects.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="donation-form-wrapper reveal-up" style={{ transitionDelay: '0.2s' }}>
                        <h3 style={{ marginBottom: '24px', fontSize: '1.5rem', color: 'var(--secondary)' }}>Membership Application</h3>
                        <form onSubmit={handleMembershipSubmit}>
                            <div className="form-group" style={{ marginBottom: '16px' }}>
                                <label className="form-label" htmlFor="fullname" style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.9rem' }}>Full Name</label>
                                <input 
                                    type="text" 
                                    id="fullname" 
                                    className="form-control" 
                                    placeholder="Enter your full name" 
                                    value={membershipForm.name}
                                    onChange={(e) => setMembershipForm({ ...membershipForm, name: e.target.value })}
                                    required 
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid var(--border-color)', outline: 'none' }}
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: '16px' }}>
                                <label className="form-label" htmlFor="email" style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.9rem' }}>Email Address</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    className="form-control" 
                                    placeholder="Enter your email address" 
                                    value={membershipForm.email}
                                    onChange={(e) => setMembershipForm({ ...membershipForm, email: e.target.value })}
                                    required 
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid var(--border-color)', outline: 'none' }}
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: '16px' }}>
                                <label className="form-label" htmlFor="phone" style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.9rem' }}>Phone Number</label>
                                <input 
                                    type="tel" 
                                    id="phone" 
                                    className="form-control" 
                                    placeholder="Enter your phone number" 
                                    value={membershipForm.phone}
                                    onChange={(e) => setMembershipForm({ ...membershipForm, phone: e.target.value })}
                                    required 
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid var(--border-color)', outline: 'none' }}
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: '16px' }}>
                                <label className="form-label" htmlFor="profession" style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.9rem' }}>Profession / Classification</label>
                                <input 
                                    type="text" 
                                    id="profession" 
                                    className="form-control" 
                                    placeholder="Enter your profession or classification" 
                                    value={membershipForm.profession}
                                    onChange={(e) => setMembershipForm({ ...membershipForm, profession: e.target.value })}
                                    required 
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid var(--border-color)', outline: 'none' }}
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: '24px' }}>
                                <label className="form-label" htmlFor="message" style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.9rem' }}>Briefly describe why you want to join Rotary</label>
                                <textarea 
                                    id="message" 
                                    className="form-control" 
                                    rows="3"
                                    placeholder="Enter why you want to join Rotary and your background..." 
                                    value={membershipForm.message}
                                    onChange={(e) => setMembershipForm({ ...membershipForm, message: e.target.value })}
                                    required 
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid var(--border-color)', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', borderRadius: '8px', fontWeight: 700 }}>Submit Inquiry</button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Accordion FAQ & Google Reviews */}
            <section id="faqs" className="section-padding">
                <div className="container faq-section-grid">
                    <div className="review-badge-container reveal-scale">
                        <div className="google-review-badge">
                            <div style={{ fontWeight: '800', fontSize: '1.6rem', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                                <span style={{ color: '#4285F4' }}>G</span><span style={{ color: '#EA4335' }}>o</span><span style={{ color: '#FBBC05' }}>o</span><span style={{ color: '#4285F4' }}>g</span><span style={{ color: '#34A853' }}>l</span><span style={{ color: '#EA4335' }}>e</span>
                            </div>
                            <div className="stars">★★★★☆</div>
                            <div className="badge-rating" style={{ fontSize: '2.5rem', fontWeight: 800 }}>4.1/5</div>
                            <div className="badge-desc">Trusted by local partners, institutions, and the Madurai community for integrity and transparency.</div>
                        </div>
                    </div>

                    <div className="faq-accordion reveal-up" style={{ transitionDelay: '0.2s' }}>
                        <span className="badge">Frequently Asked Questions</span>
                        <h2 style={{ marginBottom: '30px' }}>Answers to your common queries</h2>

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
                <div className="container partners-grid reveal-up" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '30px' }}>
                    <img style={{ opacity: 0.4, height: '40px' }} src="https://images.unsplash.com/photo-1599305445671-ac291c95aba9?q=80&w=120" alt="Partner Logo" />
                    <img style={{ opacity: 0.4, height: '40px' }} src="https://images.unsplash.com/photo-1599305446868-59b861c36dcf?q=80&w=120" alt="Partner Logo" />
                    <img style={{ opacity: 0.4, height: '40px' }} src="https://images.unsplash.com/photo-1599305446908-41712a52efc1?q=80&w=120" alt="Partner Logo" />
                    <img style={{ opacity: 0.4, height: '40px' }} src="https://images.unsplash.com/photo-1599305446059-e93540c1a967?q=80&w=120" alt="Partner Logo" />
                </div>
            </section>
        </div>
    );
}
