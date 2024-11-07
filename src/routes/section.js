import { Outlet, useRoutes } from "react-router-dom";
// import Layout from "../layouts/index";
import HomePage from "../page/Home/HomePage";
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";
import Recover from "../page/recover";
import SeccessLogin from "../page/seccess_login";
import SeccessSignin from "../page/seccess_signin";
export default function Router() {
  const routes = useRoutes([
    {
      element: (
        // <Layout>
        <Outlet />
        // </Layout>
      ),
      children: [
        { path: "/", element: <HomePage />, index: true },
        { path: "/login", element: <Login />, index: true },
        { path: "/register", element: <Register />, index: true },
        { path: "/recover", element: <Recover />, index: true },
        { path: "/Seccess_Login", element: <SeccessLogin />, index: true },
        { path: "/Seccess_Signin", element: <SeccessSignin />, index: true },
      ],
    },
  ]);
  return routes;
}
