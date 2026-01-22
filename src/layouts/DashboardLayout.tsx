import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import { RiLogoutBoxRLine } from "react-icons/ri";

function Dashboard() {
  return (
    <div className="h-screen">
      <header className="h-20 flex items-center justify-between px-4 border-b bg-[url('header.png')] bg-cover bg-center text-white">
        <h1 className="font-semibold text-3xl">
          Inua Mkulima Subsidiary Program
        </h1>
        <div className="flex gap-3 items-center">
          <p>Logged in as: Name</p>
          <button className="bg-white/50 p-1 border border-white rounded">
            <RiLogoutBoxRLine className="inline-block" />
            Logout
          </button>
        </div>
      </header>
      <div className="flex">
        <aside className="w-1/6">
          <Sidebar />
        </aside>
        <div className="flex-1 bg-[#F7F7F7] h-100 pt-8 pl-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
