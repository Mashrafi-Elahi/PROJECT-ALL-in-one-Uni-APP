
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface BusRouteCardProps {
  routeNumber: string;
  routeName: string;
  currentLocation: string;
  arrivalTime: string;
  departureTime: string;
  stops: string[];
  capacity: {
    total: number;
    filled: number;
  };
  delayed?: boolean;
  delayMinutes?: number;
}

const BusRouteCard = ({
  routeNumber,
  routeName,
  currentLocation,
  arrivalTime,
  departureTime,
  stops,
  capacity,
  delayed = false,
  delayMinutes = 0
}: BusRouteCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const capacityPercentage = Math.round((capacity.filled / capacity.total) * 100);
  
  return (
    <div 
      className={cn(
        "bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden",
        "transition-all duration-300 ease-out-bounce-subtle",
        "hover:shadow-lg",
        "border border-border"
      )}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full",
              "bg-primary/10 text-primary"
            )}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bus">
                <path d="M8 6v6"/>
                <path d="M16 6v6"/>
                <path d="M2 12h20"/>
                <path d="M18 18h2a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2"/>
                <path d="M8 18v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2"/>
                <path d="M9 21h6"/>
                <path d="M8 18h8"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium px-2 py-0.5 bg-secondary rounded-full">
                  {routeNumber}
                </span>
                <h3 className="text-base font-semibold">{routeName}</h3>
              </div>
              <p className="text-sm text-muted-foreground">Current: {currentLocation}</p>
            </div>
          </div>
          
          {delayed && (
            <div className="flex items-center px-2 py-1 bg-destructive/10 text-destructive rounded-lg text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <rect width="20" height="14" x="2" y="5" rx="2"/>
                <path d="M12 12h.01"/>
                <path d="M12 16h.01"/>
                <path d="M8 12h.01"/>
                <path d="M8 16h.01"/>
                <path d="M16 12h.01"/>
                <path d="M16 16h.01"/>
              </svg>
              Delayed {delayMinutes}m
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-xs text-muted-foreground">Arrival</p>
            <p className="text-sm font-medium">{arrivalTime}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Departure</p>
            <p className="text-sm font-medium">{departureTime}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-muted-foreground">Capacity</span>
            <span className="text-xs font-medium">
              {capacity.filled}/{capacity.total}
            </span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full transition-all duration-500 ease-out",
                capacityPercentage > 80 ? "bg-destructive" : "bg-primary"
              )}
              style={{ width: `${capacityPercentage}%` }}
            />
          </div>
        </div>
        
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-sm font-medium text-primary hover:text-primary/80 focus:outline-none"
        >
          {expanded ? 'Hide Stops' : 'View Stops'}
        </button>
      </div>
      
      {expanded && (
        <div className="px-4 pb-4 animate-slide-up">
          <div className="pt-2 border-t border-border">
            <h4 className="text-sm font-medium mb-2">Route Stops</h4>
            <ul className="space-y-2">
              {stops.map((stop, index) => (
                <li 
                  key={index}
                  className="flex items-center text-sm"
                >
                  <div className="relative mr-3 flex items-center">
                    <div className={cn(
                      "w-3 h-3 rounded-full z-10",
                      index === 0 ? "bg-green-500" : 
                      index === stops.length - 1 ? "bg-primary" : "bg-secondary"
                    )} />
                    {index < stops.length - 1 && (
                      <div className="absolute top-3 left-1.5 w-px h-6 bg-border" />
                    )}
                  </div>
                  {stop}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusRouteCard;
