import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ImagePlus, X, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import{useAuth} from '@/features/auth/hooks/useAuth.js'
import {usePost} from "@/features/post/hooks/usePost.js"
import { toast } from "sonner";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const {user} = useAuth()
  const {createPost ,loading} = usePost()
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleShare = async(e) => {
    if (!selectedImage) return;

    // Mock share action
    const formData = new FormData();
  formData.append("image", fileInputRef.current.files[0]);
  formData.append("caption", caption);
  const res = await createPost(formData)
  if(res.success){
    toast.success("Post Created Successfully")
    navigate('/')
  }else {
    toast.error("Cannot Create Post")
  }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-ig-separator">
        <div className="flex items-center justify-between px-4 h-[53px] max-w-[700px] mx-auto">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold text-base">Create new post</h1>
         <Button
            variant="ghost"
            className="text-ig-blue font-semibold text-sm hover:text-ig-blue/80 p-0"
            onClick={handleShare}
            disabled={!selectedImage || loading}
          >
            {loading ? "Sharing..." : "Share"}
        </Button>
        </div>
      </div>

      <div className="max-w-[700px] mx-auto md:flex md:mt-6 md:border md:border-ig-separator md:rounded-lg md:overflow-hidden">
        {/* Image Upload Area */}
        <div className="md:w-[55%] aspect-square bg-muted/30 relative flex items-center justify-center border-b md:border-b-0 md:border-r border-ig-separator">
          {selectedImage ? (
            <>
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 bg-black/60 text-white rounded-full p-1.5"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center gap-3 text-muted-foreground"
            >
              <ImagePlus className="w-16 h-16 stroke-[1.2]" />
              <span className="text-lg">Upload photo</span>
              <span className="text-sm text-muted-foreground/70">
                Tap to select from gallery
              </span>
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
          />
        </div>

        {/* Caption & Details */}
        <div className="md:w-[45%] p-4 flex flex-col gap-4">
          {/* User info */}
          <div className="flex items-center gap-3">
            <img
              src={user.profileImage}
              alt={user.username}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-semibold">{user.username}</span>
          </div>

          {/* Caption */}
          <Textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="border-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 min-h-[120px] text-sm placeholder:text-muted-foreground/60"
            maxLength={2200}
          />
          <div className="text-xs text-muted-foreground/50 text-right">
            {caption.length}/2,200
          </div>

          {/* Location */}
          <div className="flex items-center justify-between border-t border-ig-separator pt-3">
            <input
              type="text"
              placeholder="Add location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground/60"
            />
            <MapPin className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
