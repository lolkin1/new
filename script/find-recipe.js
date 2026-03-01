let userIngredients = [];

// добавление ингредиента
function addIngredient() {
  const input = document.getElementById('ingredientInput');
  const ingredient = input.value.trim();
  
  if (ingredient && !userIngredients.includes(ingredient)) {
    userIngredients.push(ingredient);
    updateIngredientsList();
    input.value = '';
  }
}

// добавление из популярных
function addQuickIngredient(ingredient) {
  if (!userIngredients.includes(ingredient)) {
    userIngredients.push(ingredient);
    updateIngredientsList();
  }
}

// обновление списка ингредиентов на странице
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

// удаление ингредиента
function removeIngredient(ingredient) {
  userIngredients = userIngredients.filter(i => i !== ingredient);
  updateIngredientsList();
}

// поиск рецептов
function searchRecipes() {
  if (userIngredients.length === 0) {
    alert('Добавьте хотя бы один ингредиент!');
    return;
  }
  
  // сохраняем ингредиенты в localStorage для передачи на страницу результатов
  localStorage.setItem('userIngredients', JSON.stringify(userIngredients));
  
  // переход на страницу с результатами
  window.location.href = 'results.html';
}