import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { useLanguage } from '../hooks/LanguageContext';

const Principles = () => {
    const [ref, isVisible] = useIntersectionObserver();
    const { t } = useLanguage();
    const principles = t('principles.list');

    return (
        <section ref={ref} className={`section principles fade-in-section ${isVisible ? 'is-visible' : ''}`}>
            <div className="container">
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '4rem', color: '#000' }}>{t('principles.title')}</h2>
                <div className="principles-list">
                    {principles.map((item, i) => (
                        <span key={i} className="principle-tag">
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Principles;
