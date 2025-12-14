import React from 'react';
import RecipeCard from '../components/RecipeCard.js';

export default function Favorites({ favorites, onToggleFavorite, onOpenRecipe }) {
  return (
    <main className="container" style={{ paddingTop: '2rem' }}>
      <h1>Your Favorite Recipes</h1>
      {favorites.length > 0 ? (
        <div className="recipe-grid">
          {favorites.map((recipe, index) => (
            <RecipeCard
              key={recipe.id || index}
              recipe={recipe}
              onOpen={onOpenRecipe}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>You haven't saved any recipes yet.</p>
        </div>
      )}
    </main>
  );
}