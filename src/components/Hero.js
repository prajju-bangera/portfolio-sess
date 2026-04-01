import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const Hero = () => {
    const navigate = useNavigate();
    const heroRef = useRef(null);
    const contentRef = useRef(null);
    const profileRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.8 } });

        tl.fromTo(contentRef.current.querySelector('h1'), 
            { opacity: 0, x: -100, skewX: 10 }, 
            { opacity: 1, x: 0, skewX: 0 }, 
        '0.5')
        .fromTo('#typing-text', 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 1.5, ease: "steps(40)" }, 
        '-=1.2')
        .fromTo('.hero-tags span', 
            { opacity: 0, scale: 0.8 }, 
            { opacity: 1, scale: 1, stagger: 0.1 }, 
        '-=1.2')
        .fromTo(contentRef.current.querySelectorAll('.book-btn'), 
            { opacity: 0, scale: 0.8 }, 
            { opacity: 1, scale: 1, stagger: 0.1 }, 
        '-=1.2')
        .fromTo('.hero-socials a', 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, stagger: 0.15 }, 
        '-=1.2')
        .fromTo(profileRef.current, 
            { opacity: 0, scale: 0.8, rotate: 10, x: 100 }, 
            { opacity: 1, scale: 1, rotate: 0, x: 0 }, 
        '0.8')
        .fromTo('.hero-bg-accent', 
            { opacity: 0, scale: 0.5 }, 
            { opacity:1, scale: 1, duration: 2.5 }, 
        '0.3');

        // Abstract graphic float effect
        gsap.to('.hero-graphic', {
            y: 30,
            x: 20,
            rotation: 10,
            repeat: -1,
            yoyo: true,
            duration: 6,
            ease: "sine.inOut"
        });

    }, []);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        // Profile parallax
        const { left, top, width, height } = profileRef.current.getBoundingClientRect();
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        
        gsap.to(profileRef.current, {
            rotationY: x * 25,
            rotationX: -y * 25,
            transformPerspective: 1000,
            ease: "power2.out",
            duration: 0.6
        });
        
        // Left section text parallax (subtle)
        const textX = (clientX / innerWidth - 0.5) * 30;
        const textY = (clientY / innerHeight - 0.5) * 30;
        
        gsap.to(contentRef.current, {
            x: textX,
            y: textY,
            ease: "power2.out",
            duration: 0.8
        });

        gsap.to('.hero-graphic', {
            x: x * 60,
            y: y * 60,
            ease: "power2.out",
            duration: 1,
            stagger: 0.1
        });
    };

    const handleMouseLeave = () => {
        gsap.to(profileRef.current, {
            rotationY: 0,
            rotationX: 0,
            ease: "power2.out",
            duration: 1
        });
        gsap.to('.hero-graphic', {
            x: 0,
            y: 0,
            ease: "power2.out",
            duration: 1
        });
    };

    return (
        <section className="hero" id="home" ref={heroRef}>
            <div className="hero-bg-accent"></div>
            
            <div className="container hero-grid">
                <div className="hero-content" ref={contentRef}>
                    <h1 style={{textTransform: 'uppercase', lineHeight: '1.2', letterSpacing: '0.15rem', fontSize: 'clamp(2.5rem, 6vw, 4.2rem)'}}>
                        <span style={{fontSize: '1rem', display: 'block', marginBottom: '0.8rem', color: 'var(--text-muted)', letterSpacing: '0.25rem', fontWeight: '500'}}>Hello, I am</span>
                        <span style={{color: 'var(--google-red)'}}>GODDESS</span> <span style={{color: 'var(--primary)'}}>PRIYA SHARMA</span>
                    </h1>
                    <div style={{minHeight: '4.5rem'}}>
                        <p id="typing-text" style={{fontWeight: 500, fontSize: '1.3rem', color: 'var(--text-main)', opacity: 0}}>
                            Married. Age 35+. High class woman from Jaipur. <br/>
                            Brutal but lovable, aggressive but passionate. Thick and powerful.
                        </p>
                    </div>
                    <div className="hero-tags" style={{display: 'flex', gap: '1.2rem', marginBottom: '1.5rem'}}>
                        <span style={{color: 'var(--google-yellow)', fontWeight: 600, fontSize: '0.9rem'}}>#highclass</span>
                        <span style={{color: 'var(--google-green)', fontWeight: 600, fontSize: '0.9rem'}}>#jaipur</span>
                        <span style={{color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem'}}>#married</span>
                    </div>

                   

                    <div style={{display: 'flex', gap: '1.2rem'}}>
                        <button 
                            className="book-btn" 
                            style={{background: 'var(--google-red)', border: 'none'}}
                            onClick={() => navigate('/book')}
                        >
                            Access Temple
                        </button>
                        <button className="book-btn" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
                            Know More
                        </button>
                    </div>
                </div>

                <div 
                    className="profile-container" 
                    ref={profileRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{cursor: 'none'}}
                >
                    {/* Abstract graphic circles */}
                    <div className="hero-graphic" style={{width: '200px', height: '200px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--primary), var(--google-green))', filter: 'blur(30px)'}}></div>
                    <div className="hero-graphic" style={{width: '150px', height: '150px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--google-red), var(--google-yellow))', filter: 'blur(20px)', bottom: '-10%', left: '40%'}}></div>
                    
                    <div className="profile-card shadow-2xl hero-profile-card">
                        <img 
                            src="/logo.jpeg" 
                            alt="Profile" 
                            className="hero-profile-img"
                            onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop";
                                e.target.style.background = "var(--bg-dark-gray)";
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
