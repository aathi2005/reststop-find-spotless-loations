
import React, { useState, useEffect, useRef } from "react";
import { Restroom } from "@/data/mockRestrooms";
import { MapPin } from "lucide-react";

interface MapDisplayProps {
  restrooms: Restroom[];
  selectedRestroom: Restroom | null;
  onSelectRestroom: (restroom: Restroom) => void;
  userLocation: { lat: number; lng: number };
}

const MapDisplay = ({ 
  restrooms, 
  selectedRestroom, 
  onSelectRestroom,
  userLocation 
}: MapDisplayProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapTokenInput, setMapTokenInput] = useState("");
  const [mapToken, setMapToken] = useState<string | null>(
    localStorage.getItem("mapbox_token")
  );
  
  // Initialize map when token is available
  useEffect(() => {
    if (!mapToken || !mapRef.current) return;
    
    const loadMap = async () => {
      try {
        // This would normally load the map from Mapbox or another provider
        // For demo purposes, we'll just simulate a successful map load
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMapLoaded(true);
        console.log("Map initialized with restrooms:", restrooms);
        console.log("User location:", userLocation);
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };
    
    loadMap();
  }, [mapToken, restrooms, userLocation]);
  
  // Save token to localStorage when it changes
  useEffect(() => {
    if (mapToken) {
      localStorage.setItem("mapbox_token", mapToken);
    }
  }, [mapToken]);
  
  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapTokenInput.trim()) {
      setMapToken(mapTokenInput.trim());
    }
  };
  
  if (!mapToken) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Map API Token Needed</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            To display the map, please enter your Mapbox public token. You can get one by signing up at{" "}
            <a 
              href="https://mapbox.com"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-restroom-blue hover:underline"
            >
              mapbox.com
            </a>
          </p>
          <form onSubmit={handleTokenSubmit}>
            <input
              type="text"
              value={mapTokenInput}
              onChange={(e) => setMapTokenInput(e.target.value)}
              placeholder="Enter your Mapbox public token"
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            />
            <button
              type="submit"
              className="w-full bg-restroom-blue text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Save Token & Load Map
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  if (!mapLoaded) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-restroom-blue border-t-transparent rounded-full animate-spin mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative h-full bg-blue-50" ref={mapRef}>
      {/* Simulated map with restroom markers */}
      <div className="absolute inset-0 p-4">
        <div className="h-full w-full bg-blue-50 flex items-center justify-center relative border-2 border-gray-200 rounded-lg overflow-hidden">
          {/* User location marker */}
          <div 
            className="absolute w-6 h-6 bg-restroom-blue rounded-full border-2 border-white shadow-lg z-10 animate-pulse"
            style={{ 
              left: '50%', 
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            title="Your location"
          >
            <div className="w-2 h-2 bg-white rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          
          {/* Restroom markers */}
          {restrooms.map(restroom => (
            <div
              key={restroom.id}
              className={`absolute cursor-pointer transition-all duration-200 ${
                selectedRestroom?.id === restroom.id 
                  ? "z-20 scale-125" 
                  : "z-10 hover:scale-110"
              }`}
              style={{
                left: `${Math.random() * 80 + 10}%`,  // Random position for demo purposes
                top: `${Math.random() * 80 + 10}%`,   // In real app, would use actual coordinates
                transform: "translate(-50%, -50%)"
              }}
              onClick={() => onSelectRestroom(restroom)}
              title={restroom.name}
            >
              <MapPin 
                className={`h-6 w-6 ${
                  selectedRestroom?.id === restroom.id 
                    ? "text-red-500 fill-red-200" 
                    : "text-restroom-blue"
                }`} 
              />
            </div>
          ))}
          
          {/* Map background text */}
          <div className="text-center opacity-30 pointer-events-none">
            <p className="text-sm text-muted-foreground mt-1">
              Coimbatore, Tamil Nadu, India
            </p>
          </div>
        </div>
      </div>
      
      {/* Reset token button (for testing purposes) */}
      <button
        onClick={() => {
          localStorage.removeItem("mapbox_token");
          setMapToken(null);
        }}
        className="absolute bottom-2 right-2 bg-white text-xs text-gray-500 px-2 py-1 rounded border border-gray-300"
      >
        Reset Token
      </button>
    </div>
  );
};

export default MapDisplay;
