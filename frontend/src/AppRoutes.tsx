import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./features/auth/hooks/useAuth";
import MainLayout from "./components/MainLayout";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import ReelsPage from "./pages/ReelsPage";
import MessagesPage from "./pages/MessagesPage";
import SearchPage from "./pages/SearchPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import { useEffect } from "react";
import CreatePostPage from "./pages/CreatePostPage";
import { PostProvider } from "./features/post/context/postContext";
import NotFound from "./pages/NotFound";
import UserProfilePage from "./pages/UserProfilePage";

const AppRoutes = () => {
  const { loading, user, checkAuth} = useAuth();
  useEffect(()=>{
    checkAuth()
  },[])

  if (loading) {
    return <h2>Checking...</h2>;
  }
  return (
    <Routes>
        <>
          <Route element={user ? <PostProvider><MainLayout /></PostProvider> : <Login/>}>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/posts" element={<ReelsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/user/:username" element={<UserProfilePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={!user ? <Login/> : <Navigate to="/" /> } />
          <Route path="/register" element={!user ? <Register/> : <Navigate to="/" /> } />

       
        </>
    </Routes>
  );
};

export default AppRoutes;