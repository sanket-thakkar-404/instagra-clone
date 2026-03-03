export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio: string;
  isVerified: boolean;
  isPrivate: boolean;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
  isOnline: boolean;
}

export interface Post {
  id: string;
  user: User;
  images: string[];
  caption: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  isSaved: boolean;
  createdAt: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  createdAt: string;
  likesCount: number;
  isLiked: boolean;
}

export interface Story {
  id: string;
  user: User;
  image: string;
  createdAt: string;
  isSeen: boolean;
}

export interface Message {
  id: string;
  sender: User;
  text: string;
  createdAt: string;
  isSeen: boolean;
}

export interface ChatThread {
  id: string;
  user: User;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}
