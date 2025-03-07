
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ClassCardProps {
  courseCode: string;
  courseName: string;
  instructor: string;
  time: string;
  location: string;
  daysOfWeek: string[];
  color?: string;
}

const ClassCard = ({
  courseCode,
  courseName,
  instructor,
  time,
  location,
  daysOfWeek,
  color = 'bg-primary/10'
}: ClassCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div 
      className={cn(
        "bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden",
        "transition-all duration-300 ease-out-bounce-subtle",
        "hover:shadow-lg",
        "border border-border"
      )}
    >
      <div className={cn("h-2", color)} />
      
      <div className="p-4">
        <div className="flex justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-medium px-2 py-0.5 bg-secondary rounded-full">
                {courseCode}
              </span>
            </div>
            <h3 className="text-base font-semibold">{courseName}</h3>
            <p className="text-sm text-muted-foreground">{instructor}</p>
          </div>
          
          <div className="text-right">
            <p className="text-sm font-medium">{time}</p>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
        </div>
        
        <div className="flex space-x-1 mt-3">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
            <div 
              key={day}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium",
                daysOfWeek.includes(day)
                  ? "bg-primary/10 text-primary"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {day.charAt(0)}
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm font-medium text-primary hover:text-primary/80 focus:outline-none"
          >
            {expanded ? 'Less Info' : 'More Info'}
          </button>
          
          <div className="flex space-x-2">
            <button
              className="p-2 rounded-full bg-secondary hover:bg-secondary/70 focus:outline-none transition-colors"
              aria-label="Add to calendar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                <line x1="16" x2="16" y1="2" y2="6"/>
                <line x1="8" x2="8" y1="2" y2="6"/>
                <line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
            </button>
            <button
              className="p-2 rounded-full bg-secondary hover:bg-secondary/70 focus:outline-none transition-colors"
              aria-label="Contact instructor"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {expanded && (
        <div className="px-4 pb-4 animate-slide-up">
          <div className="pt-2 border-t border-border">
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <h4 className="text-xs text-muted-foreground mb-1">Office Hours</h4>
                <p className="text-sm">Mon, Wed 2-4 PM</p>
              </div>
              <div>
                <h4 className="text-xs text-muted-foreground mb-1">Course Credits</h4>
                <p className="text-sm">3 Credits</p>
              </div>
            </div>
            
            <div className="mt-3">
              <h4 className="text-xs text-muted-foreground mb-1">Upcoming Assignments</h4>
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span className="text-sm">Midterm Exam</span>
                  <span className="text-xs font-medium px-2 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 rounded-full">
                    Oct 15
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-sm">Research Paper</span>
                  <span className="text-xs font-medium px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full">
                    Nov 5
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassCard;
