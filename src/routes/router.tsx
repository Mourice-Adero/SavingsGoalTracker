import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../layouts/DashboardLayout";
import Reports from "../pages/Reports";
import Receipts from "../pages/Receipts";
import Logout from "../components/LogoutModal";
export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "transactions", element: <Reports /> },
      { path: "receipts", element: <Receipts /> },
    ],
  },
  { path: "logout", element: <Logout /> },
  { path: "*", element: <div>404 Not Found</div> },
]);
