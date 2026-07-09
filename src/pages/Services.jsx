import React from 'react';
import { BookOpen, Activity, TreePine, Users, Briefcase, HeartHandshake, Globe, Award } from 'lucide-react';

export default function Services() {
    const servicesList = [
        {
            icon: <BookOpen size={32} />,
            title: "Basic Education & Literacy",
            desc: "Sponsoring student fees, donating smart televisions and computers to government school classrooms, and supplying notebooks and study kits to underprivileged children."
        },
        {
            icon: <Activity size={32} />,
            title: "Disease Prevention & Healthcare",
            desc: "Organizing free medical, pediatric, and eye screening camps in rural areas, providing free medication, and equipping community health sub-centers with modern diagnostic tools."
        },
        {
            icon: <TreePine size={32} />,
            title: "Environmental Afforestation",
            desc: "Executing massive urban afforestation projects using the Miyawaki method, planting native species at SIDCO Kappalur, railway stations, and local parks to restore ecosystems."
        },
        {
            icon: <Users size={32} />,
            title: "Community & Youth Development",
            desc: "Empowering rural women through vocational tool distributions (such as milch cows), sponsoring Rotaract/Interact clubs, and conducting youth leadership programs."
        }
    ];

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
                    <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '8px' }}>Areas of Focus</h1>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>Home / Areas of Focus</p>
                </div>
            </section>

            {/* Services detail list */}
            <section className="section section-bg-white">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <span className="badge">What We Do</span>
                        <h2>Scalable solutions for real <span className="shiny-text">community growth</span></h2>
                        <p style={{ maxWidth: '600px', margin: '15px auto 0 auto', color: 'var(--text-muted)' }}>
                            We deliver targeted support programs designed to build self-sufficiency, restore personal dignity, and guarantee safe environments.
                        </p>
                    </div>

                    <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                        {servicesList.map((srv, idx) => (
                            <div
                                key={idx}
                                className="service-detail-card tilt-card"
                                style={{
                                    backgroundColor: 'white',
                                    border: '1.5px solid var(--border-color)',
                                    padding: '40px',
                                    borderRadius: '20px',
                                }}
                            >
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '12px',
                                    backgroundColor: 'var(--primary-light)',
                                    color: 'var(--primary)',
                                    marginBottom: '24px'
                                }}>
                                    {srv.icon}
                                </div>
                                <h3 style={{ fontSize: '1.3rem', marginBottom: '16px' }}>{srv.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{srv.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Avenues of Service Section */}
            <section className="section section-bg-light" style={{ padding: '80px 0', borderTop: '1px solid var(--border-color)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <span className="badge">Rotary Philosophy</span>
                        <h2>The Five Avenues of Service</h2>
                        <p style={{ maxWidth: '600px', margin: '15px auto 0 auto', color: 'var(--text-muted)' }}>
                            The theoretical framework that guides all our service initiatives, club fellowship, and youth vocational mentoring.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                        {[
                            { 
                                title: "Club Service", 
                                desc: "Focuses on strengthening fellowship, member engagement, and efficient internal club operations.",
                                icon: <Users size={24} style={{ color: 'var(--primary)', transition: 'color 0.3s ease' }} />,
                                accent: 'var(--primary)',
                                accentLight: 'rgba(0, 61, 165, 0.08)'
                            },
                            { 
                                title: "Vocational Service", 
                                desc: "Encourages Rotarians to serve others through their professions and promote high ethical standards.",
                                icon: <Briefcase size={24} style={{ color: '#F97316', transition: 'color 0.3s ease' }} />,
                                accent: '#F97316',
                                accentLight: 'rgba(249, 115, 22, 0.08)'
                            },
                            { 
                                title: "Community Service", 
                                desc: "Covers local projects that improve the quality of life in the Madurai region (health, water, trees).",
                                icon: <HeartHandshake size={24} style={{ color: '#10B981', transition: 'color 0.3s ease' }} />,
                                accent: '#10B981',
                                accentLight: 'rgba(16, 185, 129, 0.08)'
                            },
                            { 
                                title: "International Service", 
                                desc: "Sponsors global projects and collaborations to advance world peace, understanding, and goodwill.",
                                icon: <Globe size={24} style={{ color: '#3B82F6', transition: 'color 0.3s ease' }} />,
                                accent: '#3B82F6',
                                accentLight: 'rgba(59, 130, 246, 0.08)'
                            },
                            { 
                                title: "Youth Service", 
                                desc: "Mentors next-generation leaders through Rotaract, Interact, and RYLA leadership camps.",
                                icon: <Award size={24} style={{ color: '#8B5CF6', transition: 'color 0.3s ease' }} />,
                                accent: '#8B5CF6',
                                accentLight: 'rgba(139, 92, 246, 0.08)'
                            }
                        ].map((ave, idx) => (
                            <div 
                                key={idx} 
                                className="avenue-card" 
                                style={{
                                    '--accent-color': ave.accent,
                                    '--accent-light': ave.accentLight
                                }}
                            >
                                <div className="avenue-icon-wrapper">
                                    {ave.icon}
                                </div>
                                <h4 className="avenue-title">{ave.title}</h4>
                                <p className="avenue-desc">{ave.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
