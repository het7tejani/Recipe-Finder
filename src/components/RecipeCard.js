import React from 'react';

export default function RecipeCard({ recipe, onOpen, isFavorite, onToggleFavorite }) {
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(recipe);
  };

  const headerStyle = recipe.image ? {
    backgroundImage: `url(${recipe.image})`,
    color: 'transparent'
  } : {};

  return (
    <div className="recipe-card" onClick={() => onOpen(recipe)}>
      <div className="card-header" style={headerStyle}>
        {!recipe.image && "🍽️"}
        <button
          className={`fav-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      <div className="card-body">
        <h3 className="card-title">{recipe.title}</h3>
        <div className="card-meta">
          <span>🕒 {recipe.readyInMinutes}m</span>
          <span>👥 {recipe.servings} ppl</span>
          <span>🔥 {recipe.difficulty}</span>
        </div>
        <div className="card-tags">
          {recipe.tags && recipe.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>
        <button className="view-btn">View Recipe</button>
      </div>
    </div>
  );
}