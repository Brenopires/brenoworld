import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const Hero = () => {
    const [ref, isVisible] = useIntersectionObserver();

    return (
        <section ref={ref} className={`section hero fade-in-section ${isVisible ? 'is-visible' : ''}`}>
            <div className="container">
                <h1 className="hero-title">
                    Real Impact.<br />
                    Not Just Companies.
                </h1>
                <p className="hero-subtitle">
                    I build systems that change behaviors. Obsessed with efficiency, data, and real change.
                </p>
                <a href="#projects" className="btn">See My Work</a>
            </div>
        </section>
    );
};

export default Hero;
