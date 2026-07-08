import React, { useState } from 'react';

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState('all');

    const filters = [
        { id: 'all', label: 'All Projects' },
        { id: 'forests', label: 'Miyawaki Forests' },
        { id: 'healthcare', label: 'Healthcare Camps' },
        { id: 'education', label: 'Education Support' },
        { id: 'community', label: 'Community Development' }
    ];

    const projectList = [
        {
            title: "Kappalur SIDCO Miyawaki Forest",
            category: "forests",
            categoryLabel: "Miyawaki Forests",
            desc: "Planted 50,000 native saplings in partnership with local corporate groups, creating a thriving green lung space in the industrial belt.",
            image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600"
        },
        {
            title: "Government Rajaji Hospital Borewell",
            category: "healthcare",
            categoryLabel: "Healthcare Camps",
            desc: "Funded and installed deep-bore water wells inside the Government Rajaji Hospital premises, ensuring reliable water supply for thousands of patients.",
            image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=600"
        },
        {
            title: "Usilampatti Dialysis Equipment Support",
            category: "healthcare",
            categoryLabel: "Healthcare Camps",
            desc: "Collaborated with SBI Mutual Fund to donate state-of-the-art dialysis machines to the Usilampatti Government Hospital, extending affordable kidney care.",
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600"
        },
        {
            title: "IAB Braille Printing Press Project",
            category: "education",
            categoryLabel: "Education Support",
            desc: "Donated heavy-duty Braille printing machinery to the Indian Association for the Blind (IAB), enabling rapid printing of textbooks for visually impaired students.",
            image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600"
        },
        {
            title: "Kadamba Ecological Seedling Drive",
            category: "forests",
            categoryLabel: "Miyawaki Forests",
            desc: "Distributed thousands of Kadamba saplings (the historical tree of Madurai) to temples, parks, and colleges to promote regional ecological heritage.",
            image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600"
        },
        {
            title: "Milch Cow Livelihood Support",
            category: "community",
            categoryLabel: "Community Development",
            desc: "Sourced and gifted dairy milch cows to underprivileged rural women around Madurai, establishing a self-sustaining daily livelihood source.",
            image: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=600"
        }
    ];

    const filteredProjects = activeFilter === 'all'
        ? projectList
        : projectList.filter(proj => proj.category === activeFilter);

    return (
        <div className="animate-fade-in">
            {/* Page Header */}
            <section style={{
                background: "linear-gradient(rgba(15, 23, 42, 0.82), rgba(15, 23, 42, 0.82)), url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1920') center/cover no-repeat",
                padding: '140px 0 70px 0',
                textAlign: 'center',
                color: 'white'
            }}>
                <div className="container">
                    <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '8px' }}>Our Projects</h1>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>Home / Projects</p>
                </div>
            </section>

            {/* Filter buttons */}
            <section className="section section-bg-white">
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '40px' }}>
                        {filters.map(filter => (
                            <button
                                key={filter.id}
                                type="button"
                                onClick={() => setActiveFilter(filter.id)}
                                style={{
                                    border: activeFilter === filter.id ? '2.5px solid var(--primary)' : '1.5px solid var(--border-color)',
                                    backgroundColor: activeFilter === filter.id ? 'var(--primary)' : 'white',
                                    color: activeFilter === filter.id ? 'white' : 'var(--secondary)',
                                    padding: '10px 24px',
                                    borderRadius: '50px',
                                    fontWeight: '700',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    transition: 'var(--transition)'
                                }}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
                        {filteredProjects.map((proj, idx) => (
                            <div
                                key={idx}
                                className="project-card tilt-card"
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    boxShadow: 'var(--shadow-md)',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                                    e.currentTarget.querySelector('img').style.transform = 'scale(1.08)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                    e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                                }}
                            >
                                <div style={{ position: 'relative', overflow: 'hidden', height: '240px' }}>
                                    <img
                                        src={proj.image}
                                        alt={proj.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                    />
                                    <span style={{
                                        position: 'absolute',
                                        top: '16px',
                                        left: '16px',
                                        backgroundColor: 'var(--primary)',
                                        color: 'white',
                                        padding: '6px 14px',
                                        borderRadius: '6px',
                                        fontSize: '0.75rem',
                                        fontWeight: '700',
                                        textTransform: 'uppercase'
                                    }}>
                                        {proj.categoryLabel}
                                    </span>
                                </div>

                                <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', lineHeight: '1.4' }}>{proj.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px', flexGrow: 1 }}>{proj.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
