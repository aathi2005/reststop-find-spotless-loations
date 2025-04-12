
import React from "react";
import { Link } from "react-router-dom";
import { Restroom } from "@/data/mockRestrooms";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarIcon, Clock, MapPin, Accessibility } from "lucide-react";
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
            <h3 className="font-semibold text-lg line-clamp-1">{restroom.name}</h3>
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span className="line-clamp-1">{restroom.address}</span>
            </div>
            
            <div className="flex items-center mt-2">
              <div className="flex items-center bg-blue-50 text-restroom-blue rounded-md px-2 py-0.5">
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
