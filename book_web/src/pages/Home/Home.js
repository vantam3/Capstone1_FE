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
                        {/* Section 1 - Hình ảnh bên trái, nội dung bên phải */}
                        <div className="section section-1 section-left">
                            <div className="images">
                                <img src="/images/book1.jpg" alt="Image 1" />
                                <img src="/images/book2.jpg" alt="Image 2" />
                                <img src="/images/book3.jpg" alt="Image 3" />
                            </div>
                            <div className="content">
                                <h2>Khám Phá Sách Mới</h2>
                                <p>Khám phá các tựa sách mới và thú vị để bắt đầu cuộc hành trình của bạn.</p>
                                <Link to="/explore" className="section-button">
                                    <button>Khám Phá Ngay</button>
                                </Link>
                            </div>
                        </div>

                        {/* Section 2 - Nội dung bên trái, ảnh bên phải */}
                        <div className="section section-2 section-right">
                            <div className="content">
                                <h2>Gợi ý sách theo sở thích</h2>
                                <p>Dựa trên lựa chọn của bạn, chúng tôi sẽ đề xuất sách phù hợp</p>
                                <Link to="/categories" className="section-button">
                                    <button>Khám Phá Thể Loại</button>
                                </Link>
                            </div>
                            <div className="single-image">
                                <img src="/images/image4.jpg" alt="Category Image" />
                            </div>
                        </div>

                        {/* Section 3 - Hình ảnh bên trái, nội dung bên phải */}
                        <div className="section section-3 section-left">
                            <div className="images">
                                <img src="/images/image5.jpg" alt="Image 5" />
                                <img src="/images/image6.jpg" alt="Image 6" />
                            </div>
                            <div className="content">
                                <h1>Viết và Chia sẻ Sách</h1>
                                <p>Đóng góp và chia sẻ những cuốn sách bạn yêu thích với cộng đồng</p>
                                <Link to="/share" className="section-button">
                                    <button>Chia Sẻ Ngay</button>
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
