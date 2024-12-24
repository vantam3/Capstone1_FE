import React, { useRef, useEffect } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    const sectionRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    } else {
                        entry.target.classList.remove('visible');
                    }
                });
            },
            { threshold: 0.3 } // Kích hoạt khi 30% của section nằm trong khung nhìn
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            sectionRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    return (
        <ReactFullpage
            scrollingSpeed={1000}
            render={() => {
                return (
                    <ReactFullpage.Wrapper>
                        {/* Section 1 */}
                        <div
                            ref={(el) => (sectionRefs.current[0] = el)}
                            className="section section-1 section-left"
                        >
                            <div className="images">
                                <img src="/images/book1.jpg" alt="Book 1" />
                                <img src="/images/book2.jpg" alt="Book 2" />
                                <img src="/images/book3.jpg" alt="Book 3" />
                                <img src="/images/book4.jpg" alt="Book 4" />
                            </div>
                            <div className="content">
                                <h2>Explore the World of Books</h2>
                                <p>From timeless classics to the latest bestsellers, explore our vast collection tailored just for you.</p>
                                <Link to="/Library" className="section-button">
                                    <button>Explore Now</button>
                                </Link>
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div
                            ref={(el) => (sectionRefs.current[1] = el)}
                            className="section section-2 section-right"
                        >
                            <div className="content">
                                <h2>Books Recommended Just for You</h2>
                                <p>Discover books that match your tastes with personalized recommendations from our collection.</p>
                                <Link to="/Recommend" className="section-button">
                                    <button>Get Recommendations</button>
                                </Link>
                            </div>
                            <div className="single-image">
                                <img src="/images/book5.png" alt="Category Image" />
                            </div>
                        </div>

                        {/* Section 3 */}
                        <div className="section section-3 section-left">
                            <div className="images">
                                <img src="/images/book6.jpg" alt="Image 5" />
                                <img src="/images/book6.jpg" alt="Image 6" />
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