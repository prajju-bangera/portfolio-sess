import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const navLinksRef = useRef(null);
    const logoRef = useRef(null);
    const buttonRef = useRef(null);
    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState('home');

    // Entrance Animation
    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.5 } });
        tl.fromTo(logoRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0 }, '0.5')
          .fromTo(navLinksRef.current.children, { opacity: 0, y: -20 }, { opacity: 1, y: 0, stagger: 0.1 }, '-=1.2')
          .fromTo(buttonRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1 }, '-=1.2');
    }, []);

    // Scroll Management (Scroll Spy & Sticky Nav)
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Scroll Spy logic
            const sections = ['home', 'about', 'service', 'gallery', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top >= -100 && rect.top <= 300;
                }
                return false;
            });
            
            if (current) {
                setActiveSection(prev => (current !== prev ? current : prev));
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleHover = (e) => {
        gsap.to(e.target, { 
            scale: 1.1, 
            color: 'var(--text-main)', 
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleUnhover = (e) => {
        gsap.to(e.target, { 
            scale: 1, 
            color: 'var(--text-muted)', 
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const navLinks = [
        { name: 'Home', id: 'home' },
        { name: 'About', id: 'about' },
        { name: 'Service', id: 'service' },
        { name: 'Gallery', id: 'gallery' },
        { name: 'Contact', id: 'contact' }
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container nav-content">
                <Link to="/" className="logo" ref={logoRef}>
                    <span>&lt;</span> GODDESS <span>/&gt;</span>
                </Link>
                
                <ul className="nav-links" ref={navLinksRef}>
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a 
                                href={`/#${link.id}`} 
                                className={activeSection === link.id ? 'active' : ''}
                                onMouseEnter={handleHover}
                                onMouseLeave={handleUnhover}
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>

                <button 
                    className="book-btn" 
                    ref={buttonRef}
                    onClick={() => navigate('/book')}
                    onMouseEnter={() => gsap.to(buttonRef.current, { scale: 1.1, backgroundColor: 'var(--google-red)', border: 'none', duration: 0.3 })}
                    onMouseLeave={() => gsap.to(buttonRef.current, { scale: 1, backgroundColor: 'rgba(255, 255, 255, 0.05)', duration: 0.3 })}
                >
                    Book Now
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
