import React from 'react';

const Section = ({ title, children, color = '#fff' }) => (
    <div style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: color, borderLeft: `3px solid ${color}`, paddingLeft: '1rem' }}>
            {title}
        </h2>
        {children}
    </div>
);

const CaseStudies = () => {
    const [cases, setCases] = React.useState([]);

    React.useEffect(() => {
        fetch('/api/cases')
            .then(res => res.json())
            .then(data => {
                if (data.results) {
                    setCases(data.results.map(c => ({
                        ...c,
                        lessons: typeof c.lessons === 'string' ? JSON.parse(c.lessons) : c.lessons
                    })));
                }
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container section">
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '1rem' }}>Real Cases</h1>
            <p style={{ fontSize: '1.2rem', color: '#888', marginBottom: '4rem', maxWidth: '700px' }}>
                The unfiltered truth. No gloss. Just what happened, what I learned, and the scars that came with it.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                {cases.map((item, i) => (
                    <div key={i} style={{ background: '#111', padding: '2rem', borderRadius: '4px' }}>
                        <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                        <span style={{ color: '#555', display: 'block', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.summary}</span>

                        {/* We might need to restructure DB to match UI "sections". 
                            For now, let's just dump the "result" and "lessons" as sections 
                        */}

                        <Section title="Result" color="#4caf50">
                            <p style={{ color: '#ccc', lineHeight: '1.6' }}>{item.result}</p>
                        </Section>

                        <Section title="Lessons" color="#ff9800">
                            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', color: '#ccc', lineHeight: '1.6' }}>
                                {Array.isArray(item.lessons) ? item.lessons.map((l, idx) => (
                                    <li key={idx}>{l}</li>
                                )) : <li>{item.lessons}</li>}
                            </ul>
                        </Section>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CaseStudies;
