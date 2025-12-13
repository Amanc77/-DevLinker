import { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = "Search tech stack, location, or interests...", defaultValue = '' }) => {
  const [query, setQuery] = useState(defaultValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400 dark:text-muted-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-24 py-4 bg-white dark:bg-dark-card border border-gray-300 dark:border-dark-border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-muted-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 pr-2 flex items-center"
        >
          <span className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
            Search
          </span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

