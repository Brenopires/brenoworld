import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { useLanguage } from '../hooks/LanguageContext';

const Hero = () => {
    const [ref, isVisible] = useIntersectionObserver();
    const { t } = useLanguage();

    return (
        <section ref={ref} className={`section hero fade-in-section ${isVisible ? 'is-visible' : ''}`}>
            <div className="container">
                <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: t('hero.title') }}></h1>
                <p className="hero-subtitle">
                    {t('hero.subtitle')}
                </p>
                <a href="#projects" className="btn">{t('hero.cta')}</a>
            </div>
        </section>
    );
};

export default Hero;
