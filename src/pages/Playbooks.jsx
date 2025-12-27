import React from 'react';
import { Link } from 'react-router-dom';
import { playbooksData } from '../data/playbooks';

const PlaybookCard = ({ id, title, category, steps }) => (
    <div style={{ border: '1px solid #333', padding: '2rem', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className="playbook-card">
        <div>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#666', letterSpacing: '2px', display: 'block', marginBottom: '1rem' }}>
                {category}
            </span>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>{title}</h3>
            <ol style={{ paddingLeft: '1.5rem', color: '#aaa', lineHeight: '1.8' }}>
                {/* Handle steps whether they are array (if parsed) or string (if from DB as jsonb and not auto-parsed correctly by driver, though pg usually does. safest to check) */}
                {(Array.isArray(steps) ? steps : (typeof steps === 'string' ? JSON.parse(steps) : [])).map((step, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem' }}>{step}</li>
                ))}
            </ol>
        </div>
        <Link to={`/playbook/${id}`} style={{ display: 'inline-block', marginTop: '2rem', textDecoration: 'underline', color: '#fff' }}>Read Full Guide →</Link>
    </div>
);

const Playbooks = () => {
    const [playbooks, setPlaybooks] = React.useState([]);

    React.useEffect(() => {
        fetch('/api/playbooks')
            .then(res => res.json())
            .then(data => {
                if (data.results) setPlaybooks(data.results);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container section">
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '3rem' }}>Playbooks</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                {playbooks.map((pb, i) => (
                    <PlaybookCard key={i} {...pb} />
                ))}
            </div>
        </div>
    );
};

export default Playbooks;
