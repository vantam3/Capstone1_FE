import React from 'react';
import './SearchBar.css';


function SearchBar() {
    return (
        <input
            type="text"
            className="search-bar"
            placeholder="Tìm kiếm sách..."
        />
    );
}

export default SearchBar;
