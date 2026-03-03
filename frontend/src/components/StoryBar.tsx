import { Story } from "@/types";
import { Plus } from "lucide-react";
import { currentUser } from "@/data/mockData";

interface StoryBarProps {
  stories: Story[];
}

const StoryBar = ({ stories }: StoryBarProps) => {
  const myStory = stories.find((s) => s.user.id === currentUser.id);
  const otherStories = stories.filter((s) => s.user.id !== currentUser.id);

  return (
    <div className="flex gap-4 px-4 py-4 overflow-x-auto ig-scrollbar-hide border-b border-ig-separator bg-background sm:px-0 sm:border-none">
      {/* Your story */}
      <div className="flex flex-col items-center gap-1 flex-shrink-0">
        <div className="relative">
          {myStory ? (
            <div className="ig-story-ring">
              <img
                src={currentUser.avatar}
                alt="Your story"
                className="w-14 h-14 rounded-full border-2 border-background object-cover"
              />
            </div>
          ) : (
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt="Your story"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="absolute -bottom-0.5 -right-0.5 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center border-2 border-background">
                <Plus className="w-3 h-3" />
              </div>
            </div>
          )}
        </div>
        <span className="text-[11px] text-foreground truncate w-16 text-center">Your story</span>
      </div>

      {/* Other stories */}
      {otherStories.map((story) => (
        <button key={story.id} className="flex flex-col items-center gap-1 flex-shrink-0">
          <div className={story.isSeen ? "ig-story-ring-seen" : "ig-story-ring"}>
            <img
              src={story.user.avatar}
              alt={story.user.username}
              className="w-14 h-14 rounded-full border-2 border-background object-cover"
            />
          </div>
          <span className="text-[11px] text-foreground truncate w-16 text-center">
            {story.user.username.split(".")[0]}
          </span>
        </button>
      ))}
    </div>
  );
};

export default StoryBar;
