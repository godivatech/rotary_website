import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const getCloudinaryUrl = (localPath) => {
    if (!localPath) return '';
    let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'doeodacsg';
    cloudName = cloudName.replace(/['"]/g, '');
    
    let cleanPath = localPath.startsWith('/') ? localPath.substring(1) : localPath;
    cleanPath = cleanPath.replace(/ /g, '_');
    
    const extMatch = cleanPath.match(/\.[a-zA-Z0-9]+$/);
    const ext = extMatch ? extMatch[0] : '';
    const cleanPathWithoutExt = cleanPath.replace(/\.[a-zA-Z0-9]+$/, '');
    
    const publicId = `websites/rotary-website/${cleanPathWithoutExt}`;
    const encodedPublicId = publicId.split('/').map(part => encodeURIComponent(part)).join('/');
    
    const transform = 'w_800,c_limit,q_auto,f_auto';
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/${encodedPublicId}${ext}`;
};

export default function Gallery() {
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const galleryImages = [
        {
            title: "Blood Donation Camp",
            category: "Community Service",
            img: "/images/gallery/BLOOD DONATION CAMP.jpeg"
        },
        {
            title: "Narcotics Awareness Program",
            category: "Youth Awareness",
            img: "/images/gallery/NARCOTIS AWA.jpeg"
        },
        {
            title: "Stag Meeting at Kodaikanal",
            category: "Fellowship",
            img: "/images/gallery/Stag meeting at Kodaikanal.jpeg"
        },
        {
            title: "Tree Plantation at KLNCE",
            category: "Environment",
            img: "/images/gallery/Tree plantation at KLNCE.jpeg"
        },
        {
            title: "Value Your Spouse Program",
            category: "Family & Fellowship",
            img: "/images/gallery/VALUE YOUR SPOUSE.jpeg"
        },
        {
            title: "Vetrikku Vazi - Plus 2 Students Training",
            category: "Youth Service",
            img: "/images/gallery/VETRIKKU VAZI - PLUS 2 STUDENTS TRAINING.jpeg"
        }
    ];

    const handleImageError = (e, localPath) => {
        e.target.src = localPath;
    };

    const openLightbox = (index) => {
        setLightboxIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxIndex(null);
        document.body.style.overflow = '';
    };

    const navigateLightbox = (direction, e) => {
        if (e) e.stopPropagation();
        let newIndex = lightboxIndex + direction;
        if (newIndex < 0) newIndex = galleryImages.length - 1;
        if (newIndex >= galleryImages.length) newIndex = 0;
        setLightboxIndex(newIndex);
    };

    return (
        <div style={{ backgroundColor: 'var(--bg-light)', minHeight: '80vh', paddingBottom: '80px' }}>
            {/* Header Banner */}
            <section style={{
                background: 'linear-gradient(135deg, var(--secondary) 0%, #1E293B 100%)',
                color: 'white',
                padding: '80px 0',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <span style={{ 
                        fontSize: '0.85rem', 
                        fontWeight: '800', 
                        color: 'var(--primary-light)', 
                        textTransform: 'uppercase', 
                        letterSpacing: '2px',
                        backgroundColor: 'rgba(59, 130, 246, 0.15)',
                        padding: '6px 16px',
                        borderRadius: '30px'
                    }}>
                        Visual Archives
                    </span>
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', margin: '20px 0', color: 'white' }}>
                        Our Event Gallery
                    </h1>
                    <p style={{ maxWidth: '700px', margin: '0 auto', color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                        A visual journey showcasing our fellowship meetings, community service projects, and youth development initiatives.
                    </p>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="container" style={{ marginTop: '50px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '30px'
                }}>
                    {galleryImages.map((item, idx) => (
                        <div 
                            key={idx} 
                            className="tilt-card"
                            onClick={() => openLightbox(idx)}
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '20px',
                                border: '1.5px solid var(--border-color)',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow-sm)',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <div style={{ 
                                height: '240px', 
                                overflow: 'hidden', 
                                backgroundColor: '#0F172A', 
                                position: 'relative' 
                            }}>
                                <img 
                                    src={getCloudinaryUrl(item.img)} 
                                    alt={item.title}
                                    onError={(e) => handleImageError(e, item.img)}
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
                                    bottom: '16px',
                                    left: '16px',
                                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
                                    color: 'white',
                                    fontSize: '0.75rem',
                                    fontWeight: '700',
                                    padding: '6px 14px',
                                    borderRadius: '20px',
                                    backdropFilter: 'blur(4px)',
                                    zIndex: 2
                                }}>
                                    {item.category}
                                </span>
                            </div>
                            <div style={{ padding: '20px' }}>
                                <h3 style={{ 
                                    fontSize: '1.15rem', 
                                    fontWeight: '800', 
                                    color: 'var(--secondary)', 
                                    margin: 0,
                                    lineHeight: '1.4'
                                }}>
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Fullscreen Lightbox Modal */}
            {lightboxIndex !== null && (
                <div 
                    onClick={closeLightbox}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        zIndex: 99999,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        animation: 'fadeInUp 0.3s ease forwards',
                        padding: '20px'
                    }}
                >
                    {/* Top Bar controls */}
                    <div style={{
                        position: 'absolute',
                        top: '20px',
                        left: 0,
                        right: 0,
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0 30px',
                        color: 'white',
                        zIndex: 100000
                    }}>
                        <div style={{ fontSize: '1rem', fontWeight: '700' }}>
                            {galleryImages[lightboxIndex].category}
                        </div>
                        <button 
                            onClick={closeLightbox}
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: 'none',
                                color: 'white',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'background 0.3s'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                        >
                            <X size={22} />
                        </button>
                    </div>

                    {/* Image Container with navigation */}
                    <div style={{
                        position: 'relative',
                        maxWidth: '900px',
                        width: '100%',
                        maxHeight: '70vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {/* Prev Button */}
                        <button
                            onClick={(e) => navigateLightbox(-1, e)}
                            style={{
                                position: 'absolute',
                                left: '-60px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: 'none',
                                color: 'white',
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'background 0.3s'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                            className="lightbox-nav-btn"
                        >
                            <ChevronLeft size={28} />
                        </button>

                        <img 
                            src={getCloudinaryUrl(galleryImages[lightboxIndex].img)} 
                            alt={galleryImages[lightboxIndex].title}
                            onError={(e) => handleImageError(e, galleryImages[lightboxIndex].img)}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '70vh',
                                objectFit: 'contain',
                                borderRadius: '8px',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                border: '2px solid rgba(255, 255, 255, 0.1)'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Next Button */}
                        <button
                            onClick={(e) => navigateLightbox(1, e)}
                            style={{
                                position: 'absolute',
                                right: '-60px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: 'none',
                                color: 'white',
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'background 0.3s'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                            className="lightbox-nav-btn"
                        >
                            <ChevronRight size={28} />
                        </button>
                    </div>

                    {/* Bottom Caption and Index */}
                    <div style={{
                        marginTop: '30px',
                        color: 'white',
                        textAlign: 'center',
                        maxWidth: '600px',
                        padding: '0 20px'
                    }}>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '0 0 8px 0' }}>
                            {galleryImages[lightboxIndex].title}
                        </h2>
                        <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem', margin: 0 }}>
                            Image {lightboxIndex + 1} of {galleryImages.length}
                        </p>
                    </div>

                    {/* Mobile Lightbox Navigation styling */}
                    <style dangerouslySetInnerHTML={{__html: `
                        @media (max-width: 1024px) {
                            .lightbox-nav-btn {
                                position: static !important;
                                margin: 10px !important;
                            }
                            div[style*="maxHeight: '70vh'"] {
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
