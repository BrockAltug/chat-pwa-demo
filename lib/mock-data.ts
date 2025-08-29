export interface User {
  id: string
  username: string
  displayName: string
  avatar: string
  bio: string
  joinDate: string
  isOnline: boolean
  isPremium: boolean
  premiumTier?: "basic" | "premium" | "pro"
  subscriptionExpiry?: string
  location?: { lat: number; lng: number; city: string }
}

export interface Post {
  id: string
  userId: string
  content: string
  media?: { type: "image" | "video"; url: string }[]
  isPremium: boolean
  timestamp: string
  likes: number
  comments: number
}

export interface Channel {
  id: string
  name: string
  type: "text" | "voice"
  isPremium: boolean
  price?: number
}

export interface Server {
  id: string
  name: string
  icon: string
  description: string
  memberCount: number
  isPremium: boolean
  price?: number
  channels: Channel[]
  members: string[]
  premiumFeatures?: string[]
  subscriptionCount?: number
}

export interface Message {
  id: string
  userId: string
  content: string
  timestamp: string
  channelId: string
  reactions?: { emoji: string; users: string[]; count: number }[]
  replyTo?: string
  attachments?: { type: "image" | "file" | "voice"; url: string; name?: string }[]
  isEdited?: boolean
}

// Mock data
export const mockUsers: User[] = [
  {
    id: "1",
    username: "alex_dev",
    displayName: "Alex Developer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Full-stack developer passionate about React and Node.js. Building the future one component at a time.",
    joinDate: "2023-01-15",
    isOnline: true,
    isPremium: true,
    premiumTier: "premium",
    subscriptionExpiry: "2024-02-20",
    location: { lat: 40.7128, lng: -74.006, city: "New York" },
  },
  {
    id: "2",
    username: "sarah_design",
    displayName: "Sarah Designer",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "UI/UX Designer creating beautiful digital experiences. Love minimalist design and user-centered approach.",
    joinDate: "2023-02-20",
    isOnline: false,
    isPremium: false,
    premiumTier: "basic",
    location: { lat: 37.7749, lng: -122.4194, city: "San Francisco" },
  },
  {
    id: "3",
    username: "mike_creator",
    displayName: "Mike Creator",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Content creator and digital artist. Sharing my creative journey and premium tutorials.",
    joinDate: "2023-03-10",
    isOnline: true,
    isPremium: true,
    premiumTier: "pro",
    subscriptionExpiry: "2024-03-15",
    location: { lat: 51.5074, lng: -0.1278, city: "London" },
  },
  {
    id: "4",
    username: "emma_tech",
    displayName: "Emma Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "Software engineer specializing in AI and machine learning. Always learning something new!",
    joinDate: "2023-04-05",
    isOnline: true,
    isPremium: true,
    premiumTier: "premium",
    subscriptionExpiry: "2024-04-10",
    location: { lat: 34.0522, lng: -118.2437, city: "Los Angeles" },
  },
  {
    id: "5",
    username: "james_fitness",
    displayName: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    bio: "Personal trainer and nutrition coach. Helping people achieve their fitness goals since 2018.",
    joinDate: "2023-05-12",
    isOnline: false,
    isPremium: true,
    premiumTier: "pro",
    subscriptionExpiry: "2024-05-15",
    location: { lat: 41.8781, lng: -87.6298, city: "Chicago" },
  },
  {
    id: "6",
    username: "lisa_photo",
    displayName: "Lisa Chen",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    bio: "Professional photographer capturing life's beautiful moments. Available for portraits and events.",
    joinDate: "2023-06-18",
    isOnline: true,
    isPremium: false,
    location: { lat: 47.6062, lng: -122.3321, city: "Seattle" },
  },
  {
    id: "7",
    username: "david_music",
    displayName: "David Thompson",
    avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
    bio: "Music producer and sound engineer. Creating beats that move souls and inspire minds.",
    joinDate: "2023-07-22",
    isOnline: true,
    isPremium: true,
    premiumTier: "premium",
    subscriptionExpiry: "2024-07-25",
    location: { lat: 36.1627, lng: -86.7816, city: "Nashville" },
  },
  {
    id: "8",
    username: "maria_crypto",
    displayName: "Maria Garcia",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    bio: "Crypto trader and blockchain enthusiast. Sharing market insights and trading strategies.",
    joinDate: "2023-08-14",
    isOnline: false,
    isPremium: true,
    premiumTier: "pro",
    subscriptionExpiry: "2024-08-20",
    location: { lat: 25.7617, lng: -80.1918, city: "Miami" },
  },
  {
    id: "9",
    username: "ryan_game",
    displayName: "Ryan Parker",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
    bio: "Professional gamer and streamer. Competing in esports tournaments and sharing gaming tips.",
    joinDate: "2023-09-03",
    isOnline: true,
    isPremium: false,
    location: { lat: 39.7392, lng: -104.9903, city: "Denver" },
  },
  {
    id: "10",
    username: "anna_business",
    displayName: "Anna Johnson",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    bio: "Serial entrepreneur and business consultant. Building startups and helping others succeed.",
    joinDate: "2023-10-11",
    isOnline: true,
    isPremium: true,
    premiumTier: "pro",
    subscriptionExpiry: "2024-10-15",
    location: { lat: 42.3601, lng: -71.0589, city: "Boston" },
  },
  {
    id: "11",
    username: "carlos_art",
    displayName: "Carlos Martinez",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    bio: "Digital artist and illustrator. Creating stunning visuals for games, movies, and brands.",
    joinDate: "2023-11-07",
    isOnline: false,
    isPremium: true,
    premiumTier: "premium",
    subscriptionExpiry: "2024-11-10",
    location: { lat: 29.7604, lng: -95.3698, city: "Houston" },
  },
  {
    id: "12",
    username: "sophie_wellness",
    displayName: "Sophie Brown",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    bio: "Wellness coach and yoga instructor. Helping people find balance and inner peace.",
    joinDate: "2023-12-02",
    isOnline: true,
    isPremium: false,
    location: { lat: 33.4484, lng: -112.074, city: "Phoenix" },
  },
]

export const mockPosts: Post[] = [
  {
    id: "1",
    userId: "1",
    content:
      "Just shipped a new feature! React 18 concurrent features are amazing. The performance improvements are incredible.",
    media: [{ type: "image", url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop" }],
    isPremium: false,
    timestamp: "2024-01-20T10:30:00Z",
    likes: 24,
    comments: 8,
  },
  {
    id: "2",
    userId: "3",
    content: "Behind the scenes of my latest digital art piece. This took me 20 hours to complete!",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop" },
      { type: "video", url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop" },
    ],
    isPremium: true,
    timestamp: "2024-01-19T15:45:00Z",
    likes: 156,
    comments: 23,
  },
  {
    id: "3",
    userId: "1",
    content: "Working on some exciting new projects. Can't wait to share more details soon!",
    isPremium: false,
    timestamp: "2024-01-18T09:15:00Z",
    likes: 42,
    comments: 12,
  },
  {
    id: "4",
    userId: "2",
    content: "New design system components are ready! Check out these beautiful UI elements.",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop" },
    ],
    isPremium: false,
    timestamp: "2024-01-17T14:20:00Z",
    likes: 89,
    comments: 15,
  },
  {
    id: "5",
    userId: "3",
    content: "Premium tutorial: Advanced digital painting techniques. Learn how to create stunning artwork!",
    media: [
      { type: "video", url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop" },
    ],
    isPremium: true,
    timestamp: "2024-01-16T11:30:00Z",
    likes: 234,
    comments: 45,
  },
  {
    id: "6",
    userId: "4",
    content: "Just deployed my first AI model to production! The accuracy is incredible at 94.2%",
    media: [{ type: "image", url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop" }],
    isPremium: false,
    timestamp: "2024-01-21T08:30:00Z",
    likes: 67,
    comments: 14,
  },
  {
    id: "7",
    userId: "5",
    content: "Morning workout complete! 💪 Remember, consistency beats perfection every time.",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop" },
      { type: "image", url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop" },
    ],
    isPremium: true,
    timestamp: "2024-01-21T06:45:00Z",
    likes: 123,
    comments: 28,
  },
  {
    id: "8",
    userId: "6",
    content: "Golden hour magic ✨ This sunset shoot was absolutely breathtaking!",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" },
      { type: "image", url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop" },
    ],
    isPremium: false,
    timestamp: "2024-01-20T19:30:00Z",
    likes: 189,
    comments: 32,
  },
  {
    id: "9",
    userId: "7",
    content: "New beat drop! 🎵 This one's got that summer vibe. What do you think?",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop" },
    ],
    isPremium: true,
    timestamp: "2024-01-20T16:20:00Z",
    likes: 245,
    comments: 41,
  },
  {
    id: "10",
    userId: "8",
    content: "Bitcoin analysis: Strong support at $42k. Looking bullish for the next week! 📈",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop" },
    ],
    isPremium: true,
    timestamp: "2024-01-20T14:15:00Z",
    likes: 156,
    comments: 67,
  },
  {
    id: "11",
    userId: "9",
    content: "Just hit Grandmaster in Valorant! 🎮 The grind was real but so worth it!",
    media: [{ type: "image", url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop" }],
    isPremium: false,
    timestamp: "2024-01-20T12:45:00Z",
    likes: 78,
    comments: 19,
  },
  {
    id: "12",
    userId: "10",
    content: "Closed another round of funding! 🚀 Excited to scale our startup to the next level.",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop" },
    ],
    isPremium: true,
    timestamp: "2024-01-20T11:30:00Z",
    likes: 234,
    comments: 45,
  },
  {
    id: "13",
    userId: "11",
    content: "Latest digital artwork: 'Neon Dreams' 🎨 Spent 15 hours on this piece!",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop" },
      { type: "image", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
    ],
    isPremium: true,
    timestamp: "2024-01-19T20:15:00Z",
    likes: 312,
    comments: 58,
  },
  {
    id: "14",
    userId: "12",
    content: "Morning meditation session complete 🧘‍♀️ Starting the day with gratitude and peace.",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1506126613408-eca07ce68e71?w=400&h=300&fit=crop" },
    ],
    isPremium: false,
    timestamp: "2024-01-19T07:00:00Z",
    likes: 89,
    comments: 23,
  },
]

export const mockServers: Server[] = [
  {
    id: "1",
    name: "Dev Community",
    icon: "/dev-community-icon.png",
    description: "A place for developers to share knowledge and collaborate",
    memberCount: 1247,
    isPremium: false,
    channels: [
      { id: "1", name: "general", type: "text", isPremium: false },
      { id: "2", name: "react-help", type: "text", isPremium: false },
      { id: "3", name: "javascript", type: "text", isPremium: false },
      { id: "4", name: "typescript", type: "text", isPremium: false },
      { id: "5", name: "premium-resources", type: "text", isPremium: true, price: 9.99 },
      { id: "6", name: "code-reviews", type: "text", isPremium: true, price: 14.99 },
      { id: "7", name: "voice-chat", type: "voice", isPremium: false },
    ],
    members: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    subscriptionCount: 0,
  },
  {
    id: "2",
    name: "Design Studio",
    icon: "/design-studio-icon.png",
    description: "Premium design community for professionals",
    memberCount: 456,
    isPremium: true,
    price: 19.99,
    channels: [
      { id: "8", name: "showcase", type: "text", isPremium: false },
      { id: "9", name: "feedback", type: "text", isPremium: false },
      { id: "10", name: "resources", type: "text", isPremium: false },
      { id: "11", name: "pro-tips", type: "text", isPremium: false },
    ],
    members: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    premiumFeatures: [
      "Exclusive design resources",
      "1-on-1 mentorship sessions",
      "Portfolio reviews",
      "Industry insider content",
      "Direct access to design leaders",
    ],
    subscriptionCount: 234,
  },
  {
    id: "3",
    name: "Gaming Hub",
    icon: "/gaming-controller-icon.png",
    description: "Connect with gamers and discuss the latest games",
    memberCount: 2834,
    isPremium: false,
    channels: [
      { id: "12", name: "general", type: "text", isPremium: false },
      { id: "13", name: "pc-gaming", type: "text", isPremium: false },
      { id: "14", name: "console", type: "text", isPremium: false },
      { id: "15", name: "mobile-games", type: "text", isPremium: false },
      { id: "16", name: "esports", type: "text", isPremium: false },
      { id: "17", name: "game-night", type: "voice", isPremium: false },
      { id: "18", name: "premium-tournaments", type: "text", isPremium: true, price: 7.99 },
    ],
    members: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    subscriptionCount: 0,
  },
  {
    id: "4",
    name: "Crypto Traders",
    icon: "/btc-icon.png",
    description: "Premium trading signals and market analysis",
    memberCount: 892,
    isPremium: true,
    price: 49.99,
    channels: [
      { id: "19", name: "market-talk", type: "text", isPremium: false },
      { id: "20", name: "signals", type: "text", isPremium: false },
      { id: "21", name: "analysis", type: "text", isPremium: false },
    ],
    members: ["1", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    premiumFeatures: [
      "Daily trading signals",
      "Market analysis reports",
      "1-on-1 trading mentorship",
      "Exclusive alpha calls",
      "Portfolio tracking tools",
    ],
    subscriptionCount: 567,
  },
  {
    id: "5",
    name: "Fitness Community",
    icon: "/dumbbell-fitness-icon.png",
    description: "Motivation and workout tips for fitness enthusiasts",
    memberCount: 1567,
    isPremium: false,
    channels: [
      { id: "22", name: "general", type: "text", isPremium: false },
      { id: "23", name: "workout-plans", type: "text", isPremium: false },
      { id: "24", name: "nutrition", type: "text", isPremium: false },
      { id: "25", name: "progress-pics", type: "text", isPremium: false },
      { id: "26", name: "personal-training", type: "text", isPremium: true, price: 29.99 },
      { id: "27", name: "meal-plans", type: "text", isPremium: true, price: 19.99 },
    ],
    members: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    subscriptionCount: 0,
  },
  {
    id: "6",
    name: "Music Producers",
    icon: "/music-note-headphones-icon.png",
    description: "Collaborate and share beats with fellow producers",
    memberCount: 743,
    isPremium: false,
    channels: [
      { id: "28", name: "general", type: "text", isPremium: false },
      { id: "29", name: "beat-sharing", type: "text", isPremium: false },
      { id: "30", name: "feedback", type: "text", isPremium: false },
      { id: "31", name: "collaborations", type: "text", isPremium: false },
      { id: "32", name: "studio-sessions", type: "voice", isPremium: false },
      { id: "33", name: "sample-packs", type: "text", isPremium: true, price: 12.99 },
    ],
    members: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    subscriptionCount: 0,
  },
  {
    id: "7",
    name: "Entrepreneurs Elite",
    icon: "/briefcase-business-icon.png",
    description: "Exclusive network for successful entrepreneurs",
    memberCount: 234,
    isPremium: true,
    price: 99.99,
    channels: [
      { id: "34", name: "networking", type: "text", isPremium: false },
      { id: "35", name: "deals", type: "text", isPremium: false },
      { id: "36", name: "mentorship", type: "text", isPremium: false },
    ],
    members: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    premiumFeatures: [
      "Access to angel investors",
      "Monthly mastermind calls",
      "Deal flow opportunities",
      "1-on-1 business coaching",
      "Exclusive networking events",
    ],
    subscriptionCount: 189,
  },
  {
    id: "8",
    name: "Photography Club",
    icon: "/camera-photography-icon.png",
    description: "Share your best shots and learn from pros",
    memberCount: 1123,
    isPremium: false,
    channels: [
      { id: "37", name: "general", type: "text", isPremium: false },
      { id: "38", name: "daily-shots", type: "text", isPremium: false },
      { id: "39", name: "gear-talk", type: "text", isPremium: false },
      { id: "40", name: "editing-tips", type: "text", isPremium: false },
      { id: "41", name: "pro-workshops", type: "text", isPremium: true, price: 24.99 },
    ],
    members: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    subscriptionCount: 0,
  },
]

export const mockMessages: Message[] = [
  {
    id: "1",
    userId: "1",
    content: "Hey everyone! Welcome to the dev community 👋",
    timestamp: "2024-01-20T09:00:00Z",
    channelId: "1",
    reactions: [
      { emoji: "👍", users: ["2", "3", "4"], count: 3 },
      { emoji: "❤️", users: ["2", "4"], count: 2 },
    ],
  },
  {
    id: "2",
    userId: "4",
    content: "Thanks for having me! Excited to share some AI projects here",
    timestamp: "2024-01-20T09:05:00Z",
    channelId: "1",
    replyTo: "1",
  },
  {
    id: "3",
    userId: "2",
    content: "Looking forward to collaborating with everyone!",
    timestamp: "2024-01-20T09:10:00Z",
    channelId: "1",
  },
  {
    id: "4",
    userId: "1",
    content: "Just pushed a new React component library to GitHub. Check it out!",
    timestamp: "2024-01-20T10:30:00Z",
    channelId: "1",
    attachments: [{ type: "file", url: "/placeholder.svg", name: "component-library.zip" }],
    reactions: [{ emoji: "🚀", users: ["2", "3", "4"], count: 3 }],
  },
  {
    id: "5",
    userId: "2",
    content: "Anyone know how to optimize re-renders in React 18?",
    timestamp: "2024-01-20T11:00:00Z",
    channelId: "2",
  },
  {
    id: "6",
    userId: "1",
    content: "Use React.memo and useMemo for expensive calculations. Also check out the new concurrent features!",
    timestamp: "2024-01-20T11:05:00Z",
    channelId: "2",
    replyTo: "5",
  },
  {
    id: "7",
    userId: "4",
    content: "I've been using Suspense boundaries for better UX. Game changer!",
    timestamp: "2024-01-20T11:10:00Z",
    channelId: "2",
  },
  {
    id: "8",
    userId: "9",
    content: "Who's ready for the new season of Valorant? 🎮",
    timestamp: "2024-01-20T15:00:00Z",
    channelId: "12",
    reactions: [{ emoji: "🔥", users: ["1", "3", "5"], count: 3 }],
  },
  {
    id: "9",
    userId: "1",
    content: "I'm still stuck in Gold rank 😅 Any tips?",
    timestamp: "2024-01-20T15:05:00Z",
    channelId: "12",
    replyTo: "8",
  },
  {
    id: "10",
    userId: "9",
    content: "Focus on crosshair placement and map awareness. I can coach you sometime!",
    timestamp: "2024-01-20T15:10:00Z",
    channelId: "12",
    replyTo: "9",
  },
  {
    id: "11",
    userId: "7",
    content: "Just dropped a new beat! What genre should I explore next?",
    timestamp: "2024-01-20T16:00:00Z",
    channelId: "28",
    attachments: [{ type: "file", url: "/placeholder.svg", name: "summer-vibes.mp3" }],
  },
  {
    id: "12",
    userId: "3",
    content: "That beat is fire! 🔥 Try some lo-fi hip hop next",
    timestamp: "2024-01-20T16:05:00Z",
    channelId: "28",
    replyTo: "11",
    reactions: [{ emoji: "🎵", users: ["7"], count: 1 }],
  },
  {
    id: "13",
    userId: "5",
    content: "Morning workout complete! Who else is crushing their fitness goals today? 💪",
    timestamp: "2024-01-20T07:00:00Z",
    channelId: "22",
    attachments: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
        name: "workout-selfie.jpg",
      },
    ],
    reactions: [
      { emoji: "💪", users: ["2", "12", "6"], count: 3 },
      { emoji: "🔥", users: ["12"], count: 1 },
    ],
  },
  {
    id: "14",
    userId: "12",
    content: "Just finished my yoga session! Feeling so centered and peaceful 🧘‍♀️",
    timestamp: "2024-01-20T07:30:00Z",
    channelId: "22",
    replyTo: "13",
  },
  {
    id: "15",
    userId: "6",
    content: "Golden hour magic from yesterday's shoot ✨",
    timestamp: "2024-01-20T18:00:00Z",
    channelId: "38",
    attachments: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        name: "golden-hour.jpg",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
        name: "sunset-portrait.jpg",
      },
    ],
    reactions: [
      { emoji: "📸", users: ["2", "11", "12"], count: 3 },
      { emoji: "😍", users: ["2", "3"], count: 2 },
    ],
  },
  {
    id: "16",
    userId: "11",
    content: "Incredible composition! What camera settings did you use?",
    timestamp: "2024-01-20T18:05:00Z",
    channelId: "38",
    replyTo: "15",
  },
  {
    id: "17",
    userId: "8",
    content: "Bitcoin holding strong at $42k support. Looking bullish for the week! 📈",
    timestamp: "2024-01-20T14:00:00Z",
    channelId: "19",
    attachments: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop",
        name: "btc-chart.png",
      },
    ],
    reactions: [{ emoji: "🚀", users: ["1", "10"], count: 2 }],
  },
  {
    id: "18",
    userId: "10",
    content: "Agreed! I'm seeing similar patterns. Time to accumulate more?",
    timestamp: "2024-01-20T14:05:00Z",
    channelId: "19",
    replyTo: "17",
  },
  {
    id: "19",
    userId: "2",
    content: "New design system components are ready! Clean, modern, and accessible 🎨",
    timestamp: "2024-01-20T13:00:00Z",
    channelId: "8",
    attachments: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
        name: "design-system.png",
      },
    ],
    reactions: [
      { emoji: "🎨", users: ["3", "6", "11"], count: 3 },
      { emoji: "👏", users: ["3"], count: 1 },
    ],
  },
  {
    id: "20",
    userId: "11",
    content: "Love the color palette! Very cohesive branding",
    timestamp: "2024-01-20T13:05:00Z",
    channelId: "8",
    replyTo: "19",
  },
  {
    id: "21",
    userId: "1",
    content: "TypeScript 5.0 features are amazing! The new decorators support is game-changing",
    timestamp: "2024-01-20T12:00:00Z",
    channelId: "4", // typescript channel
  },
  {
    id: "22",
    userId: "4",
    content: "Has anyone tried the new satisfies operator? It's perfect for type narrowing",
    timestamp: "2024-01-20T12:05:00Z",
    channelId: "4",
    replyTo: "21",
  },
  {
    id: "23",
    userId: "9",
    content: "Console gaming is making a comeback! The new PlayStation exclusives are incredible",
    timestamp: "2024-01-20T17:00:00Z",
    channelId: "14", // console channel
  },
  {
    id: "24",
    userId: "5",
    content: "Meal prep Sunday! Here's my weekly nutrition plan 🥗",
    timestamp: "2024-01-21T10:00:00Z",
    channelId: "24", // nutrition channel
    attachments: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
        name: "meal-prep.jpg",
      },
    ],
  },
  {
    id: "25",
    userId: "7",
    content: "Looking for a vocalist for my new track. Anyone interested in collaborating?",
    timestamp: "2024-01-21T11:00:00Z",
    channelId: "31", // collaborations channel
  },
  {
    id: "26",
    userId: "10",
    content: "Just closed a $2M Series A! Happy to share lessons learned with fellow entrepreneurs",
    timestamp: "2024-01-21T12:00:00Z",
    channelId: "34", // networking channel
    reactions: [{ emoji: "🎉", users: ["1", "8"], count: 2 }],
  },
  {
    id: "27",
    userId: "6",
    content: "Camera gear recommendations for portrait photography? Budget around $2k",
    timestamp: "2024-01-21T13:00:00Z",
    channelId: "39", // gear-talk channel
  },
  {
    id: "28",
    userId: "11",
    content: "Canon R6 Mark II or Sony A7 IV? Both excellent choices in that range",
    timestamp: "2024-01-21T13:05:00Z",
    channelId: "39",
    replyTo: "27",
  },
]

export interface UserSubscription {
  userId: string
  serverId?: string
  channelId?: string
  type: "server" | "channel" | "user"
  expiryDate: string
}

export const mockUserSubscriptions: UserSubscription[] = [
  {
    userId: "1",
    serverId: "2", // Design Studio - user has access
    type: "server",
    expiryDate: "2024-03-15",
  },
  {
    userId: "1",
    channelId: "5", // premium-resources in Dev Community
    type: "channel",
    expiryDate: "2024-02-28",
  },
  // User doesn't have access to other premium channels/servers
]

export const hasUserAccess = (userId: string, serverId?: string, channelId?: string): boolean => {
  if (!serverId && !channelId) return false

  return mockUserSubscriptions.some((sub) => {
    if (sub.userId !== userId) return false
    if (new Date(sub.expiryDate) < new Date()) return false // Expired

    if (channelId && sub.type === "channel" && sub.channelId === channelId) return true
    if (serverId && sub.type === "server" && sub.serverId === serverId) return true

    return false
  })
}
