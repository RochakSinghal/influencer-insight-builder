export interface CampaignFormData {
  // Step 1 - Basic campaign details
  objective: string;
  audienceLocation: {
    city: string;
    state: string;
    country: string;
  };
  audienceGender: 'Male' | 'Female' | 'All';
  audienceAge: string[]; // Multiple selection
  campaignBudget: {
    amount: number;
    currency: string;
  };
  influencerGender: 'Male' | 'Female' | 'All';
  influencerLocation: {
    city: string;
    state: string;
    country: string;
  };
  
  // Step 2 - Keywords and categories
  keywords: string[];
  categories: number[]; // Category IDs
}

export interface InfluencerCategory {
  id: number;
  title: string;
}

export interface InfluencerData {
  rank: number;
  name: string;
  id: string;
  followers: number;
  engagementRate: number;
  category: string;
  location: string;
  photoUrl: string;
  postCount: number;
  avgLikes: number;
  avgComments: number;
  prices: {
    post: number;
    stories: number;
    video: number;
    cpm: number;
    cpe: number;
  };
  audienceAuthenticity: number;
  audienceGeo: string;
  finalScore: number;
  contentAffinity: number;
  audienceMatch: number;
  pastPerformance: number;
  engagementScore: number;
  instagramReels: {
    count: number;
    avgViews: number;
  };
  contentIdeas: {
    title: string;
    description: string;
    hashtags: string[];
    cta: string[];
  }[];
}

export const AUDIENCE_AGE_OPTIONS = [
  '13 - 17',
  '18 - 24', 
  '25 - 34',
  '35 - 44',
  '45 - 54',
  '55+'
];

export const CURRENCY_OPTIONS = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
];

export const INFLUENCER_CATEGORIES: InfluencerCategory[] = [
  { id: 1, title: "Beauty" },
  { id: 2, title: "Makeup" },
  { id: 3, title: "Skincare" },
  { id: 4, title: "Haircare" },
  { id: 5, title: "Nail Care" },
  { id: 6, title: "Modeling" },
  { id: 7, title: "Cosplay" },
  { id: 8, title: "Traveling" },
  { id: 9, title: "Hiking & Trekking" },
  { id: 10, title: "Outdoor Camping" },
  { id: 11, title: "Gastronomy" },
  { id: 12, title: "Beers" },
  { id: 13, title: "Dining & Nightlife" },
  { id: 14, title: "Cooking" },
  { id: 15, title: "Nutritious Foods" },
  { id: 16, title: "Coffee Culture" },
  { id: 17, title: "Tea" },
  { id: 18, title: "Wine" },
  { id: 19, title: "Grilling & BBQ" },
  { id: 20, title: "Football & Soccer" },
  { id: 21, title: "Basketball" },
  { id: 22, title: "Baseball" },
  { id: 23, title: "Volleyball" },
  { id: 24, title: "American Football" },
  { id: 25, title: "Ice Hockey" },
  { id: 26, title: "Tennis" },
  { id: 27, title: "Boxing" },
  { id: 28, title: "Wrestling" },
  { id: 29, title: "Fitness & Bodybuilding" },
  { id: 30, title: "Yoga" },
  { id: 31, title: "Running & Athletics" },
  { id: 32, title: "Surfing" },
  { id: 33, title: "Skateboarding" },
  { id: 34, title: "Snowboarding" },
  { id: 35, title: "Ecology" },
  { id: 36, title: "Space & Astronomy" },
  { id: 37, title: "Pet Care" },
  { id: 38, title: "Automobiles" },
  { id: 39, title: "Motorcycles" },
  { id: 40, title: "Aviation" },
  { id: 41, title: "DIY Projects" },
  { id: 42, title: "Handicrafts" },
  { id: 43, title: "Gardening" },
  { id: 44, title: "Children's Games & Toys" },
  { id: 45, title: "Parenting & Relationships" },
  { id: 46, title: "Entertainment" },
  { id: 47, title: "Anime, Manga & Comics" },
  { id: 48, title: "Literature" },
  { id: 49, title: "Film & Television" },
  { id: 50, title: "Video Gaming" },
  { id: 51, title: "Dance" },
  { id: 52, title: "Theater" },
  { id: 53, title: "Unboxings" },
  { id: 54, title: "Stand-up Comedy" },
  { id: 55, title: "Educational" },
  { id: 56, title: "Politics" },
  { id: 57, title: "Social Issues" },
  { id: 58, title: "Science" },
  { id: 59, title: "Space Exploration" },
  { id: 60, title: "Biology" },
  { id: 61, title: "Physics" },
  { id: 62, title: "Chemistry" },
  { id: 63, title: "AI & Machine Learning" },
  { id: 64, title: "Technology & Gadgets" },
  { id: 65, title: "Meditative Practices" },
  { id: 66, title: "Astrology" },
  { id: 67, title: "History" },
  { id: 68, title: "Health & Medicine" },
  { id: 69, title: "Property & Real Estate" },
  { id: 70, title: "Architecture & Design" },
  { id: 71, title: "Business and Careers" },
  { id: 72, title: "Philanthropy & Charity" },
  { id: 73, title: "Finance & Accounting" },
  { id: 74, title: "Sustainability" },
  { id: 75, title: "Fashion" },
  { id: 76, title: "Interior Design" },
  { id: 77, title: "Religion" },
  { id: 78, title: "Luxury" },
  { id: 79, title: "Music" },
  { id: 80, title: "Photography" },
  { id: 81, title: "Motorsports" },
  { id: 82, title: "Yachting & Sailing" }
];