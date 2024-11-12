import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <ReactFullpage
            scrollingSpeed={1000}
            render={({ state, fullpageApi }) => {
                return (
                    <ReactFullpage.Wrapper>
                        {}
                        <div className="section section-1 section-left">
                            <div className="images">
                                <img src="/images/book1.jpg" alt="book cover" />
                                <img src="/images/book2.jpg" alt="user avatar" />
                                <img src="/images/book3.jpg" alt="profile" />
                            </div>
                            <div className="content">
                                <h2>Explore the World of Books</h2>
                                <p>From timeless classics to the latest bestsellers, explore our vast collection tailored just for you.</p>
                                <Link to="/Library" className="section-button">
                                    <button>Explore Now</button>
                                </Link>
                            </div>
                        </div>

                        {}
                        <div className="section section-2 section-right">
                            <div className="content">
                                <h2>Books Recommended Just for You</h2>
                                <p>Discover books that match your tastes with personalized recommendations from our collection.</p>
                                <Link to="/Library" className="section-button">
                                    <button>Get Recommendations</button>
                                </Link>
                            </div>
                            <div className="single-image">
                                <img src="/images/book5.png" alt="Category" />
                            </div>
                        </div>

                        {}
                        <div className="section section-3 section-left">
                            <div className="images">
                                <img src="/images/book6.jpg" alt="book 6" />
                                <img src="/images/book6.jpg" alt="book 6" />
                            </div>
                            <div className="content">
                                <h1>Start Your Journey as an Author</h1>
                                <p>Ready to share your story? Begin crafting your book with our easy-to-use tools.</p>
                                <Link to="/create" className="section-button">
                                    <button>Create Your Book</button>
                                </Link>
                            </div>
                        </div>
                    </ReactFullpage.Wrapper>
                );
            }}
        />
    );
}

export default Home;
