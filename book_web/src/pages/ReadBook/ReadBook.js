import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ReadBook.css';

function ReadBook() {
    const { bookId } = useParams();
    console.log("bookId from URL:", bookId);

    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookContent = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/books/${bookId}/content/`);
                console.log("API response:", response.data);
                if (response.data.content) {
                    setContent(response.data.content); // Lưu nội dung HTML vào state
                } else {
                    setError("No content found.");
                }
                setLoading(false);
            } catch (err) {
                console.error("Axios error:", err.response || err.message);
                setError("Content not found for this book.");
                setLoading(false);
            }
        };

        fetchBookContent();
    }, [bookId]);

    if (loading) {
        return <p>Loading content...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="read-book-container">
            {/* <h1>Book Content</h1> */}
            <br></br>
            <div className="book-content1" dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
    );
}

export default ReadBook;