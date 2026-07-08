import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [transitionState, setTransitionState] = useState(''); // '', 'in', 'out'
  const [pendingPage, setPendingPage] = useState(null);

  const navigateTo = (pageId) => {
    if (pageId === currentPage || transitionState !== '') return;
    setPendingPage(pageId);
    setTransitionState('in');
  };

  const handleAnimationEnd = () => {
    if (transitionState === 'in') {
      flushSync(() => {
        setCurrentPage(pendingPage);
      });
      window.scrollTo(0, 0);
      setTransitionState('out');
    } else if (transitionState === 'out') {
      setTransitionState('');
      setPendingPage(null);
    }
  };

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
    }, { threshold: 0.15 });

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-clip');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, [currentPage]);

  // 2. Custom Elastic Ring Cursor
  useEffect(() => {
    if (window.matchMedia('(max-width: 1024px)').matches) return;

    const cursor = document.querySelector('.custom-cursor');
    const ring = document.querySelector('.custom-cursor-ring');
    if (!cursor || !ring) return;

    let cMouseX = 0;
    let cMouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onCursorMove = (e) => {
      cMouseX = e.clientX;
      cMouseY = e.clientY;
      cursor.style.transform = `translate3d(${cMouseX}px, ${cMouseY}px, 0)`;
    };

    let cursorAnimId;
    const animateRing = () => {
      ringX += (cMouseX - ringX) * 0.15;
      ringY += (cMouseY - ringY) * 0.15;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      cursorAnimId = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', onCursorMove, { passive: true });
    cursorAnimId = requestAnimationFrame(animateRing);

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, .btn, .interactive-hover');
      if (target) {
        document.body.classList.add('cursor-hover');
      } else {
        document.body.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onCursorMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(cursorAnimId);
    };
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={navigateTo} />;
      case 'about':
        return <About />;
      case 'services':
        return <Services />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setCurrentPage={navigateTo} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Custom Awwwards Cursor Elements */}
      <div className="custom-cursor" />
      <div className="custom-cursor-ring" />

      {/* Screen Liquid wipe layout transition overlay */}
      <div 
        className={`transition-overlay ${transitionState === 'in' ? 'slide-in' : transitionState === 'out' ? 'slide-out' : ''}`} 
        onAnimationEnd={handleAnimationEnd} 
      />

      <Navbar currentPage={currentPage} setCurrentPage={navigateTo} />

      <main style={{ flexGrow: 1, paddingTop: '80px' }}>
        {renderPage()}
      </main>

      <Footer setCurrentPage={navigateTo} />
    </div>
  );
}
