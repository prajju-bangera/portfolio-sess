import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';

import About from './components/About';
import Gallery from './components/Gallery';
import Booking from './components/Booking';
import FloatingSocials from './components/FloatingSocials';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const Portfolio = () => (
    <main>
        <Hero />
        <About />
        <Gallery />
    </main>
);

function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <CustomCursor />
            <ScrollToTop />
            <Navbar />
            <FloatingSocials />
            <Routes>
                <Route path="/" element={<Portfolio />} />
                <Route path="/book" element={<Booking />} />
            </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
