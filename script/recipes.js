const recipes = [
  {
    name: "Куриный суп",
    ingredients: ["курица", "картошка", "лук", "морковь"],
    description: "Сытный домашний суп, который согреет в холодный день",
    cookingTime: "60 минут",
    difficulty: "Средне",
    servings: "4-5",
    instructions: "1. Нарежьте курицу и варите 30 минут\n2. Добавьте нарезанную картошку\n3. Обжарьте лук с морковью и добавьте в суп\n4. Варите еще 15 минут\n5. Посолите по вкусу и подавайте с зеленью",
    image: "img/chicken-soup.jpg"
  },
  {
    name: "Яичница с луком",
    ingredients: ["яйца", "лук"],
    description: "Быстрый и питательный завтрак",
    cookingTime: "10 минут",
    difficulty: "Легко",
    servings: "1-2",
    instructions: "1. Нарежьте лук и обжарьте до золотистого цвета\n2. Разбейте яйца на сковороду\n3. Жарьте до готовности\n4. Посолите, поперчите по вкусу",
    image: "img/eggs.jpg"
  },
  // ... остальные рецепты
];

// Функция поиска рецептов по ингредиентам
function findRecipesByIngredients(userIngredients) {
  return recipes.filter(recipe => {
    // Проверяем, что все ингредиенты пользователя есть в рецепте
    const hasAllIngredients = userIngredients.every(ingredient => 
      recipe.ingredients.some(recipeIngredient => 
        recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
      )
    );
    
    // Возвращаем рецепты
    const matchPercentage = userIngredients.filter(ingredient =>
      recipe.ingredients.some(recipeIngredient =>
        recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
      )
    ).length / recipe.ingredients.length;
    
    return matchPercentage >= 0.1;
  });
}