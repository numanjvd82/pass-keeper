import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Toaster } from "./toaster";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-2">
        <Toaster />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
