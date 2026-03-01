// Загружаем ингредиенты пользователя
const userIngredients = JSON.parse(localStorage.getItem('userIngredients')) || [];

// Ищем рецепты
const foundRecipes = findRecipesByIngredients(userIngredients);

// Функция для расчета процента совпадения
function calculateMatchPercentage(recipeIngredients) {
  const matchedIngredients = userIngredients.filter(ingredient =>
    recipeIngredients.some(recipeIngredient =>
      recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
    )
  );
  
  return Math.round((matchedIngredients.length / recipeIngredients.length) * 100);
}

// Функция для открытия модального окна с рецептом
function openRecipeModal(recipe) {
  const modal = document.getElementById('recipeModal');
  const modalContent = document.getElementById('modalRecipeContent');
  
  // Форматируем инструкции (если их нет, добавляем стандартные)
  const instructions = recipe.instructions || 
    '1. Подготовьте все ингредиенты\n2. Смешайте ингредиенты согласно рецепту\n3. Приготовьте блюдо\n4. Подавайте и наслаждайтесь!';
  
  modalContent.innerHTML = `
    <h2>${recipe.name}</h2>
    
    <img src="${recipe.image}" alt="${recipe.name}" class="modal-recipe-image" onerror="this.src='img/default-recipe.jpg'">
    
    <div class="modal-meta-info">
      <div class="modal-meta-item">
        <span>⏱</span> ${recipe.cookingTime || '30 минут'}
      </div>
      <div class="modal-meta-item">
        <span>📊</span> ${recipe.difficulty || 'Средне'}
      </div>
      <div class="modal-meta-item">
        <span>👨‍🍳</span> Порций: ${recipe.servings || '2-3'}
      </div>
    </div>
    
    <p style="font-size: 18px; color: #555; margin: 20px 0;">${recipe.description || 'Вкусное домашнее блюдо'}</p>
    
    <div class="modal-section">
      <h3>📝 Ингредиенты:</h3>
      <ul class="modal-ingredients-list">
        ${recipe.ingredients.map(ing => {
          const hasIngredient = userIngredients.some(userIng => 
            ing.toLowerCase().includes(userIng.toLowerCase())
          );
          return `<li style="${hasIngredient ? 'border-left-color: #4caf50; background: #e8f5e9;' : ''}">${ing}</li>`;
        }).join('')}
      </ul>
    </div>
    
    <div class="modal-section">
      <h3>👩‍🍳 Приготовление:</h3>
      <div class="modal-instructions">${instructions.replace(/\n/g, '<br>')}</div>
    </div>
  `;
  
  modal.style.display = 'block';
  
  // Блокируем прокрутку основной страницы
  document.body.style.overflow = 'hidden';
}

// Функция закрытия модального окна
function closeModal() {
  document.getElementById('recipeModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Отображаем результаты
function displayResults() {
  const container = document.getElementById('resultsContainer');
  
  if (foundRecipes.length === 0) {
    container.innerHTML = '<p class="no-results">😕 Рецептов не найдено! Попробуйте добавить другие ингредиенты</p>';
    return;
  }
  
  container.innerHTML = foundRecipes.map((recipe, index) => {
    const matchPercentage = calculateMatchPercentage(recipe.ingredients);
    
    return `
    <div class="recipe-card" data-recipe-index="${index}">
      <img src="${recipe.image}" alt="${recipe.name}" onerror="this.src='img/default-recipe.jpg'">
      <h3>${recipe.name}</h3>
      <span class="match-indicator">✅ Совпадение: ${matchPercentage}%</span>
      <p>${recipe.description || 'Вкусное домашнее блюдо'}</p>
      <p class="cooking-time">⏱ ${recipe.cookingTime || '30 минут'}</p>
      <h4>Ингредиенты:</h4>
      <ul>
        ${recipe.ingredients.map(ing => {
          const hasIngredient = userIngredients.some(userIng => 
            ing.toLowerCase().includes(userIng.toLowerCase())
          );
          return `<li style="${hasIngredient ? 'color: #4caf50; font-weight: bold;' : ''}">${ing}</li>`;
        }).join('')}
      </ul>
      <button class="recipe-btn" onclick="openRecipeModal(recipes[${index}])">Смотреть рецепт →</button>
    </div>
  `}).join('');
}

// Закрытие по клику вне модалки
window.onclick = function(event) {
  const modal = document.getElementById('recipeModal');
  if (event.target == modal) {
    closeModal();
  }
}

// Закрытие по ESC
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// Добавляем обработчик для кнопки закрытия
document.addEventListener('DOMContentLoaded', function() {
  const closeBtn = document.querySelector('.close-modal');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
});

displayResults();