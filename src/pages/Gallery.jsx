import React, { useState, useMemo } from 'react';
import { 
    X, 
    ChevronLeft, 
    ChevronRight, 
    Calendar, 
    Tag, 
    Images, 
    Search, 
    ChevronDown, 
    ChevronUp,
    Sparkles
} from 'lucide-react';

const getCloudinaryUrl = (localPath) => {
    if (!localPath) return '';
    let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'doeodacsg';
    cloudName = cloudName.replace(/['"]/g, '');
    
    const transform = 'w_1000,c_limit,q_auto,f_auto';
    
    // Dedicated clean path for Diwali Celebration 2026
    if (localPath.includes('Diwali celebration 2026')) {
        const fileName = localPath.split('/').pop();
        const cleanBaseName = fileName.replace(/\.(jpg|jpeg|png)\.(jpg|jpeg|png)$/i, '').replace(/\.(jpg|jpeg|png)$/i, '');
        return `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/websites/rotary-website/gallery/Diwali_celebration_2026/${cleanBaseName}.jpg`;
    }
    
    // Standard path for other gallery items
    let cleanPath = localPath.startsWith('/') ? localPath.substring(1) : localPath;
    cleanPath = cleanPath.replace(/ /g, '_');
    const extMatch = cleanPath.match(/\.[a-zA-Z0-9]+$/);
    const ext = extMatch ? extMatch[0] : '';
    const cleanPathWithoutExt = cleanPath.replace(/\.[a-zA-Z0-9]+$/, '');
    
    const publicId = `websites/rotary-website/${cleanPathWithoutExt}`;
    const encodedPublicId = publicId.split('/').map(part => encodeURIComponent(part)).join('/');
    
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/${encodedPublicId}${ext}`;
};

// All 33 photos from Diwali Celebration 2026
const diwaliPhotos = [
    "/images/Diwali celebration 2026/VJY00537.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00588.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00748.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00755.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00757.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00871.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00883.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00907.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00910.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00912.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00913.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00919.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00921.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00939.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00965.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00966.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00981.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00995.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY01006.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY01044.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY01063.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY01102.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY01121.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY01194.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY01195.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY01204.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY01205.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY01206.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY01208.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY01381.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY01413.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY01465.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY01579.jpg.jpeg"
];

// Organized Event Data
const galleryEvents = [
    {
        id: "diwali-celebration-2026",
        title: "Diwali Celebration 2026",
        date: "October 2026",
        year: "2025 - 2026",
        category: "Fellowship & Family",
        description: "A grand festival of lights celebration bringing together Rotarians and their families for an evening of joy, traditional festivities, cultural performances, and fellowship.",
        photos: diwaliPhotos
    },
    {
        id: "blood-donation-camp",
        title: "Blood Donation Camp",
        date: "July 2026",
        year: "2025 - 2026",
        category: "Community Service",
        description: "Organized a mega voluntary blood donation drive in partnership with local healthcare authorities to support critical community needs.",
        photos: ["/images/gallery/BLOOD DONATION CAMP.jpeg"]
    },
    {
        id: "tree-plantation-klnce",
        title: "Tree Plantation Drive at KLNCE",
        date: "June 2026",
        year: "2025 - 2026",
        category: "Environment",
        description: "Green initiative aimed at afforestation, ecological balance, and environmental sustainability on campus grounds.",
        photos: ["/images/gallery/Tree plantation at KLNCE.jpeg"]
    },
    {
        id: "kodaikanal-stag-meeting",
        title: "Stag Meeting at Kodaikanal",
        date: "May 2026",
        year: "2025 - 2026",
        category: "Fellowship & Family",
        description: "Annual fellowship weekend retreat fostering stronger camaraderie, team bonding, and strategic project planning.",
        photos: ["/images/gallery/Stag meeting at Kodaikanal.jpeg"]
    },
    {
        id: "vetrikku-vazi-students-training",
        title: "Vetrikku Vazi - Plus 2 Students Career Guidance",
        date: "April 2026",
        year: "2025 - 2026",
        category: "Youth Service",
        description: "Empowering higher secondary students with comprehensive career guidance, competitive exam readiness, and future skills development.",
        photos: ["/images/gallery/VETRIKKU VAZI - PLUS 2 STUDENTS TRAINING.jpeg"]
    },
    {
        id: "narcotics-awareness-program",
        title: "Narcotics Awareness Program",
        date: "March 2026",
        year: "2025 - 2026",
        category: "Youth Service",
        description: "Educating school and college students on substance abuse hazards and promoting healthy, drug-free lifestyle habits.",
        photos: ["/images/gallery/NARCOTIS AWA.jpeg"]
    },
    {
        id: "value-your-spouse",
        title: "Value Your Spouse Program",
        date: "February 2026",
        year: "2025 - 2026",
        category: "Fellowship & Family",
        description: "A special family fellowship evening celebrating and honoring Rotary spouses for their constant dedication and community support.",
        photos: ["/images/gallery/VALUE YOUR SPOUSE.jpeg"]
    }
];

export default function Gallery() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedYear, setSelectedYear] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedEvents, setExpandedEvents] = useState({});

    // Lightbox State: holds the active event object and photo index
    const [lightbox, setLightbox] = useState({
        isOpen: false,
        event: null,
        photoIndex: 0
    });

    const categories = ["All", "Fellowship & Family", "Community Service", "Youth Service", "Environment"];
    const years = ["All", "2025 - 2026"];

    // Filter events
    const filteredEvents = useMemo(() => {
        return galleryEvents.filter(ev => {
            const matchesCategory = selectedCategory === "All" || ev.category === selectedCategory;
            const matchesYear = selectedYear === "All" || ev.year === selectedYear;
            const matchesSearch = searchQuery === "" || 
                ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ev.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesYear && matchesSearch;
        });
    }, [selectedCategory, selectedYear, searchQuery]);



    const toggleExpand = (eventId) => {
        setExpandedEvents(prev => ({
            ...prev,
            [eventId]: !prev[eventId]
        }));
    };

    const singlePhotoEvents = useMemo(() => {
        return filteredEvents.filter(ev => ev.photos.length === 1);
    }, [filteredEvents]);

    const openLightbox = (event, index) => {
        setLightbox({
            isOpen: true,
            event: event,
            photoIndex: index
        });
        document.body.style.overflow = 'hidden';
    };

    const openInitiativesLightbox = (index) => {
        setLightbox({
            isOpen: true,
            event: {
                title: singlePhotoEvents[index].title,
                category: singlePhotoEvents[index].category,
                date: singlePhotoEvents[index].date,
                photos: singlePhotoEvents.map(e => e.photos[0]),
                allTitles: singlePhotoEvents.map(e => e.title),
                allCategories: singlePhotoEvents.map(e => e.category),
                allDates: singlePhotoEvents.map(e => e.date)
            },
            photoIndex: index
        });
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightbox({
            isOpen: false,
            event: null,
            photoIndex: 0
        });
        document.body.style.overflow = '';
    };

    const navigateLightbox = (direction, e) => {
        if (e) e.stopPropagation();
        if (!lightbox.event) return;
        const total = lightbox.event.photos.length;
        let newIndex = lightbox.photoIndex + direction;
        if (newIndex < 0) newIndex = total - 1;
        if (newIndex >= total) newIndex = 0;
        setLightbox(prev => ({ ...prev, photoIndex: newIndex }));
    };

    const handleImageError = (e, localPath) => {
        e.target.src = localPath;
    };



    return (
        <div style={{ backgroundColor: 'var(--bg-light)', minHeight: '85vh', paddingBottom: '90px' }}>
            {/* Header Banner */}
            <section style={{
                background: 'linear-gradient(135deg, var(--secondary) 0%, #1E293B 100%)',
                color: 'white',
                padding: '70px 0 50px 0',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <span style={{ 
                        fontSize: '0.85rem', 
                        fontWeight: '800', 
                        color: '#93C5FD', 
                        textTransform: 'uppercase', 
                        letterSpacing: '2px',
                        backgroundColor: 'rgba(59, 130, 246, 0.25)',
                        border: '1px solid rgba(147, 197, 253, 0.35)',
                        padding: '6px 18px',
                        borderRadius: '30px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <Sparkles size={14} color="#93C5FD" /> Visual Archives
                    </span>
                    <h1 style={{ fontSize: '2.8rem', fontWeight: '800', margin: '18px 0 12px 0', color: 'white' }}>
                        Our Event Gallery
                    </h1>
                    <p style={{ maxWidth: '680px', margin: '0 auto', color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: '1.6' }}>
                        Browse our active projects, weekly fellowship gatherings, community medical camps, and club celebrations organized by event.
                    </p>
                </div>
            </section>

            {/* Filter and Search Bar */}
            <section className="container" style={{ marginTop: '-25px', position: 'relative', zIndex: 10 }}>
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '20px 24px',
                    boxShadow: 'var(--shadow-md)',
                    border: '1.5px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                }}>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '14px',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        {/* Search Bar */}
                        <div style={{
                            position: 'relative',
                            flex: '1 1 280px',
                            minWidth: '240px'
                        }}>
                            <Search size={18} style={{
                                position: 'absolute',
                                left: '14px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#94A3B8'
                            }} />
                            <input 
                                type="text"
                                placeholder="Search by event name or keyword..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 14px 10px 40px',
                                    borderRadius: '12px',
                                    border: '1.5px solid var(--border-color)',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    backgroundColor: '#F8FAFC'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                            />
                        </div>

                        {/* Year Selector */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B' }}>
                                Rotary Year:
                            </span>
                            <select 
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                style={{
                                    padding: '9px 14px',
                                    borderRadius: '10px',
                                    border: '1.5px solid var(--border-color)',
                                    fontSize: '0.9rem',
                                    fontWeight: '700',
                                    color: 'var(--secondary)',
                                    backgroundColor: 'white',
                                    cursor: 'pointer',
                                    outline: 'none'
                                }}
                            >
                                {years.map(y => (
                                    <option key={y} value={y}>{y === "All" ? "All Rotary Years" : y}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Category Filter Pills */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        alignItems: 'center',
                        borderTop: '1px solid #F1F5F9',
                        paddingTop: '14px'
                    }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginRight: '6px' }}>
                            Category:
                        </span>
                        {categories.map(cat => {
                            const isSelected = selectedCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    style={{
                                        border: 'none',
                                        backgroundColor: isSelected ? 'var(--primary)' : '#F1F5F9',
                                        color: isSelected ? 'white' : 'var(--text-dark)',
                                        fontSize: '0.85rem',
                                        fontWeight: '700',
                                        padding: '7px 15px',
                                        borderRadius: '25px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isSelected) e.target.style.backgroundColor = '#E2E8F0';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isSelected) e.target.style.backgroundColor = '#F1F5F9';
                                    }}
                                >
                                    {cat}
                                </button>
                            );
                        })}


                    </div>
                </div>
            </section>

            {/* Events Feed Section */}
            <section className="container" style={{ marginTop: '40px' }}>
                {filteredEvents.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        border: '1.5px solid var(--border-color)',
                        color: '#64748B'
                    }}>
                        <Images size={48} style={{ opacity: 0.4, marginBottom: '16px' }} />
                        <h3 style={{ fontSize: '1.3rem', color: 'var(--secondary)', marginBottom: '8px' }}>
                            No events found matching your filter
                        </h3>
                        <p style={{ margin: 0, fontSize: '0.95rem' }}>
                            Try clearing your search query or switching categories.
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '45px' }}>
                        {/* 1. Multi-Photo Event Albums (Events with multiple photos like Diwali) */}
                        {filteredEvents.filter(ev => ev.photos.length > 1).map((event) => {
                            const isExpanded = expandedEvents[event.id];
                            const previewLimit = 8;
                            const photosToShow = isExpanded ? event.photos : event.photos.slice(0, previewLimit);
                            const hasMorePhotos = event.photos.length > previewLimit;
                            const remainingCount = event.photos.length - previewLimit;

                            return (
                                <div 
                                    key={event.id}
                                    style={{
                                        backgroundColor: 'white',
                                        borderRadius: '24px',
                                        border: '1.5px solid var(--border-color)',
                                        padding: '28px',
                                        boxShadow: 'var(--shadow-sm)',
                                        transition: 'box-shadow 0.3s ease'
                                    }}
                                >
                                    {/* Event Header Information */}
                                    <div style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        gap: '14px',
                                        borderBottom: '1.5px solid #F1F5F9',
                                        paddingBottom: '18px',
                                        marginBottom: '22px'
                                    }}>
                                        <div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                                                <span style={{
                                                    backgroundColor: 'rgba(0, 61, 165, 0.1)',
                                                    color: 'var(--primary)',
                                                    fontSize: '0.8rem',
                                                    fontWeight: '800',
                                                    padding: '4px 12px',
                                                    borderRadius: '20px',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '5px'
                                                }}>
                                                    <Tag size={12} /> {event.category}
                                                </span>
                                                <span style={{
                                                    color: '#64748B',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '600',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '5px'
                                                }}>
                                                    <Calendar size={13} /> {event.date}
                                                </span>
                                            </div>
                                            <h2 style={{
                                                fontSize: '1.6rem',
                                                fontWeight: '800',
                                                color: 'var(--secondary)',
                                                margin: '0 0 6px 0',
                                                lineHeight: '1.3'
                                            }}>
                                                {event.title}
                                            </h2>
                                            {event.description && (
                                                <p style={{
                                                    color: '#475569',
                                                    fontSize: '0.95rem',
                                                    lineHeight: '1.6',
                                                    margin: '4px 0 0 0',
                                                    maxWidth: '850px'
                                                }}>
                                                    {event.description}
                                                </p>
                                            )}
                                        </div>

                                        {/* Event Photo Count Badge */}
                                        <div style={{
                                            backgroundColor: '#F8FAFC',
                                            border: '1px solid var(--border-color)',
                                            padding: '8px 16px',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            color: 'var(--secondary)',
                                            fontWeight: '700',
                                            fontSize: '0.9rem'
                                        }}>
                                            <Images size={16} color="var(--primary)" />
                                            <span>{event.photos.length} Photos</span>
                                        </div>
                                    </div>

                                    {/* Direct Photos Grid */}
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
                                        gap: '16px'
                                    }}>
                                        {photosToShow.map((photoPath, pIdx) => {
                                            const isLastSlot = !isExpanded && hasMorePhotos && pIdx === previewLimit - 1;

                                            return (
                                                <div 
                                                    key={pIdx}
                                                    onClick={() => openLightbox(event, pIdx)}
                                                    style={{
                                                        height: '190px',
                                                        borderRadius: '16px',
                                                        overflow: 'hidden',
                                                        position: 'relative',
                                                        backgroundColor: '#0F172A',
                                                        cursor: 'pointer',
                                                        border: '1.5px solid var(--border-color)',
                                                        boxShadow: 'var(--shadow-sm)'
                                                    }}
                                                >
                                                    <img 
                                                        src={getCloudinaryUrl(photoPath)} 
                                                        alt={`${event.title} photo ${pIdx + 1}`}
                                                        loading="lazy"
                                                        onError={(e) => handleImageError(e, photoPath)}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                            transition: 'transform 0.4s ease'
                                                        }}
                                                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.06)'}
                                                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                                    />

                                                    {/* +X More Photos Overlay badge on the last preview slot */}
                                                    {isLastSlot && (
                                                        <div 
                                                            style={{
                                                                position: 'absolute',
                                                                inset: 0,
                                                                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                color: 'white',
                                                                backdropFilter: 'blur(3px)',
                                                                padding: '10px',
                                                                textAlign: 'center',
                                                                transition: 'background-color 0.2s'
                                                            }}
                                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 61, 165, 0.9)'}
                                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.85)'}
                                                        >
                                                            <span style={{ fontSize: '1.8rem', fontWeight: '800', lineHeight: 1 }}>
                                                                +{remainingCount + 1}
                                                            </span>
                                                            <span style={{ fontSize: '0.85rem', fontWeight: '700', marginTop: '4px' }}>
                                                                More Photos
                                                            </span>
                                                            <span style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '2px' }}>
                                                                Click to view all
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Expand/Collapse Toggle Button */}
                                    {hasMorePhotos && (
                                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                            <button
                                                onClick={() => toggleExpand(event.id)}
                                                style={{
                                                    background: 'none',
                                                    border: '1.5px solid var(--border-color)',
                                                    backgroundColor: '#F8FAFC',
                                                    color: 'var(--primary)',
                                                    fontSize: '0.9rem',
                                                    fontWeight: '700',
                                                    padding: '9px 20px',
                                                    borderRadius: '25px',
                                                    cursor: 'pointer',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    transition: 'all 0.2s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'var(--primary)';
                                                    e.currentTarget.style.color = 'white';
                                                    e.currentTarget.style.borderColor = 'var(--primary)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#F8FAFC';
                                                    e.currentTarget.style.color = 'var(--primary)';
                                                    e.currentTarget.style.borderColor = 'var(--border-color)';
                                                }}
                                            >
                                                {isExpanded ? (
                                                    <>Show Less <ChevronUp size={16} /></>
                                                ) : (
                                                    <>View All {event.photos.length} Photos <ChevronDown size={16} /></>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* 2. Unified Club Initiatives & Highlights Grid (All single-photo events together in one rich grid) */}
                        {filteredEvents.filter(ev => ev.photos.length === 1).length > 0 && (
                            <div style={{
                                backgroundColor: 'white',
                                borderRadius: '24px',
                                border: '1.5px solid var(--border-color)',
                                padding: '28px',
                                boxShadow: 'var(--shadow-sm)'
                            }}>
                                <div style={{
                                    borderBottom: '1.5px solid #F1F5F9',
                                    paddingBottom: '16px',
                                    marginBottom: '24px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: '10px'
                                }}>
                                    <div>
                                        <h2 style={{
                                            fontSize: '1.5rem',
                                            fontWeight: '800',
                                            color: 'var(--secondary)',
                                            margin: 0
                                        }}>
                                            Club Initiatives & Highlights
                                        </h2>
                                        <p style={{
                                            color: '#64748B',
                                            fontSize: '0.9rem',
                                            margin: '4px 0 0 0'
                                        }}>
                                            Key community service drives, youth leadership, and fellowship gatherings.
                                        </p>
                                    </div>
                                    <span style={{
                                        backgroundColor: '#F8FAFC',
                                        color: '#475569',
                                        border: '1px solid var(--border-color)',
                                        fontSize: '0.85rem',
                                        fontWeight: '700',
                                        padding: '6px 14px',
                                        borderRadius: '20px'
                                    }}>
                                        {filteredEvents.filter(ev => ev.photos.length === 1).length} Initiatives
                                    </span>
                                </div>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                    gap: '24px'
                                }}>
                                    {singlePhotoEvents.map((event, idx) => {
                                        const photoPath = event.photos[0];
                                        return (
                                            <div 
                                                key={event.id}
                                                className="tilt-card"
                                                onClick={() => openInitiativesLightbox(idx)}
                                                style={{
                                                    backgroundColor: '#FAFAFA',
                                                    borderRadius: '18px',
                                                    border: '1.5px solid var(--border-color)',
                                                    overflow: 'hidden',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    display: 'flex',
                                                    flexDirection: 'column'
                                                }}
                                            >
                                                <div style={{
                                                    height: '210px',
                                                    overflow: 'hidden',
                                                    position: 'relative',
                                                    backgroundColor: '#0F172A'
                                                }}>
                                                    <img 
                                                        src={getCloudinaryUrl(photoPath)} 
                                                        alt={event.title}
                                                        loading="lazy"
                                                        onError={(e) => handleImageError(e, photoPath)}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                            transition: 'transform 0.5s ease'
                                                        }}
                                                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                                    />
                                                    <span style={{
                                                        position: 'absolute',
                                                        bottom: '12px',
                                                        left: '12px',
                                                        backgroundColor: 'rgba(15, 23, 42, 0.8)',
                                                        color: 'white',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '700',
                                                        padding: '4px 12px',
                                                        borderRadius: '20px',
                                                        backdropFilter: 'blur(4px)'
                                                    }}>
                                                        {event.category}
                                                    </span>
                                                </div>
                                                <div style={{ padding: '16px 18px' }}>
                                                    <h3 style={{
                                                        fontSize: '1.05rem',
                                                        fontWeight: '800',
                                                        color: 'var(--secondary)',
                                                        margin: '0 0 6px 0',
                                                        lineHeight: '1.4'
                                                    }}>
                                                        {event.title}
                                                    </h3>
                                                    <span style={{
                                                        fontSize: '0.8rem',
                                                        color: '#64748B',
                                                        fontWeight: '600',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    }}>
                                                        <Calendar size={12} /> {event.date}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* Event-Scoped Fullscreen Lightbox Modal */}
            {lightbox.isOpen && lightbox.event && (
                <div 
                    onClick={closeLightbox}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(15, 23, 42, 0.96)',
                        zIndex: 99999,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        animation: 'fadeInUp 0.3s ease forwards',
                        padding: '20px'
                    }}
                >
                    {/* Top Controls Bar */}
                    <div style={{
                        position: 'absolute',
                        top: '20px',
                        left: 0,
                        right: 0,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0 30px',
                        color: 'white',
                        zIndex: 100000
                    }}>
                        <div>
                            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'white' }}>
                                {lightbox.event.allTitles ? lightbox.event.allTitles[lightbox.photoIndex] : lightbox.event.title}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>
                                {lightbox.event.allCategories ? lightbox.event.allCategories[lightbox.photoIndex] : lightbox.event.category} • {lightbox.event.allDates ? lightbox.event.allDates[lightbox.photoIndex] : lightbox.event.date}
                            </div>
                        </div>

                        <button 
                            onClick={closeLightbox}
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: 'none',
                                color: 'white',
                                width: '42px',
                                height: '42px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'background 0.3s'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.25)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                        >
                            <X size={22} />
                        </button>
                    </div>

                    {/* Image Viewer Container */}
                    <div style={{
                        position: 'relative',
                        maxWidth: '960px',
                        width: '100%',
                        maxHeight: '75vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {/* Prev Button */}
                        {lightbox.event.photos.length > 1 && (
                            <button
                                onClick={(e) => navigateLightbox(-1, e)}
                                style={{
                                    position: 'absolute',
                                    left: '-65px',
                                    background: 'rgba(255, 255, 255, 0.12)',
                                    border: 'none',
                                    color: 'white',
                                    width: '52px',
                                    height: '52px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'background 0.3s'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.25)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.12)'}
                                className="lightbox-nav-btn"
                            >
                                <ChevronLeft size={30} />
                            </button>
                        )}

                        <img 
                            src={getCloudinaryUrl(lightbox.event.photos[lightbox.photoIndex])} 
                            alt={`${lightbox.event.title} - photo ${lightbox.photoIndex + 1}`}
                            onError={(e) => handleImageError(e, lightbox.event.photos[lightbox.photoIndex])}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '75vh',
                                objectFit: 'contain',
                                borderRadius: '10px',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
                                border: '1.5px solid rgba(255, 255, 255, 0.12)'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Next Button */}
                        {lightbox.event.photos.length > 1 && (
                            <button
                                onClick={(e) => navigateLightbox(1, e)}
                                style={{
                                    position: 'absolute',
                                    right: '-65px',
                                    background: 'rgba(255, 255, 255, 0.12)',
                                    border: 'none',
                                    color: 'white',
                                    width: '52px',
                                    height: '52px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'background 0.3s'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.25)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.12)'}
                                className="lightbox-nav-btn"
                            >
                                <ChevronRight size={30} />
                            </button>
                        )}
                    </div>

                    {/* Bottom Caption and Index */}
                    <div style={{
                        marginTop: '25px',
                        color: 'white',
                        textAlign: 'center',
                        maxWidth: '650px',
                        padding: '0 20px'
                    }}>
                        <div style={{
                            display: 'inline-block',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            padding: '6px 16px',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            color: '#93C5FD'
                        }}>
                            Photo {lightbox.photoIndex + 1} of {lightbox.event.photos.length}
                        </div>
                    </div>

                    {/* Responsive Lightbox styling */}
                    <style dangerouslySetInnerHTML={{__html: `
                        @media (max-width: 1024px) {
                            .lightbox-nav-btn {
                                position: static !important;
                                margin: 10px !important;
                            }
                            div[style*="maxHeight: '75vh'"] {
                                flex-direction: column !important;
                            }
                            .lightbox-nav-btn {
                                width: 44px !important;
                                height: 44px !important;
                            }
                        }
                    `}} />
                </div>
            )}
        </div>
    );
}
