
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
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const mockRestrooms: Restroom[] = [
  {
    id: "1",
    name: "Central Park Public Restroom",
    address: "Central Park, New York, NY",
    latitude: 40.7812,
    longitude: -73.9665,
    cleanliness: 4.2,
    amenities: ["Toilet paper", "Soap", "Hand dryer"],
    reviews: [
      {
        id: "r1",
        userId: "u1",
        userName: "Sarah J.",
        rating: 4,
        comment: "Very clean for a public restroom. Well maintained.",
        date: "2023-11-15"
      },
      {
        id: "r2",
        userId: "u2",
        userName: "Mike T.",
        rating: 5,
        comment: "Surprisingly clean and well-stocked with supplies.",
        date: "2023-11-10"
      }
    ],
    isOpen: true,
    hours: "6:00 AM - 10:00 PM",
    isFree: true,
    isAccessible: true,
    hasChangingTable: true,
    images: ["/placeholder.svg"],
    lastReported: "10 minutes ago"
  },
  {
    id: "2",
    name: "Starbucks - 5th Avenue",
    address: "500 5th Ave, New York, NY",
    latitude: 40.7549,
    longitude: -73.9840,
    cleanliness: 4.5,
    amenities: ["Toilet paper", "Soap", "Hand dryer", "Air freshener"],
    reviews: [
      {
        id: "r3",
        userId: "u3",
        userName: "Lisa R.",
        rating: 4,
        comment: "Clean and accessible. Need to purchase something first.",
        date: "2023-11-12"
      }
    ],
    isOpen: true,
    hours: "5:30 AM - 9:00 PM",
    isFree: false,
    isAccessible: true,
    hasChangingTable: true,
    images: ["/placeholder.svg"],
    lastReported: "1 hour ago"
  },
  {
    id: "3",
    name: "Grand Central Terminal",
    address: "89 E 42nd St, New York, NY",
    latitude: 40.7527,
    longitude: -73.9772,
    cleanliness: 3.8,
    amenities: ["Toilet paper", "Soap", "Paper towels"],
    reviews: [
      {
        id: "r4",
        userId: "u4",
        userName: "David M.",
        rating: 3,
        comment: "Decent, but can get crowded during rush hour.",
        date: "2023-11-08"
      },
      {
        id: "r5",
        userId: "u5",
        userName: "Rachel G.",
        rating: 4,
        comment: "Better than most train station restrooms.",
        date: "2023-11-05"
      }
    ],
    isOpen: true,
    hours: "24 hours",
    isFree: true,
    isAccessible: true,
    hasChangingTable: true,
    images: ["/placeholder.svg"],
    lastReported: "30 minutes ago"
  },
  {
    id: "4",
    name: "Bryant Park Public Restroom",
    address: "Bryant Park, New York, NY",
    latitude: 40.7536,
    longitude: -73.9832,
    cleanliness: 4.8,
    amenities: ["Toilet paper", "Soap", "Hand dryer", "Fresh flowers", "Attendant"],
    reviews: [
      {
        id: "r6",
        userId: "u6",
        userName: "Emily L.",
        rating: 5,
        comment: "The best public restroom in NYC. Always clean and has an attendant.",
        date: "2023-11-14"
      },
      {
        id: "r7",
        userId: "u7",
        userName: "John D.",
        rating: 5,
        comment: "Impressive! Clean, well-maintained, and even has fresh flowers.",
        date: "2023-11-09"
      }
    ],
    isOpen: true,
    hours: "7:00 AM - 10:00 PM",
    isFree: true,
    isAccessible: true,
    hasChangingTable: true,
    images: ["/placeholder.svg"],
    lastReported: "15 minutes ago"
  },
  {
    id: "5",
    name: "McDonald's - Times Square",
    address: "1560 Broadway, New York, NY",
    latitude: 40.7586,
    longitude: -73.9852,
    cleanliness: 3.0,
    amenities: ["Toilet paper", "Soap"],
    reviews: [
      {
        id: "r8",
        userId: "u8",
        userName: "Tom K.",
        rating: 2,
        comment: "Very busy and not always clean. Use only if necessary.",
        date: "2023-11-11"
      },
      {
        id: "r9",
        userId: "u9",
        userName: "Amanda P.",
        rating: 3,
        comment: "Convenient location but expect crowds.",
        date: "2023-11-07"
      }
    ],
    isOpen: true,
    hours: "24 hours",
    isFree: false,
    isAccessible: true,
    hasChangingTable: true,
    images: ["/placeholder.svg"],
    lastReported: "2 hours ago"
  }
];

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
