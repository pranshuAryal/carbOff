import { Outlet } from "react-router-dom";
import SideBar from "./sidebar";
import TopBar from "./topbar";

export default function MainLayout() {
  return (
    <div className="flex h-screen">
      <div className="w-64 h-full flex-shrink-0">
        <SideBar />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-16 flex-shrink-0">
          <TopBar />
        </div>
        <div className="flex-1 overflow-auto p-4 min-h-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
