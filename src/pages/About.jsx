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
    const [activeTab, setActiveTab] = useState('origin');

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
            <section className="section section-bg-white" style={{ padding: '80px 0' }}>
                <div className="container grid-2">
                    <div className="fade-in-up active">
                        <span className="badge">Our Legacy</span>
                        <h2>Pioneering Rotary service in the Temple City since 1938.</h2>
                        <p style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>Established on December 27, 1938, the Rotary Club of Madurai stands as the first and oldest Rotary club in the city and the second oldest in Tamil Nadu. Our early foundation was laid by British educator and industrialist Sir J.M. Doak as our charter President, with T.S. Krishna of the TVS Group serving as our charter Secretary, alongside leaders like P.T. Rajan.</p>
                        <p style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>Over the decades, our platform has had the privilege of hosting and working with distinguished figures including Nobel laureate Dr. C.V. Raman, space pioneer Dr. Vikram Sarabhai, former Indian President V.V. Giri, and legendary Chief Minister K. Kamaraj.</p>
                        <p style={{ marginBottom: '32px', color: 'var(--text-muted)' }}>We are proud of our history of landmark contributions, such as installing essential borewells at the Government Rajaji Hospital to solve water shortage crises, and donating Braille printing machinery to the Indian Association for the Blind (IAB) to transform literacy rates for visually impaired students.</p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div style={{ backgroundColor: '#F8FAFC', padding: '24px', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
                                <h4 style={{ marginBottom: '8px', fontSize: '1.1rem' }}>Our Mission</h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>To provide service to others, promote integrity, and advance world understanding, goodwill, and peace through our fellowship of business and professional leaders.</p>
                            </div>
                            <div style={{ backgroundColor: '#F8FAFC', padding: '24px', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
                                <h4 style={{ marginBottom: '8px', fontSize: '1.1rem' }}>Our Vision</h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>To be the leading catalyst for sustainable development in Madurai, creating self-sufficient community structures in education, healthcare, and afforestation.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mouse-parallax reveal-clip" data-parallax-speed="-12" style={{ transitionDelay: '0.2s' }}>
                        <img
                            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=600"
                            alt="Rotary fellowship meeting and projects"
                            style={{ borderRadius: '20px', boxShadow: 'var(--shadow-lg)', width: '100%', display: 'block' }}
                        />
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
                    <div style={{ textAlign: 'center', marginBottom: '50px' }} className="fade-in-up active">
                        <span className="badge">Rotary International Heritage</span>
                        <h2>Our Global History & Legacy</h2>
                        <p style={{ maxWidth: '700px', margin: '15px auto 0 auto', color: 'var(--text-muted)' }}>
                            Explore the rich legacy of Rotary International—from a meeting of four friends in a Chicago office in 1905 to a global network of 1.2 million neighbors, friends, and leaders.
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
                            { id: 'origin', label: 'Origin & Early Growth (1905-1922)' },
                            { id: 'milestones', label: 'Historical Milestones & UNESCO' },
                            { id: 'foundation', label: 'The Rotary Foundation' },
                            { id: 'outreach', label: 'Global Impact & Programs' }
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
                        gap: '40px'
                    }}>
                        {activeTab === 'origin' && (
                            <div className="grid-2 animate-fade-in" style={{ alignItems: 'start', gap: '40px' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.6rem', color: 'var(--secondary)', marginBottom: '20px' }}>The First Meeting & Early Development</h3>
                                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.98rem', marginBottom: '20px' }}>
                                        On <strong>February 23, 1905</strong>, Chicago attorney <strong>Paul P. Harris</strong> called three business associates to a meeting in Gustavus Loehr's office—Room 711 of the Unity Building at 127 North Dearborn Street, Chicago.
                                    </p>
                                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.98rem', marginBottom: '20px' }}>
                                        Harris sought to recreate the friendly, supportive spirit he knew in the small towns of his youth within a busy metropolis. As the group continued to meet, they rotated venues among members' offices—hence the name <strong>"Rotary."</strong>
                                    </p>
                                    <div style={{ backgroundColor: 'var(--primary-light)', padding: '20px', borderRadius: '16px', borderLeft: '4px solid var(--primary)' }}>
                                        <h4 style={{ color: 'var(--primary)', marginBottom: '8px', fontSize: '1rem' }}>The First Four Rotarians:</h4>
                                        <ul style={{ listStyle: 'square', paddingLeft: '20px', color: 'var(--secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                            <li><strong>Paul P. Harris</strong> — Chicago lawyer and founder</li>
                                            <li><strong>Gustavus Loehr</strong> — Mining engineer and meeting host</li>
                                            <li><strong>Silvester Schiele</strong> — Coal dealer</li>
                                            <li><strong>Hiram Shorey</strong> — Merchant tailor</li>
                                        </ul>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div style={{ border: '1px solid var(--border-color)', padding: '24px', borderRadius: '16px', backgroundColor: 'var(--bg-light)' }}>
                                        <h4 style={{ color: 'var(--secondary)', marginBottom: '10px' }}>The Emblem Origin</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                                            Soon after the club name was agreed upon, one of the new members suggested a <strong>wagon wheel design</strong> as the club emblem. This was the direct precursor to the familiar cogwheel emblem now worn by over 1.2 million Rotarians around the world.
                                        </p>
                                    </div>
                                    <div style={{ border: '1px solid var(--border-color)', padding: '24px', borderRadius: '16px', backgroundColor: 'var(--bg-light)' }}>
                                        <h4 style={{ color: 'var(--secondary)', marginBottom: '10px' }}>Rapid Expansion</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                                            By the end of 1905, the Chicago club had grown to 30 members. The second club was formed in San Francisco in 1908, followed by Oakland, Seattle, Los Angeles, and New York. In 1910, the first club outside the US was chartered in Winnipeg, Canada. By 1921, the organization was represented on every continent, and the name <strong>Rotary International</strong> was officially adopted in 1922.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'milestones' && (
                            <div className="grid-2 animate-fade-in" style={{ alignItems: 'start', gap: '40px' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.6rem', color: 'var(--secondary)', marginBottom: '20px' }}>Historical Milestones & Global Legacy</h3>
                                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.98rem', marginBottom: '20px' }}>
                                        By July 1925, Rotary had grown to more than 2,000 clubs with an estimated 108,000 members. Over its first century, it attracted renowned leaders, writers, and scientists to its ranks, including author <strong>Thomas Mann</strong>, diplomat <strong>Carlos P. Romulo</strong>, humanitarian <strong>Albert Schweitzer</strong>, and composer <strong>Jean Sibelius</strong>.
                                    </p>
                                    <div style={{ border: '1px solid var(--border-color)', padding: '24px', borderRadius: '16px', backgroundColor: 'var(--bg-light)', marginBottom: '20px' }}>
                                        <h4 style={{ color: 'var(--secondary)', marginBottom: '10px' }}>Inspiring the Founding of UNESCO & UN:</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '10px' }}>
                                            During World War II, many clubs were forced to disband. However, in 1942, Rotarians called for a conference in London to promote international educational and cultural exchanges. This historical event <strong>inspired the founding of UNESCO</strong>.
                                        </p>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                                            In 1945, <strong>49 Rotary club members served as delegates, advisors, and consultants</strong> in 29 delegations during the historic United Nations Charter Conference in San Francisco.
                                        </p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div style={{ backgroundColor: '#0F172A', color: 'white', padding: '30px', borderRadius: '16px', borderLeft: '4px solid var(--primary)' }}>
                                        <span style={{ fontSize: '2.5rem', color: 'var(--primary)', lineHeight: '1', display: 'block', marginBottom: '10px' }}>“</span>
                                        <p style={{ fontSize: '1.05rem', fontStyle: 'italic', lineHeight: '1.6', marginBottom: '15px' }}>
                                            Few there are who do not recognize the good work which is done by Rotary clubs throughout the free world.
                                        </p>
                                        <cite style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>
                                            — Winston Churchill, former Prime Minister of Great Britain
                                        </cite>
                                    </div>
                                    <div style={{ border: '1px solid var(--border-color)', padding: '24px', borderRadius: '16px', backgroundColor: 'var(--bg-light)' }}>
                                        <h4 style={{ color: 'var(--secondary)', marginBottom: '8px' }}>Admitting Women & Eastern Expansion</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '10px' }}>
                                            In <strong>1989</strong>, the organization voted to admit women into clubs worldwide. Today, women are an integral and driving part of Rotary's global membership.
                                        </p>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                                            Following the collapse of the Berlin Wall, clubs were re-established across Central and Eastern Europe, with the first Russian Rotary club chartered in Moscow in 1990.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'foundation' && (
                            <div className="grid-2 animate-fade-in" style={{ alignItems: 'start', gap: '40px' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.6rem', color: 'var(--secondary)', marginBottom: '20px' }}>History of The Rotary Foundation</h3>
                                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.98rem', marginBottom: '20px' }}>
                                        In <strong>1917</strong>, RI President <strong>Arch C. Klumph</strong> proposed the creation of an endowment fund "for the purpose of doing good in the world." In 1928, when the fund grew to over $5,000, it was renamed <strong>The Rotary Foundation</strong> and became a distinct entity.
                                    </p>
                                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.98rem', marginBottom: '20px' }}>
                                        The foundation's very first contribution was a modest sum of <strong>$26.50</strong> in 1917. In 1928, it made its first grant of <strong>$500</strong> to the International Society for Crippled Children (founded by Rotarian Edgar F. "Daddy" Allen, which later grew into Easter Seals).
                                    </p>
                                    <div style={{ backgroundColor: 'var(--primary-light)', padding: '20px', borderRadius: '16px', borderLeft: '4px solid var(--primary)' }}>
                                        <h4 style={{ color: 'var(--primary)', marginBottom: '6px', fontSize: '0.95rem' }}>Paul Harris Memorial Fund (1947)</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                                            Following the death of founder Paul Harris in 1947, contributions poured in from around the globe, prompting the creation of the memorial fund which launched the foundation's first program—the Ambassadorial Scholarships.
                                        </p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div style={{ border: '1px solid var(--border-color)', padding: '24px', borderRadius: '16px', backgroundColor: 'var(--bg-light)' }}>
                                        <h4 style={{ color: 'var(--secondary)', marginBottom: '10px' }}>Milestones in Foundation Giving</h4>
                                        <ul style={{ listStyle: 'square', paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7' }}>
                                            <li><strong>1965–66</strong>: Launched Group Study Exchange and Awards for Technical Training.</li>
                                            <li><strong>1978</strong>: Launched Health, Hunger and Humanity (3-H) Grants program.</li>
                                            <li><strong>1980</strong>: Created the Rotary Volunteers program.</li>
                                            <li><strong>1984–85</strong>: Formally launched the PolioPlus program.</li>
                                        </ul>
                                    </div>
                                    <div style={{ border: '1px solid var(--border-color)', padding: '24px', borderRadius: '16px', backgroundColor: 'var(--bg-light)' }}>
                                        <h4 style={{ color: 'var(--secondary)', marginBottom: '8px' }}>Paul Harris Fellows</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                                            Individuals who contribute $1,000 or more to the Foundation (or have it contributed in their name) are recognized as <strong>Paul Harris Fellows</strong>. Over 1 million individuals have received this honor, ensuring a secure future for international goodwill.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'outreach' && (
                            <div className="grid-2 animate-fade-in" style={{ alignItems: 'start', gap: '40px' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.6rem', color: 'var(--secondary)', marginBottom: '20px' }}>Global Impact & Humanitarian Programs</h3>
                                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.98rem', marginBottom: '20px' }}>
                                        Rotary clubs address critical issues worldwide by funding healthcare, sanitation, clean water, education, job training, and child development. Key global programs include:
                                    </p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '15px' }}>
                                            <h4 style={{ color: 'var(--secondary)', fontSize: '1rem', marginBottom: '4px' }}>Polio Eradication (PolioPlus)</h4>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                                Since 1985, Rotary has contributed over <strong>$1 billion</strong> and countless hours to immunize the world's children. Rotary raised $200 million towards a $355 million challenge grant from the Gates Foundation, leveraging over $6 billion from donor governments to nearly wipe out polio.
                                            </p>
                                        </div>
                                        <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '15px' }}>
                                            <h4 style={{ color: 'var(--secondary)', fontSize: '1rem', marginBottom: '4px' }}>Rotary Peace Fellowships</h4>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                                Sponsors up to 110 Peace Fellows annually at 8 global universities. Over 430 fellows from 75 countries have trained in international relations, peace, and conflict resolution since 2002.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '15px' }}>
                                        <h4 style={{ color: 'var(--secondary)', fontSize: '1rem', marginBottom: '4px' }}>International Education & Scholarships</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                            The world's largest privately funded source of international scholarships. Rotary sponsors 1,000 university scholars study abroad and 8,000 high-school student exchanges annually.
                                        </p>
                                    </div>
                                    <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '15px' }}>
                                        <h4 style={{ color: 'var(--secondary)', fontSize: '1rem', marginBottom: '4px' }}>Literacy (Concentrated Language Encounter)</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                            Rotary pioneered a resource-strapped literacy teaching methodology. Its massive success in pilot schools in Thailand prompted the Thai government to adopt it nationwide.
                                        </p>
                                    </div>
                                    <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '15px' }}>
                                        <h4 style={{ color: 'var(--secondary)', fontSize: '1rem', marginBottom: '4px' }}>Water Management & Sanitation</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                            Rotary clubs help install wells and develop water treatment and distribution systems, ensuring fresh drinking water and sanitation systems for rural communities.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Historical Quote Overlay Banner */}
                    <div className="fade-in-up active" style={{ marginTop: '50px' }}>
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
                                "If we ever reach the point where we can feel that the greatest and noblest things that Rotary could possibly do have already been done, at that very moment our organization will begin to disintegrate."
                            </blockquote>
                            <cite style={{ display: 'block', fontWeight: '700', fontSize: '1.02rem', color: 'white', fontStyle: 'normal' }}>
                                — Address to 1944 Rotary Convention
                            </cite>
                            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Chicago, Illinois, USA</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats section */}
            <section style={{ backgroundColor: '#0F172A', color: 'white', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}>
                        <div>
                            <h3 style={{ fontSize: '3.6rem', color: 'var(--primary)', fontWeight: '800', marginBottom: '6px' }}>
                                <Counter target={1250} suffix="+" />
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>Projects Completed</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '3.6rem', color: 'var(--primary)', fontWeight: '800', marginBottom: '6px' }}>
                                <Counter target={50000} suffix="+" />
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>Trees Planted</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '3.6rem', color: 'var(--primary)', fontWeight: '800', marginBottom: '6px' }}>
                                <Counter target={85} suffix="+" />
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>Active Members</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '3.6rem', color: 'var(--primary)', fontWeight: '800', marginBottom: '6px' }}>
                                <Counter target={88} suffix="+" />
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>Years of Legacy</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Club Leadership Section */}
            <section className="section section-bg-white" style={{ padding: '80px 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '50px' }} className="fade-in-up active">
                        <span className="badge">Club Governance</span>
                        <h2>Meet Our Office Bearers</h2>
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
                            <div key={idx} style={{
                                backgroundColor: 'white',
                                border: '1.5px solid var(--border-color)',
                                borderRadius: '16px',
                                padding: '24px',
                                textAlign: 'center',
                                transition: 'var(--transition)'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-6px)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                    e.currentTarget.style.borderColor = 'var(--primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.borderColor = 'var(--border-color)';
                                }}
                            >
                                <img src={leader.image} alt={leader.name} style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', marginBottom: '16px', border: '3px solid var(--primary-light)' }} />
                                <h4 style={{ fontSize: '1.05rem', marginBottom: '6px', color: 'var(--secondary)' }}>{leader.name}</h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600' }}>{leader.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Slider */}
            <section id="testimonials" className="section section-bg-light" style={{ padding: '80px 0' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }} className="fade-in-up active">
                        <span className="badge">Community Impact</span>
                        <h2>Voices of our beneficiaries & partners.</h2>
                    </div>

                    <div className="testimonials-slider fade-in-up active">
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
        </div>
    );
}
