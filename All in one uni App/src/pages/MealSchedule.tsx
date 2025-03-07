
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import NavigationMenu from '@/components/NavigationMenu';
import MealCard from '@/components/MealCard';

const MealSchedule = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Meal data
  const meals = [
    {
      id: 1,
      name: 'Classic Breakfast',
      description: 'Eggs, bacon, toast, and hashbrowns with a side of fresh fruit.',
      price: '$7.99',
      category: 'Breakfast',
      available: true,
      image: 'https://images.unsplash.com/photo-1533089860892-a9b969df67e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      nutritionInfo: {
        calories: 580,
        protein: '22g',
        carbs: '48g',
        fat: '32g'
      }
    },
    {
      id: 2,
      name: 'Avocado Toast',
      description: 'Whole grain toast topped with smashed avocado, cherry tomatoes, and microgreens.',
      price: '$6.50',
      category: 'Breakfast',
      available: true,
      image: 'https://images.unsplash.com/photo-1603046891744-76e6300f82ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      nutritionInfo: {
        calories: 320,
        protein: '8g',
        carbs: '32g',
        fat: '18g'
      }
    },
    {
      id: 3,
      name: 'Grilled Chicken Salad',
      description: 'Mixed greens, grilled chicken, avocado, tomato, cucumber with balsamic vinaigrette.',
      price: '$9.99',
      category: 'Lunch',
      available: true,
      image: 'https://images.unsplash.com/photo-1594050753831-dd340e3f7dfb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      nutritionInfo: {
        calories: 420,
        protein: '35g',
        carbs: '12g',
        fat: '22g'
      }
    },
    {
      id: 4,
      name: 'Vegetable Stir Fry',
      description: 'Seasonal vegetables stir-fried with tofu in a savory sauce, served with brown rice.',
      price: '$8.50',
      category: 'Lunch',
      available: true,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      nutritionInfo: {
        calories: 380,
        protein: '18g',
        carbs: '42g',
        fat: '14g'
      }
    },
    {
      id: 5,
      name: 'Margherita Pizza',
      description: 'Classic thin-crust pizza with tomato sauce, fresh mozzarella, and basil.',
      price: '$11.99',
      category: 'Dinner',
      available: false,
      image: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      nutritionInfo: {
        calories: 780,
        protein: '24g',
        carbs: '88g',
        fat: '32g'
      }
    },
    {
      id: 6,
      name: 'Grilled Salmon',
      description: 'Pacific salmon fillet with lemon herb sauce, served with roasted vegetables.',
      price: '$14.99',
      category: 'Dinner',
      available: true,
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      nutritionInfo: {
        calories: 520,
        protein: '42g',
        carbs: '18g',
        fat: '28g'
      }
    }
  ];
  
  // Categories
  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner'];
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter meals by category and search query
  const filteredMeals = meals.filter(meal => 
    (activeCategory === 'All' || meal.category === activeCategory) &&
    (meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     meal.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />
      
      <div className="pt-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Cafeteria Menu</h1>
            <p className="text-muted-foreground">
              Browse today's meals and pre-order your favorites.
            </p>
          </div>
          
          {/* Search and Categories */}
          <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.3-4.3"/>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search meals..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex overflow-x-auto no-scrollbar space-x-2 py-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all",
                    "focus:outline-none focus:ring-2 focus:ring-primary/30",
                    activeCategory === category
                      ? "bg-primary text-white shadow-md"
                      : "bg-secondary hover:bg-secondary/70 text-foreground"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Meals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Loading Skeletons
              Array(6).fill(0).map((_, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden border border-border animate-pulse">
                  <div className="aspect-[4/3] w-full bg-gray-200 dark:bg-gray-800" />
                  <div className="p-4">
                    <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full mb-1" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3 mb-3" />
                    <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
                  </div>
                </div>
              ))
            ) : (
              filteredMeals.length > 0 ? (
                filteredMeals.map((meal) => (
                  <MealCard
                    key={meal.id}
                    image={meal.image}
                    name={meal.name}
                    description={meal.description}
                    price={meal.price}
                    category={meal.category}
                    available={meal.available}
                    nutritionInfo={meal.nutritionInfo}
                  />
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-muted-foreground mb-4">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.3-4.3"/>
                    <path d="M8 11h6"/>
                  </svg>
                  <h3 className="text-lg font-medium mb-1">No meals found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      
      <NavigationMenu />
    </div>
  );
};

export default MealSchedule;
