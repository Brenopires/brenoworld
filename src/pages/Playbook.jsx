import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { playbooksData } from '../data/playbooks';

const Playbook = () => {
    const { id } = useParams();
    const [playbook, setPlaybook] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('/api/playbooks')
            .then(res => res.json())
            .then(data => {
                if (data.results) {
                    const found = data.results.find(item => item.id === id);
                    if (found) {
                        // Parse steps/lessons if they are strings
                        setPlaybook({
                            ...found,
                            steps: typeof found.steps === 'string' ? JSON.parse(found.steps) : found.steps
                        });
                    }
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="container section">Loading...</div>;

    if (!playbook) {
        return <Navigate to="/playbooks" replace />;
    }

    return (
        <div className="container section fade-in-section is-visible">
            <Link to="/playbooks" style={{ color: '#666', marginBottom: '2rem', display: 'inline-block', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>
                ← Back to Playbooks
            </Link>

            <article>
                <header style={{ marginBottom: '3rem', borderBottom: '1px solid #333', paddingBottom: '2rem' }}>
                    <span style={{ color: 'var(--color-gray)', display: 'block', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>{playbook.category}</span>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: '1.1', marginBottom: '1.5rem' }}>{playbook.title}</h1>
                    <p style={{ fontSize: '1.3rem', color: '#ccc', maxWidth: '800px' }}>{playbook.summary}</p>
                </header>

                <div style={{ display: 'grid', gap: '4rem' }}>

                    {/* Actionable Steps */}
                    <div style={{ background: '#111', padding: '2rem', borderRadius: '4px' }}>
                        <h3 style={{ marginBottom: '1.5rem', color: '#fff' }}>Action Plan</h3>
                        <ol style={{ paddingLeft: '1.5rem', color: '#ddd', lineHeight: '1.8', fontSize: '1.1rem' }}>
                            {playbook.steps.map((step, i) => (
                                <li key={i} style={{ marginBottom: '0.5rem' }}>{step}</li>
                            ))}
                        </ol>
                    </div>

                    {/* Deep Dive Content */}
                    <div
                        className="playbook-content"
                        style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ccc' }}
                        dangerouslySetInnerHTML={{ __html: playbook.details }}
                    />
                </div>

            </article>
        </div>
    );
};

export default Playbook;
