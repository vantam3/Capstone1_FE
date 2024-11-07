import { Outlet, useRoutes } from "react-router-dom";
// import Layout from "../layouts/index";
import HomePage from "../page/HomePage";
import Login from "../page/Login";
import RegisterForm from "../page/register";
import Recover from "../page/recover";
import Seccess_Login from "../page/seccess_login";
import Seccess_Signin from "../page/seccess_signin";
export default function Router() {
  const routes = useRoutes([
    {
      element: (
        // <Layout>
        <Outlet />
        // </Layout>
      ),
      children: [
        { path: "/HomePage", element: <HomePage />, index: true },
        { path: "/login", element: <Login />, index: true },
        { path: "/register", element: <RegisterForm />, index: true },
        { path: "/recover", element: <Recover />, index: true },
        { path: "/Seccess_Login", element: <Seccess_Login />, index: true },
        { path: "/Seccess_Signin", element: <Seccess_Signin/>, index: true },
      ],
    },
  ]);
  return routes;
}