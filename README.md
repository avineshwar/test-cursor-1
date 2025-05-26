# 🍽️ Meal Planner - Modern Meal Planning Application

A beautiful, modern meal planning application built with React, TypeScript, and Tailwind CSS. Plan your meals, manage recipes, and organize your grocery shopping all in one place.

## ✨ Features

### 🏠 Dashboard
- Overview of your meal planning activities
- Today's meals and calorie tracking
- Weekly meal overview
- Quick stats and insights

### 📖 Recipe Management
- Create, edit, and organize recipes
- Search and filter by category, tags, or ingredients
- Detailed nutritional information
- Difficulty levels and cooking times
- Beautiful recipe cards with modern UI

### 📅 Meal Planning
- Interactive weekly meal planning calendar
- Drag-and-drop meal scheduling
- Multiple meal types (Breakfast, Lunch, Dinner, Snack)
- Weekly nutrition tracking
- Meal plan templates and suggestions

### 🛒 Shopping Lists
- Generate shopping lists from meal plans
- Organize items by grocery store categories
- Track shopping progress with checkboxes
- Add custom items and notes
- Multiple shopping list management

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd meal-planner
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🛠️ Built With

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **React Router** - Client-side routing
- **date-fns** - Modern date utility library

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile phones

## 🎨 Design Features

- **Modern UI/UX** - Clean, intuitive interface
- **Dark/Light themes** - Comfortable viewing in any environment
- **Smooth animations** - Delightful micro-interactions
- **Accessibility** - WCAG compliant design
- **Mobile-first** - Optimized for mobile devices

## 📊 Data Management

The application uses React Context for state management with:
- Local storage persistence
- Optimistic updates
- Type-safe actions and reducers
- Centralized state management

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React Context providers
├── data/               # Sample data and utilities
├── pages/              # Main application pages
├── types/              # TypeScript type definitions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎯 Key Components

### Types
- **Recipe** - Complete recipe information with ingredients and nutrition
- **MealPlan** - Weekly meal planning structure
- **ShoppingList** - Grocery shopping organization
- **PlannedMeal** - Individual meal assignments

### Context
- **MealPlannerContext** - Centralized state management
- **Actions** - Type-safe state updates
- **Reducers** - Predictable state changes

### Pages
- **Dashboard** - Overview and quick actions
- **Recipes** - Recipe management and browsing
- **MealPlanning** - Interactive meal calendar
- **ShoppingLists** - Grocery list management

## 🌟 Future Enhancements

- [ ] Recipe import from URLs
- [ ] Meal plan sharing
- [ ] Nutritional goal tracking
- [ ] Grocery store integration
- [ ] Recipe rating and reviews
- [ ] Meal prep scheduling
- [ ] Export shopping lists
- [ ] Recipe scaling for different serving sizes
- [ ] Dietary restriction filtering
- [ ] Meal plan templates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI inspiration from modern design systems
- Built with love for meal planning enthusiasts

---

**Happy Meal Planning! 🍽️✨** 