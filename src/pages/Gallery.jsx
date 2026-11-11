import React, { useState, useMemo } from 'react';
import {
    X,
    ChevronLeft,
    ChevronRight,
    Calendar,
    Tag,
    Images,
    Search,
    Sparkles,
    ZoomIn,
    ZoomOut,
    RotateCcw,
    ArrowLeft,
    ArrowRight,
    Eye
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

    // Dedicated clean path for Diwali Celebration 2026
    if (localPath.includes('Diwali celebration 2026')) {
        const fileName = localPath.split('/').pop();
        const base = fileName.replace(/\.(jpg|jpeg|png)\.(jpg|jpeg|png)$/i, '').replace(/\.(jpg|jpeg|png)$/i, '');
        return `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/websites/rotary-website/gallery/Diwali_celebration_2026/${base}.jpg`;
    }

    // 89th Installation Ceremony
    if (localPath.includes('rotary club 89th installation')) {
        const fileName = localPath.split('/').pop();
        const base = cleanBaseName(fileName);
        return `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/websites/rotary-website/gallery/89th_installation/${base}.jpg`;
    }

    // Toilet Inauguration
    if (localPath.includes('ROTARY CLUB toilet inaguration')) {
        const fileName = localPath.split('/').pop();
        const base = cleanBaseName(fileName);
        return `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/websites/rotary-website/gallery/toilet_inauguration/${base}.jpg`;
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

// All 28 photos from 89th Installation Ceremony
const installationPhotos = [
    "/images/rotary club 89th installation/Cam 1 Photos _211_.jpeg",
    "/images/rotary club 89th installation/Cam 1 Photos _233_.jpeg",
    "/images/rotary club 89th installation/Cam 1 Photos _250_.jpeg",
    "/images/rotary club 89th installation/Cam 1 Photos _256_.jpeg",
    "/images/rotary club 89th installation/Cam 1 Photos _265_.jpeg",
    "/images/rotary club 89th installation/Cam 1 Photos _268_.jpeg",
    "/images/rotary club 89th installation/Cam 1 Photos _273_.jpeg",
    "/images/rotary club 89th installation/Cam 1 Photos _284_.jpeg",
    "/images/rotary club 89th installation/Cam 1 Photos _287_.jpeg",
    "/images/rotary club 89th installation/Cam 1 Photos _339_.jpeg",
    "/images/rotary club 89th installation/Cam 1 Photos _358_.jpeg",
    "/images/rotary club 89th installation/Cam 1 Photos _366_.jpeg",
    "/images/rotary club 89th installation/Cam 1 Photos _377_.jpeg",
    "/images/rotary club 89th installation/Cam 1 Photos _418_.jpeg",
    "/images/rotary club 89th installation/Cam 1 Photos _454_.jpeg",
    "/images/rotary club 89th installation/Cam 1 Photos _477_.jpeg",
    "/images/rotary club 89th installation/Cam 1 Photos _565_.jpeg",
    "/images/rotary club 89th installation/Cam 1 Photos _588_.jpeg",
    "/images/rotary club 89th installation/Cam 1 Photos _674_.jpeg",
    "/images/rotary club 89th installation/Cam 1 Photos _676_.jpeg",
    "/images/rotary club 89th installation/Cam 1 Photos _679_.jpeg",
    "/images/rotary club 89th installation/Cam 1 Photos _686_.jpeg",
    "/images/rotary club 89th installation/Cam 1 Photos _703_.jpeg",
    "/images/rotary club 89th installation/gft1.jpeg",
    "/images/rotary club 89th installation/gft2.jpeg",
    "/images/rotary club 89th installation/gft3.jpeg",
    "/images/rotary club 89th installation/GOVERNER.jpeg",
    "/images/rotary club 89th installation/hero 1.jpeg"
];

// All 33 photos from Diwali Celebration 2026
const diwaliPhotos = [
    "/images/Diwali celebration 2026/VJY00537.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00588.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00748.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00755.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00757.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00790.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00793.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00827.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00829.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00839.jpg.jpeg",
    "/images/Diwali celebration 2026/VJY00867.jpg.jpeg",
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

// Organized Event Data: Club fellowship & celebration albums
const galleryEvents = [
    {
        id: "89th-installation-ceremony",
        title: "89th Installation Ceremony",
        date: "July 2026",
        year: "2025 - 2026",
        category: "Leadership & Fellowship",
        coverPhoto: "/images/rotary club 89th installation/hero 1.jpeg",
        description: "Official installation of the 89th President, Board of Directors, and committee leaders, ushering in a year of impactful service and Rotary fellowship.",
        photos: installationPhotos
    },
    {
        id: "diwali-celebration-2026",
        title: "Diwali Celebration 2026",
        date: "October 2026",
        year: "2025 - 2026",
        category: "Fellowship & Family",
        coverPhoto: "/images/Diwali celebration 2026/VJY00537.jpg.jpeg",
        description: "A grand festival of lights celebration bringing together Rotarians and their families for an evening of joy, traditional festivities, cultural performances, and fellowship.",
        photos: diwaliPhotos
    }
];

// Helper functions to handle string or object photos seamlessly
const getPhotoPath = (photo) => (typeof photo === 'object' ? photo.src : photo);
const getPhotoTitle = (event, photoIndex) => {
    if (!event || !event.photos) return '';
    const photo = event.photos[photoIndex];
    if (typeof photo === 'object' && photo.title) return photo.title;
    return event.title;
};
const getPhotoCategory = (event, photoIndex) => {
    if (!event || !event.photos) return '';
    const photo = event.photos[photoIndex];
    if (typeof photo === 'object' && photo.category) return photo.category;
    return event.category;
};
const getPhotoDate = (event, photoIndex) => {
    if (!event || !event.photos) return '';
    const photo = event.photos[photoIndex];
    if (typeof photo === 'object' && photo.date) return photo.date;
    return event.date;
};

export default function Gallery() {
    const [selectedYear, setSelectedYear] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    // Active album drill-down view (pure state so it doesn't conflict with App's global page routing)
    const [activeEventId, setActiveEventId] = useState(null);

    const openAlbum = (eventId) => {
        setActiveEventId(eventId);
        setTimeout(() => {
            const el = document.getElementById('gallery-content-area');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                window.scrollTo({ top: 320, behavior: 'smooth' });
            }
        }, 50);
    };

    const backToAlbums = () => {
        setActiveEventId(null);
        setTimeout(() => {
            const el = document.getElementById('gallery-content-area');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                window.scrollTo({ top: 250, behavior: 'smooth' });
            }
        }, 50);
    };

    const activeEvent = useMemo(() => {
        return galleryEvents.find(e => e.id === activeEventId) || null;
    }, [activeEventId]);

    // Lightbox State & Zoom controls
    const [lightbox, setLightbox] = useState({
        isOpen: false,
        event: null,
        photoIndex: 0
    });
    const [zoomLevel, setZoomLevel] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const years = ["All", "2025 - 2026"];

    // Filter events for the 3-grid overview
    const filteredEvents = useMemo(() => {
        return galleryEvents.filter(ev => {
            const matchesYear = selectedYear === "All" || ev.year === selectedYear;
            const searchLower = searchQuery.toLowerCase().trim();

            const matchesDirect = searchLower === "" ||
                ev.title.toLowerCase().includes(searchLower) ||
                ev.description.toLowerCase().includes(searchLower) ||
                ev.category.toLowerCase().includes(searchLower);

            return matchesYear && matchesDirect;
        });
    }, [selectedYear, searchQuery]);

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

    const openLightbox = (event, index) => {
        setZoomLevel(1);
        setPan({ x: 0, y: 0 });
        setLightbox({
            isOpen: true,
            event: event,
            photoIndex: index
        });
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setZoomLevel(1);
        setPan({ x: 0, y: 0 });
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
        setZoomLevel(1);
        setPan({ x: 0, y: 0 });
        const total = lightbox.event.photos.length;
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

    // Keyboard navigation & zoom shortcuts
    React.useEffect(() => {
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
    }, [lightbox.isOpen, lightbox.event, lightbox.photoIndex, zoomLevel]);

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
                        letterSpacing: '1.5px',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        padding: '6px 16px',
                        borderRadius: '20px',
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
                        Explore our key community initiatives, celebrations, and youth programs. Select an event album below to view photos.
                    </p>
                </div>
            </section>

            {/* Filter and Search Bar (Visible on All Albums View) */}
            {!activeEvent && (
                <section className="container" style={{ marginTop: '-25px', position: 'relative', zIndex: 10 }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        padding: '18px 24px',
                        boxShadow: 'var(--shadow-md)',
                        border: '1.5px solid var(--border-color)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '16px',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        {/* Search Bar */}
                        <div style={{
                            position: 'relative',
                            flex: '1 1 300px',
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
                                placeholder="Search by event name, category, or keyword..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '11px 14px 11px 42px',
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

                        {/* Controls Group: Year Selector + Count Badge */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
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
                    </div>
                </section>
            )}

            {/* Main Content Area */}
            <section id="gallery-content-area" className="container" style={{ marginTop: activeEvent ? '30px' : '40px' }}>

                {/* 1. DRILL-DOWN: INSIDE AN EVENT ALBUM */}
                {activeEvent ? (
                    <div className="animate-fade-in">
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
                                onClick={backToAlbums}
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
                                className="back-albums-btn"
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
                                <span>Back to All Albums</span>
                            </button>

                            {/* Breadcrumb Path */}
                            <div style={{ fontSize: '0.88rem', color: '#64748B', fontWeight: '600' }}>
                                <span
                                    onClick={backToAlbums}
                                    style={{ cursor: 'pointer', color: 'var(--primary)' }}
                                >
                                    All Albums
                                </span>
                                <span style={{ margin: '0 8px', color: '#94A3B8' }}>/</span>
                                <span style={{ color: 'var(--secondary)', fontWeight: '700' }}>{activeEvent.title}</span>
                            </div>
                        </div>

                        {/* Event Details Card */}
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
                                    <Tag size={13} /> {activeEvent.category}
                                </span>
                                <span style={{
                                    color: '#64748B',
                                    fontSize: '0.88rem',
                                    fontWeight: '700',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}>
                                    <Calendar size={14} /> {activeEvent.date}
                                </span>
                            </div>

                            <h1 style={{
                                fontSize: '2.2rem',
                                fontWeight: '800',
                                color: 'var(--secondary)',
                                margin: '0 0 12px 0',
                                lineHeight: '1.25'
                            }}>
                                {activeEvent.title}
                            </h1>

                            {activeEvent.description && (
                                <p style={{
                                    color: '#475569',
                                    fontSize: '1.02rem',
                                    lineHeight: '1.65',
                                    margin: 0,
                                    maxWidth: '920px'
                                }}>
                                    {activeEvent.description}
                                </p>
                            )}
                        </div>

                        {/* All Photos Grid Inside Event Album */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '24px'
                        }}>
                            {activeEvent.photos.map((photoPath, pIdx) => (
                                <div
                                    key={pIdx}
                                    onClick={() => openLightbox(activeEvent, pIdx)}
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
                                    className="album-photo-item"
                                >
                                    <div style={{
                                        height: '230px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        backgroundColor: '#0F172A'
                                    }}>
                                        <img
                                            src={getCloudinaryUrl(photoPath)}
                                            alt={`${activeEvent.title} - ${pIdx + 1}`}
                                            loading="lazy"
                                            onError={(e) => handleImageError(e, photoPath)}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transition: 'transform 0.4s ease'
                                            }}
                                            className="album-photo-img"
                                        />
                                        {/* Hover Overlay with View icon */}
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
                    </div>
                ) : (
                    /* 2. OVERVIEW: 3-COLUMN ALBUM CARDS GRID */
                    filteredEvents.length === 0 ? (
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
                                No event albums found matching your search
                            </h3>
                            <p style={{ margin: 0, fontSize: '0.95rem' }}>
                                Try clearing your search query or selecting a different Rotary year.
                            </p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                            gap: '28px'
                        }}>
                            {filteredEvents.map(event => {
                                const coverImg = getPhotoPath(event.coverPhoto || event.photos[0]);

                                return (
                                    <div
                                        key={event.id}
                                        onClick={() => openAlbum(event.id)}
                                        className="gallery-album-card"
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
                                        {/* Album Cover Photo */}
                                        <div style={{
                                            position: 'relative',
                                            height: '240px',
                                            overflow: 'hidden',
                                            backgroundColor: '#0F172A'
                                        }}>
                                            <img
                                                src={getCloudinaryUrl(coverImg)}
                                                alt={event.title}
                                                loading="lazy"
                                                onError={(e) => handleImageError(e, coverImg)}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                                                }}
                                                className="album-cover-img"
                                            />

                                            {/* Gradient dark overlay at bottom for text contrast */}
                                            <div style={{
                                                position: 'absolute',
                                                inset: 0,
                                                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.2) 50%, rgba(15, 23, 42, 0) 100%)'
                                            }} />

                                            {/* Top-Left: Category Tag */}
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
                                                <span>{event.category}</span>
                                            </div>

                                            {/* Bottom: Date */}
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
                                                <span>{event.date}</span>
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
                                                {event.title}
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
                                                {event.description}
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
                                                <span>View Full Album</span>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    backgroundColor: 'rgba(0, 61, 165, 0.08)',
                                                    padding: '6px 12px',
                                                    borderRadius: '20px'
                                                }}>
                                                    <span>Explore</span>
                                                    <ArrowRight size={15} className="album-arrow-icon" style={{ transition: 'transform 0.2s ease' }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )
                )}
            </section>

            {/* LIGHTBOX MODAL WITH ZOOM IN & ZOOM OUT */}
            {lightbox.isOpen && lightbox.event && (
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
                                {getPhotoTitle(lightbox.event, lightbox.photoIndex)}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#93C5FD', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span>{getPhotoCategory(lightbox.event, lightbox.photoIndex)}</span>
                                <span>•</span>
                                <span style={{ color: 'rgba(255,255,255,0.7)' }}>{getPhotoDate(lightbox.event, lightbox.photoIndex)}</span>
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
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.8)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Image Viewer with Drag / Pan & Zoom */}
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
                        {lightbox.event.photos.length > 1 && (
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
                            src={getCloudinaryUrl(getPhotoPath(lightbox.event.photos[lightbox.photoIndex]))}
                            alt={getPhotoTitle(lightbox.event, lightbox.photoIndex)}
                            onError={(e) => handleImageError(e, getPhotoPath(lightbox.event.photos[lightbox.photoIndex]))}
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
                        {lightbox.event.photos.length > 1 && (
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

            {/* Micro-interaction & Responsive CSS */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .gallery-album-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 16px 36px rgba(0, 61, 165, 0.14) !important;
                    border-color: rgba(0, 61, 165, 0.35) !important;
                }
                .gallery-album-card:hover .album-cover-img {
                    transform: scale(1.08);
                }
                .gallery-album-card:hover .album-arrow-icon {
                    transform: translateX(4px);
                }
                .album-photo-item:hover .album-photo-img {
                    transform: scale(1.08);
                }
                .album-photo-item:hover .photo-hover-overlay {
                    opacity: 1 !important;
                }
                .back-albums-btn:hover {
                    transform: translateX(-4px);
                }
                @media (max-width: 768px) {
                    .gallery-album-card {
                        margin-bottom: 8px;
                    }
                }
            `}} />
        </div>
    );
}