import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Principles from '../components/Principles';
import CTA from '../components/CTA';

const Home = () => {
    return (
        <>
            <Hero />
            <About />
            <Projects />
            <Principles />
            <CTA />
        </>
    );
};

export default Home;
