import { recipes as recipeList } from "./script.js";

document.addEventListener("DOMContentLoaded", () => {
    const recipes = recipeList;
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    const container = document.getElementById('saved-recipes');
    console.log(recipes, savedRecipes, container);

    function createRecipeCard(recipe) {
        const card = document.createElement('div');
        card.className = 'recipe-card';

        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p><strong>Category:</strong> ${recipe.category}</p>
            <p><strong>Time:</strong> ${recipe.time}</p>
            <p><strong>Rating:</strong> ${recipe.rating} ⭐</p>
        `;
        return card;
    }

    function renderRecipes() {
        if (!container) {
            console.error("Container element with ID 'saved-recipes' not found.");
            return;
        }

        const group = document.createElement('div');
        group.className = 'recipe-group';

        savedRecipes.forEach(id => {
            const recipe = recipes[id];
            if (recipe) {
                const card = createRecipeCard(recipe);
                group.appendChild(card);
            }
        });

        container.appendChild(group);
    }

    renderRecipes();
});
