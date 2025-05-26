import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Recipe, MealPlan, ShoppingList, PlannedMeal } from '../types';

interface MealPlannerState {
  recipes: Recipe[];
  mealPlans: MealPlan[];
  shoppingLists: ShoppingList[];
  currentMealPlan: MealPlan | null;
  selectedDate: Date;
}

type MealPlannerAction =
  | { type: 'ADD_RECIPE'; payload: Recipe }
  | { type: 'UPDATE_RECIPE'; payload: Recipe }
  | { type: 'DELETE_RECIPE'; payload: string }
  | { type: 'ADD_MEAL_PLAN'; payload: MealPlan }
  | { type: 'UPDATE_MEAL_PLAN'; payload: MealPlan }
  | { type: 'DELETE_MEAL_PLAN'; payload: string }
  | { type: 'SET_CURRENT_MEAL_PLAN'; payload: MealPlan | null }
  | { type: 'ADD_PLANNED_MEAL'; payload: PlannedMeal }
  | { type: 'UPDATE_PLANNED_MEAL'; payload: PlannedMeal }
  | { type: 'DELETE_PLANNED_MEAL'; payload: string }
  | { type: 'ADD_SHOPPING_LIST'; payload: ShoppingList }
  | { type: 'UPDATE_SHOPPING_LIST'; payload: ShoppingList }
  | { type: 'DELETE_SHOPPING_LIST'; payload: string }
  | { type: 'SET_SELECTED_DATE'; payload: Date }
  | { type: 'LOAD_DATA'; payload: Partial<MealPlannerState> };

const initialState: MealPlannerState = {
  recipes: [],
  mealPlans: [],
  shoppingLists: [],
  currentMealPlan: null,
  selectedDate: new Date(),
};

function mealPlannerReducer(state: MealPlannerState, action: MealPlannerAction): MealPlannerState {
  switch (action.type) {
    case 'ADD_RECIPE':
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    
    case 'UPDATE_RECIPE':
      return {
        ...state,
        recipes: state.recipes.map(recipe =>
          recipe.id === action.payload.id ? action.payload : recipe
        ),
      };
    
    case 'DELETE_RECIPE':
      return {
        ...state,
        recipes: state.recipes.filter(recipe => recipe.id !== action.payload),
      };
    
    case 'ADD_MEAL_PLAN':
      return {
        ...state,
        mealPlans: [...state.mealPlans, action.payload],
      };
    
    case 'UPDATE_MEAL_PLAN':
      return {
        ...state,
        mealPlans: state.mealPlans.map(plan =>
          plan.id === action.payload.id ? action.payload : plan
        ),
        currentMealPlan: state.currentMealPlan?.id === action.payload.id ? action.payload : state.currentMealPlan,
      };
    
    case 'DELETE_MEAL_PLAN':
      return {
        ...state,
        mealPlans: state.mealPlans.filter(plan => plan.id !== action.payload),
        currentMealPlan: state.currentMealPlan?.id === action.payload ? null : state.currentMealPlan,
      };
    
    case 'SET_CURRENT_MEAL_PLAN':
      return {
        ...state,
        currentMealPlan: action.payload,
      };
    
    case 'ADD_PLANNED_MEAL':
      if (!state.currentMealPlan) return state;
      const updatedMealPlan = {
        ...state.currentMealPlan,
        meals: [...state.currentMealPlan.meals, action.payload],
        updatedAt: new Date(),
      };
      return {
        ...state,
        currentMealPlan: updatedMealPlan,
        mealPlans: state.mealPlans.map(plan =>
          plan.id === updatedMealPlan.id ? updatedMealPlan : plan
        ),
      };
    
    case 'UPDATE_PLANNED_MEAL':
      if (!state.currentMealPlan) return state;
      const updatedMealPlanForUpdate = {
        ...state.currentMealPlan,
        meals: state.currentMealPlan.meals.map(meal =>
          meal.id === action.payload.id ? action.payload : meal
        ),
        updatedAt: new Date(),
      };
      return {
        ...state,
        currentMealPlan: updatedMealPlanForUpdate,
        mealPlans: state.mealPlans.map(plan =>
          plan.id === updatedMealPlanForUpdate.id ? updatedMealPlanForUpdate : plan
        ),
      };
    
    case 'DELETE_PLANNED_MEAL':
      if (!state.currentMealPlan) return state;
      const updatedMealPlanForDelete = {
        ...state.currentMealPlan,
        meals: state.currentMealPlan.meals.filter(meal => meal.id !== action.payload),
        updatedAt: new Date(),
      };
      return {
        ...state,
        currentMealPlan: updatedMealPlanForDelete,
        mealPlans: state.mealPlans.map(plan =>
          plan.id === updatedMealPlanForDelete.id ? updatedMealPlanForDelete : plan
        ),
      };
    
    case 'ADD_SHOPPING_LIST':
      return {
        ...state,
        shoppingLists: [...state.shoppingLists, action.payload],
      };
    
    case 'UPDATE_SHOPPING_LIST':
      return {
        ...state,
        shoppingLists: state.shoppingLists.map(list =>
          list.id === action.payload.id ? action.payload : list
        ),
      };
    
    case 'DELETE_SHOPPING_LIST':
      return {
        ...state,
        shoppingLists: state.shoppingLists.filter(list => list.id !== action.payload),
      };
    
    case 'SET_SELECTED_DATE':
      return {
        ...state,
        selectedDate: action.payload,
      };
    
    case 'LOAD_DATA':
      return {
        ...state,
        ...action.payload,
      };
    
    default:
      return state;
  }
}

interface MealPlannerContextType {
  state: MealPlannerState;
  dispatch: React.Dispatch<MealPlannerAction>;
}

const MealPlannerContext = createContext<MealPlannerContextType | undefined>(undefined);

export function MealPlannerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(mealPlannerReducer, initialState);

  return (
    <MealPlannerContext.Provider value={{ state, dispatch }}>
      {children}
    </MealPlannerContext.Provider>
  );
}

export function useMealPlanner() {
  const context = useContext(MealPlannerContext);
  if (context === undefined) {
    throw new Error('useMealPlanner must be used within a MealPlannerProvider');
  }
  return context;
}