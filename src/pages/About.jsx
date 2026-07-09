import React, { useState, useEffect } from 'react';

function Counter({ target, suffix }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 1500; // 1.5 seconds
        const stepTime = 30; // 30ms interval
        const steps = duration / stepTime;
        const increment = Math.ceil(target / steps);

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [target]);

    return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function About() {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [activeTab, setActiveTab] = useState('birth');

    const testimonials = [
        {
            quote: "The Miyawaki forest planted at Kappalur SIDCO has created a fantastic green lung space in our industrial area. The club's execution speed is impressive.",
            name: "K. R. Ramanathan",
            role: "SIDCO Industrial Representative",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120"
        },
        {
            quote: "The smart class televisions and study kits donated by Rotary have completely transformed the learning experience of our students.",
            name: "M. Meenakshi",
            role: "Government High School Headmistress",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120"
        },
        {
            quote: "Our rural healthcare sub-center received crucial medical diagnostic tools from the club, allowing us to treat village infants on time.",
            name: "Dr. S. K. Rajan",
            role: "Community Health Medical Officer",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=120"
        }
    ];

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
                    <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '8px' }}>About Us</h1>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>Home / About Us</p>
                </div>
            </section>

            {/* Journey Grid */}
            <section className="section section-bg-white" style={{ padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
                <img 
                    src="/images/Logo%20chakra.png" 
                    alt="Chakra watermark" 
                    className="chakra-watermark" 
                    style={{ 
                        left: '-150px', 
                        top: '10%', 
                        width: '500px', 
                        height: '500px' 
                    }} 
                />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="grid-2" style={{ marginBottom: '48px', alignItems: 'center' }}>
                        <div className="reveal-up">
                            <span className="badge">Our Legacy</span>
                            <h2>Pioneering Rotary service in the Temple City since 1938</h2>
                            <p style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>Established on December 27, 1938, the Rotary Club of Madurai stands as the first and oldest Rotary club in the city and the second oldest in Tamil Nadu. Our early foundation was laid by British educator and industrialist Sir J.M. Doak as our charter President, with T.S. Krishna of the TVS Group serving as our charter Secretary, alongside leaders like P.T. Rajan.</p>
                            <p style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>Over the decades, our platform has had the privilege of hosting and working with distinguished figures including Nobel laureate Dr. C.V. Raman, space pioneer Dr. Vikram Sarabhai, former Indian President V.V. Giri, and legendary Chief Minister K. Kamaraj.</p>
                            <p style={{ marginBottom: '0', color: 'var(--text-muted)' }}>We are proud of our history of landmark contributions, such as installing essential borewells at the Government Rajaji Hospital to solve water shortage crises, and donating Braille printing machinery to the Indian Association for the Blind (IAB) to transform literacy rates for visually impaired students.</p>
                        </div>

                        <div className="reveal-up" style={{ transitionDelay: '0.2s', width: '100%' }}>
                            <div className="mouse-parallax" data-parallax-speed="-12">
                                <img
                                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=600"
                                    alt="Rotary fellowship meeting and projects"
                                    style={{ borderRadius: '20px', boxShadow: 'var(--shadow-lg)', width: '100%', display: 'block' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="reveal-up" style={{ transitionDelay: '0.3s' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                            <div style={{ backgroundColor: '#F8FAFC', padding: '32px', borderRadius: '16px', borderLeft: '6px solid var(--primary)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                                <h4 style={{ marginBottom: '12px', fontSize: '1.25rem', color: 'var(--secondary)', fontWeight: '700' }}>Our Mission</h4>
                                <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.65' }}>To provide service to others, promote integrity, and advance world understanding, goodwill, and peace through our fellowship of business and professional leaders.</p>
                            </div>
                            <div style={{ backgroundColor: '#F8FAFC', padding: '32px', borderRadius: '16px', borderLeft: '6px solid var(--primary)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                                <h4 style={{ marginBottom: '12px', fontSize: '1.25rem', color: 'var(--secondary)', fontWeight: '700' }}>Our Vision</h4>
                                <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.65' }}>To be the leading catalyst for sustainable development in Madurai, creating self-sufficient community structures in education, healthcare, and afforestation.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Four-Way Test Section */}
            <section className="section section-bg-white" style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container">
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <span className="badge" style={{ backgroundColor: '#F97316', color: 'white' }}>Ethical Guide</span>
                        <h2>The Four-Way Test</h2>
                        <p style={{ maxWidth: '600px', margin: '15px auto 0 auto', color: 'var(--text-muted)' }}>
                            Of the things we think, say or do. Created by Rotarian Herbert J. Taylor in 1932, this code of ethics has been translated into over 100 languages.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px' }}>
                        {[
                            { num: "1", title: "Is it the TRUTH?", desc: "Honesty and integrity form the cornerstone of all professional and personal relations." },
                            { num: "2", title: "Is it FAIR to all concerned?", desc: "Promotes justice, goodwill, and mutual respect, eliminating self-interest." },
                            { num: "3", title: "Will it build GOODWILL and BETTER FRIENDSHIPS?", desc: "Fosters cooperation and stronger, more unified communities through service." },
                            { num: "4", title: "Will it be BENEFICIAL to all concerned?", desc: "Ensures all projects and actions lead to constructive, positive outcomes for everyone." }
                        ].map((item, idx) => (
                            <div key={idx} className="tilt-card reveal-up" style={{
                                transitionDelay: `${idx * 0.1}s`,
                                backgroundColor: 'white',
                                border: '1.5px solid var(--border-color)',
                                borderRadius: '20px',
                                padding: '35px 25px',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--primary-light)',
                                    color: 'var(--primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.5rem',
                                    fontWeight: '800',
                                    marginBottom: '20px'
                                }}>
                                    {item.num}
                                </div>
                                <h4 style={{ fontSize: '1.15rem', marginBottom: '12px', color: 'var(--secondary)' }}>{item.title}</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Origin & Foundation Section */}
            <section className="section section-bg-light" style={{ padding: '80px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container">
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <span className="badge">Rotary Club of Madurai Heritage</span>
                        <h2>Birth & The March Forward</h2>
                        <p style={{ maxWidth: '700px', margin: '15px auto 0 auto', color: 'var(--text-muted)' }}>
                            Explore the rich local heritage of our club—from our initial charter meeting in 1938 to spawning a network of fellowship and community progress across Southern India.
                        </p>
                    </div>

                    {/* Tab Navigation */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '12px',
                        marginBottom: '40px',
                        flexWrap: 'wrap'
                    }}>
                        {[
                            { id: 'birth', label: 'Birth & Charter (1938-1939)' },
                            { id: 'march', label: 'The March Forward' },
                            { id: 'sponsored', label: 'Sponsored Clubs (21)' },
                            { id: 'leaders', label: 'Leaders & Visitors' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: '30px',
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    border: '1.5px solid',
                                    borderColor: activeTab === tab.id ? 'var(--primary)' : 'var(--border-color)',
                                    backgroundColor: activeTab === tab.id ? 'var(--primary)' : 'white',
                                    color: activeTab === tab.id ? 'white' : 'var(--secondary)',
                                    boxShadow: activeTab === tab.id ? 'var(--shadow-md)' : 'none',
                                    outline: 'none'
                                }}
                                onMouseEnter={(e) => {
                                    if (activeTab !== tab.id) {
                                        e.target.style.borderColor = 'var(--primary)';
                                        e.target.style.backgroundColor = 'var(--primary-light)';
                                        e.target.style.color = 'var(--primary)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (activeTab !== tab.id) {
                                        e.target.style.borderColor = 'var(--border-color)';
                                        e.target.style.backgroundColor = 'white';
                                        e.target.style.color = 'var(--secondary)';
                                    }
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content Display */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '24px',
                        border: '1.5px solid var(--border-color)',
                        padding: '40px',
                        boxShadow: 'var(--shadow-md)',
                        minHeight: '400px',
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                        gap: '40px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <img 
                            src="/images/Logo%20chakra.png" 
                            alt="Chakra watermark" 
                            className="chakra-watermark" 
                            style={{ 
                                right: '-120px', 
                                bottom: '-120px', 
                                width: '450px', 
                                height: '450px' 
                            }} 
                        />
                        {activeTab === 'birth' && (
                            <div className="grid-2 animate-fade-in" style={{ alignItems: 'start', gap: '40px' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.6rem', color: 'var(--secondary)', marginBottom: '20px' }}>The Birth of Rotary in the South</h3>
                                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.98rem', marginBottom: '20px' }}>
                                        "Rotary" first touched South Asia in 1920 with the admission of the Rotary Club of Calcutta. In Tamil Nadu (formerly the Province of Madras), Madurai stood next to Madras in administrative stature. Following Madras starting its club in 1929, the next to establish a presence in the South was Madurai in 1938, after a gap of nine years.
                                    </p>
                                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.98rem', marginBottom: '20px' }}>
                                        <strong>Rtn. Captain Abdul Hamid</strong> of the Rotary Club of Madras suggested the idea to <strong>Mr. K. Devaji Rao</strong> of Madurai. Devaji Rao convened an informal meeting on <strong>18th September 1938</strong> at the residence of <strong>Sir James Doak</strong>. Rtn. M.R.A. Baig, Joint Secretary of the Rotary Club of Bombay, gave a talk that inspired the attendees to resolve "that a provisional Rotary Club be constituted at Madura."
                                    </p>
                                    <div style={{ backgroundColor: 'var(--primary-light)', padding: '20px', borderRadius: '16px', borderLeft: '4px solid var(--primary)', marginBottom: '20px' }}>
                                        <h4 style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: '1rem', fontWeight: '700' }}>First Office Bearers (1938):</h4>
                                        <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', listStyle: 'none', paddingLeft: 0, color: 'var(--secondary)', fontSize: '0.9rem' }}>
                                            <li><strong>President:</strong> Sir James Doak</li>
                                            <li><strong>Secretary:</strong> Mr. T.S. Krishna</li>
                                            <li><strong>Vice-President:</strong> Mr. K. Devaji Rao</li>
                                            <li><strong>Treasurer:</strong> Mr. H. Isherwood</li>
                                            <li style={{ gridColumn: 'span 2' }}><strong>Directors:</strong> Mr. C.B. Koman, Rev. E.L. Nolting, Mr. S.K.M. Nainar</li>
                                        </ul>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div style={{ border: '1px solid var(--border-color)', padding: '24px', borderRadius: '16px', backgroundColor: 'var(--bg-light)' }}>
                                        <h4 style={{ color: 'var(--secondary)', marginBottom: '10px' }}>Admission and Charter Fee</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                                            On <strong>3rd November 1938</strong>, Rtn. H.W. Bryant, Rotary Commissioner of India, addressed the provisional club. It was resolved that the charter fee of <strong>$100</strong> be sent to Rotary International. The charter was issued on <strong>27th December 1938</strong>, officially birthing the Rotary Club of Madurai. The entrance fee was fixed at Rs. 30 and the monthly subscription at Rs. 2.50.
                                        </p>
                                    </div>
                                    <div style={{ border: '1px solid var(--border-color)', padding: '24px', borderRadius: '16px', backgroundColor: 'var(--bg-light)' }}>
                                        <h4 style={{ color: 'var(--secondary)', marginBottom: '10px' }}>19 Charter Members</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '10px' }}>
                                            The charter was presented on <strong>1st July 1939</strong> by Sir Fredrick E. James, Acting District Governor. The 19 charter members were:
                                        </p>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '0.85rem', color: 'var(--secondary)', maxHeight: '150px', overflowY: 'auto' }}>
                                            <div>• Sir J.M. Doak</div>
                                            <div>• Mr. T.S. Rajam</div>
                                            <div>• Rev. E.L. Nolting</div>
                                            <div>• Mr. C.V. Coulter</div>
                                            <div>• Mr. J.A. Andrew</div>
                                            <div>• Mr. K. Devaji Rao</div>
                                            <div>• Mr. T.S. Krishna</div>
                                            <div>• Mr. H. Isherwood</div>
                                            <div>• Mr. K.M.S.L. Sundararaman</div>
                                            <div>• Mr. A.H.S. Ramaswamy</div>
                                            <div>• Mr. A.H. Charsley</div>
                                            <div>• Mr. T.P. Menon</div>
                                            <div>• Mr. T.P. Kurien</div>
                                            <div>• Mr. C.B. Koman</div>
                                            <div>• Dr. F.A.B. Sheppard</div>
                                            <div>• Sir P.T. Rajan</div>
                                            <div>• Dr. H.S. Thomas</div>
                                            <div>• Mr. S.K.M. Nainar</div>
                                            <div>• Mr. S.N.K. Sundaram</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'march' && (
                            <div className="grid-2 animate-fade-in" style={{ alignItems: 'start', gap: '40px' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.6rem', color: 'var(--secondary)', marginBottom: '20px' }}>The March Forward & Steady Progress</h3>
                                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.98rem', marginBottom: '20px' }}>
                                        Initially, meetings were held twice a month (typically luncheon meetings on the 2nd and 4th Saturdays). Later, they changed to supper meetings on the 1st Tuesday at the Cosmopolitan Club, and luncheon meetings on the penultimate Saturday. The club also published a monthly bulletin from inception under the stewardship of <strong>Rtn. T.S. Krishna</strong>.
                                    </p>
                                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.98rem', marginBottom: '20px' }}>
                                        In <strong>1948</strong>, the club took a major progressive step by switching from fortnightly to weekly meetings. However, by habit, the club used to take a month-long holiday from mid-April to mid-May.
                                    </p>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div style={{ backgroundColor: 'var(--primary-light)', padding: '24px', borderRadius: '16px', borderLeft: '4px solid var(--primary)' }}>
                                        <h4 style={{ color: 'var(--secondary)', marginBottom: '8px', fontSize: '1.1rem' }}>Unbroken Routine Since 1955</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                                            In <strong>1955</strong>, the club began holding its meetings every single week without a break. This routine has continued perfectly for over 70 years, serving as the heartbeat of the fellowship.
                                        </p>
                                    </div>
                                    <div style={{ border: '1px solid var(--border-color)', padding: '24px', borderRadius: '16px', backgroundColor: 'var(--bg-light)' }}>
                                        <h4 style={{ color: 'var(--secondary)', marginBottom: '8px' }}>Seniority & Stature</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                                            As the club stabilized, it attained a membership strength and activity portfolio comparable to capital city clubs (Madras, Colombo, and Trivandrum), making it a leading senior club in the region.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'sponsored' && (
                            <div className="animate-fade-in">
                                <h3 style={{ fontSize: '1.6rem', color: 'var(--secondary)', marginBottom: '16px' }}>Mother Club of the Region</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.98rem' }}>
                                    The Rotary Club of Madurai has played a pivotal role in expanding Rotary's reach in Southern India, sponsoring <strong>20 clubs in RI District 3000</strong> and <strong>1 in a neighboring district</strong>:
                                </p>
                                <div style={{ 
                                    display: 'grid', 
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
                                    gap: '16px',
                                    maxHeight: '320px',
                                    overflowY: 'auto',
                                    paddingRight: '10px'
                                }}>
                                    {[
                                        { name: "Rotary Club of Karaikudi", date: "Chartered 13.09.1951" },
                                        { name: "Rotary Club of Dindigul", date: "Chartered 29.08.1956" },
                                        { name: "Rotary Club of Madurai West", date: "Chartered 24.08.1965" },
                                        { name: "Rotary Club of Chinnamanur", date: "Chartered 15.04.1973" },
                                        { name: "Rotary Club of Kodaikanal", date: "Chartered 05.11.1973" },
                                        { name: "Rotary Club of Nilakottai", date: "Chartered 1982-1983" },
                                        { name: "Rotary Club of Madurai Central", date: "Chartered 28.06.1983" },
                                        { name: "Rotary Club of Madurai Down Town", date: "Chartered 26.06.1985" },
                                        { name: "Rotary Club of Madurai Kings City", date: "Chartered 24.04.2009" },
                                        { name: "Rotary Club of Madurai Elite", date: "Chartered 12.11.2009" },
                                        { name: "Rotary Club of Madurai Mahal", date: "Chartered 24.09.2012" },
                                        { name: "Rotary Club of Madurai Next Gen", date: "Sponsored" },
                                        { name: "Rotary Club of Madurai East", date: "Sponsored" },
                                        { name: "Rotary Club of Madurai Mid-Town", date: "Sponsored" },
                                        { name: "Rotary Club of Madurai-Tirumangalam", date: "Sponsored" },
                                        { name: "Rotary Club of Madurai North West", date: "Sponsored" },
                                        { name: "Rotary Club of Tirunagar-Madurai", date: "Sponsored" },
                                        { name: "Rotary Club of Madurai South", date: "Sponsored" },
                                        { name: "Rotary Club of Madurai-Nagamalai", date: "Sponsored" }
                                    ].map((club, idx) => (
                                        <div key={idx} style={{ 
                                            padding: '12px 16px', 
                                            borderRadius: '8px', 
                                            border: '1.5px solid var(--border-color)', 
                                            backgroundColor: '#F8FAFC',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center'
                                        }}>
                                            <span style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--secondary)' }}>{club.name}</span>
                                            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{club.date}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'leaders' && (
                            <div className="grid-2 animate-fade-in" style={{ alignItems: 'start', gap: '40px' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.6rem', color: 'var(--secondary)', marginBottom: '20px' }}>National Leaders, Visitors & Speakers</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '15px' }}>
                                            <h4 style={{ color: 'var(--secondary)', fontSize: '1rem', marginBottom: '4px' }}>Distinguished Leaders:</h4>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                                Charter member <strong>Sir P.T. Rajan</strong> served as President (1940-1941), and prominent leader <strong>Mr. R.V. Swaminathan</strong> served as President (1960-1961).
                                            </p>
                                        </div>
                                        <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '15px' }}>
                                            <h4 style={{ color: 'var(--secondary)', fontSize: '1rem', marginBottom: '4px' }}>Eminent Speakers:</h4>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                                <strong>Sri Jayaprakash Narayan</strong>, Nobel Laureate <strong>Dr. C.V. Raman</strong>, and space pioneer <strong>Dr. Vikram Sarabhai</strong> addressed the club weekly in 1966-1967. The Vice-President of India <strong>Sri V.V. Giri</strong> addressed the club in 1967-1968.
                                            </p>
                                        </div>
                                        <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '15px' }}>
                                            <h4 style={{ color: 'var(--secondary)', fontSize: '1rem', marginBottom: '4px' }}>Global & Matching Grants:</h4>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                                More than <strong>27 Matching Grants</strong> and <strong>6 Global Grants</strong> have been completed by the club since 1999 to support communities.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '15px' }}>
                                        <h4 style={{ color: 'var(--secondary)', fontSize: '1rem', marginBottom: '4px' }}>Historical Visits:</h4>
                                        <ul style={{ listStyle: 'square', paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6' }}>
                                            <li>Chief Minister <strong>Mr. K. Kamaraj</strong> visited on 29.08.1954.</li>
                                            <li>Chief Minister <strong>Mr. O.P. Ramaswamy Reddiar</strong> visited on 01.08.1953.</li>
                                            <li>Union Health Minister <strong>Rajakumari Amrit Kaur</strong> visited on 02.02.1954.</li>
                                            <li>RI President <strong>Joseph A. Abbey</strong> and Mrs. Abbey visited on 22.08.1961.</li>
                                        </ul>
                                    </div>
                                    <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '15px' }}>
                                        <h4 style={{ color: 'var(--secondary)', fontSize: '1rem', marginBottom: '4px' }}>Pioneering Youth & Infrastructure:</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '8px' }}>
                                            In 1968-1969, the club sponsored the <strong>first Rotaract Club in India</strong> at Madurai Medical College. Sponsoring Interact Clubs started in 1965-1966 at Sourashtra and Sethupathi High Schools.
                                        </p>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                            Donated the <strong>Maternity and Child Welfare Centre at Irumbady</strong> (opened by CM Bakthavatsalam on 16.12.1962) and organized the <strong>Rotary Laharry School</strong> (opened on 23.06.1963).
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Historical Quote Overlay Banner */}
                    <div className="reveal-up" style={{ marginTop: '50px' }}>
                        <div style={{
                            backgroundColor: '#0F172A',
                            color: 'white',
                            padding: '40px',
                            borderRadius: '24px',
                            boxShadow: 'var(--shadow-lg)',
                            position: 'relative',
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.06)',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '-20px',
                                right: '-20px',
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(0, 61, 165, 0.15)',
                                filter: 'blur(30px)'
                            }}></div>

                            <blockquote style={{ fontSize: '1.25rem', lineHeight: '1.6', fontWeight: '500', marginBottom: '20px', fontStyle: 'italic', color: 'rgba(255,255,255,0.95)', maxWidth: '800px', margin: '0 auto 20px auto' }}>
                                "The Rotary Club of Madurai has kept up this stature not only in its membership strength but also by notable activities that are expected of a senior club, marching forward on a path of continuous progress."
                            </blockquote>
                            <cite style={{ display: 'block', fontWeight: '700', fontSize: '1.02rem', color: 'white', fontStyle: 'normal' }}>
                                — Celebrating over 89 years of service
                            </cite>
                            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Madurai, RI District 3000, India</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats section */}
            <section style={{ backgroundColor: '#0F172A', color: 'white', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}>
                        <div className="reveal-up" style={{ transitionDelay: '0s' }}>
                            <h3 style={{ fontSize: '3.6rem', color: '#FFB800', fontWeight: '800', marginBottom: '6px' }}>
                                <Counter target={1250} suffix="+" />
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>Projects Completed</p>
                        </div>
                        <div className="reveal-up" style={{ transitionDelay: '0.1s' }}>
                            <h3 style={{ fontSize: '3.6rem', color: '#FFB800', fontWeight: '800', marginBottom: '6px' }}>
                                <Counter target={50000} suffix="+" />
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>Trees Planted</p>
                        </div>
                        <div className="reveal-up" style={{ transitionDelay: '0.2s' }}>
                            <h3 style={{ fontSize: '3.6rem', color: '#FFB800', fontWeight: '800', marginBottom: '6px' }}>
                                <Counter target={85} suffix="+" />
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>Active Members</p>
                        </div>
                        <div className="reveal-up" style={{ transitionDelay: '0.3s' }}>
                            <h3 style={{ fontSize: '3.6rem', color: '#FFB800', fontWeight: '800', marginBottom: '6px' }}>
                                <Counter target={89} suffix="+" />
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>Years of Legacy</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Club Leadership Section */}
            <section className="section section-bg-white" style={{ padding: '80px 0' }}>
                <div className="container">
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <span className="badge">Club Governance</span>
                        <h2>Meet Our <span className="shiny-text">Board Members</span></h2>
                        <p style={{ maxWidth: '600px', margin: '15px auto 0 auto', color: 'var(--text-muted)' }}>
                            The leadership team steering our fellowship and community development initiatives for the current Rotary year.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px', justifyContent: 'center' }}>
                        {[
                            { name: "Rtn. Dr. A. Sundararajan", role: "Club President", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200" },
                            { name: "Rtn. M. Saravanan", role: "Club Secretary", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200" },
                            { name: "Rtn. K. Senthil Kumar", role: "Club Treasurer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200" },
                            { name: "Rtn. P. Rajasekar", role: "Director, Community Service", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200" }
                        ].map((leader, idx) => (
                            <div key={idx} className="tilt-card reveal-up" style={{
                                transitionDelay: `${idx * 0.1}s`,
                                backgroundColor: 'white',
                                border: '1.5px solid var(--border-color)',
                                borderRadius: '16px',
                                padding: '24px',
                                textAlign: 'center',
                            }}>
                                <img src={leader.image} alt={leader.name} style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', marginBottom: '16px', border: '3px solid var(--primary-light)' }} />
                                <h4 style={{ fontSize: '1.05rem', marginBottom: '6px', color: 'var(--secondary)' }}>{leader.name}</h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600' }}>{leader.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Slider 
            <section id="testimonials" className="section section-bg-light" style={{ padding: '80px 0' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <span className="badge">Community Impact</span>
                        <h2>Voices of our beneficiaries & partners</h2>
                    </div>

                    <div className="testimonials-slider reveal-scale">
                        <div className="testimonials-track" style={{ transform: `translateX(-${activeTestimonial * 100}%)`, display: 'flex', transition: 'transform 0.5s ease' }}>
                            {testimonials.map((test, index) => (
                                <div key={index} className="testimonial-card" style={{ minWidth: '100%', padding: '40px', backgroundColor: 'white', borderRadius: '20px', boxShadow: 'var(--shadow-md)', textAlign: 'center' }}>
                                    <img className="testimonial-avatar" src={test.avatar} alt={test.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 20px auto' }} />
                                    <blockquote style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '20px', color: 'var(--secondary)' }}>
                                        "{test.quote}"
                                    </blockquote>
                                    <cite style={{ display: 'block', fontWeight: '700', fontSize: '1.1rem', color: 'var(--secondary)', fontStyle: 'normal' }}>{test.name}</cite>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{test.role}</span>
                                </div>
                            ))}
                        </div>

                        <div className="slider-controls" style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '30px' }}>
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setActiveTestimonial(index)}
                                    className={`slider-dot ${activeTestimonial === index ? 'active' : ''}`}
                                    style={{
                                        width: activeTestimonial === index ? '24px' : '10px',
                                        height: '10px',
                                        backgroundColor: activeTestimonial === index ? 'var(--primary)' : '#E2E8F0',
                                        borderRadius: '50%',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'var(--transition)'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            */}
        </div>
    );
}
