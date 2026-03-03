import { useState } from "react";
import { Edit, Phone, Video, Info, Send, Image, Heart, Smile } from "lucide-react";
import { chatThreads, currentUser, users } from "@/data/mockData";
import { ChatThread } from "@/types";

const MessagesPage = () => {
  const [selectedThread, setSelectedThread] = useState<ChatThread | null>(null);
  const [messageText, setMessageText] = useState("");

  const mockMessages = [
    { id: "m1", text: "Hey! Love your latest post 😍", isMine: false, time: "2:30 PM" },
    { id: "m2", text: "Thank you so much! 🙏", isMine: true, time: "2:32 PM" },
    { id: "m3", text: "We should do a collab sometime!", isMine: false, time: "2:33 PM" },
    { id: "m4", text: "That sounds amazing! Let's plan it", isMine: true, time: "2:35 PM" },
    { id: "m5", text: "Perfect! I'll DM you the details later", isMine: false, time: "2:36 PM" },
  ];

  return (
    <div className="flex h-screen">
      {/* Thread List */}
      <div className={`w-full md:w-[397px] border-r border-ig-separator flex flex-col ${selectedThread ? "hidden md:flex" : "flex"}`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-ig-separator">
          <div className="flex items-center gap-1">
            <h2 className="text-xl font-bold">{currentUser.username}</h2>
          </div>
          <button>
            <Edit className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-3 px-4 py-3 border-b border-ig-separator">
          <button className="text-sm font-semibold bg-foreground text-background px-4 py-1.5 rounded-lg">Primary</button>
          <button className="text-sm font-semibold text-muted-foreground px-4 py-1.5 rounded-lg">General</button>
          <button className="text-sm font-semibold text-muted-foreground px-4 py-1.5 rounded-lg">Requests</button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chatThreads.map((thread) => (
            <button
              key={thread.id}
              onClick={() => setSelectedThread(thread)}
              className={`flex items-center gap-3 w-full px-6 py-2 hover:bg-ig-hover transition-colors ${
                selectedThread?.id === thread.id ? "bg-ig-hover" : ""
              }`}
            >
              <div className="relative">
                <img src={thread.user.avatar} alt="" className="w-14 h-14 rounded-full object-cover" />
                {thread.user.isOnline && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-background" style={{ backgroundColor: "hsl(142 71% 45%)" }} />
                )}
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className={`text-sm ${thread.unreadCount > 0 ? "font-semibold" : ""}`}>{thread.user.fullName}</p>
                <p className={`text-sm truncate ${thread.unreadCount > 0 ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                  {thread.lastMessage} · {thread.lastMessageTime}
                </p>
              </div>
              {thread.unreadCount > 0 && (
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col ${selectedThread ? "flex" : "hidden md:flex"}`}>
        {selectedThread ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-ig-separator">
              <div className="flex items-center gap-3">
                <button className="md:hidden mr-2 text-foreground" onClick={() => setSelectedThread(null)}>
                  ←
                </button>
                <div className="relative">
                  <img src={selectedThread.user.avatar} alt="" className="w-11 h-11 rounded-full object-cover" />
                  {selectedThread.user.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background" style={{ backgroundColor: "hsl(142 71% 45%)" }} />
                  )}
                </div>
                <div>
                  <p className="text-base font-semibold">{selectedThread.user.fullName}</p>
                  <p className="text-xs text-muted-foreground">{selectedThread.user.isOnline ? "Active now" : "Active 2h ago"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button><Phone className="w-6 h-6" /></button>
                <button><Video className="w-6 h-6" /></button>
                <button><Info className="w-6 h-6" /></button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              <div className="flex flex-col items-center mb-8 mt-4">
                <img src={selectedThread.user.avatar} alt="" className="w-24 h-24 rounded-full object-cover mb-3" />
                <p className="font-bold text-lg">{selectedThread.user.fullName}</p>
                <p className="text-sm text-muted-foreground">{selectedThread.user.username} · Instagram</p>
                <button className="text-sm text-muted-foreground bg-secondary px-4 py-1.5 rounded-lg mt-3">View profile</button>
              </div>
              {mockMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isMine ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[65%] px-4 py-2.5 rounded-3xl text-sm ${
                      msg.isMine
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-ig-separator">
              <div className="flex items-center gap-3 border border-ig-separator rounded-full px-4 py-2">
                <Smile className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm"
                />
                {messageText ? (
                  <button className="text-sm font-semibold text-primary">Send</button>
                ) : (
                  <div className="flex items-center gap-3">
                    <button><Image className="w-6 h-6 text-foreground" /></button>
                    <button><Heart className="w-6 h-6 text-foreground" /></button>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-24 h-24 border-2 border-foreground rounded-full flex items-center justify-center mb-4">
              <Send className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-normal mb-1">Your messages</h3>
            <p className="text-sm text-muted-foreground mb-5">Send a message to start a chat.</p>
            <button className="bg-primary text-primary-foreground text-sm font-semibold px-5 py-2 rounded-lg">
              Send message
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
