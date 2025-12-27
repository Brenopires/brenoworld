import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { contentData } from '../data/content';

const BlogPost = () => {
    const { id } = useParams();
    // Ensure we compare numbers loosely or convert id to number since params are strings
    const post = contentData.find(item => item.id == id && item.type === 'article');

    if (!post) {
        return <Navigate to="/feed" replace />;
    }

    return (
        <div className="container section fade-in-section is-visible">
            <Link to="/feed" style={{ color: '#666', marginBottom: '2rem', display: 'inline-block', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>
                ← Back to Feed
            </Link>

            <article>
                <header style={{ marginBottom: '3rem' }}>
                    <span style={{ color: 'var(--color-gray)', display: 'block', marginBottom: '1rem' }}>{post.date}</span>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: '1.1', marginBottom: '1.5rem' }}>{post.title}</h1>
                </header>

                <div
                    style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#ddd', maxWidth: '800px' }}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </article>

            <div style={{ marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid #222' }}>
                <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>More Readings</h3>
                <Link to="/feed" className="btn btn-outline">View All Posts</Link>
            </div>
        </div>
    );
};

export default BlogPost;
