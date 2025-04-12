
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Heart, 
  Share, 
  Star, 
  ThumbsUp, 
  Accessibility, 
  BabyChangingStation,
  CheckCircle,
  AlertCircle,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { getRestroomById, Restroom, Review } from "@/data/mockRestrooms";
import { toast } from "@/components/ui/use-toast";

const RestroomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [restroom, setRestroom] = useState<Restroom | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Simulate API call
      setTimeout(() => {
        const foundRestroom = getRestroomById(id);
        if (foundRestroom) {
          setRestroom(foundRestroom);
        }
        setIsLoading(false);
      }, 800);
    }
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: !isFavorite ? "Added to favorites!" : "Removed from favorites",
      description: !isFavorite 
        ? "This restroom has been added to your favorites" 
        : "This restroom has been removed from your favorites",
    });
  };

  const shareRestroom = () => {
    toast({
      title: "Sharing restroom",
      description: "The share dialog would open here. Share with friends!",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-restroom-blue border-t-transparent rounded-full animate-spin mb-2"></div>
          <p className="text-muted-foreground">Loading restroom details...</p>
        </div>
      </div>
    );
  }

  if (!restroom) {
    return (
      <div className="container py-8">
        <Link to="/map" className="inline-flex items-center text-restroom-blue mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Map
        </Link>
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
          <h1 className="text-2xl font-bold mb-2">Restroom Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The restroom you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/map">Find Another Restroom</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 pb-16">
      <Link to="/map" className="inline-flex items-center text-restroom-blue mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Map
      </Link>

      {/* Header and Image */}
      <div className="relative rounded-lg overflow-hidden mb-6">
        <img 
          src={restroom.images[0]} 
          alt={restroom.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h1 className="text-2xl font-bold text-white mb-1">{restroom.name}</h1>
          <div className="flex items-center text-white/90">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{restroom.address}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mb-6">
        <Button 
          variant={isFavorite ? "outline" : "default"}
          className={isFavorite ? "border-pink-200 bg-pink-50 text-pink-700 hover:bg-pink-100" : ""}
          onClick={toggleFavorite}
        >
          <Heart className={`mr-2 h-5 w-5 ${isFavorite ? "fill-pink-500 text-pink-500" : ""}`} />
          {isFavorite ? "Favorited" : "Add to Favorites"}
        </Button>
        <Button 
          variant="outline"
          onClick={shareRestroom}
        >
          <Share className="mr-2 h-5 w-5" />
          Share
        </Button>
      </div>

      {/* Stats and Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-restroom-blue mb-1">
            {restroom.cleanliness.toFixed(1)}
          </div>
          <div className="text-sm text-muted-foreground">Cleanliness Score</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="flex justify-center text-lg mb-1">
            {restroom.isOpen ? (
              <Badge variant="default" className="bg-green-500 hover:bg-green-600">Open Now</Badge>
            ) : (
              <Badge variant="default" className="bg-gray-500 hover:bg-gray-600">Closed</Badge>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            <Clock className="inline h-3.5 w-3.5 mr-1" />
            {restroom.hours}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-lg font-medium mb-1">
            {restroom.isFree ? "Free" : "Paid"}
          </div>
          <div className="text-sm text-muted-foreground">
            {restroom.isFree 
              ? "No purchase required" 
              : "Purchase may be required"}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="flex justify-center gap-2 mb-1">
            {restroom.isAccessible && (
              <Accessibility className="h-5 w-5 text-restroom-blue" title="Accessible" />
            )}
            {restroom.hasChangingTable && (
              <BabyChangingStation className="h-5 w-5 text-restroom-blue" title="Baby Changing Station" />
            )}
          </div>
          <div className="text-sm text-muted-foreground">Amenities</div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Tabs for Reviews and Info */}
        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="amenities">Amenities & Info</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reviews" className="mt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Customer Reviews</h3>
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4 mr-2" />
                  Write a Review
                </Button>
              </div>
              
              {restroom.reviews.length > 0 ? (
                <div className="space-y-4">
                  {restroom.reviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <div className="bg-muted flex h-full w-full items-center justify-center rounded-full">
                              {review.userName.charAt(0)}
                            </div>
                          </Avatar>
                          <div>
                            <div className="font-medium">{review.userName}</div>
                            <div className="text-xs text-muted-foreground">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm">{review.comment}</p>
                      <div className="flex items-center mt-2">
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                          <ThumbsUp className="h-3.5 w-3.5 mr-1.5" />
                          Helpful
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border rounded-lg">
                  <Star className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                  <p className="text-muted-foreground mb-2">No reviews yet</p>
                  <Button size="sm">Be the first to review</Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="amenities" className="mt-4">
            <div className="space-y-6">
              {/* Amenities Section */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    <span>Toilet Paper</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    <span>Hand Soap</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    <span>Hand Dryer</span>
                  </div>
                  <div className="flex items-center">
                    {restroom.isAccessible ? (
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 mr-2 text-gray-400" />
                    )}
                    <span>Wheelchair Accessible</span>
                  </div>
                  <div className="flex items-center">
                    {restroom.hasChangingTable ? (
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 mr-2 text-gray-400" />
                    )}
                    <span>Baby Changing Table</span>
                  </div>
                </div>
              </div>

              <Separator />
              
              {/* Cleanliness History */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Cleanliness History</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      <span>Reported Clean</span>
                    </div>
                    <span className="text-sm text-muted-foreground">10 minutes ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                      <span>Supplies Low</span>
                    </div>
                    <span className="text-sm text-muted-foreground">1 hour ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      <span>Reported Clean</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Yesterday</span>
                  </div>
                </div>
              </div>

              <Separator />
              
              {/* Usage Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Additional Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment required:</span>
                    <span>{restroom.isFree ? "No" : "Yes"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Best time to visit:</span>
                    <span>10 AM - 2 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last verified:</span>
                    <span>Today</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RestroomDetail;
