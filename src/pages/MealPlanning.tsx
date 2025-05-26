import React, { useState } from 'react';
import { useMealPlanner } from '../context/MealPlannerContext';
import { Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { format, startOfWeek, addDays, addWeeks, subWeeks, isSameDay } from 'date-fns';

export default function MealPlanning() {
  const { state, dispatch } = useMealPlanner();
  const { currentMealPlan, selectedDate, recipes } = state;
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(selectedDate));

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  const getMealsForDay = (date: Date, mealType: string) => {
    return currentMealPlan?.meals.filter(meal => 
      isSameDay(meal.date, date) && meal.mealType === mealType
    ) || [];
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeek(direction === 'prev' ? subWeeks(currentWeek, 1) : addWeeks(currentWeek, 1));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meal Planning</h1>
          <p className="text-gray-600 mt-2">Plan your meals for the week</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="btn-outline">
            Generate Plan
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Meal</span>
          </button>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between bg-white rounded-lg border p-4">
        <button
          onClick={() => navigateWeek('prev')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <h2 className="text-lg font-semibold text-gray-900">
          Week of {format(currentWeek, 'MMMM d, yyyy')}
        </h2>
        
        <button
          onClick={() => navigateWeek('next')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Meal Planning Grid */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="grid grid-cols-8 border-b">
          <div className="p-4 bg-gray-50 font-medium text-gray-900">Meal Type</div>
          {weekDays.map((day) => (
            <div key={day.toISOString()} className="p-4 bg-gray-50 text-center">
              <div className="font-medium text-gray-900">{format(day, 'EEE')}</div>
              <div className="text-sm text-gray-600">{format(day, 'MMM d')}</div>
            </div>
          ))}
        </div>

        {mealTypes.map((mealType) => (
          <div key={mealType} className="grid grid-cols-8 border-b last:border-b-0">
            <div className="p-4 bg-gray-50 font-medium text-gray-900 border-r">
              {mealType}
            </div>
            {weekDays.map((day) => {
              const meals = getMealsForDay(day, mealType);
              return (
                <div key={`${day.toISOString()}-${mealType}`} className="p-2 min-h-[120px] border-r last:border-r-0">
                  <div className="space-y-2">
                    {meals.map((meal) => (
                      <div
                        key={meal.id}
                        className="bg-primary-100 text-primary-800 p-2 rounded text-xs cursor-pointer hover:bg-primary-200 transition-colors"
                      >
                        <div className="font-medium truncate">{meal.recipe.name}</div>
                        <div className="text-primary-600">
                          {meal.servings} serving{meal.servings > 1 ? 's' : ''}
                        </div>
                      </div>
                    ))}
                    <button className="w-full p-2 border-2 border-dashed border-gray-300 rounded text-gray-500 hover:border-primary-300 hover:text-primary-600 transition-colors text-xs">
                      + Add meal
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-2">This Week's Meals</h3>
          <p className="text-2xl font-bold text-primary-600">
            {currentMealPlan?.meals.filter(meal => {
              const mealDate = new Date(meal.date);
              return mealDate >= currentWeek && mealDate < addWeeks(currentWeek, 1);
            }).length || 0}
          </p>
          <p className="text-sm text-gray-600">Planned meals</p>
        </div>

        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-2">Total Calories</h3>
          <p className="text-2xl font-bold text-green-600">
            {Math.round(currentMealPlan?.meals.filter(meal => {
              const mealDate = new Date(meal.date);
              return mealDate >= currentWeek && mealDate < addWeeks(currentWeek, 1);
            }).reduce((sum, meal) => sum + (meal.recipe.nutrition.calories * meal.servings), 0) || 0)}
          </p>
          <p className="text-sm text-gray-600">This week</p>
        </div>

        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-2">Unique Recipes</h3>
          <p className="text-2xl font-bold text-purple-600">
            {new Set(currentMealPlan?.meals.filter(meal => {
              const mealDate = new Date(meal.date);
              return mealDate >= currentWeek && mealDate < addWeeks(currentWeek, 1);
            }).map(meal => meal.recipe.id)).size || 0}
          </p>
          <p className="text-sm text-gray-600">Different recipes</p>
        </div>
      </div>

      {/* No meal plan message */}
      {!currentMealPlan && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No meal plan selected</h3>
          <p className="text-gray-600 mb-4">Create a meal plan to start planning your meals</p>
          <button className="btn-primary">Create Meal Plan</button>
        </div>
      )}
    </div>
  );
}