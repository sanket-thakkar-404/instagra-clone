import { Search } from "lucide-react";
import { useState } from "react";
import { exploreImages } from "@/data/mockData";

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-[935px] mx-auto px-1">
      {/* Search bar - Mobile */}
      <div className=" px-3 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-secondary rounded-lg pl-9 pr-4 py-2 text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Explore Grid - Instagram pattern: rows of 3 with occasional large tiles */}
      <div className="grid grid-cols-3 gap-0.5">
        {exploreImages.map((img, i) => {
          const isLarge = i % 9 === 0; // Every 9th image is large
          return (
            <button
              key={i}
              className={`relative group ${isLarge ? "row-span-2 col-span-1" : ""}`}
            >
              <img
                src={img}
                alt=""
                className={`w-full object-cover ${isLarge ? "h-full aspect-[1/2]" : "aspect-square"}`}
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
                <span className="text-white font-semibold text-sm">❤️ 2.4K</span>
                <span className="text-white font-semibold text-sm">💬 56</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ExplorePage;
