import { User, Post, Story, ChatThread } from "@/types";

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=face",
];

const postImages = [
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&h=600&fit=crop",
];

export const currentUser: User = {
  id: "current",
  username: "johndoe",
  fullName: "John Doe",
  avatar: avatars[1],
  bio: "📸 Photographer | 🌍 Traveler\nCapturing moments that matter",
  isVerified: true,
  isPrivate: false,
  postsCount: 142,
  followersCount: 12400,
  followingCount: 845,
  isFollowing: false,
  isOnline: true,
};

export const users: User[] = [
  { id: "1", username: "sarah.captures", fullName: "Sarah Wilson", avatar: avatars[0], bio: "Nature lover 🌿", isVerified: true, isPrivate: false, postsCount: 234, followersCount: 45200, followingCount: 312, isFollowing: true, isOnline: true },
  { id: "2", username: "mike.travels", fullName: "Mike Chen", avatar: avatars[2], bio: "Wanderlust ✈️", isVerified: false, isPrivate: false, postsCount: 89, followersCount: 2340, followingCount: 567, isFollowing: true, isOnline: false },
  { id: "3", username: "emma.creates", fullName: "Emma Davis", avatar: avatars[3], bio: "Artist & Designer 🎨", isVerified: true, isPrivate: false, postsCount: 456, followersCount: 89000, followingCount: 234, isFollowing: false, isOnline: true },
  { id: "4", username: "alex.fit", fullName: "Alex Rivera", avatar: avatars[4], bio: "Fitness Coach 💪", isVerified: false, isPrivate: true, postsCount: 167, followersCount: 5600, followingCount: 432, isFollowing: true, isOnline: false },
  { id: "5", username: "lily.eats", fullName: "Lily Zhang", avatar: avatars[5], bio: "Food blogger 🍕", isVerified: false, isPrivate: false, postsCount: 312, followersCount: 18900, followingCount: 289, isFollowing: true, isOnline: true },
  { id: "6", username: "james.photo", fullName: "James Miller", avatar: avatars[6], bio: "Professional Photographer", isVerified: true, isPrivate: false, postsCount: 567, followersCount: 125000, followingCount: 178, isFollowing: false, isOnline: false },
  { id: "7", username: "olivia.style", fullName: "Olivia Brown", avatar: avatars[7], bio: "Fashion & Lifestyle ✨", isVerified: false, isPrivate: false, postsCount: 203, followersCount: 34500, followingCount: 456, isFollowing: true, isOnline: true },
];

export const posts: Post[] = [
  {
    id: "p1", user: users[0], images: [postImages[0]], caption: "Golden hour never disappoints 🌅 #photography #nature", likesCount: 1243, commentsCount: 45, isLiked: false, isSaved: false, createdAt: "2h",
    comments: [
      { id: "c1", user: users[2], text: "Absolutely stunning! 😍", createdAt: "1h", likesCount: 12, isLiked: false },
      { id: "c2", user: users[4], text: "Where is this?", createdAt: "30m", likesCount: 3, isLiked: false },
    ],
  },
  {
    id: "p2", user: users[5], images: [postImages[1]], caption: "Mountains are calling and I must go 🏔️", likesCount: 892, commentsCount: 23, isLiked: true, isSaved: true, createdAt: "4h",
    comments: [{ id: "c3", user: users[1], text: "Take me there!", createdAt: "2h", likesCount: 5, isLiked: false }],
  },
  {
    id: "p3", user: users[2], images: [postImages[2]], caption: "New artwork coming soon 🎨 Stay tuned!", likesCount: 3456, commentsCount: 89, isLiked: false, isSaved: false, createdAt: "6h",
    comments: [{ id: "c4", user: users[6], text: "Can't wait! 🔥", createdAt: "5h", likesCount: 8, isLiked: true }],
  },
  {
    id: "p4", user: users[6], images: [postImages[3]], caption: "Forest bathing 🌲 #nature #peaceful", likesCount: 2100, commentsCount: 34, isLiked: true, isSaved: false, createdAt: "8h",
    comments: [],
  },
  {
    id: "p5", user: users[3], images: [postImages[4]], caption: "Morning workout done ✅ No excuses!", likesCount: 567, commentsCount: 12, isLiked: false, isSaved: false, createdAt: "12h",
    comments: [],
  },
];

export const stories: Story[] = [
  { id: "s0", user: currentUser, image: postImages[8], createdAt: "1h", isSeen: false },
  { id: "s1", user: users[0], image: postImages[5], createdAt: "2h", isSeen: false },
  { id: "s2", user: users[4], image: postImages[6], createdAt: "3h", isSeen: false },
  { id: "s3", user: users[6], image: postImages[7], createdAt: "4h", isSeen: true },
  { id: "s4", user: users[2], image: postImages[8], createdAt: "5h", isSeen: true },
  { id: "s5", user: users[1], image: postImages[9], createdAt: "6h", isSeen: false },
  { id: "s6", user: users[5], image: postImages[10], createdAt: "7h", isSeen: true },
  { id: "s7", user: users[3], image: postImages[11], createdAt: "8h", isSeen: false },
];

export const chatThreads: ChatThread[] = [
  { id: "t1", user: users[0], lastMessage: "That photo was amazing! 📸", lastMessageTime: "2m", unreadCount: 2 },
  { id: "t2", user: users[4], lastMessage: "See you tomorrow!", lastMessageTime: "1h", unreadCount: 0 },
  { id: "t3", user: users[2], lastMessage: "Thanks for the collab ✨", lastMessageTime: "3h", unreadCount: 1 },
  { id: "t4", user: users[6], lastMessage: "Love your latest post!", lastMessageTime: "5h", unreadCount: 0 },
  { id: "t5", user: users[1], lastMessage: "Let's plan the trip 🌍", lastMessageTime: "1d", unreadCount: 0 },
];

export const exploreImages = postImages.concat([
  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop",
]);

export const formatCount = (count: number): string => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
};
