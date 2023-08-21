import React, { useState } from 'react';
import { sendRequest } from '../../core/config/request';
import { requestMethods } from '../../core/enums/requestMethods';


function SearchBar({ setRecipes }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await sendRequest({
                route: `/user/recipes/search/${searchQuery}`,
                method: requestMethods.GET,
            });
            console.log(response)

            if (response.recipes) {
                setRecipes(response.recipes);
            }
        } catch (error) {
            console.error('Failed to search:', error);
        }
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;
