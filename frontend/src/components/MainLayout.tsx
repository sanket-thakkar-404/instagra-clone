import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import MobileHeader from "@/components/MobileHeader";

const MainLayout = () => {
  const location = useLocation();
  const isMessagesPage = location.pathname === "/messages";

  return (
    <div className="min-h-screen bg-background ">
      <Sidebar />
      <MobileHeader />
      <main
        className={`transition-all  duration-300 pb-16 md:pb-0 ${
          isMessagesPage
            ? "md:ml-[70px]"
            : "md:ml-[72px] xl:ml-[245px]"
        }`}
      >
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default MainLayout;
