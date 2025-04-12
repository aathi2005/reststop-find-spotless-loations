
import React, { useState, useEffect } from "react";
import { Restroom, mockRestrooms } from "@/data/mockRestrooms";
import RestroomCard from "@/components/restrooms/RestroomCard";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Mock favorite restrooms (in a real app this would come from user data)
const initialFavorites = [mockRestrooms[0], mockRestrooms[3]];

const Favorites = () => {
  const [favorites, setFavorites] = useState<Restroom[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading favorites
    setTimeout(() => {
      setFavorites(initialFavorites);
      setIsLoading(false);
    }, 800);
  }, []);

  const removeFromFavorites = (id: string) => {
    setFavorites(favorites.filter(restroom => restroom.id !== id));
  };

  const clearAllFavorites = () => {
    setFavorites([]);
  };

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Heart className="h-5 w-5 mr-2 text-red-500" />
          Favorite Restrooms
        </h1>

        {favorites.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear all favorites?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. You will remove all restrooms from your favorites.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={clearAllFavorites}>
                  Yes, clear all
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      
      {isLoading ? (
        <div className="py-12 text-center">
          <div className="inline-block w-8 h-8 border-4 border-restroom-blue border-t-transparent rounded-full animate-spin mb-2"></div>
          <p className="text-muted-foreground">Loading your favorites...</p>
        </div>
      ) : favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((restroom) => (
            <div key={restroom.id} className="relative group">
              <RestroomCard restroom={restroom} />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeFromFavorites(restroom.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
          <p className="text-muted-foreground mb-4">
            You haven't added any restrooms to your favorites yet.
          </p>
          <Button>Find Restrooms</Button>
        </div>
      )}
    </div>
  );
};

export default Favorites;
