import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ReadBook.css';

function ReadBook() {
    const { bookId } = useParams();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookContent = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/books/${bookId}/content/`);
                if (response.data.content) {
                    setContent(response.data.content); // Lưu nội dung HTML vào state
                } else {
                    setError("No content found.");
                }
                setLoading(false);
            } catch (err) {
                setError("Content not found for this book.");
                setLoading(false);
            }
        };

        fetchBookContent();
    }, [bookId]);

    if (loading) {
        return <p className="read-book-loading">Loading content...</p>;
    }

    if (error) {
        return <p className="read-book-error">{error}</p>;
    }

    return (
        <div className="read-book-container">
            <div className="read-book-content" dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
    );
}

export default ReadBook;
