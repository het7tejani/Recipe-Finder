import React, { useState } from 'react';

export default function SearchSection({ onSearch, loading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <section className="search-section">
      <form onSubmit={handleSubmit}>
        <div className="search-row">
          <div className="input-group">
            <label className="input-label">Find a recipe</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g., Pasta, Chicken, Cake"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? (
              <>
                <div className="loader" style={{ width: '20px', height: '20px', border: '2px solid #f3f3f3', borderTop: '2px solid white' }}></div>
                Searching...
              </>
            ) : (
              'Search Recipes'
            )}
          </button>
        </div>
      </form>
    </section>
  );
}