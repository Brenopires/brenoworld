import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const About = () => {
    const [ref, isVisible] = useIntersectionObserver();

    return (
        <section ref={ref} className={`section about fade-in-section ${isVisible ? 'is-visible' : ''}`}>
            <div className="container">
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '3rem' }}>Who I Am</h2>
                <div className="about-grid">
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-gray)' }}>The Unconformist</h3>
                        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                            I'm an entrepreneur and digital platform creator. I don't settle for the status quo.
                            My focus is not just on writing code, but on architecting solutions that solve real-world problems.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                            From local impact to scalable tech, I drive efficiency through data and truth.
                        </p>
                    </div>
                    <div>
                        <div className="about-image-placeholder">
                            <span style={{ color: 'var(--color-gray)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '2px' }}>Visionary</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
