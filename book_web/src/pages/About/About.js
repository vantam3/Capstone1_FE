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
                    <h2>BookQuest Project Members</h2>
                    <ul className="member-list">
                        <li><strong>Tran Van Tam</strong> - ID: 27211202895 - Project Leader</li>
                        <li><strong>Le Vu Gia Bao</strong> - ID: 27211241330 - Team Member</li>
                        <li><strong>Nguyen Ha Long</strong> - ID: 27211237844 - Team Member</li>
                        <li><strong>Le Truc Phuong Quynh</strong> - ID: 27201238931 - Team Member</li>
                        <li><strong>Vo Duy Nhut</strong> - ID: 27211438669 - Team Member</li>
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
