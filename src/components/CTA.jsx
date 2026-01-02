import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { useLanguage } from '../hooks/LanguageContext';

const CTA = () => {
    const [ref, isVisible] = useIntersectionObserver();
    const { t } = useLanguage();

    return (
        <section ref={ref} className={`section cta fade-in-section ${isVisible ? 'is-visible' : ''}`} style={{ textAlign: 'center', padding: '8rem 0' }}>
            <div className="container">
                <h2 className="cta-title" dangerouslySetInnerHTML={{ __html: t('cta.title') }}></h2>
                <p style={{ color: 'var(--color-gray)', marginBottom: '2rem', maxWidth: '600px', marginInline: 'auto' }}>{t('cta.subtitle')}</p>
                <a href="mailto:contact@brenopires.com" className="btn btn-outline" style={{ fontSize: '1.2rem' }}>{t('cta.button')}</a>
            </div>
        </section>
    );
};

export default CTA;
