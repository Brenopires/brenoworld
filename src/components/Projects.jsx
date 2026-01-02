import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { useLanguage } from '../hooks/LanguageContext';

const ProjectCard = ({ title, role, description, impact, impactLabel }) => (
    <div className="project-card">
        <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{title}</h3>
        <span style={{ color: 'var(--color-gray)', display: 'block', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', fontSize: '0.9rem' }}>{role}</span>
        <p style={{ marginBottom: '1.5rem', color: '#ccc' }}>{description}</p>
        <div>
            <strong style={{ color: 'var(--color-text)', display: 'block', marginBottom: '0.5rem' }}>{impactLabel}</strong>
            <p style={{ color: 'var(--color-gray)' }}>{impact}</p>
        </div>
    </div>
);

const Projects = () => {
    const [ref, isVisible] = useIntersectionObserver();
    const { t } = useLanguage();

    const projects = t('projects.items');

    return (
        <section id="projects" ref={ref} className={`section projects fade-in-section ${isVisible ? 'is-visible' : ''}`}>
            <div className="container">
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '4rem' }}>{t('projects.title')}</h2>
                <div className="projects-grid">
                    {projects.map((p, i) => (
                        <ProjectCard key={i} {...p} impactLabel={t('projects.impactLabel')} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
