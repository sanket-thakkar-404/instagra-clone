import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, X } from "lucide-react";
import { useState } from "react";
import { formatCount } from "@/data/mockData";

interface PostDetailModalProps {
  image: string;
  onClose: () => void;
}

const PostDetailModal = ({ image, onClose }: PostDetailModalProps) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(1243);
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [caption, setCaption] = useState("Beautiful day! 🌅 #photography");
  const [showMenu, setShowMenu] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 text-white z-50">
        <X className="w-7 h-7" />
      </button>

      <div
        className="bg-background w-[95vw] max-w-[900px] max-h-[90vh] rounded-md overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="md:w-[55%] bg-black flex items-center justify-center">
          <img src={image} alt="Post" className="w-full aspect-square object-cover" />
        </div>

        {/* Details */}
        <div className="md:w-[45%] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-ig-separator">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-muted" />
              <span className="text-sm font-semibold">johndoe</span>
            </div>
            <div className="relative">
              <button onClick={() => setShowMenu(!showMenu)}>
                <MoreHorizontal className="w-5 h-5" />
              </button>
              {showMenu && (
                <div className="absolute right-0 top-8 bg-background border border-ig-separator rounded-lg shadow-lg z-10 w-40 overflow-hidden">
                  <button
                    onClick={() => { setIsEditing(true); setShowMenu(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-accent transition-colors"
                  >
                    Edit post
                  </button>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-accent transition-colors">
                    Delete post
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Edit mode or Comments */}
          {isEditing ? (
            <div className="flex-1 p-4 space-y-3 min-h-[120px]">
              <p className="text-sm font-semibold">Edit caption</p>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full text-sm bg-transparent border border-ig-separator rounded-lg p-3 outline-none resize-none min-h-[100px] focus:border-ig-blue transition-colors"
                maxLength={2200}
              />
              <p className="text-xs text-muted-foreground text-right">{caption.length}/2,200</p>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-1.5 text-sm rounded-lg bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-1.5 text-sm rounded-lg bg-ig-blue text-white font-semibold hover:bg-ig-blue/90 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (

          /* Comments area */
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[120px]">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0" />
              <p className="text-sm">
                <span className="font-semibold mr-1">johndoe</span>
                {caption}
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0" />
              <p className="text-sm">
                <span className="font-semibold mr-1">sarah.captures</span>
                Amazing shot! 😍
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0" />
              <p className="text-sm">
                <span className="font-semibold mr-1">mike.travels</span>
                Love this! 🔥
              </p>
            </div>
          </div>
          )}

          {/* Actions */}
          <div className="border-t border-ig-separator px-4 pt-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={handleLike} className="transition-transform active:scale-125">
                  <Heart className={`w-6 h-6 ${liked ? "fill-ig-red text-ig-red" : "text-foreground"}`} />
                </button>
                <button><MessageCircle className="w-6 h-6 text-foreground" /></button>
                <button><Send className="w-6 h-6 text-foreground" /></button>
              </div>
              <button onClick={() => setSaved(!saved)}>
                <Bookmark className={`w-6 h-6 ${saved ? "fill-foreground text-foreground" : "text-foreground"}`} />
              </button>
            </div>
            <p className="text-sm font-semibold mt-2">{formatCount(likesCount)} likes</p>
            <p className="text-[10px] text-muted-foreground uppercase mt-1 mb-3">2 hours ago</p>
          </div>

          {/* Add comment */}
          <div className="border-t border-ig-separator flex items-center px-4 py-3">
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground/60"
            />
            {comment && (
              <button className="text-ig-blue text-sm font-semibold ml-2">Post</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;
