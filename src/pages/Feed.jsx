import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/LanguageContext';

const FilterButton = ({ active, label, onClick }) => (
    <button
        onClick={onClick}
        style={{
            background: 'transparent',
            border: 'none',
            borderBottom: active ? '2px solid #fff' : '2px solid transparent',
            color: active ? '#fff' : '#666',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            cursor: 'pointer',
            fontFamily: 'var(--font-heading)',
            textTransform: 'uppercase',
            transition: 'all 0.3s'
        }}
    >
        {label}
    </button>
);

const Feed = () => {
    const [filter, setFilter] = useState('all');
    const [items, setItems] = useState([]);
    const { t, language } = useLanguage();

    React.useEffect(() => {
        Promise.all([
            fetch('/api/media').then(res => res.json()),
            fetch('/api/posts').then(res => res.json())
        ]).then(([mediaData, postsData]) => {
            const media = (mediaData.results || []).map(item => ({
                id: `media-${item.id}`,
                type: 'visual',
                subType: item.type,
                // These are from DB, might not have translation yet. 
                // Defaulting to title/label if translations missing.
                label: item.title,
                url: item.url,
                date: item.created_at,
                en: { label: item.title },
                pt: { label: item.title }
            }));

            const posts = (postsData.results || []).map(item => ({
                ...item,
                id: `post-${item.id}`,
                // If it's from DB, it might be a single string. 
                // In a real app, we'd have columns for en/pt.
                // For now, if it's not an object with en/pt, we treat as universal.
            }));

            // Include local data as well? Yes, let's merge with contentData.
            import('../data/content').then(({ contentData }) => {
                const combined = [...contentData, ...posts, ...media].sort((a, b) => {
                    return new Date(b.created_at || b.date) - new Date(a.created_at || a.date);
                });
                setItems(combined);
            });
        }).catch(err => console.error("Failed to load content", err));
    }, []);

    // Filter logic
    const filteredContent = filter === 'all'
        ? items
        : items.filter(item => {
            if (filter === 'visual') return item.type === 'visual';
            if (filter === 'article') return item.type === 'article';
            if (filter === 'thought') return item.type === 'thought';
            return true;
        });

    const getLocalized = (item, field) => {
        if (item[language] && item[language][field]) return item[language][field];
        return item[field] || "";
    };

    return (
        <div className="container section">
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '2rem' }}>{t('feed.title')}</h1>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '4rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                <FilterButton active={filter === 'all'} label={t('feed.all')} onClick={() => setFilter('all')} />
                <FilterButton active={filter === 'article'} label={t('feed.articles')} onClick={() => setFilter('article')} />
                <FilterButton active={filter === 'thought'} label={t('feed.thoughts')} onClick={() => setFilter('thought')} />
                <FilterButton active={filter === 'visual'} label={t('feed.visuals')} onClick={() => setFilter('visual')} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {filteredContent.map(item => (
                    <div key={item.id} className="feed-item fade-in-section is-visible">

                        {/* Article Card */}
                        {item.type === 'article' && (
                            <article style={{ borderLeft: '2px solid #fff', paddingLeft: '1.5rem' }}>
                                <span style={{ color: '#666', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>{t('feed.articlePrefix')} {item.date}</span>
                                <Link to={`/blog/${item.id}`} style={{ textDecoration: 'none' }}>
                                    <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', cursor: 'pointer', display: 'inline-block' }} className="hover-underline">
                                        {getLocalized(item, 'title')}
                                    </h2>
                                </Link>
                                <p style={{ color: '#ccc' }}>{getLocalized(item, 'summary')}</p>
                                <Link to={`/blog/${item.id}`} style={{ marginTop: '1rem', display: 'inline-block', fontSize: '0.9rem', color: '#fff', fontWeight: '600' }}>{t('feed.readMore')}</Link>
                            </article>
                        )}

                        {/* Thought Card */}
                        {item.type === 'thought' && (
                            <div style={{ background: '#111', padding: '2rem', borderRadius: '4px' }}>
                                <span style={{ color: '#444', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>{t('feed.microThought')}</span>
                                <p style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: '500' }}>"{getLocalized(item, 'content')}"</p>
                            </div>
                        )}

                        {/* Visual Card */}
                        {item.type === 'visual' && (
                            <div style={{ position: 'relative' }}>
                                <div style={{ aspectRatio: '16/9', background: '#0a0a0a', border: '1px solid #222', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {item.url ? (
                                        item.subType === 'video' || item.url.includes('youtube') ? (
                                            item.url.includes('youtube') ? (
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    src={item.url.replace('watch?v=', 'embed/')}
                                                    title={getLocalized(item, 'label')}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            ) : (
                                                <img src={item.url} alt={getLocalized(item, 'label')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            )
                                        ) : (
                                            <img src={item.url} alt={getLocalized(item, 'label')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        )
                                    ) : (
                                        <span style={{ color: '#444' }}>{item.subType.toUpperCase()} (No URL)</span>
                                    )}
                                </div>
                                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#888' }}>{getLocalized(item, 'label')}</p>
                            </div>
                        )}

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feed;
