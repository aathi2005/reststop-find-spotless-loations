
import React, { useState, useEffect } from "react";
import { getNearbyRestrooms, Restroom, DEFAULT_USER_LOCATION } from "@/data/mockRestrooms";
import RestroomCard from "@/components/restrooms/RestroomCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, RefreshCw } from "lucide-react";

const Nearby = () => {
  const { toast } = useToast();
  const [nearbyRestrooms, setNearbyRestrooms] = useState<Restroom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortMethod, setSortMethod] = useState<"distance" | "cleanliness">("distance");
  const [userLocation, setUserLocation] = useState(DEFAULT_USER_LOCATION);

  useEffect(() => {
    loadNearbyRestrooms();
  }, []);

  const loadNearbyRestrooms = () => {
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      const restrooms = getNearbyRestrooms(userLocation.lat, userLocation.lng);
      setNearbyRestrooms(restrooms);
      setIsLoading(false);
    }, 1000);
  };

  const refreshLocation = () => {
    setIsLoading(true);
    toast({
      title: "Updating Location",
      description: "Finding restrooms near your current location in Coimbatore..."
    });
    
    // Simulate refreshing location
    setTimeout(() => {
      // Slightly adjust location to simulate movement
      setUserLocation({
        lat: userLocation.lat + (Math.random() * 0.01 - 0.005),
        lng: userLocation.lng + (Math.random() * 0.01 - 0.005),
      });
      loadNearbyRestrooms();
      toast({
        title: "Location Updated",
        description: "We found restrooms near you in Coimbatore!"
      });
    }, 1500);
  };

  const sortedRestrooms = [...nearbyRestrooms].sort((a, b) => {
    if (sortMethod === "distance") {
      return (a.distance || 0) - (b.distance || 0);
    } else {
      return b.cleanliness - a.cleanliness;
    }
  });

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Nearby Restrooms in Coimbatore</h1>
        <Button variant="outline" size="sm" onClick={refreshLocation} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      
      <div className="mb-6">
        <Tabs defaultValue="distance" onValueChange={(v) => setSortMethod(v as "distance" | "cleanliness")}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="distance">Distance</TabsTrigger>
            <TabsTrigger value="cleanliness">Cleanliness</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {isLoading ? (
        <div className="py-12 text-center">
          <div className="inline-block w-8 h-8 border-4 border-restroom-blue border-t-transparent rounded-full animate-spin mb-2"></div>
          <p className="text-muted-foreground">Finding restrooms near you in Coimbatore...</p>
        </div>
      ) : sortedRestrooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRestrooms.map((restroom) => (
            <RestroomCard key={restroom.id} restroom={restroom} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No restrooms found nearby</h3>
          <p className="text-muted-foreground mb-4">
            We couldn't find any restrooms in your area. Try expanding your search.
          </p>
          <Button onClick={refreshLocation}>
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default Nearby;
