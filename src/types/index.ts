export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert';
  tags: string[];
  nutrition: NutritionInfo;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category: IngredientCategory;
}

export interface NutritionInfo {
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  fiber: number; // in grams
  sugar: number; // in grams
  sodium: number; // in mg
}

export interface MealPlan {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  meals: PlannedMeal[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PlannedMeal {
  id: string;
  date: Date;
  mealType: MealType;
  recipe: Recipe;
  servings: number;
  notes?: string;
}

export interface ShoppingList {
  id: string;
  name: string;
  items: ShoppingListItem[];
  mealPlanId?: string;
  createdAt: Date;
  updatedAt: Date;
  completed: boolean;
}

export interface ShoppingListItem {
  id: string;
  ingredient: Ingredient;
  quantity: number;
  purchased: boolean;
  notes?: string;
}

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

export type IngredientCategory = 
  | 'Produce'
  | 'Meat & Seafood'
  | 'Dairy & Eggs'
  | 'Pantry'
  | 'Frozen'
  | 'Bakery'
  | 'Beverages'
  | 'Condiments & Spices'
  | 'Other';

export interface User {
  id: string;
  name: string;
  email: string;
  preferences: UserPreferences;
  createdAt: Date;
}

export interface UserPreferences {
  dietaryRestrictions: string[];
  allergies: string[];
  favoriteCategories: string[];
  defaultServings: number;
  measurementSystem: 'metric' | 'imperial';
}

export interface CalendarDay {
  date: Date;
  meals: PlannedMeal[];
  totalNutrition: NutritionInfo;
}