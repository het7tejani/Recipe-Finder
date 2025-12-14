import React from 'react';
import SearchSection from '../components/SearchSection.js';
import RecipeCard from '../components/RecipeCard.js';

const POPULAR_CATEGORIES = [
  { name: 'Pizza', emoji: '🍕' },
  { name: 'Burger', emoji: '🍔' },
  { name: 'Pasta', emoji: '🍝' },
  { name: 'Chicken', emoji: '🍗' },
  { name: 'Beef', emoji: '🥩' },
  { name: 'Seafood', emoji: '🦐' },
  { name: 'Vegan', emoji: '🌱' },
  { name: 'Breakfast', emoji: '🍳' },
  { name: 'Salad', emoji: '🥗' },
];

export default function Home({ onSearch, recipes, loading, favorites, onToggleFavorite, onOpenRecipe }) {
  return (
    <main className="container">
      <SearchSection onSearch={onSearch} loading={loading} />
      
      <div className="category-section">
        <h3 className="section-title">Popular Categories</h3>
        <div className="category-list">
          {POPULAR_CATEGORIES.map(cat => (
            <button 
              key={cat.name} 
              className="category-pill"
              onClick={() => onSearch(cat.name)}
              disabled={loading}
            >
              <span>{cat.emoji}</span> {cat.name}
            </button>
          ))}
        </div>
      </div>
      
      {recipes.length > 0 ? (
        <div className="recipe-grid">
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={recipe.id || index}
              recipe={recipe}
              onOpen={onOpenRecipe}
              isFavorite={favorites.some(f => f.id === recipe.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          {!loading && <p>Select a category above or search to find delicious recipes!</p>}
        </div>
      )}
    </main>
  );
}