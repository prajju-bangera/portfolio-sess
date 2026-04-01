import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import './Booking.css';

const Booking = () => {
    const [step, setStep] = useState(1);
    const [bookingData, setBookingData] = useState({
        session: '',
        name: '',
        email: '',
        insta: '',
        date: '',
        time: '',
        place: ''
    });
    const navigate = useNavigate();
    const containerRef = useRef(null);

    const sessions = [
        { id: 1, title: 'Feet Session', price: '$150', icon: 'fas fa-shoe-prints', desc: 'Absolute devotion to the divine path.' },
        { id: 2, title: 'Live Session', price: '$300', icon: 'fas fa-video', desc: 'Real-time presence and absolute command.' },
        { id: 3, title: 'Voice Call', price: '$200', icon: 'fas fa-phone-alt', desc: 'The sound of authority in your ear.' },
        { id: 4, title: 'Chat Session', price: '$100', icon: 'fas fa-comments', desc: 'Digital dominance via written word.' },
        { id: 5, title: 'Permanent Slave', price: '$2000', icon: 'fas fa-link', desc: 'One month of total, unyielding service.' },
        { id: 6, title: 'Fin-Dom', price: '$500', icon: 'fas fa-envelope-open-dollar', desc: 'Relinquish control of your tribute.' },
        { id: 7, title: 'Mind Control', price: '$400', icon: 'fas fa-brain', desc: 'Psychological dominance through design.' },
        { id: 8, title: 'Worship Session', price: '$250', icon: 'fas fa-pray', desc: 'The space where you belong.' }
    ];

    useEffect(() => {
        // Step transition animation
        gsap.fromTo('.booking-step', 
            { opacity: 0, scale: 0.95, y: 30 }, 
            { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'expo.out' }
        );

        // Progress Node pulse
        gsap.fromTo('.node.active .node-num', 
            { scale: 0.8, boxShadow: '0 0 0px var(--google-red)' }, 
            { scale: 1.1, boxShadow: '0 0 30px var(--google-red)', duration: 0.6, ease: 'back.out(1.7)' }
        );
    }, [step]);

    const handleSessionSelect = (sessionTitle) => {
        setBookingData({ ...bookingData, session: sessionTitle });
        setStep(2);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setStep(3);
    };

    return (
        <div className="booking-page" ref={containerRef}>
            <div className="booking-overlay"></div>
            
            <div className="container booking-container">
                <div className="booking-navbar">
                    {step > 1 ? (
                        <button className="nav-pill back-btn" onClick={() => setStep(step - 1)}>
                            <i className="fas fa-arrow-left"></i>
                        </button>
                    ) : <div></div>}
                    
                    <div className="unique-progress">
                        <div className="progress-track">
                            <div className="progress-fill" style={{width: `${((step - 1) / 2) * 100}%`}}></div>
                        </div>
                        <div className="step-nodes">
                            <div className={`node ${step >= 1 ? 'active' : ''}`}>
                                <span className="node-num">01</span>
                                <span className="node-label">Session</span>
                            </div>
                            <div className={`node ${step >= 2 ? 'active' : ''}`}>
                                <span className="node-num">02</span>
                                <span className="node-label">Details</span>
                            </div>
                            <div className={`node ${step >= 3 ? 'active' : ''}`}>
                                <span className="node-num">03</span>
                                <span className="node-label">Tribute</span>
                            </div>
                        </div>
                    </div>

                    <button className="nav-pill cancel-btn" onClick={() => navigate('/')}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {step === 1 && (
                    <div className="booking-step step-1">
                        <div className="step-title-box">
                            <h2 className="step-title">Select Your <span className="highlight">Sanctuary</span></h2>
                            <p className="step-subtitle">Choose the path of your digital submission</p>
                        </div>
                        <div className="session-grid">
                            {sessions.map((sess) => (
                                <div 
                                    key={sess.id} 
                                    className="session-card glass-card"
                                    onClick={() => handleSessionSelect(sess.title)}
                                >
                                    <div className="session-icon">
                                        <i className={sess.icon}></i>
                                    </div>
                                    <h3 className="session-title">{sess.title}</h3>
                                    <p className="session-desc">{sess.desc}</p>
                                    <div className="session-price">{sess.price}</div>
                                    <div className="card-shine"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="booking-step step-2">
                        <div className="step-title-box">
                            <h2 className="step-title">Personal <span className="highlight">Details</span></h2>
                            <p className="step-subtitle">Your chosen path: {bookingData.session}</p>
                        </div>
                        <form className="booking-form glass-card" onSubmit={handleFormSubmit}>
                            <div className="form-grid">
                                <div className="input-group">
                                    <label>Slave Name / ID</label>
                                    <input 
                                        type="text" required placeholder="How should I address you?" 
                                        value={bookingData.name}
                                        onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Email Address</label>
                                    <input 
                                        type="email" required placeholder="contact@you.com" 
                                        value={bookingData.email}
                                        onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Instagram ID</label>
                                    <input 
                                        type="text" required placeholder="@username" 
                                        value={bookingData.insta}
                                        onChange={(e) => setBookingData({...bookingData, insta: e.target.value})}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Location / Platform</label>
                                    <input 
                                        type="text" required placeholder="Online / Specific Place" 
                                        value={bookingData.place}
                                        onChange={(e) => setBookingData({...bookingData, place: e.target.value})}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Preferred Date</label>
                                    <input 
                                        type="date" required 
                                        value={bookingData.date}
                                        onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Preferred Time</label>
                                    <input 
                                        type="time" required 
                                        value={bookingData.time}
                                        onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="submit-booking-btn">
                                Proceed to Tribute <span><i className="fas fa-arrow-right"></i></span>
                            </button>
                        </form>
                    </div>
                )}

                {step === 3 && (
                    <div className="booking-step step-3">
                        <div className="step-title-box">
                            <h2 className="step-title">Final <span className="highlight">Tribute</span></h2>
                            <p className="step-subtitle">Secure your session with the Divine</p>
                        </div>
                        <div className="payment-box glass-card">
                            <div className="payment-details">
                                <p><strong>Session:</strong> {bookingData.session}</p>
                                <p><strong>Amount:</strong> {sessions.find(s => s.title === bookingData.session)?.price}</p>
                            </div>
                            <div className="scanner-container">
                                <div className="scanner-frame">
                                    <div className="qr-placeholder">
                                        <i className="fas fa-qrcode"></i>
                                        <div className="scan-line"></div>
                                    </div>
                                </div>
                                <p className="scanner-text">Scan to pay via Crypto / UPI</p>
                            </div>
                            <button className="confirm-btn" onClick={() => {
                                alert("Submission Successful. Wait for my command.");
                                navigate('/');
                            }}>
                                I Have Paid The Tribute
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Booking;
