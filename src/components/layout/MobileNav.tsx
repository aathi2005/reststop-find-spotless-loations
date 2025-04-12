
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Map, Navigation, Heart, MessageSquare, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const location = useLocation();
  
  const navItems = [
    {
      icon: Map,
      label: "Map",
      href: "/map",
    },
    {
      icon: Navigation,
      label: "Nearby",
      href: "/nearby",
    },
    {
      icon: Search,
      label: "Search",
      href: "/search",
    },
    {
      icon: Heart,
      label: "Favorites",
      href: "/favorites",
    },
    {
      icon: MessageSquare,
      label: "Chat",
      href: "/chat",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t">
      <div className="grid h-full grid-cols-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className="flex flex-col items-center justify-center"
            >
              <div 
                className={cn(
                  "flex flex-col items-center justify-center text-xs",
                  isActive ? "text-restroom-blue" : "text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
