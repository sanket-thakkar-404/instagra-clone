import { NavLink, useLocation } from "react-router-dom";
import { Home, Search, Compass, Film, MessageCircle, Heart, PlusSquare, Menu } from "lucide-react";
import { currentUser } from "@/data/mockData";
import {useAuth} from '../features/auth/hooks/useAuth.js'

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/search", icon: Search, label: "Search" },
  { to: "/explore", icon: Compass, label: "Explore" },
  { to: "/posts", icon: Film, label: "Posts" },
  { to: "/notifications", icon: Heart, label: "Notifications" },
  { to: "/create", icon: PlusSquare, label: "Create" },
];



const Sidebar = () => {

  const location = useLocation();
  const isMessagesPage = location.pathname === "/messages";

  return (
    <aside
      className={`hidden md:flex flex-col fixed left-0 top-0 h-full bg-background border-r border-ig-separator z-40 transition-all duration-300 ${
        isMessagesPage ? "w-[72px]" : "xl:w-[245px] w-[72px]"
      }`}
    >
      {/* Logo */}
      <div className="px-3 pt-8 pb-5">
        {isMessagesPage ? (
          <div className="flex justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
              <path d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.042-.379 3.408 3.408 0 0 1-1.265-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1z" />
              <path d="M12 6.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667z" />
              <circle cx="17.872" cy="6.128" r="1.32" />
            </svg>
          </div>
        ) : (
          <>
            <h1 className="hidden xl:block text-2xl font-semibold px-3" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
              Instagram
            </h1>
            <div className="xl:hidden flex justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.042-.379 3.408 3.408 0 0 1-1.265-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1z" />
                <path d="M12 6.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667z" />
                <circle cx="17.872" cy="6.128" r="1.32" />
              </svg>
            </div>
          </>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col gap-1 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-4 px-3 py-3 rounded-lg transition-colors hover:bg-ig-hover group ${
                isActive ? "font-bold" : ""
              }`}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 ${isActive ? "stroke-[2.5px]" : ""}`} />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`${isMessagesPage ? "hidden" : "hidden xl:inline"} text-base`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Profile & More */}
      <div className="px-2 pb-6 flex flex-col gap-1">
        <NavLink
          to={`/profile/${currentUser.username}`}
          className={`flex items-center gap-4 px-3 py-3 rounded-lg transition-colors hover:bg-ig-hover ${
            location.pathname.includes("/profile") ? "font-bold" : ""
          }`}
        >
          <img src={currentUser.avatar} alt="Profile" className="w-6 h-6 rounded-full object-cover" />
          <span className={`${isMessagesPage ? "hidden" : "hidden xl:inline"} text-base`}>Profile</span>
        </NavLink>
        <button className="flex items-center gap-4 px-3 py-3 rounded-lg transition-colors hover:bg-ig-hover">
          <Menu className="w-6 h-6" />
          <span className={`${isMessagesPage ? "hidden" : "hidden xl:inline"} text-base`}>More</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
