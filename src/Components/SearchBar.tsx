import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import debounce from 'lodash/debounce';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Debounced function to fetch suggestions
    const fetchSuggestions = debounce(async (searchQuery) => {
        if (!searchQuery.trim()) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/api/search/suggestions?query=${searchQuery}`);
            setSuggestions(response.data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    }, 300);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setShowSuggestions(true);
        fetchSuggestions(value);
    };

    const handleSearch = (searchQuery = query) => {
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setShowSuggestions(false);
            setQuery('');
        }
    };

    const handleSuggestionClick = (suggestion) => {
        navigate(`/product/${suggestion._id}`);
        setShowSuggestions(false);
        setQuery('');
    };

    return (
        <div className="relative w-full max-w-xl" ref={searchRef}>
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Search products..."
                    className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-full focus:outline-none focus:border-teal-500"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {query && (
                    <button
                        onClick={() => {
                            setQuery('');
                            setSuggestions([]);
                        }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <FiX />
                    </button>
                )}
            </div>

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
                    {suggestions.map((suggestion) => (
                        <div
                            key={suggestion._id}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                        >
                            <img
                                src={suggestion.image}
                                alt={suggestion.name}
                                className="w-12 h-12 object-cover rounded"
                            />
                            <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{suggestion.name}</div>
                                <div className="text-sm text-gray-500">
                                    {suggestion.category} • ₹{suggestion.price}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
