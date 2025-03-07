
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import NavigationMenu from '@/components/NavigationMenu';

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  // Stagger animation for features
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-scale-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const featureElements = featuresRef.current?.querySelectorAll('.feature-card');
    featureElements?.forEach((el) => observer.observe(el));

    return () => {
      featureElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-utensils">
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
          <path d="M7 2v20"/>
          <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
        </svg>
      ),
      title: 'Cafeteria Menu',
      description: 'Browse daily meals, nutrition info, and pre-order your favorites.',
      link: '/meals',
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bus">
          <path d="M8 6v6"/>
          <path d="M16 6v6"/>
          <path d="M2 12h20"/>
          <path d="M18 18h2a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2"/>
          <path d="M8 18v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2"/>
          <path d="M9 21h6"/>
          <path d="M8 18h8"/>
        </svg>
      ),
      title: 'Bus Routes',
      description: 'Track campus buses in real-time and get arrival predictions.',
      link: '/bus-routes',
      color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
          <line x1="16" x2="16" y1="2" y2="6"/>
          <line x1="8" x2="8" y1="2" y2="6"/>
          <line x1="3" x2="21" y1="10" y2="10"/>
        </svg>
      ),
      title: 'Class Schedule',
      description: 'Keep track of classes, assignments, and contact faculty easily.',
      link: '/classes',
      color: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4 animate-fade-in">
            Simplify Your Campus Life
          </span>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight animate-fade-in">
            Your Complete
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
              {' '}University App
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in">
            All the tools you need to navigate campus life. Meals, transportation, classes, and more — all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 animate-fade-in">
            <Link
              to="/meals"
              className="px-6 py-3 bg-primary text-white rounded-full font-medium shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 w-full sm:w-auto"
            >
              Explore Features
            </Link>
            
            <Link
              to="/classes"
              className="px-6 py-3 bg-secondary text-foreground rounded-full font-medium border border-border hover:bg-secondary/70 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 w-full sm:w-auto"
            >
              View Schedule
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl transform -translate-x-1/2 animate-float" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl transform translate-x-1/2 animate-float" style={{ animationDelay: '1s' }} />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-6 relative" ref={featuresRef}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Designed to make your campus life easier and more organized.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className={cn(
                  "feature-card opacity-0 transform translate-y-4",
                  "bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden",
                  "transition-all duration-300 ease-out-bounce-subtle",
                  "hover:shadow-lg hover:-translate-y-2",
                  "border border-border flex flex-col h-full"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="p-6 flex flex-col h-full">
                  <div className={cn(
                    "p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4",
                    feature.color
                  )}>
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  
                  <div className="mt-auto flex items-center text-sm font-medium text-primary">
                    <span>Learn more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                      <path d="M5 12h14"/>
                      <path d="m12 5 7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Campus App Preview Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-background to-secondary/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Simplified Campus Navigation</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access all your campus needs in one beautifully designed application.
            </p>
          </div>
          
          <div className="glass-morphism rounded-2xl p-8 md:p-12 shadow-xl mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Ready For Your Day</h3>
                <p className="text-muted-foreground mb-6">
                  Start your day with everything you need to know: your class schedule, today's cafeteria options, and up-to-date bus timings.
                </p>
                
                <ul className="space-y-3 mb-6">
                  {[
                    'Quick access to important information',
                    'Personalized class schedules and reminders',
                    'Simple and intuitive interface'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2 flex-shrink-0 mt-1">
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                        <path d="m9 12 2 2 4-4"/>
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to="/bus-routes"
                  className="inline-flex items-center px-5 py-2.5 bg-primary text-white rounded-lg font-medium shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                >
                  <span>Get Started</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                    <path d="M5 12h14"/>
                    <path d="m12 5 7 7-7 7"/>
                  </svg>
                </Link>
              </div>
              
              <div className="relative">
                <div className="aspect-[9/16] w-full max-w-[220px] bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden mx-auto border-4 border-white dark:border-gray-700">
                  <div className="absolute top-0 left-0 right-0 h-6 bg-black rounded-t-3xl flex justify-center items-end pb-0.5">
                    <div className="w-20 h-1.5 bg-gray-700 rounded-full"></div>
                  </div>
                  <div className="mt-6 p-2 animate-float" style={{ animationDelay: '0.5s' }}>
                    <div className="bg-primary/10 rounded-xl p-2 mb-2">
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-2">
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-1"></div>
                        <div className="w-3/4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="bg-amber-100 dark:bg-amber-900/30 rounded-lg p-2">
                        <div className="w-8 h-8 rounded-full bg-amber-200 dark:bg-amber-800 mb-1"></div>
                        <div className="w-full h-2 bg-amber-200 dark:bg-amber-800 rounded-full mb-1"></div>
                        <div className="w-2/3 h-2 bg-amber-200 dark:bg-amber-800 rounded-full"></div>
                      </div>
                      <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-2">
                        <div className="w-8 h-8 rounded-full bg-green-200 dark:bg-green-800 mb-1"></div>
                        <div className="w-full h-2 bg-green-200 dark:bg-green-800 rounded-full mb-1"></div>
                        <div className="w-2/3 h-2 bg-green-200 dark:bg-green-800 rounded-full"></div>
                      </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-2">
                      <div className="flex items-center mb-1">
                        <div className="w-6 h-6 rounded-full bg-blue-200 dark:bg-blue-800 mr-1"></div>
                        <div className="w-2/3 h-2 bg-blue-200 dark:bg-blue-800 rounded-full"></div>
                      </div>
                      <div className="w-full h-2 bg-blue-200 dark:bg-blue-800 rounded-full mb-1"></div>
                      <div className="w-5/6 h-2 bg-blue-200 dark:bg-blue-800 rounded-full mb-1"></div>
                      <div className="w-4/6 h-2 bg-blue-200 dark:bg-blue-800 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 -mb-4 -mr-4 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
                <div className="absolute top-1/4 left-0 -ml-4 w-24 h-24 bg-amber-500/10 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <NavigationMenu />
    </div>
  );
};

export default Index;
