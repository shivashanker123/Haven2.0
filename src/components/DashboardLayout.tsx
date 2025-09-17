

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { ThemeToggle } from './ThemeToggle';
import { InteractiveBackground } from './InteractiveBackground';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Users, Menu } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: 'student' | 'admin';
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, userType }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-wellness-calm/5 to-wellness-peaceful/10 relative">
      <InteractiveBackground />
      
      <div className="flex h-screen relative z-10">
        <Sidebar 
          isOpen={sidebarOpen} 
          onToggle={() => setSidebarOpen(!sidebarOpen)} 
          userType={userType}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Main Header */}
          <header className="flex-shrink-0 bg-background/80 backdrop-blur-sm border-b border-border">
            <div className="container mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
              {/* Hamburger Menu for Mobile */}
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)} 
                className="lg:hidden text-muted-foreground"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open sidebar</span>
              </button>
              
              {/* This div is a spacer to push the right-side items correctly */}
              <div className="lg:hidden"></div>

              <div className="flex items-center gap-4">
                <ThemeToggle />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to="/community"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Users className="h-5 w-5" />
                        <span className="sr-only">Community Forum</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Community Forum</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-6 lg:p-8">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};