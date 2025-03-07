
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FacultyCardProps {
  name: string;
  department: string;
  position: string;
  email: string;
  phone?: string;
  officeLocation?: string;
  officeHours?: string;
  image?: string;
}

const FacultyCard = ({
  name,
  department,
  position,
  email,
  phone,
  officeLocation,
  officeHours,
  image
}: FacultyCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <div 
      className={cn(
        "bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden",
        "transition-all duration-300 ease-out-bounce-subtle",
        "hover:shadow-lg",
        "border border-border",
        "flex flex-col"
      )}
    >
      <div className="flex space-x-4 p-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
          {image ? (
            <>
              <div className={cn(
                "w-full h-full absolute inset-0",
                !imageLoaded && "animate-pulse"
              )} />
              <img 
                src={image} 
                alt={name}
                className={cn(
                  "w-full h-full object-cover",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setImageLoaded(true)}
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
              <span className="text-xl font-medium">
                {name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="text-base font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground mb-1">{position}</p>
          <span className="inline-block text-xs font-medium px-2 py-0.5 bg-secondary rounded-full mb-2">
            {department}
          </span>
          
          <div className="flex items-center space-x-2 mt-2">
            <button
              className="p-1.5 rounded-full bg-secondary hover:bg-secondary/70 focus:outline-none transition-colors"
              aria-label="Send email"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </button>
            
            {phone && (
              <button
                className="p-1.5 rounded-full bg-secondary hover:bg-secondary/70 focus:outline-none transition-colors"
                aria-label="Call phone"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </button>
            )}
            
            <button
              className="p-1.5 rounded-full bg-secondary hover:bg-secondary/70 focus:outline-none transition-colors"
              aria-label="Schedule meeting"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                <line x1="16" x2="16" y1="2" y2="6"/>
                <line x1="8" x2="8" y1="2" y2="6"/>
                <line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="px-4 pb-4 mt-auto">
        {(officeLocation || officeHours) && (
          <div className="pt-2 border-t border-border">
            {officeLocation && (
              <div className="mt-2">
                <h4 className="text-xs text-muted-foreground mb-0.5">Office</h4>
                <p className="text-sm">{officeLocation}</p>
              </div>
            )}
            
            {officeHours && (
              <div className="mt-2">
                <h4 className="text-xs text-muted-foreground mb-0.5">Office Hours</h4>
                <p className="text-sm">{officeHours}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyCard;
