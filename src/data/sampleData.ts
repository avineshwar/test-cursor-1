import { Recipe, MealPlan, ShoppingList } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const sampleRecipes: Recipe[] = [
  {
    id: uuidv4(),
    name: 'Mediterranean Quinoa Bowl',
    description: 'A healthy and colorful bowl packed with Mediterranean flavors',
    ingredients: [
      { id: uuidv4(), name: 'Quinoa', amount: 1, unit: 'cup', category: 'Pantry' },
      { id: uuidv4(), name: 'Cherry tomatoes', amount: 1, unit: 'cup', category: 'Produce' },
      { id: uuidv4(), name: 'Cucumber', amount: 1, unit: 'medium', category: 'Produce' },
      { id: uuidv4(), name: 'Red onion', amount: 0.25, unit: 'cup', category: 'Produce' },
      { id: uuidv4(), name: 'Feta cheese', amount: 0.5, unit: 'cup', category: 'Dairy & Eggs' },
      { id: uuidv4(), name: 'Olive oil', amount: 2, unit: 'tbsp', category: 'Pantry' },
      { id: uuidv4(), name: 'Lemon juice', amount: 2, unit: 'tbsp', category: 'Produce' },
      { id: uuidv4(), name: 'Fresh herbs', amount: 0.25, unit: 'cup', category: 'Produce' },
    ],
    instructions: [
      'Cook quinoa according to package instructions and let cool',
      'Dice cucumber and red onion',
      'Halve cherry tomatoes',
      'Whisk together olive oil and lemon juice',
      'Combine quinoa, vegetables, and feta in a bowl',
      'Drizzle with dressing and top with fresh herbs',
      'Season with salt and pepper to taste'
    ],
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    difficulty: 'Easy',
    category: 'Lunch',
    tags: ['Mediterranean', 'Healthy', 'Vegetarian', 'Gluten-free'],
    nutrition: {
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 12,
      fiber: 5,
      sugar: 8,
      sodium: 380
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuidv4(),
    name: 'Overnight Oats with Berries',
    description: 'Creamy overnight oats topped with fresh berries and nuts',
    ingredients: [
      { id: uuidv4(), name: 'Rolled oats', amount: 0.5, unit: 'cup', category: 'Pantry' },
      { id: uuidv4(), name: 'Greek yogurt', amount: 0.5, unit: 'cup', category: 'Dairy & Eggs' },
      { id: uuidv4(), name: 'Milk', amount: 0.5, unit: 'cup', category: 'Dairy & Eggs' },
      { id: uuidv4(), name: 'Honey', amount: 1, unit: 'tbsp', category: 'Pantry' },
      { id: uuidv4(), name: 'Mixed berries', amount: 0.5, unit: 'cup', category: 'Produce' },
      { id: uuidv4(), name: 'Almonds', amount: 2, unit: 'tbsp', category: 'Pantry' },
      { id: uuidv4(), name: 'Chia seeds', amount: 1, unit: 'tsp', category: 'Pantry' },
    ],
    instructions: [
      'Mix oats, yogurt, milk, honey, and chia seeds in a jar',
      'Stir well to combine',
      'Refrigerate overnight or at least 4 hours',
      'Top with berries and almonds before serving',
      'Add extra milk if desired consistency is thinner'
    ],
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    difficulty: 'Easy',
    category: 'Breakfast',
    tags: ['Healthy', 'Make-ahead', 'Vegetarian', 'High-protein'],
    nutrition: {
      calories: 380,
      protein: 20,
      carbs: 52,
      fat: 12,
      fiber: 10,
      sugar: 28,
      sodium: 120
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuidv4(),
    name: 'Grilled Salmon with Asparagus',
    description: 'Perfectly grilled salmon with roasted asparagus and lemon',
    ingredients: [
      { id: uuidv4(), name: 'Salmon fillets', amount: 4, unit: 'pieces', category: 'Meat & Seafood' },
      { id: uuidv4(), name: 'Asparagus', amount: 1, unit: 'lb', category: 'Produce' },
      { id: uuidv4(), name: 'Olive oil', amount: 3, unit: 'tbsp', category: 'Pantry' },
      { id: uuidv4(), name: 'Lemon', amount: 1, unit: 'whole', category: 'Produce' },
      { id: uuidv4(), name: 'Garlic', amount: 3, unit: 'cloves', category: 'Produce' },
      { id: uuidv4(), name: 'Fresh dill', amount: 2, unit: 'tbsp', category: 'Produce' },
    ],
    instructions: [
      'Preheat grill to medium-high heat',
      'Trim asparagus ends and toss with olive oil, salt, and pepper',
      'Season salmon with salt, pepper, and minced garlic',
      'Grill salmon 4-5 minutes per side',
      'Grill asparagus 8-10 minutes, turning occasionally',
      'Serve with lemon wedges and fresh dill'
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'Medium',
    category: 'Dinner',
    tags: ['Healthy', 'Low-carb', 'High-protein', 'Keto-friendly'],
    nutrition: {
      calories: 280,
      protein: 35,
      carbs: 6,
      fat: 14,
      fiber: 3,
      sugar: 3,
      sodium: 95
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const sampleMealPlans: MealPlan[] = [
  {
    id: uuidv4(),
    name: 'Healthy Week',
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    meals: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const sampleShoppingLists: ShoppingList[] = [
  {
    id: uuidv4(),
    name: 'Weekly Groceries',
    items: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    completed: false
  }
];