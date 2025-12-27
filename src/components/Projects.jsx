import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const ProjectCard = ({ title, role, description, impact }) => (
    <div className="project-card">
        <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{title}</h3>
        <span style={{ color: 'var(--color-gray)', display: 'block', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', fontSize: '0.9rem' }}>{role}</span>
        <p style={{ marginBottom: '1.5rem', color: '#ccc' }}>{description}</p>
        <div>
            <strong style={{ color: 'var(--color-text)', display: 'block', marginBottom: '0.5rem' }}>Impact:</strong>
            <p style={{ color: 'var(--color-gray)' }}>{impact}</p>
        </div>
    </div>
);

const Projects = () => {
    const [ref, isVisible] = useIntersectionObserver();

    const projects = [
        {
            title: 'ClubPetro',
            role: 'Founder & Tech Lead',
            description: 'A platform revolutionizing loyalty and management for fuel stations.',
            impact: 'Changed how stations interact with customers, driving retention and data-driven decisions.'
        },
        {
            title: 'Precim.ai',
            role: 'Co-Founder',
            description: 'AI-driven pricing intelligence for retail.',
            impact: 'Automated complex pricing strategies, optimizing margins and sales volume.'
        }
    ];

    return (
        <section id="projects" ref={ref} className={`section projects fade-in-section ${isVisible ? 'is-visible' : ''}`}>
            <div className="container">
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '4rem' }}>Selected Work</h2>
                <div className="projects-grid">
                    {projects.map((p, i) => (
                        <ProjectCard key={i} {...p} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
