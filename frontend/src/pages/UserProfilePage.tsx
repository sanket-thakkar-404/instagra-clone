import { useEffect, useState } from "react";
import { Grid3X3, Bookmark, Film, Tag, Settings, ChevronDown } from "lucide-react";
import PostDetailModal from "@/components/PostDetailModal";
import {useAuth} from '@/features/auth/hooks/useAuth.js'
import {usePost} from '@/features/post/hooks/usePost.js'

const tabs = [
  { id: "posts", icon: Grid3X3, label: "Posts" },
  { id: "reels", icon: Film, label: "Reels" },
  { id: "saved", icon: Bookmark, label: "Saved" },
  { id: "tagged", icon: Tag, label: "Tagged" },
];

const UserProfilePage = () => {
  const {posts , getPost,loading} = usePost()
  const {user,handleLogout} = useAuth()

  const handleEdit = async() =>{
    const res = await handleLogout();
    console.log(res)
  }
  useEffect(()=>{
    getPost()
  },[])
  const [activeTab, setActiveTab] = useState("posts");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  // const user = currentUser;

  console.log(user)

  return (
    <div className="max-w-[935px] mx-auto px-4 pt-8">
      {/* Profile Header */}
      <div className="flex gap-8 md:gap-20 mb-10">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="ig-story-ring">
            <img
              src={user.profileImage}
              alt={user.username}
              className="w-20 h-20 md:w-36 md:h-36 rounded-full border-4 border-background object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <h1 className="text-xl font-normal">{user.username}</h1>
            <div className="flex gap-2">
              <button onClick={handleEdit} className="bg-secondary text-secondary-foreground text-sm font-semibold px-5 py-1.5 rounded-lg hover:bg-accent transition-colors">
                Edit profile
              </button>
              <button className="bg-secondary text-secondary-foreground text-sm font-semibold px-5 py-1.5 rounded-lg hover:bg-accent transition-colors">
                View archive
              </button>
            </div>
            <button>
              <Settings className="w-6 h-6" />
            </button>
          </div>

          {/* Stats - Desktop */}
          <div className="hidden md:flex gap-10 mb-4">
            <span className="text-base"><strong>{posts.length}</strong> posts</span>
            <button className="text-base"><strong>1</strong> followers</button>
            <button className="text-base"><strong>1</strong> following</button>
          </div>

          {/* Bio */}
          <div className="hidden md:block">
            <p className="text-sm font-semibold">{user.fullname}</p>
            <p className="text-sm whitespace-pre-line mt-1">{user.bio}</p>
          </div>
        </div>
      </div>

      {/* Bio - Mobile */}
      <div className="md:hidden mb-4 -mt-4 px-1 bg-green-500">
        <p className="text-sm font-semibold">{user.username}</p>
        <p className="text-sm whitespace-pre-line mt-1">{user.bio}</p>
      </div>

      {/* Stats - Mobile */}
      <div className="md:hidden flex justify-around border-y border-ig-separator py-3 mb-1">
        <div className="text-center">
          <p className="text-sm font-semibold">{posts.length}</p>
          <p className="text-xs text-muted-foreground">posts</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold">1</p>
          <p className="text-xs text-muted-foreground">followers</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold">1</p>
          <p className="text-xs text-muted-foreground">following</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-t border-ig-separator">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-5 py-3 text-xs font-semibold tracking-wider uppercase transition-colors border-t ${
                activeTab === tab.id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
   {loading ? (
  <div className="flex h-full justify-center items-center">
    <h3>Posts are loading...</h3>
  </div>
) : posts.length === 0 ? (
  <div className="flex h-full justify-center items-center">
    <h3 className="text-gray-500 text-lg font-semibold">
      Post your first video
    </h3>
  </div>
) : (
  <div className="grid grid-cols-3 gap-1 pb-16">
    {posts.map((img, i) => (
      <button
        key={i}
        className="aspect-square relative group"
        onClick={() => setSelectedImage(img)}
      >
        <img
          src={img.image}
          alt=""
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
          <span className="text-white font-semibold text-sm flex items-center gap-1">
            ❤️ 1.2K
          </span>
          <span className="text-white font-semibold text-sm flex items-center gap-1">
            💬 24
          </span>
        </div>
      </button>
    ))}
  </div>
)}

      {selectedImage && (
        <PostDetailModal image={selectedImage.image} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
};

export default UserProfilePage;
