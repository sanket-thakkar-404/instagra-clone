import { NavLink, useLocation } from "react-router-dom";
import { Home, Search, PlusSquare, Film } from "lucide-react";
import { currentUser } from "@/data/mockData";

const BottomNav = () => {
  const location = useLocation();

  const items = [
    { to: "/", icon: Home },
    { to: "/explore", icon: Search },
    { to: "/create", icon: PlusSquare },
    { to: "/reels", icon: Film },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-ig-separator z-50 safe-area-bottom">
      <div className="flex items-center justify-around py-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          return (
            <NavLink key={item.to} to={item.to} className="p-2">
              <Icon className={`w-6 h-6 ${isActive ? "stroke-[2.5px]" : ""}`} />
            </NavLink>
          );
        })}
        <NavLink to={`/profile/${currentUser.username}`} className="p-2">
          <img
            src={currentUser.avatar}
            alt="Profile"
            className={`w-6 h-6 rounded-full object-cover ${
              location.pathname.includes("/profile") ? "ring-2 ring-foreground" : ""
            }`}
          />
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
