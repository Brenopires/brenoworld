import React from 'react';
import { Link } from 'react-router-dom';

const Goals = () => {
    const goals = [
        {
            title: "Build good things",
            description: "Software, businesses, and solutions that actually solve problems and create value.",
            icon: "🏗️"
        },
        {
            title: "Terminar no positivo",
            description: "The balance of good vs bad actions. Leaving the world a bit better than I found it.",
            badge: "+1 > -1"
        },
        {
            title: "Viver a vida",
            description: "Aproveitar, ser feliz, e garantir que a jornada valha tanto quanto o destino.",
            icon: "✨"
        },
        {
            title: "World Tour",
            description: "The quest to see everything. Tracking progress country by country.",
            link: "/map",
            linkText: "View Map Progress"
        }
    ];

    return (
        <div className="container" style={{ padding: '8rem 2rem 4rem', minHeight: '100vh', background: '#000' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <header style={{ marginBottom: '5rem' }}>
                    <h1 style={{
                        fontSize: '4rem',
                        fontWeight: '900',
                        marginBottom: '1.5rem',
                        letterSpacing: '-2px'
                    }}>
                        Objetivos de Vida.
                    </h1>
                    <p style={{ color: '#888', fontSize: '1.2rem', maxWidth: '600px', lineHeight: '1.6' }}>
                        Não são metas de ano novo. São princípios de longo prazo para uma vida intencional.
                    </p>
                </header>

                <div className="goals-grid" style={{ display: 'grid', gap: '3rem' }}>
                    {goals.map((goal, index) => (
                        <div key={index} style={{
                            paddingBottom: '3rem',
                            borderBottom: '1px solid #111',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: '700' }}>{goal.title}</h2>
                                {goal.badge && (
                                    <span style={{
                                        background: '#fff',
                                        color: '#000',
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        fontWeight: '800'
                                    }}>
                                        {goal.badge}
                                    </span>
                                )}
                            </div>
                            <p style={{ color: '#aaa', fontSize: '1.1rem', lineHeight: '1.5', maxWidth: '500px' }}>
                                {goal.description}
                            </p>
                            {goal.link && (
                                <Link to={goal.link} style={{
                                    display: 'inline-block',
                                    marginTop: '0.5rem',
                                    color: '#fff',
                                    fontWeight: '600',
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '4px'
                                }}>
                                    {goal.linkText} →
                                </Link>
                            )}
                        </div>
                    ))}
                </div>

                <footer style={{ marginTop: '8rem', padding: '4rem 0', textAlign: 'center', borderTop: '1px solid #111' }}>
                    <p style={{ color: '#444', fontStyle: 'italic' }}>
                        "A journey of a thousand miles begins with a single step."
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Goals;
