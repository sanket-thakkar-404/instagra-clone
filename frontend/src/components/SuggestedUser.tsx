import { Link } from "react-router-dom";



const SuggestedUser = ({ user }) => {

  return (
    <div className="flex items-center justify-between py-2">
      <Link to={`/user/${user.username}`} className="flex items-center gap-3">
        <img src={user.profileImage} alt={user.username} className="w-8 h-8 rounded-full object-cover" />
        <div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold">{user.username}</span>
            {user.isVerified && (
              <svg className="w-3 h-3 text-ig-blue" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.4 14.6l-4.2-4.2 1.4-1.4 2.8 2.8 5.6-5.6 1.4 1.4-7 7z" />
              </svg>
            )}
          </div>
          <p className="text-xs text-muted-foreground">80 followers</p>
        </div>
      </Link>
      <button className="text-xs font-semibold text-primary hover:text-foreground transition-colors">
        Follow
      </button>
    </div>
  );
};

export default SuggestedUser;
