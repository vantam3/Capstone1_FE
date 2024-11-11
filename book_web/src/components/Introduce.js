import React from 'react';
import './Introduce.css';

const Introduce = () => {
    return (
        <div className="introduce-container">
            <h1>Welcome to BookQuest!</h1>
            <p>
                BookQuest is an intelligent book recommendation system that helps users discover books suited to their personal preferences.
                 Using advanced algorithms, the platform provides personalized recommendations and integrates key features like book search, reviews, chat, and book writing tools, creating a complete user experience.
            </p>

            <div className="project-section">
                <div className="project-members">
                    <h2>BookQuest Project Members</h2>
                    <ul className="member-list">
                        <li><strong>Tran Van Tam</strong> - ID: 27211202895 - Project Leader</li>
                        <hr />
                        <li><strong>Le Vu Gia Bao</strong> - ID: 27211241330 - Team Member</li>
                        <hr />
                        <li><strong>Nguyen Ha Long</strong> - ID: 27211237844 - Team Member</li>
                        <hr />
                        <li><strong>Le Truc Phuong Quynh</strong> - ID: 27201238931 - Team Member</li>
                        <hr />
                        <li><strong>Vo Duy Nhut</strong> - ID: 27211438669 - Team Member</li>
                    </ul>
                </div>

                <div className="project-gallery">
                    <h2>Photo Of Teamwork Process</h2>
                    <div className="gallery-images">
                        <img src={`${process.env.PUBLIC_URL}/img/introduce1.jpg`} alt="Image 1" />
                        <img src={`${process.env.PUBLIC_URL}/img/introduce2.jpg`} alt="Image 2" />
                        <img src={`${process.env.PUBLIC_URL}/img/introduce3.jpg`} alt="Image 3" />
                        <img src={`${process.env.PUBLIC_URL}/img/introduce4.jpg`} alt="Image 4" />
                        <img src={`${process.env.PUBLIC_URL}/img/introduce5.jpg`} alt="Image 5" />
                        <img src={`${process.env.PUBLIC_URL}/img/introduce6.jpg`} alt="Image 6" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Introduce;
