import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import {useAuth} from '@/features/auth/hooks/useAuth.js'
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const {getAllUser, allUser, } = useAuth()
  useEffect(()=>{
    getAllUser()
  },[])


 const filtered = allUser.filter(
  (u) =>
    u.username?.toLowerCase().includes(query.toLowerCase()) ||
    u.fullName?.toLowerCase().includes(query.toLowerCase())
);

  return (
    <div className="max-w-[400px] mx-auto px-4 pt-6">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-secondary rounded-lg pl-9 pr-4 py-2.5 text-base outline-none placeholder:text-muted-foreground"
          autoFocus
        />
      </div>

      {query ? (
        <div>
          {filtered.map((user) => (
            <Link
              key={user._id}
              to={`/profile/${user.username}`}
              className="flex items-center gap-3 py-2 px-2 hover:bg-ig-hover rounded-lg transition-colors"
            >
              <img src={user.profileImage} alt="" className="w-11 h-11 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold">{user.username}</p>
                <p className="text-sm text-muted-foreground">{user.fullName}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold">Recent</h3>
            <button className="text-sm font-semibold text-primary">Clear all</button>
          </div>
          {allUser.slice(0, 4).map((user) => (
            <div key={user._id} className="flex items-center gap-3 py-2 px-2">
              <img src={user.profileImage} alt="" className="w-11 h-11 rounded-full object-cover" />
              <div className="flex-1">
                <p className="text-sm font-semibold">{user.username}</p>
                <p className="text-sm text-muted-foreground">{user.fullName}</p>
              </div>
              <button className="text-muted-foreground text-lg">×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
