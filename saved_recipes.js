import { recipes as recipeList } from './script.js';

document.addEventListener("DOMContentLoaded", () => {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    const container = document.getElementById('saved-recipes');

    if (!container) {
        console.error("Missing container for saved recipes.");
        return;
    }

    if (savedRecipes.length === 0) {
        container.innerHTML = "<p>No saved recipes yet. Go add some!</p>";
        return;
    }

    const group = document.createElement('div');
    group.className = 'recipe-group';

    savedRecipes.forEach(id => {
        const recipe = recipeList[id];
        if (recipe) {
            const card = document.createElement('div');
            card.className = 'recipe-card';
            card.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
            `;
            group.appendChild(card);
        }
    });

    container.appendChild(group);
});
