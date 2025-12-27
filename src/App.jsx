import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Feed from './pages/Feed';
import BlogPost from './pages/BlogPost';
import Tools from './pages/Tools';
import Playbooks from './pages/Playbooks';
import Playbook from './pages/Playbook';
import CaseStudies from './pages/CaseStudies';
import MapPage from './pages/MapPage';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Goals from './pages/Goals';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/playbooks" element={<Playbooks />} />
          <Route path="/playbook/:id" element={<Playbook />} />
          <Route path="/cases" element={<CaseStudies />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/goals" element={<Goals />} />
        </Routes>
      </main>
      <footer style={{ padding: '4rem 0 2rem', textAlign: 'center', color: 'var(--color-gray)', fontSize: '0.9rem', borderTop: '1px solid #111', marginTop: '4rem' }}>
        <p>&copy; {new Date().getFullYear()} Breno Pires. All rights reserved.</p>
      </footer>
    </Router>
  );
}

export default App;
