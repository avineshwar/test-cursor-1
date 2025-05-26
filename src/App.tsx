import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MealPlannerProvider, useMealPlanner } from './context/MealPlannerContext';
import { sampleRecipes, sampleMealPlans, sampleShoppingLists } from './data/sampleData';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Recipes from './pages/Recipes';
import MealPlanning from './pages/MealPlanning';
import ShoppingLists from './pages/ShoppingLists';

function AppContent() {
  const { dispatch } = useMealPlanner();

  useEffect(() => {
    // Load sample data on app start
    dispatch({
      type: 'LOAD_DATA',
      payload: {
        recipes: sampleRecipes,
        mealPlans: sampleMealPlans,
        shoppingLists: sampleShoppingLists,
        currentMealPlan: sampleMealPlans[0] || null,
      },
    });
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/meal-planning" element={<MealPlanning />} />
            <Route path="/shopping-lists" element={<ShoppingLists />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function App() {
  return (
    <MealPlannerProvider>
      <AppContent />
    </MealPlannerProvider>
  );
}

export default App;