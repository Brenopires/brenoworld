import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Feed', path: '/feed' },
        { name: 'Tools', path: '/tools' },
        { name: 'Cases', path: '/cases' },
        { name: 'Playbooks', path: '/playbooks' },
        { name: 'Goals', path: '/goals' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar" style={{
            padding: '1.5rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            backgroundColor: 'rgba(0,0,0,0.9)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid #222'
        }}>
            <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}> BP.</Link>

            {/* Desktop Menu */}
            <div className="desktop-menu" style={{ display: 'flex', gap: '2rem' }}>
                {links.map(link => (
                    <Link
                        key={link.path}
                        to={link.path}
                        style={{
                            color: isActive(link.path) ? '#fff' : '#888',
                            fontWeight: isActive(link.path) ? '600' : '400',
                            textTransform: 'uppercase',
                            fontSize: '0.85rem',
                            letterSpacing: '1px'
                        }}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* Mobile Menu Toggle (Simple placeholder implementation) */}
            <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
