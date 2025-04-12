
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { UserCircle, MessageSquare, MapPin, Star, Settings, Bell, LogOut, Shield } from "lucide-react";

// Mock user data
const user = {
  name: "Alex Johnson",
  email: "alex@example.com",
  joinDate: "January 2023",
  points: 450,
  level: "Explorer",
  contributions: 12,
  avatar: null // In a real app, this would be an image URL
};

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-restroom-blue border-t-transparent rounded-full animate-spin mb-2"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 pb-16">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Sidebar */}
        <div className="w-full md:w-80">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-2">
                <Avatar className="h-24 w-24 border-4 border-white">
                  <div className="bg-muted h-full w-full flex items-center justify-center text-4xl font-light">
                    {user.name.charAt(0)}
                  </div>
                </Avatar>
              </div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-restroom-blue">{user.points}</div>
                  <div className="text-xs text-muted-foreground mt-1">Points</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-lg font-medium text-restroom-blue">{user.level}</div>
                  <div className="text-xs text-muted-foreground mt-1">Level</div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <nav className="space-y-1">
                <Button variant="ghost" className="w-full justify-start">
                  <UserCircle className="mr-2 h-5 w-5" />
                  My Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-5 w-5" />
                  Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Bell className="mr-2 h-5 w-5" />
                  Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Shield className="mr-2 h-5 w-5" />
                  Privacy
                </Button>
                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                  <LogOut className="mr-2 h-5 w-5" />
                  Sign Out
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          <Tabs defaultValue="activity">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="contributions">Contributions</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            
            {/* Activity Tab */}
            <TabsContent value="activity" className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              
              {/* Activity Feed */}
              <div className="space-y-4">
                <Card>
                  <CardHeader className="py-3">
                    <div className="flex items-center space-x-4">
                      <MapPin className="h-6 w-6 text-restroom-blue" />
                      <div>
                        <CardTitle className="text-base">Visited Central Park Restroom</CardTitle>
                        <CardDescription>2 days ago</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="py-3 text-sm">
                    <div className="text-muted-foreground">
                      +25 points earned
                    </div>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <div className="flex items-center space-x-4">
                      <Star className="h-6 w-6 text-yellow-500" />
                      <div>
                        <CardTitle className="text-base">Left a 5-star review</CardTitle>
                        <CardDescription>Bryant Park Public Restroom • 1 week ago</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="py-3 text-sm">
                    <div className="text-muted-foreground">
                      +50 points earned
                    </div>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <div className="flex items-center space-x-4">
                      <MessageSquare className="h-6 w-6 text-restroom-blue" />
                      <div>
                        <CardTitle className="text-base">Reported Cleanliness Status</CardTitle>
                        <CardDescription>Starbucks - 5th Avenue • 2 weeks ago</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="py-3 text-sm">
                    <div className="text-muted-foreground">
                      +15 points earned
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            {/* Contributions Tab */}
            <TabsContent value="contributions" className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Your Contributions</h2>
                <div className="text-sm text-muted-foreground">
                  Total: {user.contributions} contributions
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <Star className="h-5 w-5 mr-2 text-yellow-500" />
                      Reviews
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <div className="text-3xl font-bold">5</div>
                    <p className="text-sm text-muted-foreground">Reviews submitted</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-restroom-blue" />
                      Cleanliness Reports
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <div className="text-3xl font-bold">7</div>
                    <p className="text-sm text-muted-foreground">Statuses reported</p>
                  </CardContent>
                </Card>
              </div>
              
              <h3 className="text-lg font-semibold mt-8 mb-4">Level Progress</h3>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{user.level} Level</span>
                        <span className="text-muted-foreground">{user.points}/500 points</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-restroom-blue rounded-full" style={{ width: `${(user.points / 500) * 100}%` }}></div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        50 more points until you reach "Navigator" level
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Preferences Tab */}
            <TabsContent value="preferences" className="mt-6">
              <h2 className="text-xl font-semibold mb-4">App Preferences</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Notifications</CardTitle>
                  <CardDescription>
                    Control how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Push Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Receive notifications about nearby restrooms
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Cleanliness Alerts</div>
                      <div className="text-sm text-muted-foreground">
                        Get notified when cleanliness status changes
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Email Updates</div>
                      <div className="text-sm text-muted-foreground">
                        Receive weekly digest of your activity
                      </div>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-base">Map Settings</CardTitle>
                  <CardDescription>
                    Customize how the map and search results appear
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Default View</div>
                      <div className="text-sm text-muted-foreground">
                        Show map in list view by default
                      </div>
                    </div>
                    <Switch />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Search Radius</div>
                      <div className="text-sm text-muted-foreground">
                        Show restrooms within 1 mile (default)
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Default Filter</div>
                      <div className="text-sm text-muted-foreground">
                        Always show free restrooms first
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
