import React, { useState, useMemo, useEffect } from 'react';
import { 
    X, 
    ChevronLeft, 
    ChevronRight, 
    Calendar, 
    Tag, 
    ArrowLeft, 
    ArrowRight, 
    Eye, 
    ZoomIn, 
    ZoomOut, 
    RotateCcw,
    FolderGit2,
    Search,
    Sparkles
} from 'lucide-react';

const cleanBaseName = (fileName) => {
    return fileName
        .replace(/\.[a-zA-Z0-9.]+$/, '')
        .replace(/[^a-zA-Z0-9_-]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
};

const getCloudinaryUrl = (localPath) => {
    if (!localPath) return '';
    let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'doeodacsg';
    cloudName = cloudName.replace(/['"]/g, '');
    
    const transform = 'w_1000,c_limit,q_auto,f_auto';
    
    // Toilet Inauguration
    if (localPath.includes('ROTARY CLUB toilet inaguration')) {
        const fileName = localPath.split('/').pop();
        const base = cleanBaseName(fileName);
        return `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/websites/rotary-website/gallery/toilet_inauguration/${base}.jpg`;
    }
    
    // Standard path for other project items
    let cleanPath = localPath.startsWith('/') ? localPath.substring(1) : localPath;
    cleanPath = cleanPath.replace(/ /g, '_');
    const extMatch = cleanPath.match(/\.[a-zA-Z0-9]+$/);
    const ext = extMatch ? extMatch[0] : '';
    const cleanPathWithoutExt = cleanPath.replace(/\.[a-zA-Z0-9]+$/, '');
    
    const publicId = `websites/rotary-website/${cleanPathWithoutExt}`;
    const encodedPublicId = publicId.split('/').map(part => encodeURIComponent(part)).join('/');
    
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/${encodedPublicId}${ext}`;
};

// Real Rotary Club Service Projects & Community Initiatives
const projectList = [
    {
        id: "community-sanitation-toilet-inauguration",
        title: "Community Sanitation & Toilet Block Inauguration",
        category: "Community Service",
        date: "August 2026",
        year: "RY 2025 - 2026",
        coverPhoto: "/images/ROTARY CLUB toilet inaguration/Cam 1 Photos _644_.jpeg",
        desc: "Construction and official handover of modern sanitation facilities and dedicated toilet blocks, promoting hygiene, health, and dignified access for the school and local community.",
        photos: [
            "/images/ROTARY CLUB toilet inaguration/Cam 1 Photos _644_.jpeg",
            "/images/ROTARY CLUB toilet inaguration/Cam 1 Photos _651_.jpeg",
            "/images/ROTARY CLUB toilet inaguration/Cam 1 Photos _655_.jpeg"
        ]
    },
    {
        id: "blood-donation-camp",
        title: "Blood Donation Camp",
        category: "Community Service",
        date: "July 2026",
        year: "RY 2025 - 2026",
        coverPhoto: "/images/gallery/BLOOD DONATION CAMP.jpeg",
        desc: "Organized a mega voluntary blood donation drive in partnership with local healthcare authorities to support critical community needs and save lives.",
        photos: [
            "/images/gallery/BLOOD DONATION CAMP.jpeg"
        ]
    },
    {
        id: "tree-plantation-klnce",
        title: "Tree Plantation Drive at KLNCE",
        category: "Environment",
        date: "June 2026",
        year: "RY 2025 - 2026",
        coverPhoto: "/images/gallery/Tree plantation at KLNCE.jpeg",
        desc: "Green initiative aimed at afforestation, ecological balance, and environmental sustainability on campus grounds in partnership with student volunteers.",
        photos: [
            "/images/gallery/Tree plantation at KLNCE.jpeg"
        ]
    },
    {
        id: "stag-meeting-kodaikanal",
        title: "Stag Meeting at Kodaikanal",
        category: "Fellowship & Family",
        date: "May 2026",
        year: "RY 2025 - 2026",
        coverPhoto: "/images/gallery/Stag meeting at Kodaikanal.jpeg",
        desc: "Annual fellowship weekend retreat fostering stronger camaraderie, team bonding, and strategic project planning for upcoming community service tracks.",
        photos: [
            "/images/gallery/Stag meeting at Kodaikanal.jpeg"
        ]
    },
    {
        id: "vetrikku-vazi-career-guidance",
        title: "Vetrikku Vazi - Plus 2 Students Career Guidance",
        category: "Youth Service",
        date: "April 2026",
        year: "RY 2025 - 2026",
        coverPhoto: "/images/gallery/VETRIKKU VAZI - PLUS 2 STUDENTS TRAINING.jpeg",
        desc: "Empowering higher secondary students with comprehensive career guidance, competitive exam readiness, and future skills development sessions.",
        photos: [
            "/images/gallery/VETRIKKU VAZI - PLUS 2 STUDENTS TRAINING.jpeg"
        ]
    },
    {
        id: "narcotics-awareness-program",
        title: "Narcotics Awareness Program",
        category: "Youth Service",
        date: "March 2026",
        year: "RY 2025 - 2026",
        coverPhoto: "/images/gallery/NARCOTIS AWA.jpeg",
        desc: "Educating school and college students on substance abuse hazards and promoting healthy, drug-free lifestyle habits across local institutions.",
        photos: [
            "/images/gallery/NARCOTIS AWA.jpeg"
        ]
    },
    {
        id: "value-your-spouse",
        title: "Value Your Spouse Program",
        category: "Fellowship & Family",
        date: "February 2026",
        year: "RY 2025 - 2026",
        coverPhoto: "/images/gallery/VALUE YOUR SPOUSE.jpeg",
        desc: "A special family fellowship evening celebrating and honoring Rotary spouses for their constant dedication, encouragement, and community support.",
        photos: [
            "/images/gallery/VALUE YOUR SPOUSE.jpeg"
        ]
    }
];

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeProjectId, setActiveProjectId] = useState(null);

    // Lightbox State with Zoom & Pan controls
    const [lightbox, setLightbox] = useState({
        isOpen: false,
        project: null,
        photoIndex: 0
    });
    const [zoomLevel, setZoomLevel] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const filters = [
        { id: 'all', label: 'All Projects' },
        { id: 'Community Service', label: 'Community Service' },
        { id: 'Youth Service', label: 'Youth Service' },
        { id: 'Environment', label: 'Environment' },
        { id: 'Fellowship & Family', label: 'Fellowship & Family' }
    ];

    const filteredProjects = useMemo(() => {
        return projectList.filter(proj => {
            const matchesCategory = activeFilter === 'all' || proj.category === activeFilter;
            const searchLower = searchQuery.toLowerCase().trim();
            const matchesSearch = searchLower === '' ||
                proj.title.toLowerCase().includes(searchLower) ||
                proj.desc.toLowerCase().includes(searchLower) ||
                proj.category.toLowerCase().includes(searchLower);
            return matchesCategory && matchesSearch;
        });
    }, [activeFilter, searchQuery]);

    const activeProject = useMemo(() => {
        return projectList.find(p => p.id === activeProjectId) || null;
    }, [activeProjectId]);

    const openProject = (id) => {
        setActiveProjectId(id);
        setTimeout(() => {
            const el = document.getElementById('project-detail-view');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                window.scrollTo({ top: 350, behavior: 'smooth' });
            }
        }, 50);
    };

    const backToProjects = () => {
        setActiveProjectId(null);
        setTimeout(() => {
            const el = document.getElementById('projects-grid-area');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                window.scrollTo({ top: 250, behavior: 'smooth' });
            }
        }, 50);
    };

    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(3, +(prev + 0.5).toFixed(1)));
    };

    const handleZoomOut = () => {
        setZoomLevel(prev => {
            const next = Math.max(1, +(prev - 0.5).toFixed(1));
            if (next === 1) setPan({ x: 0, y: 0 });
            return next;
        });
    };

    const handleResetZoom = () => {
        setZoomLevel(1);
        setPan({ x: 0, y: 0 });
    };

    const handleToggleZoom = () => {
        if (zoomLevel > 1) {
            handleResetZoom();
        } else {
            setZoomLevel(2);
        }
    };

    const openLightbox = (project, index) => {
        setZoomLevel(1);
        setPan({ x: 0, y: 0 });
        setLightbox({
            isOpen: true,
            project: project,
            photoIndex: index
        });
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setZoomLevel(1);
        setPan({ x: 0, y: 0 });
        setLightbox({
            isOpen: false,
            project: null,
            photoIndex: 0
        });
        document.body.style.overflow = '';
    };

    const navigateLightbox = (direction, e) => {
        if (e) e.stopPropagation();
        if (!lightbox.project) return;
        setZoomLevel(1);
        setPan({ x: 0, y: 0 });
        const total = lightbox.project.photos.length;
        let newIndex = lightbox.photoIndex + direction;
        if (newIndex < 0) newIndex = total - 1;
        if (newIndex >= total) newIndex = 0;
        setLightbox(prev => ({ ...prev, photoIndex: newIndex }));
    };

    const hasDraggedRef = React.useRef(false);
    const dragStartPosRef = React.useRef({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        hasDraggedRef.current = false;
        dragStartPosRef.current = { x: e.clientX, y: e.clientY };
        if (zoomLevel <= 1) return;
        e.preventDefault();
        setIsDragging(true);
        setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    };

    const handleMouseMove = (e) => {
        if (Math.abs(e.clientX - dragStartPosRef.current.x) > 4 || Math.abs(e.clientY - dragStartPosRef.current.y) > 4) {
            hasDraggedRef.current = true;
        }
        if (!isDragging || zoomLevel <= 1) return;
        setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleImageClick = (e) => {
        e.stopPropagation();
        if (hasDraggedRef.current) {
            hasDraggedRef.current = false;
            return;
        }
        if (zoomLevel > 1) {
            handleResetZoom();
        } else {
            setZoomLevel(2);
        }
    };

    // Keyboard shortcuts for Lightbox
    useEffect(() => {
        if (!lightbox.isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (zoomLevel > 1) {
                    handleResetZoom();
                } else {
                    closeLightbox();
                }
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            } else if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === '+' || e.key === '=') {
                handleZoomIn();
            } else if (e.key === '-' || e.key === '_') {
                handleZoomOut();
            } else if (e.key === '0') {
                handleResetZoom();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightbox.isOpen, lightbox.project, lightbox.photoIndex, zoomLevel]);

    const handleImageError = (e, localPath) => {
        e.target.src = localPath;
    };

    return (
        <div className="animate-fade-in" style={{ backgroundColor: 'var(--bg-light)', minHeight: '85vh', paddingBottom: '90px' }}>
            {/* Page Header */}
            <section style={{
                background: "linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1920') center/cover no-repeat",
                padding: '130px 0 65px 0',
                textAlign: 'center',
                color: 'white'
            }}>
                <div className="container">
                    <span style={{ 
                        fontSize: '0.85rem', 
                        fontWeight: '800', 
                        color: '#93C5FD', 
                        textTransform: 'uppercase', 
                        letterSpacing: '1.5px',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '14px'
                    }}>
                        <FolderGit2 size={14} color="#93C5FD" /> Community Impact & Action
                    </span>
                    <h1 style={{ color: 'white', fontSize: '3rem', fontWeight: '800', margin: '0 0 10px 0' }}>Our Service Projects</h1>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
                        Empowering Madurai through dedicated community sanitation facilities, voluntary health drives, youth development programs, and green campus initiatives.
                    </p>
                </div>
            </section>

            {/* Main Content Area */}
            <section id="projects-grid-area" className="container" style={{ marginTop: activeProject ? '35px' : '40px' }}>
                
                {/* 1. DRILL-DOWN: INSIDE A SPECIFIC PROJECT */}
                {activeProject ? (
                    <div id="project-detail-view" className="animate-fade-in">
                        {/* Top Navigation Row */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '14px',
                            marginBottom: '26px'
                        }}>
                            <button 
                                onClick={backToProjects}
                                style={{
                                    backgroundColor: 'white',
                                    border: '1.5px solid var(--border-color)',
                                    color: 'var(--secondary)',
                                    padding: '10px 22px',
                                    borderRadius: '30px',
                                    fontSize: '0.92rem',
                                    fontWeight: '700',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    cursor: 'pointer',
                                    boxShadow: 'var(--shadow-sm)',
                                    transition: 'all 0.25s ease'
                                }}
                                className="back-projects-btn"
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--primary)';
                                    e.currentTarget.style.color = 'white';
                                    e.currentTarget.style.borderColor = 'var(--primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'white';
                                    e.currentTarget.style.color = 'var(--secondary)';
                                    e.currentTarget.style.borderColor = 'var(--border-color)';
                                }}
                            >
                                <ArrowLeft size={18} />
                                <span>Back to All Projects</span>
                            </button>

                            {/* Breadcrumbs */}
                            <div style={{ fontSize: '0.88rem', color: '#64748B', fontWeight: '600' }}>
                                <span 
                                    onClick={backToProjects} 
                                    style={{ cursor: 'pointer', color: 'var(--primary)' }}
                                >
                                    All Projects
                                </span>
                                <span style={{ margin: '0 8px', color: '#94A3B8' }}>/</span>
                                <span style={{ color: 'var(--secondary)', fontWeight: '700' }}>{activeProject.title}</span>
                            </div>
                        </div>

                        {/* Project Header Summary Card */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '24px',
                            border: '1.5px solid var(--border-color)',
                            padding: '30px 32px',
                            marginBottom: '32px',
                            boxShadow: 'var(--shadow-sm)'
                        }}>
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                gap: '10px',
                                marginBottom: '14px'
                            }}>
                                <span style={{
                                    backgroundColor: 'rgba(0, 61, 165, 0.1)',
                                    color: 'var(--primary)',
                                    fontSize: '0.82rem',
                                    fontWeight: '800',
                                    padding: '5px 14px',
                                    borderRadius: '20px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}>
                                    <Tag size={13} /> {activeProject.category}
                                </span>
                                <span style={{
                                    color: '#64748B',
                                    fontSize: '0.88rem',
                                    fontWeight: '700',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}>
                                    <Calendar size={14} /> {activeProject.date}
                                </span>
                                <span style={{ color: '#CBD5E1' }}>•</span>
                                <span style={{
                                    color: 'var(--secondary)',
                                    fontSize: '0.85rem',
                                    fontWeight: '700'
                                }}>
                                    {activeProject.year}
                                </span>
                            </div>

                            <h1 style={{
                                fontSize: '2.2rem',
                                fontWeight: '800',
                                color: 'var(--secondary)',
                                margin: '0 0 12px 0',
                                lineHeight: '1.25'
                            }}>
                                {activeProject.title}
                            </h1>

                            {activeProject.desc && (
                                <p style={{
                                    color: '#475569',
                                    fontSize: '1.02rem',
                                    lineHeight: '1.65',
                                    margin: 0,
                                    maxWidth: '920px'
                                }}>
                                    {activeProject.desc}
                                </p>
                            )}
                        </div>

                        {/* Photos Section: Grid or Spotlight Card */}
                        {activeProject.photos.length > 1 ? (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                gap: '24px'
                            }}>
                                {activeProject.photos.map((photoPath, pIdx) => (
                                    <div 
                                        key={pIdx}
                                        onClick={() => openLightbox(activeProject, pIdx)}
                                        style={{
                                            borderRadius: '18px',
                                            overflow: 'hidden',
                                            backgroundColor: 'white',
                                            cursor: 'pointer',
                                            border: '1.5px solid var(--border-color)',
                                            boxShadow: 'var(--shadow-sm)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            transition: 'all 0.3s ease'
                                        }}
                                        className="project-photo-item"
                                    >
                                        <div style={{
                                            height: '240px',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            backgroundColor: '#0F172A'
                                        }}>
                                            <img 
                                                src={getCloudinaryUrl(photoPath)} 
                                                alt={`${activeProject.title} - ${pIdx + 1}`}
                                                loading="lazy"
                                                onError={(e) => handleImageError(e, photoPath)}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.4s ease'
                                                }}
                                                className="project-photo-img"
                                            />
                                            {/* Hover Overlay */}
                                            <div 
                                                className="photo-hover-overlay"
                                                style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    backgroundColor: 'rgba(0, 61, 165, 0.45)',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white',
                                                    opacity: 0,
                                                    transition: 'opacity 0.25s ease',
                                                    backdropFilter: 'blur(2px)'
                                                }}
                                            >
                                                <div style={{
                                                    width: '46px',
                                                    height: '46px',
                                                    borderRadius: '50%',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginBottom: '8px',
                                                    border: '1.5px solid white'
                                                }}>
                                                    <Eye size={22} color="white" />
                                                </div>
                                                <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>
                                                    View & Zoom Photo
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Single photo spotlight presentation */
                            <div 
                                onClick={() => openLightbox(activeProject, 0)}
                                style={{
                                    maxWidth: '820px',
                                    margin: '0 auto',
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    backgroundColor: 'white',
                                    cursor: 'pointer',
                                    border: '1.5px solid var(--border-color)',
                                    boxShadow: 'var(--shadow-md)',
                                    transition: 'all 0.3s ease'
                                }}
                                className="project-photo-item"
                            >
                                <div style={{
                                    height: '450px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    backgroundColor: '#0F172A'
                                }}>
                                    <img 
                                        src={getCloudinaryUrl(activeProject.photos[0])} 
                                        alt={activeProject.title}
                                        loading="lazy"
                                        onError={(e) => handleImageError(e, activeProject.photos[0])}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.5s ease'
                                        }}
                                        className="project-photo-img"
                                    />
                                    {/* Hover Overlay */}
                                    <div 
                                        className="photo-hover-overlay"
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            backgroundColor: 'rgba(0, 61, 165, 0.45)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            opacity: 0,
                                            transition: 'opacity 0.25s ease',
                                            backdropFilter: 'blur(2px)'
                                        }}
                                    >
                                        <div style={{
                                            width: '56px',
                                            height: '56px',
                                            borderRadius: '50%',
                                            backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '10px',
                                            border: '2px solid white'
                                        }}>
                                            <ZoomIn size={28} color="white" />
                                        </div>
                                        <span style={{ fontSize: '1rem', fontWeight: '800' }}>
                                            Click to Open Fullscreen & Zoom
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    /* 2. OVERVIEW: 3-GRID PROJECT CARDS */
                    <div>
                        {/* Search and Filters Header */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '20px',
                            padding: '18px 24px',
                            boxShadow: 'var(--shadow-sm)',
                            border: '1.5px solid var(--border-color)',
                            marginBottom: '32px',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '16px',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            {/* Search bar */}
                            <div style={{ position: 'relative', flex: '1 1 280px', minWidth: '220px' }}>
                                <Search size={18} style={{
                                    position: 'absolute',
                                    left: '14px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#94A3B8'
                                }} />
                                <input
                                    type="text"
                                    placeholder="Search projects by title, category, keyword..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '11px 14px 11px 42px',
                                        borderRadius: '12px',
                                        border: '1.5px solid var(--border-color)',
                                        fontSize: '0.92rem',
                                        outline: 'none',
                                        transition: 'border-color 0.2s',
                                        backgroundColor: '#F8FAFC'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                                />
                            </div>

                            {/* Filter pills */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                                {filters.map(filter => (
                                    <button
                                        key={filter.id}
                                        type="button"
                                        onClick={() => setActiveFilter(filter.id)}
                                        style={{
                                            border: activeFilter === filter.id ? '2px solid var(--primary)' : '1.5px solid var(--border-color)',
                                            backgroundColor: activeFilter === filter.id ? 'var(--primary)' : 'white',
                                            color: activeFilter === filter.id ? 'white' : 'var(--secondary)',
                                            padding: '8px 18px',
                                            borderRadius: '50px',
                                            fontWeight: '700',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            boxShadow: activeFilter === filter.id ? '0 4px 12px rgba(0, 61, 165, 0.2)' : 'none'
                                        }}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Projects 3-Column Grid */}
                        {filteredProjects.length === 0 ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '60px 20px',
                                backgroundColor: 'white',
                                borderRadius: '20px',
                                border: '1.5px solid var(--border-color)',
                                color: '#64748B'
                            }}>
                                <FolderGit2 size={46} style={{ opacity: 0.4, marginBottom: '14px' }} />
                                <h3 style={{ fontSize: '1.25rem', color: 'var(--secondary)', marginBottom: '8px' }}>
                                    No projects found matching your criteria
                                </h3>
                                <p style={{ margin: 0, fontSize: '0.92rem' }}>
                                    Try clearing your search query or selecting a different project category.
                                </p>
                            </div>
                        ) : (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                                gap: '28px'
                            }}>
                                {filteredProjects.map(proj => {
                                    const coverImg = proj.coverPhoto || proj.photos[0];

                                    return (
                                        <div 
                                            key={proj.id}
                                            onClick={() => openProject(proj.id)}
                                            className="project-main-card"
                                            style={{
                                                backgroundColor: 'white',
                                                borderRadius: '20px',
                                                border: '1.5px solid var(--border-color)',
                                                overflow: 'hidden',
                                                cursor: 'pointer',
                                                boxShadow: 'var(--shadow-sm)',
                                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                                display: 'flex',
                                                flexDirection: 'column'
                                            }}
                                        >
                                            {/* Project Cover Image */}
                                            <div style={{
                                                position: 'relative',
                                                height: '240px',
                                                overflow: 'hidden',
                                                backgroundColor: '#0F172A'
                                            }}>
                                                <img 
                                                    src={getCloudinaryUrl(coverImg)} 
                                                    alt={proj.title}
                                                    loading="lazy"
                                                    onError={(e) => handleImageError(e, coverImg)}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                                                    }}
                                                    className="project-cover-img"
                                                />

                                                {/* Dark Gradient Overlay */}
                                                <div style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.2) 50%, rgba(15, 23, 42, 0) 100%)'
                                                }} />

                                                {/* Category Tag (Top-Left) */}
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '14px',
                                                    left: '14px',
                                                    backgroundColor: 'rgba(0, 61, 165, 0.88)',
                                                    backdropFilter: 'blur(8px)',
                                                    color: 'white',
                                                    padding: '5px 12px',
                                                    borderRadius: '20px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '800',
                                                    letterSpacing: '0.3px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '5px'
                                                }}>
                                                    <Tag size={12} />
                                                    <span>{proj.category}</span>
                                                </div>

                                                {/* Date (Bottom-Left) */}
                                                <div style={{
                                                    position: 'absolute',
                                                    bottom: '12px',
                                                    left: '16px',
                                                    color: 'rgba(255, 255, 255, 0.95)',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '700',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px'
                                                }}>
                                                    <Calendar size={13} color="#93C5FD" />
                                                    <span>{proj.date}</span>
                                                </div>
                                            </div>

                                            {/* Card Content */}
                                            <div style={{
                                                padding: '22px 22px 18px 22px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                flex: 1
                                            }}>
                                                <h3 style={{
                                                    fontSize: '1.25rem',
                                                    fontWeight: '800',
                                                    color: 'var(--secondary)',
                                                    margin: '0 0 10px 0',
                                                    lineHeight: '1.35'
                                                }}>
                                                    {proj.title}
                                                </h3>

                                                <p style={{
                                                    color: '#64748B',
                                                    fontSize: '0.9rem',
                                                    lineHeight: '1.6',
                                                    margin: '0 0 18px 0',
                                                    flex: 1,
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                }}>
                                                    {proj.desc}
                                                </p>

                                                <div style={{
                                                    borderTop: '1px solid #F1F5F9',
                                                    paddingTop: '14px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    color: 'var(--primary)',
                                                    fontWeight: '700',
                                                    fontSize: '0.9rem'
                                                }}>
                                                    <span>View Full Project</span>
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '6px',
                                                        backgroundColor: 'rgba(0, 61, 165, 0.08)',
                                                        padding: '6px 12px',
                                                        borderRadius: '20px'
                                                    }}>
                                                        <span>Explore</span>
                                                        <ArrowRight size={15} className="project-arrow-icon" style={{ transition: 'transform 0.2s ease' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* LIGHTBOX MODAL WITH ZOOM IN & ZOOM OUT */}
            {lightbox.isOpen && lightbox.project && (
                <div 
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        backgroundColor: 'rgba(5, 11, 24, 0.96)',
                        backdropFilter: 'blur(16px)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '18px 22px',
                        userSelect: 'none'
                    }}
                    onClick={closeLightbox}
                >
                    {/* Top Header Bar */}
                    <div 
                        style={{
                            width: '100%',
                            maxWidth: '1200px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '16px',
                            zIndex: 10
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Title & Category/Date */}
                        <div>
                            <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'white', letterSpacing: '-0.2px' }}>
                                {lightbox.project.title}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#93C5FD', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span>{lightbox.project.category}</span>
                                <span>•</span>
                                <span style={{ color: 'rgba(255,255,255,0.7)' }}>{lightbox.project.date}</span>
                            </div>
                        </div>

                        {/* Right Controls: Zoom Toolbar + Close */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {/* Zoom In / Out Group */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '30px',
                                padding: '4px 8px'
                            }}>
                                <button
                                    onClick={handleZoomOut}
                                    disabled={zoomLevel <= 1}
                                    title="Zoom Out (-)"
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: zoomLevel <= 1 ? 'rgba(255,255,255,0.3)' : 'white',
                                        cursor: zoomLevel <= 1 ? 'not-allowed' : 'pointer',
                                        padding: '6px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '50%',
                                        transition: 'background 0.2s'
                                    }}
                                >
                                    <ZoomOut size={18} />
                                </button>

                                <span style={{
                                    color: '#93C5FD',
                                    fontSize: '0.82rem',
                                    fontWeight: '800',
                                    minWidth: '46px',
                                    textAlign: 'center'
                                }}>
                                    {Math.round(zoomLevel * 100)}%
                                </span>

                                <button
                                    onClick={handleZoomIn}
                                    disabled={zoomLevel >= 3}
                                    title="Zoom In (+)"
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: zoomLevel >= 3 ? 'rgba(255,255,255,0.3)' : 'white',
                                        cursor: zoomLevel >= 3 ? 'not-allowed' : 'pointer',
                                        padding: '6px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '50%',
                                        transition: 'background 0.2s'
                                    }}
                                >
                                    <ZoomIn size={18} />
                                </button>

                                {zoomLevel > 1 && (
                                    <button
                                        onClick={handleResetZoom}
                                        title="Reset Zoom (0)"
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.15)',
                                            border: 'none',
                                            color: 'white',
                                            cursor: 'pointer',
                                            padding: '4px 8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            borderRadius: '14px',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            marginLeft: '4px'
                                        }}
                                    >
                                        <RotateCcw size={12} /> Reset
                                    </button>
                                )}
                            </div>

                            {/* Close Button */}
                            <button 
                                onClick={closeLightbox}
                                title="Close (Esc)"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    color: 'white',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.8)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Image Viewer Container */}
                    <div 
                        style={{
                            position: 'relative',
                            maxWidth: '1100px',
                            width: '100%',
                            maxHeight: '74vh',
                            height: '74vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Prev Button */}
                        {lightbox.project.photos.length > 1 && (
                            <button
                                onClick={(e) => navigateLightbox(-1, e)}
                                style={{
                                    position: 'absolute',
                                    left: '10px',
                                    zIndex: 20,
                                    background: 'rgba(15, 23, 42, 0.75)',
                                    backdropFilter: 'blur(8px)',
                                    border: '1.5px solid rgba(255, 255, 255, 0.2)',
                                    color: 'white',
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.75)'}
                                title="Previous Photo (Left Arrow)"
                            >
                                <ChevronLeft size={28} />
                            </button>
                        )}

                        <img 
                            src={getCloudinaryUrl(lightbox.project.photos[lightbox.photoIndex])} 
                            alt={lightbox.project.title}
                            onError={(e) => handleImageError(e, lightbox.project.photos[lightbox.photoIndex])}
                            onClick={handleImageClick}
                            onDoubleClick={handleToggleZoom}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            draggable={false}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '74vh',
                                objectFit: 'contain',
                                borderRadius: '12px',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
                                border: '1.5px solid rgba(255, 255, 255, 0.15)',
                                transform: `scale(${zoomLevel}) translate(${pan.x / zoomLevel}px, ${pan.y / zoomLevel}px)`,
                                transformOrigin: 'center center',
                                transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                                cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'zoom-out') : 'zoom-in',
                                userSelect: 'none'
                            }}
                        />

                        {/* Next Button */}
                        {lightbox.project.photos.length > 1 && (
                            <button
                                onClick={(e) => navigateLightbox(1, e)}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    zIndex: 20,
                                    background: 'rgba(15, 23, 42, 0.75)',
                                    backdropFilter: 'blur(8px)',
                                    border: '1.5px solid rgba(255, 255, 255, 0.2)',
                                    color: 'white',
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.75)'}
                                title="Next Photo (Right Arrow)"
                            >
                                <ChevronRight size={28} />
                            </button>
                        )}
                    </div>

                    {/* Bottom Helper Bar */}
                    <div 
                        style={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            textAlign: 'center',
                            fontSize: '0.82rem',
                            zIndex: 10,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span>
                            {zoomLevel > 1 
                                ? "Drag to pan image • Click or double-click to zoom out • [Reset] resets zoom"
                                : "Click photo to zoom • [+] / [-] buttons also adjust zoom • Arrow keys navigate"
                            }
                        </span>
                    </div>
                </div>
            )}

            {/* Styling */}
            <style dangerouslySetInnerHTML={{__html: `
                .project-main-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 16px 36px rgba(0, 61, 165, 0.14) !important;
                    border-color: rgba(0, 61, 165, 0.35) !important;
                }
                .project-main-card:hover .project-cover-img {
                    transform: scale(1.08);
                }
                .project-main-card:hover .project-arrow-icon {
                    transform: translateX(4px);
                }
                .project-photo-item:hover .project-photo-img {
                    transform: scale(1.06);
                }
                .project-photo-item:hover .photo-hover-overlay {
                    opacity: 1 !important;
                }
                .back-projects-btn:hover {
                    transform: translateX(-4px);
                }
            `}} />
        </div>
    );
}
