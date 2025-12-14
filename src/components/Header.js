import React from 'react';

export default function Header({ currentView, setView }) {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo" onClick={() => setView('home')}>
          🍳 Recipes
        </div>
        <nav style={{ display: 'flex', gap: '10px' }}>
          <button
            className={`nav-btn ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => setView('home')}
          >
            Search
          </button>
          <button
            className={`nav-btn ${currentView === 'favorites' ? 'active' : ''}`}
            onClick={() => setView('favorites')}
          >
            Favorites
          </button>
        </nav>
      </div>
    </header>
  );
}