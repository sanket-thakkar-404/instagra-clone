import { useState } from "react";
import { Heart, MessageCircle, Send, MoreHorizontal, Music, Save, BookMarked, BookmarkPlus } from "lucide-react";
import { users, formatCount } from "@/data/mockData";

const reelVideos = [
  { id: "r1", user: users[0], thumbnail: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=700&fit=crop", caption: "Golden hour vibes ✨ #photography", likesCount: 12400, commentsCount: 234, audio: "Original Audio" },
  { id: "r2", user: users[2], thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=700&fit=crop", caption: "Art process 🎨 Watch till the end!", likesCount: 45600, commentsCount: 567, audio: "Trending Sound" },
  { id: "r3", user: users[5], thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=700&fit=crop", caption: "Nature is healing 🌿", likesCount: 8900, commentsCount: 123, audio: "Ambient Nature" },
  { id: "r4", user: users[6], thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=700&fit=crop", caption: "OOTD check ✨ #fashion", likesCount: 23400, commentsCount: 345, audio: "Pop Hit 2026" },
];

const ReelsPage = () => {
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="h-screen overflow-y-auto ig-snap-y ig-scrollbar-hide ">
      {reelVideos.map((reel) => (
        <div key={reel.id} className="h-screen relative ig-snap-start flex items-center justify-center bg-black mx-auto max-w-2xl">
          {/* Background image (simulating video) */}
          <img
            src={reel.thumbnail}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

          {/* Right side actions */}
          <div className="absolute right-3 bottom-10 flex flex-col items-center h-[40%] justify-around">
            <button onClick={() => toggleLike(reel.id)} className="flex flex-col items-center gap-1">
              <Heart className={`w-7 h-7 ${liked[reel.id] ? "fill-ig-red text-ig-red" : "text-white"}`} />
              <span className="text-white text-xs font-semibold">{formatCount(reel.likesCount)}</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <MessageCircle className="w-7 h-7 text-white" />
              <span className="text-white text-xs font-semibold">{formatCount(reel.commentsCount)}</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <Send className="w-7 h-7 text-white" />
            </button>
            <button className="flex flex-col items-center gap-1">
              <BookmarkPlus className="w-7 h-7 text-white" />
            </button>
            <button>
              <MoreHorizontal className="w-7 h-7 text-white" />
            </button>
            <div className="w-7 h-7 rounded border border-white/50 overflow-hidden mt-2">
              <img src={reel.user.avatar} alt="" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Bottom info */}
          <div className="absolute left-3 bottom-8 right-16">
            <div className="flex items-center gap-2 mb-2">
              <img src={reel.user.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
              <span className="text-white font-semibold text-sm">{reel.user.username}</span>
              <button className="text-white text-sm font-semibold border border-white/50 rounded-lg px-3 py-0.5 ml-1">
                Follow
              </button>
            </div>
            <p className="text-white text-sm mb-2">{reel.caption}</p>
            <div className="flex items-center gap-2">
              <Music className="w-3 h-3 text-white" />
              <span className="text-white text-xs">{reel.audio}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReelsPage;
