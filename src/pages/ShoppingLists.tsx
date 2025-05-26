import React, { useState } from 'react';
import { useMealPlanner } from '../context/MealPlannerContext';
import { ShoppingCart, Plus, Check, X, Edit2 } from 'lucide-react';

export default function ShoppingLists() {
  const { state } = useMealPlanner();
  const { shoppingLists } = state;
  const [selectedList, setSelectedList] = useState<string | null>(
    shoppingLists.length > 0 ? shoppingLists[0].id : null
  );

  const currentList = shoppingLists.find(list => list.id === selectedList);

  const toggleItemPurchased = (itemId: string) => {
    // This would dispatch an action to update the shopping list item
    console.log('Toggle item purchased:', itemId);
  };

  const getItemsByCategory = () => {
    if (!currentList) return {};
    
    return currentList.items.reduce((acc, item) => {
      const category = item.ingredient.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {} as Record<string, typeof currentList.items>);
  };

  const itemsByCategory = getItemsByCategory();
  const completedItems = currentList?.items.filter(item => item.purchased).length || 0;
  const totalItems = currentList?.items.length || 0;
  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Lists</h1>
          <p className="text-gray-600 mt-2">Manage your grocery shopping</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="btn-outline">
            Generate from Meal Plan
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New List</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Shopping Lists Sidebar */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Lists</h2>
            <div className="space-y-2">
              {shoppingLists.map((list) => (
                <button
                  key={list.id}
                  onClick={() => setSelectedList(list.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedList === list.id
                      ? 'bg-primary-100 text-primary-700 border border-primary-200'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{list.name}</h3>
                      <p className="text-sm text-gray-600">
                        {list.items.length} items
                      </p>
                    </div>
                    {list.completed && (
                      <Check className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                </button>
              ))}
              
              {shoppingLists.length === 0 && (
                <div className="text-center py-8">
                  <ShoppingCart className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">No shopping lists yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Shopping List Content */}
        <div className="lg:col-span-3">
          {currentList ? (
            <div className="space-y-6">
              {/* List Header */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{currentList.name}</h2>
                    <p className="text-gray-600">
                      Created {new Date(currentList.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-red-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{completedItems} of {totalItems} items</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <button className="btn-primary w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </button>
              </div>

              {/* Shopping Items by Category */}
              {Object.keys(itemsByCategory).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(itemsByCategory).map(([category, items]) => (
                    <div key={category} className="card">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {category}
                      </h3>
                      <div className="space-y-2">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                              item.purchased
                                ? 'bg-green-50 border-green-200'
                                : 'bg-white border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => toggleItemPurchased(item.id)}
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                  item.purchased
                                    ? 'bg-green-600 border-green-600'
                                    : 'border-gray-300 hover:border-green-400'
                                }`}
                              >
                                {item.purchased && (
                                  <Check className="h-3 w-3 text-white" />
                                )}
                              </button>
                              <div className={item.purchased ? 'line-through text-gray-500' : ''}>
                                <span className="font-medium">
                                  {item.quantity} {item.ingredient.unit} {item.ingredient.name}
                                </span>
                                {item.notes && (
                                  <p className="text-sm text-gray-600">{item.notes}</p>
                                )}
                              </div>
                            </div>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Edit2 className="h-4 w-4 text-gray-400" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card text-center py-12">
                  <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Empty shopping list</h3>
                  <p className="text-gray-600 mb-4">Add items to get started</p>
                  <button className="btn-primary">Add First Item</button>
                </div>
              )}
            </div>
          ) : (
            <div className="card text-center py-12">
              <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No shopping list selected</h3>
              <p className="text-gray-600 mb-4">Create a shopping list to get started</p>
              <button className="btn-primary">Create Shopping List</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}