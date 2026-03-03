import PostCard from "@/components/PostCard";
import StoryBar from "@/components/StoryBar";
import SuggestedUser from "@/components/SuggestedUser";
import { posts, stories, users, currentUser, formatCount } from "@/data/mockData";
import { Link } from "react-router-dom";
import {useAuth} from '@/features/auth/hooks/useAuth'
import { useEffect } from "react";

const HomePage = () => {

  const {allUser,getAllUser,user} = useAuth()
  useEffect(()=>{
    getAllUser()
  },[])

  console.log(allUser)

  return (
    <div className="max-w-6xl mx-auto flex lg:gap-20 justify-between ">
      {/* Main Feed */}
      <div className="flex-1 max-w-4xl ">
        <StoryBar stories={stories} />
        <div className="mt-2">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Right Sidebar - Desktop only */}
      <div className="hidden max-w-lg lg:block  pt-8 sticky top-0 h-screen ">
        {/* Current User */}
        <div className="flex items-center justify-between mb-5">
          <Link to={`/profile/${user.username}`} className="flex items-center gap-3">
            <img src={user.profileImage} alt={user.username} className="w-11 h-11 rounded-full object-cover" />
            <div>
              <p className="text-sm font-semibold">{user.username}</p>
              <p className="text-sm text-muted-foreground">{user.fullName}</p>
            </div>
          </Link>
          <button className="text-xs font-semibold text-primary">Switch</button>
        </div>

        {/* Suggestions */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-muted-foreground">Suggested for you</span>
          <button className="text-xs font-semibold text-foreground">See All</button>
        </div>
        {allUser.filter((u) => !u.isFollowing || 0).slice(0, 5).map((user) => (
          <SuggestedUser key={user._id} user={user} />
        ))}

        {/* Footer */}
        <div className="mt-8">
          <p className="text-xs text-muted-foreground/50 leading-5">
            About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified
          </p>
          <p className="text-xs text-muted-foreground/50 mt-4">© 2026 INSTAGRAM CLONE</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
