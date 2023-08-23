import React, { useState } from 'react';
import { sendRequest } from '../../core/config/request';
import { requestMethods } from '../../core/enums/requestMethods';


function SearchBar({ setBooks }) {
    const [searchText, setSearchText] = useState('');

    const handleSearch = async () => {
        try {
            const response = await sendRequest({
                route: `/books/search/${searchText}`,
                method: requestMethods.GET,
            });
            console.log(response)
            setBooks(response);
        } catch (error) {
            console.error('Failed to search:', error);
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search by genre, author, or keyword"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBar;
