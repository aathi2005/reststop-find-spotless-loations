
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronRight, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { mockRestrooms, Restroom, DEFAULT_USER_LOCATION } from "@/data/mockRestrooms";
import RestroomCard from "@/components/restrooms/RestroomCard";
import { useToast } from "@/components/ui/use-toast";
import MapDisplay from "@/components/map/MapDisplay";

const Map = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [filteredRestrooms, setFilteredRestrooms] = useState<Restroom[]>([]);
  const [filters, setFilters] = useState({
    free: false,
    accessible: false,
    changingTable: false,
    openNow: false,
    minCleanliness: 0,
  });
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [selectedRestroom, setSelectedRestroom] = useState<Restroom | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState(DEFAULT_USER_LOCATION);

  // Simulate map loading
  useEffect(() => {
    // Simulate map loading delay
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
      showLocationPrompt();
    }, 1500);
    
    // Apply initial filtering
    applyFilters();

    return () => clearTimeout(timer);
  }, []);

  const showLocationPrompt = () => {
    toast({
      title: "Location Access",
      description: "RestStop works best with location access. Allow location?",
      action: (
        <Button 
          variant="default" 
          onClick={() => {
            // Simulate getting user's location (in a real app, would use geolocation API)
            toast({
              title: "Location Access Granted",
              description: "Using your current location to find nearby restrooms."
            });
          }}
        >
          Allow
        </Button>
      ),
    });
  };

  const applyFilters = () => {
    let results = [...mockRestrooms];
    
    // Apply cleanliness filter
    if (filters.minCleanliness > 0) {
      results = results.filter(r => r.cleanliness >= filters.minCleanliness);
    }
    
    // Apply checkbox filters
    if (filters.free) {
      results = results.filter(r => r.isFree);
    }
    
    if (filters.accessible) {
      results = results.filter(r => r.isAccessible);
    }
    
    if (filters.changingTable) {
      results = results.filter(r => r.hasChangingTable);
    }
    
    if (filters.openNow) {
      results = results.filter(r => r.isOpen);
    }
    
    // Apply search query
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      results = results.filter(r => 
        r.name.toLowerCase().includes(lowercaseQuery) || 
        r.address.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Add distance from user
    results = results.map(r => ({
      ...r,
      distance: calculateDistance(
        userLocation.lat, 
        userLocation.lng, 
        r.latitude, 
        r.longitude
      )
    }));
    
    // Sort by distance
    results.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    
    setFilteredRestrooms(results);
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    // Simple distance calculation for mock purposes
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in km
    return parseFloat(d.toFixed(1));
  };

  const handleFilterChange = (key: keyof typeof filters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Apply filters immediately
    setTimeout(applyFilters, 0);
  };

  const resetFilters = () => {
    setFilters({
      free: false,
      accessible: false,
      changingTable: false,
      openNow: false,
      minCleanliness: 0,
    });
    
    // Apply filters immediately
    setTimeout(applyFilters, 0);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    // Apply search with a small delay for typing
    setTimeout(applyFilters, 300);
  };

  const selectRestroom = (restroom: Restroom) => {
    setSelectedRestroom(restroom);
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col md:flex-row">
      {/* Map Visualization */}
      <div className="relative flex-1">
        {!isMapLoaded ? (
          <div className="h-full flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-4 border-restroom-blue border-t-transparent rounded-full animate-spin mb-2"></div>
              <p className="text-sm text-muted-foreground">Loading map...</p>
            </div>
          </div>
        ) : (
          <>
            <MapDisplay 
              restrooms={filteredRestrooms}
              selectedRestroom={selectedRestroom}
              onSelectRestroom={selectRestroom}
              userLocation={userLocation}
            />
            
            {/* Map Controls */}
            <div className="absolute top-4 inset-x-4 z-10 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    className="w-full h-10 px-10 bg-background border border-input rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Find a restroom..."
                    value={query}
                    onChange={handleSearchChange}
                  />
                  {query && (
                    <button
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => {
                        setQuery("");
                        applyFilters();
                      }}
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
                
                <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <div className="h-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Filters</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={resetFilters}
                        >
                          Reset All
                        </Button>
                      </div>
                      
                      <div className="space-y-6 flex-1 overflow-auto">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Cleanliness Rating</h4>
                          <div className="px-2">
                            <Slider 
                              defaultValue={[filters.minCleanliness]} 
                              max={5} 
                              step={0.5}
                              value={[filters.minCleanliness]}
                              onValueChange={(value) => handleFilterChange("minCleanliness", value[0])}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>Any</span>
                              <span>Minimum: {filters.minCleanliness.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Availability</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="openNow" 
                                checked={filters.openNow}
                                onCheckedChange={(checked) => 
                                  handleFilterChange("openNow", checked === true)
                                }
                              />
                              <Label htmlFor="openNow">Open Now</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="free" 
                                checked={filters.free}
                                onCheckedChange={(checked) => 
                                  handleFilterChange("free", checked === true)
                                }
                              />
                              <Label htmlFor="free">Free to Use</Label>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Amenities</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="accessible" 
                                checked={filters.accessible}
                                onCheckedChange={(checked) => 
                                  handleFilterChange("accessible", checked === true)
                                }
                              />
                              <Label htmlFor="accessible">Wheelchair Accessible</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="changingTable" 
                                checked={filters.changingTable}
                                onCheckedChange={(checked) => 
                                  handleFilterChange("changingTable", checked === true)
                                }
                              />
                              <Label htmlFor="changingTable">Baby Changing Table</Label>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        className="mt-auto"
                        onClick={() => setIsFilterSheetOpen(false)}
                      >
                        Show Results
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Restroom Details Panel */}
            {selectedRestroom && (
              <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{selectedRestroom.name}</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => setSelectedRestroom(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center text-sm mb-2">
                  <Search className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  <span className="text-muted-foreground">{selectedRestroom.address}</span>
                </div>
                <div className="flex items-center text-sm mb-3">
                  <div className="flex items-center bg-blue-50 text-restroom-blue rounded-md px-2 py-0.5 mr-2">
                    <StarIcon className="h-3.5 w-3.5 fill-current mr-1" />
                    <span className="font-medium">{selectedRestroom.cleanliness.toFixed(1)}</span>
                  </div>
                  <span className="text-muted-foreground">
                    {selectedRestroom.distance} km away
                  </span>
                </div>
                <Button 
                  className="w-full"
                  onClick={() => navigate(`/restroom/${selectedRestroom.id}`)}
                >
                  <span>View Details</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Restroom List Panel (Only visible in desktop/tablet) */}
      <div className="hidden md:block w-96 border-l overflow-y-auto">
        <div className="sticky top-0 z-10 bg-background p-4 border-b">
          <h2 className="font-semibold">
            {filteredRestrooms.length} {filteredRestrooms.length === 1 ? 'Restroom' : 'Restrooms'} Found in Coimbatore
          </h2>
        </div>
        <div className="p-4 space-y-4">
          {filteredRestrooms.length > 0 ? (
            filteredRestrooms.map((restroom) => (
              <div 
                key={restroom.id}
                onClick={() => selectRestroom(restroom)}
                className="cursor-pointer"
              >
                <RestroomCard restroom={restroom} />
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Search className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">No restrooms match your filters</p>
              <Button 
                variant="link" 
                onClick={resetFilters}
                className="mt-2"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Star icon component
function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default Map;
