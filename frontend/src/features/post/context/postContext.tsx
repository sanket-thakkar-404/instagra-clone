import { createContext, useState } from "react";

export const PostContext = createContext(null);

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allUserPost , setAllUserPost] = useState([])

  return (
    <PostContext.Provider value={{ posts, setPosts, loading, setLoading,allUserPost , setAllUserPost }}>
      {children}
    </PostContext.Provider>
  );
};