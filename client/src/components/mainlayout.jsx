import { Outlet } from "react-router-dom";
import SideBar from "./sidebar";
import TopBar from "./topbar";

export default function MainLayout() {
  return (
    <div className="flex h-screen">
      
      <div className="flex-1 w-screen flex flex-col">
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
