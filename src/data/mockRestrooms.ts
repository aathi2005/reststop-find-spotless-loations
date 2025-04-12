
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

// Coordinates for Coimbatore, Tamil Nadu, India
const COIMBATORE_CENTER = { lat: 11.0168, lng: 76.9558 };

export const mockRestrooms: Restroom[] = [
  {
    id: "1",
    name: "Brookefields Mall Restroom",
    address: "Brookefields Mall, Krishnasamy Rd, Coimbatore",
    latitude: 11.0120,
    longitude: 76.9523,
    cleanliness: 4.2,
    amenities: ["Toilet paper", "Soap", "Hand dryer"],
    reviews: [
      {
        id: "r1",
        userId: "u1",
        userName: "Priya S.",
        rating: 4,
        comment: "Very clean for a mall restroom. Well maintained.",
        date: "2024-03-15"
      },
      {
        id: "r2",
        userId: "u2",
        userName: "Anand T.",
        rating: 5,
        comment: "Surprisingly clean and well-stocked with supplies.",
        date: "2024-03-10"
      }
    ],
    isOpen: true,
    hours: "10:00 AM - 10:00 PM",
    isFree: true,
    isAccessible: true,
    hasChangingTable: true,
    images: ["/placeholder.svg"],
    lastReported: "10 minutes ago"
  },
  {
    id: "2",
    name: "Café Coffee Day - RS Puram",
    address: "RS Puram, Coimbatore, Tamil Nadu",
    latitude: 11.0070,
    longitude: 76.9560,
    cleanliness: 4.5,
    amenities: ["Toilet paper", "Soap", "Hand dryer", "Air freshener"],
    reviews: [
      {
        id: "r3",
        userId: "u3",
        userName: "Lakshmi R.",
        rating: 4,
        comment: "Clean and accessible. Need to purchase something first.",
        date: "2024-03-12"
      }
    ],
    isOpen: true,
    hours: "8:30 AM - 11:00 PM",
    isFree: false,
    isAccessible: true,
    hasChangingTable: true,
    images: ["/placeholder.svg"],
    lastReported: "1 hour ago"
  },
  {
    id: "3",
    name: "Coimbatore Junction Railway Station",
    address: "Railway Station Rd, Gopalapuram, Coimbatore",
    latitude: 11.0017,
    longitude: 76.9652,
    cleanliness: 3.8,
    amenities: ["Toilet paper", "Soap", "Paper towels"],
    reviews: [
      {
        id: "r4",
        userId: "u4",
        userName: "Dinesh M.",
        rating: 3,
        comment: "Decent, but can get crowded during rush hour.",
        date: "2024-03-08"
      },
      {
        id: "r5",
        userId: "u5",
        userName: "Radha G.",
        rating: 4,
        comment: "Better than most train station restrooms.",
        date: "2024-03-05"
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
    name: "VOC Park Public Restroom",
    address: "VOC Park, Coimbatore, Tamil Nadu",
    latitude: 11.0083,
    longitude: 76.9677,
    cleanliness: 4.0,
    amenities: ["Toilet paper", "Soap", "Hand dryer"],
    reviews: [
      {
        id: "r6",
        userId: "u6",
        userName: "Ezhil L.",
        rating: 4,
        comment: "Clean park restroom with good maintenance.",
        date: "2024-03-14"
      },
      {
        id: "r7",
        userId: "u7",
        userName: "John D.",
        rating: 4,
        comment: "Well maintained public facility.",
        date: "2024-03-09"
      }
    ],
    isOpen: true,
    hours: "7:00 AM - 8:00 PM",
    isFree: true,
    isAccessible: true,
    hasChangingTable: true,
    images: ["/placeholder.svg"],
    lastReported: "15 minutes ago"
  },
  {
    id: "5",
    name: "Fun Republic Mall",
    address: "Avinashi Road, Coimbatore, Tamil Nadu",
    latitude: 11.0261,
    longitude: 76.9993,
    cleanliness: 4.3,
    amenities: ["Toilet paper", "Soap", "Hand dryer"],
    reviews: [
      {
        id: "r8",
        userId: "u8",
        userName: "Tarun K.",
        rating: 4,
        comment: "Clean facilities with regular maintenance.",
        date: "2024-03-11"
      },
      {
        id: "r9",
        userId: "u9",
        userName: "Amala P.",
        rating: 5,
        comment: "Excellent restrooms, very clean!",
        date: "2024-03-07"
      }
    ],
    isOpen: true,
    hours: "10:00 AM - 10:00 PM",
    isFree: true,
    isAccessible: true,
    hasChangingTable: true,
    images: ["/placeholder.svg"],
    lastReported: "2 hours ago"
  }
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
