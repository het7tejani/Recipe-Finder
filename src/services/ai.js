import axios from 'axios';

// TheMealDB public test API key is '1'
const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export async function searchRecipes(query) {
  try {
    // If query is empty, return empty array
    if (!query || !query.trim()) return [];

    const response = await axios.get(`${API_URL}${query}`);
    const meals = response.data.meals;

    if (!meals) return [];

    return meals.map(meal => {
      // Extract ingredients and measures into a clean list
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        
        if (ingredient && ingredient.trim()) {
          const item = measure ? `${measure.trim()} ${ingredient.trim()}` : ingredient.trim();
          ingredients.push(item);
        }
      }

      // Format instructions into an array (splitting by new lines or periods)
      const rawInstructions = meal.strInstructions || "";
      const instructions = rawInstructions
        .split(/\r\n|\n|\r/)
        .filter(line => line.trim().length > 3); // Filter out very short empty lines

      // Generate tags
      const tags = meal.strTags 
        ? meal.strTags.split(',').map(t => t.trim()) 
        : [meal.strCategory, meal.strArea].filter(Boolean);

      // Estimate difficulty based on ingredient count
      let difficulty = "Medium";
      if (ingredients.length <= 5) difficulty = "Easy";
      if (ingredients.length > 12) difficulty = "Hard";

      return {
        id: meal.idMeal,
        title: meal.strMeal,
        description: `A delicious ${meal.strArea} ${meal.strCategory} dish.`,
        readyInMinutes: 30 + Math.floor(Math.random() * 30), // Mock data as API doesn't provide time
        servings: 2 + Math.floor(Math.random() * 3), // Mock servings
        difficulty: difficulty,
        ingredients: ingredients,
        instructions: instructions,
        tags: tags,
        image: meal.strMealThumb
      };
    });

  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
}