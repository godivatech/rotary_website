import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Genealogy from './pages/Genealogy';
import Members from './pages/Members';
import Gallery from './pages/Gallery';
import Preloader from './components/Preloader';
import MeetingBanner from './components/MeetingBanner';

const getPageFromHash = () => {
  const hash = window.location.hash.replace('#', '');
  const validPages = ['home', 'about', 'genealogy', 'members', 'services', 'projects', 'gallery', 'contact'];
  return validPages.includes(hash) ? hash : 'home';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash);
  const [transitionState, setTransitionState] = useState(''); // '', 'in', 'out'
  const [pendingPage, setPendingPage] = useState(null);
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [scrollTarget, setScrollTarget] = useState(null);

  const navigateTo = (pageId, targetSectionId = null) => {
    if (pageId === currentPage) {
      if (targetSectionId) {
        const element = document.getElementById(targetSectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    if (transitionState !== '') return;
    setPendingPage(pageId);
    if (targetSectionId) {
      setScrollTarget(targetSectionId);
    }
    setTransitionState('in');
  };

  const handleAnimationEnd = () => {
    if (transitionState === 'in') {
      flushSync(() => {
        setCurrentPage(pendingPage);
        window.location.hash = pendingPage === 'home' ? 'home' : pendingPage;
      });
      if (scrollTarget) {
        setTimeout(() => {
          const element = document.getElementById(scrollTarget);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
          setScrollTarget(null);
        }, 150);
      } else {
        window.scrollTo(0, 0);
      }
      setTransitionState('out');
    } else if (transitionState === 'out') {
      setTransitionState('');
      setPendingPage(null);
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const newPage = getPageFromHash();
      if (newPage !== currentPage && newPage !== pendingPage) {
        navigateTo(newPage);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage, pendingPage, transitionState]);

  // 1. Advanced 3D Mouse Parallax & Tilt Effects
  useEffect(() => {
    if (window.matchMedia('(max-width: 1024px)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let animFrameId;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      
      const tiltCards = document.querySelectorAll('.tilt-card');
      tiltCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right &&
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
          
          const cardX = (e.clientX - rect.left) / rect.width - 0.5;
          const cardY = (e.clientY - rect.top) / rect.height - 0.5;
          
          const tiltX = cardY * -15;
          const tiltY = cardX * 15;
          
          card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
          card.style.transition = 'none';

          // Set mouse variables for spotlight glow:
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        } else {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
          card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        }
      });
    };

    const animateParallax = () => {
      targetX += (mouseX - targetX) * 0.1;
      targetY += (mouseY - targetY) * 0.1;

      const parallaxElements = document.querySelectorAll('.mouse-parallax');
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 20;
        const xOffset = targetX * speed;
        const yOffset = targetY * speed;
        el.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
      });

      animFrameId = requestAnimationFrame(animateParallax);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    animFrameId = requestAnimationFrame(animateParallax);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animFrameId);
    };
  }, [currentPage]);

  // 1.5 Advanced Scroll Reveals (Awwwards Style)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.05 });

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-clip');
    revealElements.forEach(el => observer.observe(el));

    // Fallback: Check if elements are already in the viewport
    const checkInViewFallback = () => {
      const elements = document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-clip');
      elements.forEach(el => {
        if (el.classList.contains('in-view')) return;
        const rect = el.getBoundingClientRect();
        const viewHeight = window.innerHeight || document.documentElement.clientHeight;
        // If element is partially visible in the viewport
        if (rect.top < viewHeight - 20 && rect.bottom > 20) {
          el.classList.add('in-view');
        }
      });
    };

    // Run fallback check immediately and after short delays (to wait for page transitions)
    checkInViewFallback();
    const t1 = setTimeout(checkInViewFallback, 100);
    const t2 = setTimeout(checkInViewFallback, 400);

    // Listen to scroll events as a fallback trigger
    window.addEventListener('scroll', checkInViewFallback, { passive: true });

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('scroll', checkInViewFallback);
    };
  }, [currentPage]);

  // 1.7 Performant Window Scroll-Parallax (Awwwards Style)
  useEffect(() => {
    const scrollParallaxElements = document.querySelectorAll('.scroll-parallax');
    if (scrollParallaxElements.length === 0) return;

    let ticking = false;

    const updateParallax = () => {
      const pageY = window.scrollY || window.pageYOffset;
      const viewHeight = window.innerHeight;

      scrollParallaxElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top + pageY;
        const elementHeight = rect.height;

        // Calculate relative position to viewport center (-1 to 1)
        const relativeScroll = (pageY + viewHeight / 2 - (elementTop + elementHeight / 2)) / (viewHeight / 2 + elementHeight / 2);
        
        // Clamp and calculate speed factor
        const factor = Math.max(-1.5, Math.min(1.5, relativeScroll));
        const speed = parseFloat(el.getAttribute('data-scroll-speed')) || 50;
        const yOffset = factor * speed;

        el.style.transform = `translate3d(0, ${yOffset}px, 0)`;
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateParallax(); // Initial positioning

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [currentPage]);


  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={navigateTo} />;
      case 'about':
        return <About />;
      case 'genealogy':
        return <Genealogy />;
      case 'members':
        return <Members />;
      case 'services':
        return <Services />;
      case 'projects':
        return <Projects />;
      case 'gallery':
        return <Gallery />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setCurrentPage={navigateTo} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Dynamic Wheel of Time Preloader */}
      {!isAppLoaded && <Preloader onComplete={() => setIsAppLoaded(true)} />}


      {/* Screen Liquid wipe layout transition overlay */}
      <div 
        className={`transition-overlay ${transitionState === 'in' ? 'slide-in' : transitionState === 'out' ? 'slide-out' : ''}`} 
        onAnimationEnd={handleAnimationEnd} 
      >
        {(transitionState === 'in' || transitionState === 'out') && (
          <div className="transition-wheel-container">
            <img 
              src="/images/Logo%20chakra.png" 
              alt="Transition Wheel" 
              className="transition-wheel" 
            />
          </div>
        )}
      </div>

      <Navbar currentPage={currentPage} setCurrentPage={navigateTo} />

      <main style={{ flexGrow: 1, paddingTop: '100px' }}>
        {renderPage()}
      </main>

      <Footer setCurrentPage={navigateTo} />

      {/* Floating meeting announcement banner */}
      {isAppLoaded && <MeetingBanner onNavigate={navigateTo} />}
    </div>
  );
}
