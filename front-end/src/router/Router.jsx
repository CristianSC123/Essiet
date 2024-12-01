import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login/Login";
import Dashboard from "../components/Dashboard/Dashboard";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default Router;
