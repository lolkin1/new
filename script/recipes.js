const recipes = [
  {
    name: "Паста Карбонара",
    ingredients: ["спагетти", "яйца", "бекон", "пармезан", "чеснок"],
    cookingTime: "25 минут",
    difficulty: "Средне",
    description: "Классическая итальянская паста",
    instructions: "1. Обжарьте бекон\n2. Смешайте яйца с сыром\n3. Добавьте к горячим макаронам",
    image: "../img/carbonara.jpg"  // Путь от корня
  },
  {
    name: "Борщ",
    ingredients: ["свекла", "капуста", "картошка", "морковь", "лук", "мясо"],
    cookingTime: "2 часа",
    difficulty: "Сложно",
    description: "Настоящий украинский борщ",
    instructions: "1. Сварите бульон\n2. Подготовьте овощи\n3. Соедините все ингредиенты",
    image: "../img/borsch.jpg"  // Путь от корня
  },
  {
    name: "Омлет",
    ingredients: ["яйца", "молоко", "соль", "масло"],
    cookingTime: "10 минут",
    difficulty: "Легко",
    description: "Пышный завтрак за 10 минут",
    instructions: "1. Взбейте яйца с молоком\n2. Вылейте на сковороду\n3. Жарьте под крышкой",
    image: "../img/eggs.jpg"  // Путь от корня
  }
];  

// функция поиска рецептов по ингредиентам
function findRecipesByIngredients(userIngredients) {
  return recipes.filter(recipe => {
    // проверяем что все ингредиенты пользователя есть в рецепте
    const hasAllIngredients = userIngredients.every(ingredient => 
      recipe.ingredients.some(recipeIngredient => 
        recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
      )
    );
    
    // возвращаем рецепты
    const matchPercentage = userIngredients.filter(ingredient =>
      recipe.ingredients.some(recipeIngredient =>
        recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
      )
    ).length / recipe.ingredients.length;
    
    return matchPercentage >= 0.1;
  });
}