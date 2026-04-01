import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Gallery.css';

import img1 from '../assets/image.png';
import img2 from '../assets/image copy.png';
import img3 from '../assets/image copy 2.png';
import img4 from '../assets/image copy 3.png';
import img5 from '../assets/image copy 4.png';
import img6 from '../assets/image copy 5.png';
import img7 from '../assets/image copy 6.png';
import img8 from '../assets/image copy 7.png';
import img9 from '../assets/image copy 8.png';
import img10 from '../assets/image copy 9.png';
import img11 from '../assets/image copy 10.png';
import img12 from '../assets/image copy 11.png';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
    const galleryRef = useRef(null);
    const titleRef = useRef(null);
    const gridRef = useRef(null);
    const modalRef = useRef(null);
    
    const [selectedImg, setSelectedImg] = React.useState(null);
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 6;

    const images = [
        { src: img1, title: 'Mastery I', category: 'Authority' },
        { src: img2, title: 'Mastery II', category: 'Power' },
        { src: img3, title: 'The Presence', category: 'Elegance' },
        { src: img4, title: 'Command', category: 'Service' },
        { src: img5, title: 'The Temple', category: 'Sanctuary' },
        { src: img6, title: 'Submission', category: 'Essence' },
        { src: img7, title: 'Absolute Power', category: 'High Art' },
        { src: img8, title: 'Authority Detail', category: 'Detail' },
        { src: img9, title: 'Digital Queen', category: 'Portrait' },
        { src: img10, title: 'Sovereignty', category: 'Identity' },
        { src: img11, title: 'Command Center', category: 'Environment' },
        { src: img12, title: 'Final Judgment', category: 'Conclusion' },
    ];

    const totalPages = Math.ceil(images.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage === currentPage) return;
        
        // Exit animation
        gsap.to(gridRef.current.children, {
            y: 50,
            opacity: 0,
            stagger: 0.05,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
                setCurrentPage(newPage);
                // Entrance animation
                gsap.fromTo(gridRef.current.children, 
                    { y: 50, opacity: 0 }, 
                    { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power2.out' }
                );
                // Scroll to top of gallery smoothly
                galleryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    };

    const openModal = (img, index) => {
        const globalIndex = (currentPage - 1) * itemsPerPage + index;
        setSelectedImg({ ...img, globalIndex });
        setTimeout(() => {
            if (modalRef.current) {
                gsap.fromTo(modalRef.current, 
                    { opacity: 0, backdropFilter: 'blur(0px)' }, 
                    { opacity: 1, backdropFilter: 'blur(20px)', duration: 0.5, ease: 'power2.out' }
                );
                gsap.fromTo('.modal-image-container', 
                    { scale: 0.8, opacity: 0, y: 50 }, 
                    { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' }
                );
            }
        }, 10);
    };

    const closeModal = () => {
        gsap.to('.modal-image-container', { scale: 0.8, opacity: 0, y: 50, duration: 0.4, ease: 'power2.in' });
        gsap.to(modalRef.current, { 
            opacity: 0, 
            backdropFilter: 'blur(0px)', 
            duration: 0.4, 
            ease: 'power2.in', 
            onComplete: () => setSelectedImg(null) 
        });
    };

    const nextImage = (e) => {
        e.stopPropagation();
        const nextIdx = (selectedImg.globalIndex + 1) % images.length;
        setSelectedImg({ ...images[nextIdx], globalIndex: nextIdx });
        gsap.fromTo('.modal-img', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
    };

    const prevImage = (e) => {
        e.stopPropagation();
        const prevIdx = (selectedImg.globalIndex - 1 + images.length) % images.length;
        setSelectedImg({ ...images[prevIdx], globalIndex: prevIdx });
        gsap.fromTo('.modal-img', { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
    };

    useEffect(() => {
        const title = titleRef.current;
        const items = gridRef.current.children;

        // Title reveal
        gsap.fromTo(title, 
            { y: 50, opacity: 0 }, 
            { 
                y: 0, 
                opacity: 1, 
                duration: 1.2, 
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );

        // Grid items reveal
        if (items.length > 0) {
            gsap.fromTo(items, 
                { y: 100, opacity: 0, scale: 0.9 }, 
                { 
                    y: 0, 
                    opacity: 1, 
                    scale: 1, 
                    duration: 1, 
                    stagger: 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }
    }, [currentPage]); // Re-run when page changes

    const handleHover = (target) => {
        gsap.to(target.querySelector('img'), {
            scale: 1.1,
            duration: 0.6,
            ease: 'power2.out'
        });
    };

    const handleLeave = (target) => {
        gsap.to(target.querySelector('img'), {
            scale: 1,
            duration: 0.6,
            ease: 'power2.out'
        });
    };

    const currentImages = images.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <section id="gallery" className="gallery-section" ref={galleryRef}>
            {/* Modal Lightbox */}
            {selectedImg && (
                <div className="gallery-modal" ref={modalRef} onClick={closeModal}>
                    <div className="modal-close">&times;</div>
                    
                    <button className="modal-nav prev-btn" onClick={prevImage}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    
                    <div className="modal-image-container" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImg.src} alt={selectedImg.title} className="modal-img" />
                        <div className="modal-info">
                            <h3>{selectedImg.title}</h3>
                            <span>{selectedImg.category}</span>
                        </div>
                    </div>

                    <button className="modal-nav next-btn" onClick={nextImage}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            )}

            <div className="container">
                <div className="section-header" ref={titleRef}>
                    <div className="section-label">
                        <span className="label-line"></span>
                        <span className="label-text">The Temple Gallery</span>
                    </div>
                    <h2 className="gallery-title">
                        Visualizing My Absolute <span className="highlight">Command</span>
                    </h2>
                </div>

                <div className="gallery-grid" ref={gridRef}>
                    {currentImages.map((item, index) => (
                        <div 
                            key={`${currentPage}-${index}`} 
                            className="gallery-item"
                            onClick={() => openModal(item, index)}
                            onMouseEnter={(e) => handleHover(e.currentTarget)}
                            onMouseLeave={(e) => handleLeave(e.currentTarget)}
                        >
                            <img src={item.src} alt={item.title} />
                        </div>
                    ))}
                </div>

                {/* Unique Pagination */}
                {totalPages > 1 && (
                    <div className="gallery-pagination">
                        <button 
                            className={`pag-btn ${currentPage === 1 ? 'disabled' : ''}`}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        
                        {[...Array(totalPages)].map((_, i) => (
                            <button 
                                key={i + 1}
                                className={`pag-number ${currentPage === i + 1 ? 'active' : ''}`}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                <span className="num-text">{i + 1}</span>
                                <div className="pag-pulse"></div>
                            </button>
                        ))}

                        <button 
                            className={`pag-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Gallery;
