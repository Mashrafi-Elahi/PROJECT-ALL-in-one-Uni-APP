
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface MealCardProps {
  image: string;
  name: string;
  description: string;
  price: string;
  category: string;
  available: boolean;
  nutritionInfo?: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
}

const MealCard = ({
  image,
  name,
  description,
  price,
  category,
  available,
  nutritionInfo
}: MealCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div 
      className={cn(
        "group relative overflow-hidden bg-white dark:bg-gray-900 rounded-2xl shadow-md",
        "transition-all duration-300 ease-out-bounce-subtle",
        "hover:shadow-lg hover:translate-y-[-4px]",
        "border border-border"
      )}
    >
      <div className="aspect-[4/3] w-full overflow-hidden">
        <div className={cn(
          "w-full h-full bg-gray-100 dark:bg-gray-800",
          !imageLoaded && "animate-pulse"
        )}>
          <img 
            src={image} 
            alt={name}
            className={cn(
              "w-full h-full object-cover transition-all duration-700 ease-out",
              "group-hover:scale-105",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>

      <div className="absolute top-3 left-3">
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm text-foreground shadow-sm">
          {category}
        </span>
      </div>

      {!available && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <span className="px-3 py-1.5 text-sm font-medium bg-black/60 text-white rounded-lg transform -rotate-12">
            Currently Unavailable
          </span>
        </div>
      )}

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold leading-tight mb-1">{name}</h3>
          <span className="font-medium text-primary">{price}</span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>
        
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs font-medium text-primary hover:text-primary/80 focus:outline-none"
          >
            {showDetails ? 'Hide Details' : 'Nutrition Info'}
          </button>
          
          <button
            disabled={!available}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-300",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
              available 
                ? "bg-primary text-white hover:bg-primary/90" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            {available ? 'Pre-order' : 'Unavailable'}
          </button>
        </div>
        
        {showDetails && nutritionInfo && (
          <div className="mt-3 pt-3 border-t border-border grid grid-cols-4 gap-2 text-sm animate-fade-in">
            <div className="text-center">
              <p className="font-medium">{nutritionInfo.calories}</p>
              <p className="text-xs text-muted-foreground">Calories</p>
            </div>
            <div className="text-center">
              <p className="font-medium">{nutritionInfo.protein}</p>
              <p className="text-xs text-muted-foreground">Protein</p>
            </div>
            <div className="text-center">
              <p className="font-medium">{nutritionInfo.carbs}</p>
              <p className="text-xs text-muted-foreground">Carbs</p>
            </div>
            <div className="text-center">
              <p className="font-medium">{nutritionInfo.fat}</p>
              <p className="text-xs text-muted-foreground">Fat</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealCard;
