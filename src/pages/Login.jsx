import React, { useState } from 'react';
import { auth } from '../lib/supabase-client';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await auth.signIn(email, password);
            navigate('/admin');
        } catch (error) {
            setError(error.message || 'Authentication failed');
        }
    };

    const handleGoogleSignIn = async () => {
        setError('');
        try {
            await auth.signInWithGoogle('/admin');
        } catch (error) {
            setError(error.message || 'Google sign-in failed');
        }
    };

    return (
        <div className="container section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ maxWidth: '400px', width: '100%', padding: '2rem', border: '1px solid #333' }}>
                <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Admin Login</h1>

                {error && <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.75rem', background: '#111', border: '1px solid #333', color: '#fff' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.75rem', background: '#111', border: '1px solid #333', color: '#fff' }}
                        />
                    </div>

                    <button type="submit" className="btn" style={{ marginTop: '1rem' }}>
                        Sign In
                    </button>
                </form>

                {/* Divider */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '1.5rem 0',
                    color: '#666'
                }}>
                    <div style={{ flex: 1, height: '1px', background: '#333' }}></div>
                    <span style={{ padding: '0 1rem', fontSize: '0.9rem' }}>OR</span>
                    <div style={{ flex: 1, height: '1px', background: '#333' }}></div>
                </div>

                {/* OAuth Button */}
                <button
                    onClick={handleGoogleSignIn}
                    type="button"
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: '#111',
                        border: '1px solid #333',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        cursor: 'pointer',
                        fontSize: '0.95rem',
                        transition: 'border-color 0.3s'
                    }}
                    onMouseEnter={(e) => e.target.style.borderColor = '#fff'}
                    onMouseLeave={(e) => e.target.style.borderColor = '#333'}
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                        <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
                        <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                        <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
