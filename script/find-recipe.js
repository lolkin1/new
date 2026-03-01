let userIngredients = [];

// Добавление ингредиента
function addIngredient() {
  const input = document.getElementById('ingredientInput');
  const ingredient = input.value.trim();
  
  if (ingredient && !userIngredients.includes(ingredient)) {
    userIngredients.push(ingredient);
    updateIngredientsList();
    input.value = '';
  }
}

// Добавление из популярных
function addQuickIngredient(ingredient) {
  if (!userIngredients.includes(ingredient)) {
    userIngredients.push(ingredient);
    updateIngredientsList();
  }
}

// Обновление списка ингредиентов на странице
function updateIngredientsList() {
  const list = document.getElementById('ingredientsList');
  list.innerHTML = '';
  
  userIngredients.forEach(ingredient => {
    const item = document.createElement('div');
    item.className = 'ingredient-item';
    item.innerHTML = `
      <span>${ingredient}</span>
      <button onclick="removeIngredient('${ingredient}')">×</button>
    `;
    list.appendChild(item);
  });
}

// Удаление ингредиента
function removeIngredient(ingredient) {
  userIngredients = userIngredients.filter(i => i !== ingredient);
  updateIngredientsList();
}

// Поиск рецептов
function searchRecipes() {
  if (userIngredients.length === 0) {
    alert('Добавьте хотя бы один ингредиент!');
    return;
  }
  
  // Сохраняем ингредиенты в localStorage для передачи на страницу результатов
  localStorage.setItem('userIngredients', JSON.stringify(userIngredients));
  
  // Переходим на страницу с результатами
  window.location.href = 'results.html';
}