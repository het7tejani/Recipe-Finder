import React from 'react';

export default function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{recipe.title}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {recipe.image && (
            <img src={recipe.image} alt={recipe.title} className="modal-image" />
          )}
          
          <p className="card-meta" style={{marginBottom: '2rem'}}>{recipe.description}</p>
          
          <div className="modal-section">
            <h3>Ingredients</h3>
            <ul className="ingredient-list">
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>

          <div className="modal-section">
            <h3>Instructions</h3>
            <ol className="instruction-list">
              {recipe.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}