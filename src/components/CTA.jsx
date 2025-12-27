import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const CTA = () => {
    const [ref, isVisible] = useIntersectionObserver();

    return (
        <section ref={ref} className={`section cta fade-in-section ${isVisible ? 'is-visible' : ''}`} style={{ textAlign: 'center', padding: '8rem 0' }}>
            <div className="container">
                <h2 className="cta-title">
                    Let's Build Something<br />That Makes Sense.
                </h2>
                <a href="mailto:contact@brenopires.com" className="btn btn-outline" style={{ fontSize: '1.2rem' }}>Get in Touch</a>
            </div>
        </section>
    );
};

export default CTA;
