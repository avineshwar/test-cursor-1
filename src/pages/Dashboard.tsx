import React from 'react';
import { useMealPlanner } from '../context/MealPlannerContext';
import { Calendar, ChefHat, ShoppingCart, TrendingUp } from 'lucide-react';
import { format, startOfWeek, addDays } from 'date-fns';

export default function Dashboard() {
  const { state } = useMealPlanner();
  const { recipes, currentMealPlan, shoppingLists, selectedDate } = state;

  const weekStart = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const todaysMeals = currentMealPlan?.meals.filter(meal => 
    format(meal.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  ) || [];

  const totalCalories = todaysMeals.reduce((sum, meal) => 
    sum + (meal.recipe.nutrition.calories * meal.servings), 0
  );

  const stats = [
    {
      name: 'Total Recipes',
      value: recipes.length,
      icon: ChefHat,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Planned Meals',
      value: currentMealPlan?.meals.length || 0,
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'Shopping Lists',
      value: shoppingLists.length,
      icon: ShoppingCart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      name: "Today's Calories",
      value: Math.round(totalCalories),
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your meal planning overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="card">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Today's Meals */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Today's Meals - {format(selectedDate, 'EEEE, MMMM d')}
        </h2>
        {todaysMeals.length > 0 ? (
          <div className="space-y-4">
            {todaysMeals.map((meal) => (
              <div key={meal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <ChefHat className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{meal.recipe.name}</h3>
                    <p className="text-sm text-gray-600">
                      {meal.mealType} • {meal.servings} serving{meal.servings > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {Math.round(meal.recipe.nutrition.calories * meal.servings)} cal
                  </p>
                  <p className="text-sm text-gray-600">
                    {meal.recipe.prepTime + meal.recipe.cookTime} min
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No meals planned for today</p>
            <button className="btn-primary mt-4">Plan a Meal</button>
          </div>
        )}
      </div>

      {/* Weekly Overview */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">This Week</h2>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => {
            const dayMeals = currentMealPlan?.meals.filter(meal => 
              format(meal.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
            ) || [];
            
            return (
              <div key={day.toISOString()} className="text-center">
                <div className="text-sm font-medium text-gray-600 mb-2">
                  {format(day, 'EEE')}
                </div>
                <div className="text-lg font-bold text-gray-900 mb-2">
                  {format(day, 'd')}
                </div>
                <div className="space-y-1">
                  {dayMeals.slice(0, 2).map((meal) => (
                    <div
                      key={meal.id}
                      className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded truncate"
                    >
                      {meal.recipe.name}
                    </div>
                  ))}
                  {dayMeals.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{dayMeals.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}