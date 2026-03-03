import { Heart, UserPlus } from "lucide-react";
import { users } from "@/data/mockData";
import { Link } from "react-router-dom";

const notifications = [
  { id: "n1", user: users[0], type: "like" as const, text: "liked your photo.", time: "2h", postImg: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=44&h=44&fit=crop" },
  { id: "n2", user: users[2], type: "follow" as const, text: "started following you.", time: "4h" },
  { id: "n3", user: users[4], type: "comment" as const, text: 'commented: "Amazing shot! 🔥"', time: "6h", postImg: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=44&h=44&fit=crop" },
  { id: "n4", user: users[6], type: "like" as const, text: "liked your photo.", time: "8h", postImg: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=44&h=44&fit=crop" },
  { id: "n5", user: users[1], type: "follow" as const, text: "started following you.", time: "1d" },
  { id: "n6", user: users[3], type: "mention" as const, text: "mentioned you in a comment.", time: "1d", postImg: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=44&h=44&fit=crop" },
  { id: "n7", user: users[5], type: "like" as const, text: "and 12 others liked your photo.", time: "2d", postImg: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=44&h=44&fit=crop" },
];

const NotificationsPage = () => {
  return (
    <div className="max-w-[600px] mx-auto px-4 pt-6">
      <h2 className="text-2xl font-bold mb-4 hidden md:block">Notifications</h2>

      <div>
        <h3 className="text-base font-semibold mb-2">Today</h3>
        {notifications.slice(0, 4).map((notif) => (
          <div key={notif.id} className="flex items-center gap-3 py-2.5 hover:bg-ig-hover rounded-lg px-2 transition-colors">
            <Link to={`/profile/${notif.user.username}`}>
              <img src={notif.user.avatar} alt="" className="w-11 h-11 rounded-full object-cover" />
            </Link>
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <Link to={`/profile/${notif.user.username}`} className="font-semibold">{notif.user.username}</Link>{" "}
                {notif.text}{" "}
                <span className="text-muted-foreground">{notif.time}</span>
              </p>
            </div>
            {notif.type === "follow" ? (
              <button className="bg-primary text-primary-foreground text-sm font-semibold px-5 py-1.5 rounded-lg flex-shrink-0">
                Follow
              </button>
            ) : notif.postImg ? (
              <img src={notif.postImg} alt="" className="w-11 h-11 object-cover flex-shrink-0" />
            ) : null}
          </div>
        ))}

        <h3 className="text-base font-semibold mb-2 mt-6">This Week</h3>
        {notifications.slice(4).map((notif) => (
          <div key={notif.id} className="flex items-center gap-3 py-2.5 hover:bg-ig-hover rounded-lg px-2 transition-colors">
            <Link to={`/profile/${notif.user.username}`}>
              <img src={notif.user.avatar} alt="" className="w-11 h-11 rounded-full object-cover" />
            </Link>
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <Link to={`/profile/${notif.user.username}`} className="font-semibold">{notif.user.username}</Link>{" "}
                {notif.text}{" "}
                <span className="text-muted-foreground">{notif.time}</span>
              </p>
            </div>
            {notif.type === "follow" ? (
              <button className="bg-primary text-primary-foreground text-sm font-semibold px-5 py-1.5 rounded-lg flex-shrink-0">
                Follow
              </button>
            ) : notif.postImg ? (
              <img src={notif.postImg} alt="" className="w-11 h-11 object-cover flex-shrink-0" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
