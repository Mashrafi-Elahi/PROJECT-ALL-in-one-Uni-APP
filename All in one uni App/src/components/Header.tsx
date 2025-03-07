
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MoonIcon, SunIcon, BellIcon, XCircleIcon } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Event: Hackathon Registration',
      description: 'Registration is now open for the annual campus hackathon.',
      time: '10 minutes ago',
      read: false,
    },
    {
      id: 2,
      title: 'Bus Route Change',
      description: 'Route B will be temporarily diverted due to construction.',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 3,
      title: 'Cafeteria Special',
      description: 'Today\'s special: Mediterranean Plate with a free beverage.',
      time: '5 hours ago',
      read: true,
    }
  ]);
  const location = useLocation();
  
  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Check for user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Add actual theme toggling implementation here later
    document.documentElement.classList.toggle('dark');
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const notificationPanel = document.getElementById('notification-panel');
      const bellButton = document.getElementById('notification-bell');
      
      if (isNotificationsOpen && 
          notificationPanel && 
          !notificationPanel.contains(event.target) &&
          bellButton && 
          !bellButton.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNotificationsOpen]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ease-out",
        scrolled 
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="relative overflow-hidden group">
            <span className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 transition-all duration-300">
              CampusHub
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500"></span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          {[
            { name: 'Home', path: '/' },
            { name: 'Meals', path: '/meals' },
            { name: 'Bus Routes', path: '/bus-routes' },
            { name: 'Classes', path: '/classes' },
            { name: 'Events', path: '/events' },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                "hover:bg-secondary hover:text-foreground",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                location.pathname === item.path 
                  ? "text-primary font-semibold" 
                  : "text-foreground/70"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          {/* Notifications Bell */}
          <div className="relative">
            <button 
              id="notification-bell"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} 
              className="p-2 rounded-full hover:bg-secondary focus:outline-none transition-all duration-200"
              aria-label="Notifications"
            >
              <BellIcon className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {/* Notifications Panel */}
            {isNotificationsOpen && (
              <div 
                id="notification-panel"
                className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg z-50 border border-border"
              >
                <div className="p-3 border-b border-border flex justify-between items-center">
                  <h3 className="font-semibold">Notifications</h3>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      className="text-xs text-primary hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                
                {notifications.length > 0 ? (
                  <div className="divide-y divide-border">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={cn(
                          "p-3 hover:bg-secondary/50 transition-colors cursor-pointer",
                          !notification.read && "bg-blue-50 dark:bg-blue-900/20"
                        )}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex justify-between">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                        <span className="text-xs text-muted-foreground mt-1 block">{notification.time}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-muted-foreground">
                    <p>No notifications</p>
                  </div>
                )}
                
                <div className="p-2 border-t border-border">
                  <Link 
                    to="/notifications" 
                    className="text-xs text-center block w-full text-primary hover:underline"
                    onClick={() => setIsNotificationsOpen(false)}
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-full hover:bg-secondary focus:outline-none transition-all duration-200"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
        
          <div className="md:hidden">
            {/* Mobile menu trigger - implemented in NavigationMenu component */}
            <button className="p-2 rounded-full hover:bg-secondary focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
                <line x1="4" x2="20" y1="12" y2="12"/>
                <line x1="4" x2="20" y1="6" y2="6"/>
                <line x1="4" x2="20" y1="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
