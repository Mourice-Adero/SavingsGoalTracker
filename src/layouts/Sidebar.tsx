import { NavLink } from "react-router";

function Sidebar() {
  return (
    <aside>
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/transactions">Transactions</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/receipts">Receipts</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
