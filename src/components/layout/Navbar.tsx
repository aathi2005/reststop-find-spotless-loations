
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, User, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import logo from "@/assets/logo.svg";

const Navbar = () => {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-2 mr-4">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="RestStop Logo" className="h-6 w-6" />
            <span className="hidden md:inline-block font-bold text-xl text-restroom-blue">
              RestStop
            </span>
          </Link>
        </div>

        {!isMobile && (
          <div className="flex-1 flex items-center space-x-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                className="w-full rounded-md border border-input pl-8 pr-2 py-2 text-sm bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Find a restroom..."
                type="search"
              />
            </div>
            
            <nav className="flex items-center space-x-2">
              <Link to="/map">
                <Button variant="ghost" size="sm">
                  Map
                </Button>
              </Link>
              <Link to="/nearby">
                <Button variant="ghost" size="sm">
                  Nearby
                </Button>
              </Link>
              <Link to="/favorites">
                <Button variant="ghost" size="sm">
                  Favorites
                </Button>
              </Link>
              <Link to="/chat">
                <Button variant="ghost" size="sm">
                  Assistant
                </Button>
              </Link>
            </nav>
          </div>
        )}

        <div className="flex items-center space-x-2 ml-auto">
          <Link to="/profile">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              title="Profile"
            >
              <User className="h-5 w-5" />
            </Button>
          </Link>
          
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="py-4 space-y-4">
                  <div className="relative w-full">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      className="w-full rounded-md border border-input pl-8 pr-2 py-2 text-sm bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="Find a restroom..."
                      type="search"
                    />
                  </div>
                  <nav className="flex flex-col space-y-2">
                    <Link to="/map">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Map
                      </Button>
                    </Link>
                    <Link to="/nearby">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Nearby
                      </Button>
                    </Link>
                    <Link to="/favorites">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Favorites
                      </Button>
                    </Link>
                    <Link to="/chat">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Assistant
                      </Button>
                    </Link>
                    <Link to="/profile">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Profile
                      </Button>
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
