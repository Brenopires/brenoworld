import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { contentData } from '../data/content';
import { useLanguage } from '../hooks/LanguageContext';

const BlogPost = () => {
    const { id } = useParams();
    const { t, language } = useLanguage();

    // Ensure we compare numbers loosely or convert id to number since params are strings
    const post = contentData.find(item => item.id == id && item.type === 'article');

    if (!post) {
        return <Navigate to="/feed" replace />;
    }

    const getLocalized = (field) => {
        if (post[language] && post[language][field]) return post[language][field];
        return post[field] || "";
    };

    return (
        <div className="container section fade-in-section is-visible">
            <Link to="/feed" style={{ color: '#666', marginBottom: '2rem', display: 'inline-block', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>
                {t('blog.back')}
            </Link>

            <article>
                <header style={{ marginBottom: '3rem' }}>
                    <span style={{ color: 'var(--color-gray)', display: 'block', marginBottom: '1rem' }}>{post.date}</span>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: '1.1', marginBottom: '1.5rem' }}>{getLocalized('title')}</h1>
                </header>

                <div
                    style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#ddd', maxWidth: '800px' }}
                    dangerouslySetInnerHTML={{ __html: getLocalized('content') }}
                />
            </article>

            <div style={{ marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid #222' }}>
                <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>{t('blog.moreReadings')}</h3>
                <Link to="/feed" className="btn btn-outline">{t('blog.viewAll')}</Link>
            </div>
        </div>
    );
};

export default BlogPost;
