import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Post } from "@/types";
import { formatCount } from "@/data/mockData";
import { Link } from "react-router-dom";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [liked, setLiked] = useState(post.isLiked);
  const [saved, setSaved] = useState(post.isSaved);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [showFullCaption, setShowFullCaption] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  const handleDoubleTapLike = () => {
    if (!liked) {
      setLiked(true);
      setLikesCount(likesCount + 1);
    }
  };

  return (
    <article className="border-b border-ig-separator pb-4 mb-4">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 sm:px-0">
        <Link to={`/profile/${post.user.username}`} className="flex items-center gap-3">
          <div className="ig-story-ring">
            <img
              src={post.user.avatar}
              alt={post.user.username}
              className="w-8 h-8 rounded-full border-2 border-background object-cover"
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold text-foreground">{post.user.username}</span>
            {post.user.isVerified && (
              <svg className="w-3.5 h-3.5 text-ig-blue" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.4 14.6l-4.2-4.2 1.4-1.4 2.8 2.8 5.6-5.6 1.4 1.4-7 7z" />
              </svg>
            )}
            <span className="text-xs text-muted-foreground ml-1">• {post.createdAt}</span>
          </div>
        </Link>
        <button className="p-2 hover:text-muted-foreground transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Image */}
      <div className="relative" onDoubleClick={handleDoubleTapLike}>
        <img
          src={post.images[0]}
          alt="Post"
          className="w-full aspect-square object-cover"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-3 pt-3 sm:px-0">
        <div className="flex items-center gap-4">
          <button onClick={handleLike} className="transition-transform active:scale-125">
            <Heart
              className={`w-6 h-6 ${liked ? "fill-ig-red text-ig-red" : "text-foreground"}`}
            />
          </button>
          <button>
            <MessageCircle className="w-6 h-6 text-foreground" />
          </button>
          <button>
            <Send className="w-6 h-6 text-foreground" />
          </button>
        </div>
        <button onClick={() => setSaved(!saved)} className="transition-transform active:scale-110">
          <Bookmark className={`w-6 h-6 ${saved ? "fill-foreground text-foreground" : "text-foreground"}`} />
        </button>
      </div>

      {/* Likes */}
      <div className="px-3 pt-2 sm:px-0">
        <p className="text-sm font-semibold">{formatCount(likesCount)} likes</p>
      </div>

      {/* Caption */}
      <div className="px-3 pt-1 sm:px-0">
        <p className="text-sm">
          <Link to={`/profile/${post.user.username}`} className="font-semibold mr-1">
            {post.user.username}
          </Link>
          {post.caption.length > 100 && !showFullCaption ? (
            <>
              {post.caption.slice(0, 100)}...
              <button
                onClick={() => setShowFullCaption(true)}
                className="text-muted-foreground ml-1"
              >
                more
              </button>
            </>
          ) : (
            post.caption
          )}
        </p>
      </div>

      {/* Comments */}
      {post.commentsCount > 0 && (
        <div className="px-3 pt-1 sm:px-0">
          <button className="text-sm text-muted-foreground">
            View all {post.commentsCount} comments
          </button>
          {post.comments.slice(0, 2).map((comment) => (
            <p key={comment.id} className="text-sm mt-0.5">
              <span className="font-semibold mr-1">{comment.user.username}</span>
              {comment.text}
            </p>
          ))}
        </div>
      )}

      {/* Add comment */}
      <div className="px-3 pt-2 sm:px-0">
        <input
          type="text"
          placeholder="Add a comment..."
          className="text-sm text-muted-foreground bg-transparent outline-none w-full"
        />
      </div>
    </article>
  );
};

export default PostCard;
