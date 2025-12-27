import React, { useState, useEffect } from 'react';
import { useSession } from '../lib/auth-client';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const { data: session, isPending } = useSession();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('posts');

    useEffect(() => {
        if (!isPending && !session) {
            navigate('/login');
        } else if (session && session.user.email !== 'breno@familiapires.com.br') {
            alert('Access Denied: You are not an admin.');
            // optionally sign out or redirect
            navigate('/');
        }
    }, [session, isPending, navigate]);

    if (isPending) return <div className="container section">Loading...</div>;
    if (!session) return null;

    return (
        <div className="container section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem' }}>Admin Dashboard</h1>
                <span>{session.user.name || session.user.email}</span>
            </div>

            <nav style={{ display: 'flex', borderBottom: '1px solid #333', marginBottom: '2rem', overflowX: 'auto' }}>
                {['posts', 'media', 'tools', 'playbooks', 'cases'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '1rem 2rem',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: activeTab === tab ? '2px solid #fff' : '2px solid transparent',
                            color: activeTab === tab ? '#fff' : '#666',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </nav>

            <div className="admin-content">
                {activeTab === 'posts' && <PostsManager />}
                {activeTab === 'media' && <MediaManager />}
                {activeTab === 'tools' && <ToolsManager />}
                {activeTab === 'playbooks' && <PlaybooksManager />}
                {activeTab === 'cases' && <CasesManager />}
            </div>
        </div>
    );
};

const PostsManager = () => {
    const [posts, setPosts] = useState([]);
    const [formData, setFormData] = useState({ title: '', summary: '', content: '', type: 'article' });
    const [loading, setLoading] = useState(false);

    const fetchPosts = () => fetch('/api/posts').then(res => res.json()).then(data => setPosts(data.results || []));

    useEffect(() => { fetchPosts(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Include credentials (cookies)
        await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
            credentials: 'include'
        });
        setLoading(false);
        setFormData({ ...formData, title: '', summary: '', content: '' });
        fetchPosts();
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete?')) return;
        await fetch(`/api/posts?id=${id}`, { method: 'DELETE', credentials: 'include' });
        fetchPosts();
    };

    return (
        <div>
            <h2>Manage Posts</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} style={inputStyle}>
                    <option value="article">Article</option>
                    <option value="thought">Thought</option>
                </select>
                <input placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} style={inputStyle} required />
                <textarea placeholder="Summary" value={formData.summary} onChange={e => setFormData({ ...formData, summary: e.target.value })} style={inputStyle} />
                <textarea placeholder="Content (HTML)" value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} style={{ ...inputStyle, minHeight: '100px' }} required />
                <button type="submit" className="btn" disabled={loading}>{loading ? 'Saving...' : 'Add Post'}</button>
            </form>
            <List items={posts} onDelete={handleDelete} titleKey="title" subKey="type" />
        </div>
    );
};

const MediaManager = () => {
    const [media, setMedia] = useState([]);
    const [formData, setFormData] = useState({ type: 'image', url: '', title: '', description: '' });
    const fetchMedia = () => fetch('/api/media').then(res => res.json()).then(data => setMedia(data.results || []));
    useEffect(() => { fetchMedia(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('/api/media', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
            credentials: 'include'
        });
        setFormData({ ...formData, url: '', title: '', description: '' });
        fetchMedia();
    };

    return (
        <div>
            <h2>Manage Media</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} style={inputStyle}>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                </select>
                <input placeholder="URL" value={formData.url} onChange={e => setFormData({ ...formData, url: e.target.value })} style={inputStyle} required />
                <input placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} style={inputStyle} />
                <input placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} style={inputStyle} />
                <button type="submit" className="btn">Add Media</button>
            </form>
            <List items={media} onDelete={async (id) => { await fetch(`/api/media?id=${id}`, { method: 'DELETE', credentials: 'include' }); fetchMedia(); }} titleKey="title" subKey="type" />
        </div>
    );
};

const ToolsManager = () => {
    const [tools, setTools] = useState([]);
    const [formData, setFormData] = useState({ name: '', category: '', description: '' });
    const fetchTools = () => fetch('/api/tools').then(res => res.json()).then(data => setTools(data.results || []));
    useEffect(() => { fetchTools(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('/api/tools', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
            credentials: 'include'
        });
        setFormData({ name: '', category: '', description: '' });
        fetchTools();
    };

    return (
        <div>
            <h2>Manage Tools</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <input placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={inputStyle} required />
                <input placeholder="Category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} style={inputStyle} required />
                <input placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} style={inputStyle} />
                <button type="submit" className="btn">Add Tool</button>
            </form>
            <List items={tools} onDelete={async (id) => { await fetch(`/api/tools?id=${id}`, { method: 'DELETE', credentials: 'include' }); fetchTools(); }} titleKey="name" subKey="category" />
        </div>
    );
};

const PlaybooksManager = () => {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({ id: '', title: '', category: '', summary: '', details: '' });
    const fetchItems = () => fetch('/api/playbooks').then(res => res.json()).then(data => setItems(data.results || []));
    useEffect(() => { fetchItems(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = { ...formData, steps: [] }; // Steps simplified for now
        await fetch('/api/playbooks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            credentials: 'include'
        });
        setFormData({ id: '', title: '', category: '', summary: '', details: '' });
        fetchItems();
    };

    return (
        <div>
            <h2>Manage Playbooks</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <input placeholder="ID (slug)" value={formData.id} onChange={e => setFormData({ ...formData, id: e.target.value })} style={inputStyle} required />
                <input placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} style={inputStyle} required />
                <input placeholder="Category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} style={inputStyle} required />
                <textarea placeholder="Summary" value={formData.summary} onChange={e => setFormData({ ...formData, summary: e.target.value })} style={inputStyle} />
                <textarea placeholder="Details (HTML)" value={formData.details} onChange={e => setFormData({ ...formData, details: e.target.value })} style={{ ...inputStyle, minHeight: '100px' }} />
                <button type="submit" className="btn">Add Playbook</button>
            </form>
            <List items={items} onDelete={async (id) => { await fetch(`/api/playbooks?id=${id}`, { method: 'DELETE', credentials: 'include' }); fetchItems(); }} titleKey="title" subKey="category" />
        </div>
    );
};

const CasesManager = () => {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({ title: '', summary: '', result: '' });
    const fetchItems = () => fetch('/api/cases').then(res => res.json()).then(data => setItems(data.results || []));
    useEffect(() => { fetchItems(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = { ...formData, lessons: [] }; // Lessons simplified
        await fetch('/api/cases', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            credentials: 'include'
        });
        setFormData({ title: '', summary: '', result: '' });
        fetchItems();
    };

    return (
        <div>
            <h2>Manage Case Studies</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <input placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} style={inputStyle} required />
                <textarea placeholder="Summary" value={formData.summary} onChange={e => setFormData({ ...formData, summary: e.target.value })} style={inputStyle} />
                <textarea placeholder="Result" value={formData.result} onChange={e => setFormData({ ...formData, result: e.target.value })} style={inputStyle} />
                <button type="submit" className="btn">Add Case</button>
            </form>
            <List items={items} onDelete={async (id) => { await fetch(`/api/cases?id=${id}`, { method: 'DELETE', credentials: 'include' }); fetchItems(); }} titleKey="title" subKey="result" />
        </div>
    );
};

// Reusable List Component
const List = ({ items, onDelete, titleKey, subKey }) => (
    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {items.map(item => (
            <li key={item.id} style={{ border: '1px solid #222', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <strong>{item[titleKey]}</strong>
                    {subKey && <span style={{ marginLeft: '1rem', fontSize: '0.8rem', color: '#666' }}>{item[subKey]}</span>}
                </div>
                <button onClick={() => { if (confirm('Delete?')) onDelete(item.id) }} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
            </li>
        ))}
    </ul>
);

const formStyle = { margin: '2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid #333', padding: '1rem' };
const inputStyle = { padding: '0.8rem', background: '#000', border: '1px solid #333', color: '#fff', fontFamily: 'inherit' };

export default Admin;
