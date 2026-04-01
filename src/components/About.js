import React, { useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const navigate = useNavigate();
    const aboutImg = process.env.PUBLIC_URL + '/logo.jpeg';
    const sectionRef = useRef(null);
    const imageWrapperRef = useRef(null);
    const contentRef = useRef(null);
    const headerRef = useRef(null);
    const textRef = useRef(null);
    const statsRef = useRef(null);
    const experienceBadgeRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const imageWrapper = imageWrapperRef.current;
        const header = headerRef.current;
        const text = textRef.current;
        const stats = statsRef.current;
        const expBadge = experienceBadgeRef.current;

        // --- THE FLOATING CLONE TRANSITION ---
        const floatingClone = document.querySelector('.floating-transition-clone');
        const heroCard = document.querySelector('.hero-profile-card');
        const targetImg = imageWrapper.querySelector('.about-image');
        
        if (heroCard && targetImg && floatingClone) {
            // Initial state: About elements hidden
            gsap.set(targetImg, { opacity: 0 });
            gsap.set(expBadge, { opacity: 0, scale: 0.5 });
            gsap.set('.image-border', { opacity: 0 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section, // Directly use about section as trigger
                    start: "top bottom", // Start as soon as About section enters bottom of screen
                    end: "top 30%", // Land when About section hits 30% from top
                    scrub: 0.7, // Snappier scrub for faster response
                    invalidateOnRefresh: true,
                }
            });

            tl.fromTo(floatingClone, {
                visibility: 'hidden',
                opacity: 0,
                // Start where Hero card currently is (on screen)
                top: () => heroCard.getBoundingClientRect().top,
                left: () => heroCard.getBoundingClientRect().left,
                width: () => heroCard.offsetWidth,
                height: () => heroCard.offsetHeight,
                borderRadius: "50%",
                scale: 0.8
            }, {
                visibility: 'visible',
                opacity: 1,
                // Arrive exactly at Target Image screen position
                top: () => targetImg.getBoundingClientRect().top,
                left: () => targetImg.getBoundingClientRect().left,
                width: () => targetImg.offsetWidth,
                height: () => targetImg.offsetHeight,
                borderRadius: "12px",
                scale: 1,
                ease: "none"
            })
            .to(expBadge, {
                opacity: 1, 
                scale: 1, 
                ease: "back.out(1.7)"
            }, "-=0.2")
            .to('.image-border', {
                opacity: 0.3,
                ease: "power2.out"
            }, "-=0.2")
            // Handoff to the real about image at the end
            .to(floatingClone, {
                opacity: 0,
                duration: 0.1,
                onComplete: () => {
                   gsap.set(targetImg, { opacity: 1 });
                }
            })
            .to(targetImg, {
                opacity: 1,
                duration: 0.1
            }, "<");
        }

        // --- TEXT REVEAL ---
        const textTl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 60%',
                toggleActions: 'play none none none'
            }
        });

        textTl.fromTo(header, 
            { y: 50, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
        )
        .fromTo(text, 
            { y: 30, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 
            '-=0.5'
        )
        .fromTo(stats.children, 
            { y: 20, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)' }, 
            '-=0.4'
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section id="about" className="about-section" ref={sectionRef}>
            {/* The Floating Clone for Transition */}
            <div 
                className="floating-transition-clone" 
                style={{
                    position: 'fixed',
                    zIndex: 2000,
                    pointerEvents: 'none',
                    visibility: 'hidden',
                    overflow: 'hidden',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    borderRadius: '50%'
                }}
            >
                <img src={aboutImg} alt="Transition" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div className="container about-container">
                <div className="about-image-wrapper" ref={imageWrapperRef}>
                    <div className="image-border"></div>
                    <img src={aboutImg} alt="Brand Logo" className="about-image" />
                </div>

                <div className="about-content" ref={contentRef}>
                    <div className="section-label" ref={headerRef}>
                        <span className="label-line"></span>
                        <span className="label-text">About Me</span>
                    </div>
                    <h2 className="about-title">
                        Dominating Your Digital <span className="highlight">Submission</span> Is My Command
                    </h2>
                    <p className="about-description" ref={textRef}>
                        I am Goddess Eshani, and I establish absolute authority over the digital world. My code is not just a tool; it is a declaration of power. I command every pixel to bend to my will, ensuring your presence is not merely seen, but felt as a force of total domination.
                    </p>
                    
                    <div className="about-stats" ref={statsRef}>
                        <div className="stat-item">
                            <span className="stat-number">5+</span>
                            <span className="stat-label">Years of Mastery</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">500+</span>
                            <span className="stat-label">Total Slaves</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">1000+</span>
                            <span className="stat-label">Total Sessions</span>
                        </div>
                    </div>

                    <div className="about-cta">
                        <button 
                            className="book-btn about-btn" 
                            style={{borderColor: 'var(--google-red)', color: 'white', background: 'rgba(234, 67, 53, 0.1)'}}
                            onClick={() => navigate('/book')}
                        >
                            Enter The Temple
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
