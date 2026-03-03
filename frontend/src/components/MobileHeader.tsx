import { Heart, MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MobileHeader = () => {
  const location = useLocation();
  if (location.pathname === "/reels") return null;

  return (
    <header className="md:hidden sticky top-0 z-50 bg-background border-b border-ig-separator px-4 py-2.5 flex items-center justify-between">
      <h1 className="text-xl font-semibold" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
        Instagram
      </h1>
      <div className="flex items-center gap-5">
        <Link to="/notifications" className="relative">
          <Heart className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            5
          </span>
        </Link>
        <Link to="/messages" className="relative">
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </Link>
      </div>
    </header>
  );
};

export default MobileHeader;
