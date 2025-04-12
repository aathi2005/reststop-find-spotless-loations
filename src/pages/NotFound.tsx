
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Home, Search } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-4 text-center">
        <div className="mb-8">
          <MapPin className="h-16 w-16 mx-auto text-restroom-blue opacity-50" />
          <h1 className="text-4xl font-bold mt-4 mb-2">Page Not Found</h1>
          <p className="text-lg text-muted-foreground">
            We couldn't locate the page you're looking for. It might have been moved or doesn't exist.
          </p>
        </div>
        
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full">
            <Link to="/map">
              <MapPin className="mr-2 h-4 w-4" />
              Find Restrooms
            </Link>
          </Button>
          
          <Button asChild variant="ghost" className="w-full">
            <Link to="/search">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
