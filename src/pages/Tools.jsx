import React from 'react';

const Tools = () => {
    const [tools, setTools] = React.useState([]);

    React.useEffect(() => {
        fetch('/api/tools')
            .then(res => {
                if (!res.ok) throw new Error('API not available');
                return res.json();
            })
            .then(data => {
                if (data.results) {
                    setTools(data.results);
                }
            })
            .catch(err => {
                console.log('API unavailable, running empty or fallback', err);
            });
    }, []);

    return (
        <div className="container section">
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '3rem' }}>Tools</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                {tools.map((tool, i) => (
                    <div key={i} style={{ padding: '2rem', border: '1px solid #333' }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>{tool.name}</h3>
                        <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#666', display: 'block', marginBottom: '1rem' }}>{tool.category}</span>
                        <p style={{ color: '#ccc' }}>{tool.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tools;
