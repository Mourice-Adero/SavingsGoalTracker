import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

function Dashboard() {
  return (
    <div className="h-screen">
      <header className="h-14 bg-black/60">Header</header>
      <div className="flex">
        <aside className="w-1/6">
          <Sidebar />
        </aside>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
