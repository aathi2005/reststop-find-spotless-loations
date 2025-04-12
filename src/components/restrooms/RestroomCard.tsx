
import React from "react";
import { Link } from "react-router-dom";
import { Restroom } from "@/data/mockRestrooms";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarIcon, Clock, MapPin, Accessibility, Fuel, Building, Toilet } from "lucide-react";
import BabyChangingStation from "@/components/icons/BabyChangingStation";
import { cn } from "@/lib/utils";

interface RestroomCardProps {
  restroom: Restroom;
  className?: string;
}

const RestroomCard: React.FC<RestroomCardProps> = ({ restroom, className }) => {
  return (
    <Link to={`/restroom/${restroom.id}`}>
      <Card className={cn("h-full transition-all hover:shadow-md", className)}>
        <CardContent className="p-0">
          <div className="aspect-video relative rounded-t-lg overflow-hidden">
            <img 
              src={restroom.images[0]} 
              alt={restroom.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 flex gap-1">
              {restroom.isOpen ? (
                <Badge variant="default" className="bg-green-500 hover:bg-green-600">Open</Badge>
              ) : (
                <Badge variant="default" className="bg-gray-500 hover:bg-gray-600">Closed</Badge>
              )}
              {restroom.isFree ? (
                <Badge variant="outline" className="bg-background">Free</Badge>
              ) : (
                <Badge variant="outline" className="bg-background">Paid</Badge>
              )}
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg line-clamp-1">{restroom.name}</h3>
              <Badge variant="outline" className={cn(
                "ml-1 text-xs", 
                restroom.type === "Public" ? "bg-blue-50 text-blue-600" : 
                restroom.type === "Hotel" ? "bg-purple-50 text-purple-600" : 
                "bg-amber-50 text-amber-600"
              )}>
                <span className="mr-1">
                  {restroom.type === "Public" && <Toilet className="h-3 w-3" />}
                  {restroom.type === "Hotel" && <Building className="h-3 w-3" />}
                  {restroom.type === "Petrol Bunk" && <Fuel className="h-3 w-3" />}
                </span>
                {restroom.type}
              </Badge>
            </div>
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span className="line-clamp-1">{restroom.address}</span>
            </div>
            
            <div className="flex items-center mt-2">
              <div className={cn(
                "flex items-center rounded-md px-2 py-0.5",
                restroom.cleanliness >= 4.0 ? "bg-green-50 text-green-600" :
                restroom.cleanliness >= 3.0 ? "bg-blue-50 text-blue-600" :
                restroom.cleanliness >= 2.0 ? "bg-amber-50 text-amber-600" :
                "bg-red-50 text-red-600"
              )}>
                <StarIcon className="h-3.5 w-3.5 fill-current mr-1" />
                <span className="text-sm font-medium">{restroom.cleanliness.toFixed(1)}</span>
              </div>
              
              <div className="flex items-center ml-2 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{restroom.hours}</span>
              </div>
            </div>
            
            <div className="flex gap-1 mt-2">
              {restroom.isAccessible && (
                <Accessibility className="h-4 w-4 text-restroom-blue" aria-label="Accessible" />
              )}
              {restroom.hasChangingTable && (
                <BabyChangingStation className="h-4 w-4 text-restroom-blue" aria-label="Baby Changing Station" />
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0 pb-4 px-4">
          <div className="w-full flex justify-between items-center text-xs text-muted-foreground">
            <span>Last reported: {restroom.lastReported}</span>
            {restroom.distance && <span>{restroom.distance} km away</span>}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RestroomCard;
