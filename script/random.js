function getRandomRecipe() {
  //анимация загрузки
  showLoading();
  
  setTimeout(() => {
    // получаем случайный индекс
    const randomIndex = Math.floor(Math.random() * recipes.length);
    const recipe = recipes[randomIndex];
    
    // отображаем рецепт
    displayRandomRecipe(recipe);
  }, 500); // небольшая задержка для эффекта
}

// функция для отображения рецепта
function displayRandomRecipe(recipe) {
  // скрываем заглушку и показываем карточку
  document.getElementById('placeholder').style.display = 'none';
  const recipeCard = document.getElementById('recipeCard');
  recipeCard.classList.remove('hidden');
  
  // заполняем данные рецепта
  document.getElementById('recipeName').textContent = recipe.name;
  document.getElementById('cookingTime').textContent = recipe.cookingTime || '30 минут';
  document.getElementById('difficulty').textContent = recipe.difficulty || 'Средне';
  document.getElementById('recipeDescription').textContent = recipe.description || 'Вкусное домашнее блюдо';
  document.getElementById('recipeImg').src = recipe.image || '/img/default-recipe.jpg';
  
  // заполняем ингредиенты
  const ingredientsList = document.getElementById('ingredientsList');
  ingredientsList.innerHTML = '';
  recipe.ingredients.forEach(ingredient => {
    const li = document.createElement('li');
    li.textContent = ingredient;
    ingredientsList.appendChild(li);
  });
  
  // инструкция
  document.getElementById('instructions').textContent = recipe.instructions || '1. Подготовьте все ингредиенты\n2. Приготовьте блюдо\n3. Подавайте и наслаждайтесь!';
}

// показ загрузки
function showLoading() {
  const recipeCard = document.getElementById('recipeCard');
  const placeholder = document.getElementById('placeholder');
  
  recipeCard.classList.add('hidden');
  placeholder.style.display = 'block';
  placeholder.innerHTML = '<div class="loading"></div><p>Ищем вкусное блюдо...</p>';
}

// добавляем больше рецептов в базу
const additionalRecipes = [
  {
    name: "Паста Карбонара",
    ingredients: ["спагетти", "яйца", "бекон", "пармезан", "чеснок"],
    cookingTime: "25 минут",
    difficulty: "Средне",
    description: "Классическая итальянская паста",
    instructions: "1. Обжарьте бекон\n2. Смешайте яйца с сыром\n3. Добавьте к горячим макаронам",
    image: "../img/carbonara.jpg"
  },
  {
    name: "Борщ",
    ingredients: ["свекла", "капуста", "картошка", "морковь", "лук", "мясо"],
    cookingTime: "2 часа",
    difficulty: "Сложно",
    description: "Настоящий украинский борщ",
    instructions: "1. Сварите бульон\n2. Подготовьте овощи\n3. Соедините все ингредиенты",
    image: "../img/borsch.jpg"
  },
  {
    name: "Омлет",
    ingredients: ["яйца", "молоко", "соль", "масло"],
    cookingTime: "10 минут",
    difficulty: "Легко",
    description: "Пышный завтрак за 10 минут",
    instructions: "1. Взбейте яйца с молоком\n2. Вылейте на сковороду\n3. Жарьте под крышкой",
    image: "../img/eggs.jpg"
  }
];

// Добавьте эти рецепты в ваш файл recipes.js