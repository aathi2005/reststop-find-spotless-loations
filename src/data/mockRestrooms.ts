
export interface Restroom {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  cleanliness: number;
  amenities: string[];
  reviews: Review[];
  distance?: number;
  isOpen: boolean;
  hours: string;
  isFree: boolean;
  isAccessible: boolean;
  hasChangingTable: boolean;
  images: string[];
  lastReported: string;
  type: "Public" | "Hotel" | "Petrol Bunk";
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

// Coordinates for Coimbatore, Tamil Nadu, India
const COIMBATORE_CENTER = { lat: 11.0168, lng: 76.9558 };

// Function to generate random coordinates around a center point
function generateRandomCoordinates(centerLat: number, centerLng: number): { lat: number, lng: number } {
  // Generate random offsets (within ~2-3km)
  const latOffset = (Math.random() - 0.5) * 0.05;
  const lngOffset = (Math.random() - 0.5) * 0.05;
  
  return {
    lat: centerLat + latOffset,
    lng: centerLng + lngOffset
  };
}

// Generate random times for opening and closing
function generateRandomHours(): string {
  const openHour = Math.floor(Math.random() * 5) + 6; // 6 AM to 10 AM
  const closeHour = Math.floor(Math.random() * 4) + 19; // 7 PM to 10 PM
  
  const formatHour = (hour: number) => {
    const amPm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour > 12 ? hour - 12 : hour;
    return `${formattedHour}:00 ${amPm}`;
  };
  
  return `${formatHour(openHour)} - ${formatHour(closeHour)}`;
}

// Generate random time since last report
function generateLastReported(): string {
  const options = [
    '5 minutes ago',
    '10 minutes ago',
    '15 minutes ago',
    '30 minutes ago',
    '1 hour ago',
    '2 hours ago',
    '3 hours ago',
    'Today',
    'Yesterday'
  ];
  
  return options[Math.floor(Math.random() * options.length)];
}

// Function to generate random amenities based on type and cleanliness
function generateAmenities(type: string, cleanliness: number): string[] {
  const basicAmenities = ["Toilet paper", "Soap"];
  const additionalAmenities = ["Hand dryer", "Paper towels", "Air freshener", "Sanitizer", "Mirror", "Hot water"];
  
  let amenities = [...basicAmenities];
  
  // Better cleanliness score means more amenities
  const amenityCount = Math.floor(cleanliness) + (Math.random() > 0.5 ? 1 : 0);
  
  // Add random additional amenities based on cleanliness
  for (let i = 0; i < Math.min(amenityCount, additionalAmenities.length); i++) {
    const randomIndex = Math.floor(Math.random() * additionalAmenities.length);
    const amenity = additionalAmenities.splice(randomIndex, 1)[0];
    amenities.push(amenity);
  }
  
  // Hotel type likely to have better amenities
  if (type === "Hotel" && cleanliness > 3.5) {
    amenities.push("Shower");
    if (Math.random() > 0.5) amenities.push("Lotion");
  }
  
  return amenities;
}

// Function to generate random review for a restroom
function generateReview(cleanliness: number): Review {
  const names = ["Priya S.", "Anand T.", "Lakshmi R.", "Dinesh M.", "Radha G.", "Ezhil L.", 
    "John D.", "Tarun K.", "Amala P.", "Ravi K.", "Saravanan R.", "Vinay P.", "Meena S.", 
    "Karthik N.", "Deepa L.", "Ganesh M."];
  
  const positiveComments = [
    "Clean and well-maintained.",
    "Very good facilities for a public restroom.",
    "Clean and accessible.",
    "Better than most restrooms in the area.",
    "Well stocked with supplies."
  ];
  
  const averageComments = [
    "Decent, but could be cleaner.",
    "Okay for emergency use.",
    "Average cleanliness.",
    "Functional but not exceptional.",
    "Needs more frequent cleaning."
  ];
  
  const negativeComments = [
    "Not clean at all.",
    "Poorly maintained.",
    "Would avoid if possible.",
    "Needs urgent attention.",
    "Inadequate facilities."
  ];
  
  let comments;
  let rating;
  
  if (cleanliness >= 4.0) {
    comments = positiveComments;
    // Rating around the cleanliness score but slightly randomized
    rating = Math.max(3, Math.min(5, Math.floor(cleanliness) + (Math.random() > 0.7 ? -1 : 0)));
  } else if (cleanliness >= 2.5) {
    comments = averageComments;
    rating = Math.max(2, Math.min(4, Math.floor(cleanliness) + (Math.random() > 0.5 ? -1 : 1)));
  } else {
    comments = negativeComments;
    rating = Math.max(1, Math.min(3, Math.floor(cleanliness) + (Math.random() > 0.7 ? 1 : 0)));
  }
  
  // Generate a random date in the last 30 days
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  const formattedDate = date.toISOString().split('T')[0];
  
  return {
    id: `r${Math.floor(Math.random() * 1000)}`,
    userId: `u${Math.floor(Math.random() * 1000)}`,
    userName: names[Math.floor(Math.random() * names.length)],
    rating,
    comment: comments[Math.floor(Math.random() * comments.length)],
    date: formattedDate
  };
}

// Create restrooms based on the provided data
const createRestroom = (id: string, name: string, location: string, type: "Public" | "Hotel" | "Petrol Bunk", cleanliness: number): Restroom => {
  const coords = generateRandomCoordinates(COIMBATORE_CENTER.lat, COIMBATORE_CENTER.lng);
  const reviewCount = Math.floor(Math.random() * 3) + 1; // 1-3 reviews
  const reviews: Review[] = [];
  
  for (let i = 0; i < reviewCount; i++) {
    reviews.push(generateReview(cleanliness));
  }

  // Determine if facilities are available based on type and cleanliness
  const isAccessible = type === "Hotel" || type === "Petrol Bunk" || cleanliness > 3.5 || Math.random() > 0.5;
  const hasChangingTable = type === "Hotel" || (cleanliness > 4 && Math.random() > 0.5);
  
  return {
    id,
    name,
    address: location,
    latitude: coords.lat,
    longitude: coords.lng,
    cleanliness,
    amenities: generateAmenities(type, cleanliness),
    reviews,
    isOpen: Math.random() > 0.2, // 80% chance of being open
    hours: type === "Petrol Bunk" ? "24 hours" : generateRandomHours(),
    isFree: type === "Public" || Math.random() > 0.7,
    isAccessible,
    hasChangingTable,
    images: ["/placeholder.svg"],
    lastReported: generateLastReported(),
    type
  };
};

// Parse and create restrooms from the provided data
export const mockRestrooms: Restroom[] = [
  // Public Toilets
  createRestroom("1", "Public Toilet Race Course #1", "Race Course, Coimbatore", "Public", 1.1),
  createRestroom("2", "Public Toilet Race Course #2", "Race Course, Coimbatore", "Public", 2.0),
  createRestroom("3", "Public Toilet Sulur #3", "Sulur, Coimbatore", "Public", 1.6),
  createRestroom("4", "Public Toilet Town Hall #4", "Town Hall, Coimbatore", "Public", 2.6),
  createRestroom("5", "Public Toilet Vadavalli #5", "Vadavalli, Coimbatore", "Public", 4.1),
  createRestroom("6", "Public Toilet Sulur #6", "Sulur, Coimbatore", "Public", 1.5),
  createRestroom("7", "Public Toilet Peelamedu #7", "Peelamedu, Coimbatore", "Public", 4.6),
  createRestroom("8", "Public Toilet Singanallur #8", "Singanallur, Coimbatore", "Public", 4.6),
  createRestroom("9", "Public Toilet Saibaba Colony #9", "Saibaba Colony, Coimbatore", "Public", 3.5),
  createRestroom("10", "Public Toilet Saravanampatti #10", "Saravanampatti, Coimbatore", "Public", 4.7),
  createRestroom("11", "Public Toilet Singanallur #11", "Singanallur, Coimbatore", "Public", 3.3),
  createRestroom("12", "Public Toilet Ganapathy #12", "Ganapathy, Coimbatore", "Public", 2.7),
  createRestroom("13", "Public Toilet Avinashi Road #13", "Avinashi Road, Coimbatore", "Public", 4.6),
  createRestroom("14", "Public Toilet Ukkadam #14", "Ukkadam, Coimbatore", "Public", 3.2),
  createRestroom("15", "Public Toilet Ganapathy #15", "Ganapathy, Coimbatore", "Public", 2.1),
  
  // Hotels
  createRestroom("16", "Hotel Singanallur #1", "Singanallur, Coimbatore", "Hotel", 2.1),
  createRestroom("17", "Hotel Saravanampatti #2", "Saravanampatti, Coimbatore", "Hotel", 3.0),
  createRestroom("18", "Hotel Kovaipudur #3", "Kovaipudur, Coimbatore", "Hotel", 2.8),
  createRestroom("19", "Hotel Sulur #4", "Sulur, Coimbatore", "Hotel", 4.5),
  createRestroom("20", "Hotel Gandhipuram #5", "Gandhipuram, Coimbatore", "Hotel", 3.8),
  createRestroom("21", "Hotel RS Puram #12", "RS Puram, Coimbatore", "Hotel", 5.0),
  createRestroom("22", "Hotel Peelamedu #24", "Peelamedu, Coimbatore", "Hotel", 4.9),
  createRestroom("23", "Hotel Peelamedu #27", "Peelamedu, Coimbatore", "Hotel", 5.0),
  
  // Fuel Stations
  createRestroom("24", "Fuel Station Kalapatti #4", "Kalapatti, Coimbatore", "Petrol Bunk", 4.3),
  createRestroom("25", "Fuel Station Race Course #5", "Race Course, Coimbatore", "Petrol Bunk", 3.6),
  createRestroom("26", "Fuel Station Vadavalli #7", "Vadavalli, Coimbatore", "Petrol Bunk", 3.9),
  createRestroom("27", "Fuel Station Thudiyalur #11", "Thudiyalur, Coimbatore", "Petrol Bunk", 3.9),
  createRestroom("28", "Fuel Station Thudiyalur #15", "Thudiyalur, Coimbatore", "Petrol Bunk", 4.1),
  createRestroom("29", "Fuel Station RS Puram #20", "RS Puram, Coimbatore", "Petrol Bunk", 4.4),
  createRestroom("30", "Fuel Station Race Course #32", "Race Course, Coimbatore", "Petrol Bunk", 4.6),
  createRestroom("31", "Fuel Station Gandhipuram #34", "Gandhipuram, Coimbatore", "Petrol Bunk", 4.7),
  createRestroom("32", "Fuel Station Singanallur #36", "Singanallur, Coimbatore", "Petrol Bunk", 4.4),
];

// Update default user location to Coimbatore
export const DEFAULT_USER_LOCATION = { lat: 11.0168, lng: 76.9558 }; // Coimbatore city center

export function getRestroomById(id: string): Restroom | undefined {
  return mockRestrooms.find(restroom => restroom.id === id);
}

export function getNearbyRestrooms(lat: number, lng: number, limit: number = 10): Restroom[] {
  // In a real app, this would calculate actual distances
  return mockRestrooms
    .map(restroom => ({
      ...restroom,
      distance: calculateDistance(lat, lng, restroom.latitude, restroom.longitude)
    }))
    .sort((a, b) => (a.distance || 0) - (b.distance || 0))
    .slice(0, limit);
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  // Simple distance calculation (not accurate for real use)
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return parseFloat(d.toFixed(1));
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}
