
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const NavigationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuItems = [
    { 
      name: 'Home', 
      path: '/', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    },
    { 
      name: 'Meal Schedule', 
      path: '/meals', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-utensils">
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
          <path d="M7 2v20"/>
          <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
        </svg>
      )
    },
    { 
      name: 'Bus Routes', 
      path: '/bus-routes', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bus">
          <path d="M8 6v6"/>
          <path d="M16 6v6"/>
          <path d="M2 12h20"/>
          <path d="M18 18h2a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2"/>
          <path d="M8 18v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2"/>
          <path d="M9 21h6"/>
          <path d="M8 18h8"/>
        </svg>
      )
    },
    { 
      name: 'Class Schedule', 
      path: '/classes', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
          <line x1="16" x2="16" y1="2" y2="6"/>
          <line x1="8" x2="8" y1="2" y2="6"/>
          <line x1="3" x2="21" y1="10" y2="10"/>
        </svg>
      )
    }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-white shadow-lg transform transition-transform hover:scale-105 focus:outline-none"
        aria-label="Open navigation menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
          <line x1="4" x2="20" y1="12" y2="12"/>
          <line x1="4" x2="20" y1="6" y2="6"/>
          <line x1="4" x2="20" y1="18" y2="18"/>
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-50 md:hidden transition-all duration-300 ease-out",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Panel */}
        <div 
          className={cn(
            "absolute bottom-0 inset-x-0 rounded-t-2xl bg-background shadow-xl transform transition-transform duration-300 ease-out-bounce-subtle",
            isOpen ? "translate-y-0" : "translate-y-full"
          )}
        >
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 rounded-full bg-muted" />
          </div>
          
          <nav className="px-6 py-4">
            <div className="grid grid-cols-2 gap-3">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300",
                    "hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    location.pathname === item.path 
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="mb-2">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Desktop Bottom Navigation */}
      <nav className="hidden md:flex fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex space-x-1 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-full shadow-lg p-1.5 border border-border">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-2 rounded-full transition-all duration-300",
                "hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                location.pathname === item.path 
                  ? "bg-primary text-white" 
                  : "text-foreground/70"
              )}
            >
              <span className="mr-2">{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default NavigationMenu;
