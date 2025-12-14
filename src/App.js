import React, { useState, useEffect } from 'react';
import Header from './components/Header.js';
import Home from './pages/Home.js';
import Favorites from './pages/Favorites.js';
import RecipeModal from './components/RecipeModal.js';
import { searchRecipes } from './services/ai.js';

export default function App() {
  const [view, setView] = useState('home');
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const results = await searchRecipes(query);
      // Ensure IDs are unique enough for this session
      const resultsWithIds = results.map((r, i) => ({ ...r, id: r.id || `gen-${Date.now()}-${i}` }));
      setRecipes(resultsWithIds);
    } catch (error) {
      console.error("Error generating recipes:", error);
      alert("Something went wrong while generating recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (recipe) => {
    let newFavs;
    if (favorites.some(f => f.id === recipe.id)) {
      newFavs = favorites.filter(f => f.id !== recipe.id);
    } else {
      newFavs = [...favorites, recipe];
    }
    setFavorites(newFavs);
    localStorage.setItem('favorites', JSON.stringify(newFavs));
  };

  return (
    <>
      <Header currentView={view} setView={setView} />
      
      {view === 'home' && (
        <Home
          onSearch={handleSearch}
          recipes={recipes}
          loading={loading}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onOpenRecipe={setSelectedRecipe}
        />
      )}

      {view === 'favorites' && (
        <Favorites
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onOpenRecipe={setSelectedRecipe}
        />
      )}

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </>
  );
}