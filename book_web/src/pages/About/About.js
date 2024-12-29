import React, { useEffect, useState } from 'react';
import './About.css';

const About = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="about-container">
            <h1>Welcome to BookQuest!</h1>
            <p className="about-description">
                BookQuest is an intelligent book recommendation system that helps users discover books suited to their personal preferences.
                Using advanced algorithms, the platform provides personalized recommendations and integrates key features like book search, reviews, chat, and book writing tools, creating a complete user experience.
            </p>

            <div className="project-section">
                <div className="project-members">
                    <h2>Contact</h2>
                    <ul className="member-list">
                        <li>We're here to help! If you're having issues, contact support via:</li>
                        <li>Email: bookquest.system@gmail.com</li>
                        <li>Phone: 0833096343</li>
                    </ul>
                </div>

                <div className="project-gallery">
                    <h2>Photo Of Teamwork Process</h2>
                    <div className="gallery-images">
                        <img src="/images/about1.jpg" alt="about 1" />
                        <img src="/images/about2.jpg" alt="about 2" />
                        <img src="/images/about3.jpg" alt="about 3" />
                    </div>
                </div>
            </div>

            {showButton && (
                <button className="scroll-top-btn" onClick={scrollToTop}>
                    ↑
                </button>
            )}
        </div>
    );
};

export default About;
