import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FloatingSocials = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        ScrollTrigger.create({
            trigger: "#home",
            start: "bottom 10%",
            onEnter: () => setIsVisible(true),
            onLeaveBack: () => setIsVisible(false),
        });
    }, []);

    if (!isVisible) return null;

    return (
        <div className="floating-socials">
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <i className="fab fa-instagram"></i>
            </a>
            <a href="https://telegram.org" target="_blank" rel="noreferrer">
                <i className="fab fa-telegram"></i>
            </a>
        </div>
    );
};

export default FloatingSocials;
