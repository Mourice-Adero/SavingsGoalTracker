import { NavLink } from "react-router";

function Sidebar() {
  return (
    <aside>
      <nav>
        <ul className="flex flex-col gap-4 p-4">
          <li className="p-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "border-l-2 border-[#eba10f] pl-2" : ""
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink
              className={({ isActive }) =>
                isActive ? "border-l-2 border-[#eba10f] pl-2" : ""
              }
              to="/dashboard/transactions"
            >
              Transactions
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink
              className={({ isActive }) =>
                isActive ? "border-l-2 border-[#eba10f] pl-2" : ""
              }
              to="/dashboard/receipts"
            >
              Receipts
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
