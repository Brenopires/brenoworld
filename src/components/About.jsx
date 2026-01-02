import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { useLanguage } from '../hooks/LanguageContext';

const About = () => {
    const [ref, isVisible] = useIntersectionObserver();
    const { t } = useLanguage();

    return (
        <section ref={ref} className={`section about fade-in-section ${isVisible ? 'is-visible' : ''}`}>
            <div className="container">
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '3rem' }}>{t('about.title')}</h2>
                <div className="about-grid">
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-gray)' }}>{t('about.subtitle')}</h3>
                        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                            {t('about.p1')}
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                            {t('about.p2')}
                        </p>
                    </div>
                    <div>
                        <div className="about-image-placeholder">
                            <span style={{ color: 'var(--color-gray)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '2px' }}>{t('about.visionary')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
