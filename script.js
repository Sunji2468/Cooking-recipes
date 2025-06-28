function scrollCarousel(offset) {
    document.getElementById('carousel').scrollBy({
        left: offset,
        behavior: 'smooth'
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('recipe-search');
    const searchButton = document.getElementById('search-button');
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    searchInput.addEventListener('input', function() {
        if (this.value.length > 2 || this.value.length === 0) {
            performSearch();
        }
    });
    
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        recipeCards.forEach(card => {
            const recipeName = card.querySelector('h3').textContent.toLowerCase();
            const recipeDesc = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : '';
            const ingredients = card.dataset.ingredients ? card.dataset.ingredients.toLowerCase() : '';
            
            if (searchTerm === '' || 
                recipeName.includes(searchTerm) || 
                recipeDesc.includes(searchTerm) || 
                ingredients.includes(searchTerm)) {
                card.style.display = 'block';
                card.classList.add('visible');
                card.classList.remove('hidden');
            } else {
                card.style.display = 'none';
                card.classList.add('hidden');
                card.classList.remove('visible');
            }
        });
        animateSearchResults();
    }
    
    function animateSearchResults() {
        const visibleCards = document.querySelectorAll('.recipe-card.visible');
        visibleCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in');
        });
    }

    function clearSearch() {
        searchInput.value = '';
        performSearch();
    }

    const recipes = {
        'roasted-tomato-sauce-pasta': {
            id: 'roasted-tomato-sauce-pasta',
            title: 'Roasted tomato sauce pasta',
            category: 'Main Dish',
            time: '30 mins',
            rating: 4,
            image: 'https://cdn77-s3.lazycatkitchen.com/wp-content/uploads/2021/10/roasted-tomato-sauce-portion-800x1200.jpg',
            ingredients: [
                '1 kg / 34 oz small tomatoes',
                '8 cloves of garlic',
                '45 ml / 3 tbsp olive oil',
                '1½ tsp dried oregano',
                'salt and pepper, to taste',
                'pinch of chilli (optional)',
                'pinch of sugar (optional)',
                'a sprig of basil (optional)',
                '300 g / 10½ oz favourite pasta'
            ],
            instructions: [
                'Heat up the oven to 220° C',
                'Cut the tomatoes and place in a large baking dish with unpeeled, crushed garlic',
                'Drizzle with olive oil, season with oregano, salt, pepper, and a pinch of sugar if needed. Add fresh basil if available.',
                'Bake for 25-30 minutes',
                'Cook your pasta just short of al dente',
                'Once tomatoes are soft, juicy and lightly charred in places, place the tomatoes and their juices into a blender',
                'Transfer to a pan to heat it up gently, adjust the seasoning if needed and toss cooked pasta in the sauce.'
            ]
        },

        'Chicken burger': {
            id: 'Chicken burger',
            title: 'Chicken burger',
            category: 'Main Dish',
            time: '90 mins',
            rating: 5,
            image: 'https://www.recipetineats.com/tachyon/2023/09/Crispy-fried-chicken-burgers_5.jpg?resize=900%2C1125&zoom=1',
            ingredients: [
                'Chicken breast',
                'Buttermilk',
                'Salt',
                'Egg',
                'Herbs and spices',
                'Cornflour/cornstarch and flour',
                'Soft buns',
                'Gherkins/pickles',
                'Lettuce',
                'Garlic mayonnaise'
            ],
            instructions: [
                'Pound the chicken to 1cm / 0.4″ even thickness.',
                'Mix the buttermilk, salt and egg. Then add the chicken and toss to coat. Marinate for at least 3 hours, or up to 24 hours.',
                'Mix together the flour, cornflour/cornstarch and all the spices.',
                'Coat the chicken in the flour mixture just prior to frying.',
                'Fry in oil for 4 minutes or until golden and crunchy, then drain on paper towels.',
            ]
        }
    };

    const modal = document.getElementById('recipe-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalTime = document.getElementById('modal-time');
    const modalRating = document.getElementById('modal-rating');
    const modalImage = document.getElementById('modal-image');
    const modalIngredients = document.getElementById('modal-ingredients');
    const modalInstructions = document.getElementById('modal-instructions');
    const saveRecipeBtn = document.querySelector('.save-recipe-btn');

    // click for the recipe cards
    document.querySelectorAll('.recipe-card').forEach(card => {
        card.addEventListener('click', function() {
            const recipeId = this.dataset.recipeId || 'roasted-tomato-sauce-pasta';
            showRecipeDetails(recipeId);
        });
    });

    function showRecipeDetails(recipeId) {
        const recipe = recipes[recipeId];
        
        if (!recipe) {
            console.error('Recipe not found:', recipeId);
            return;
        }
        
        modalTitle.textContent = recipe.title;
        modalCategory.textContent = recipe.category;
        modalTime.textContent = recipe.time;
        modalImage.src = recipe.image;
        modalImage.alt = recipe.title;

        modalRating.innerHTML = '';
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.textContent = i <= recipe.rating ? '★' : '☆';
            star.style.color = i <= recipe.rating ? '#eca253' : '#ccc';
            modalRating.appendChild(star);
        }
        
        modalIngredients.innerHTML = '';
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            modalIngredients.appendChild(li);
        });

        modalInstructions.innerHTML = '';
        recipe.instructions.forEach(step => {
            const li = document.createElement('li');
            li.textContent = step;
            modalInstructions.appendChild(li);
        });

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    document.querySelector('.close-modal').addEventListener('click', closeModal);
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if (saveRecipeBtn) {
        saveRecipeBtn.addEventListener('click', function() {
            const recipeTitle = modalTitle.textContent;
            saveRecipe(recipeTitle);
            this.textContent = 'Saved!';
            setTimeout(() => {
                this.textContent = 'Save Recipe';
            }, 2000);
        });
    }

    function saveRecipe(recipeTitle) {
        let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
        const recipeId = recipeTitle.toLowerCase().replace(/\s+/g, '-');
        if (!savedRecipes.includes(recipeId)) {
            savedRecipes.push(recipeId);
            localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
        }
    }
});