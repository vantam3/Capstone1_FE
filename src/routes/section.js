import { Outlet, useRoutes } from "react-router-dom";
// import Layout from "../layouts/index";
import HomePage from "../page/HomePage";
import Login from "../page/Login";
import RegisterForm from "../page/register";
import Recover from "../page/recover";
import Seccess_Login from "../page/seccess_login";
import Seccess_Signin from "../page/seccess_signin";
import Science_Fiction from "../page/Science_Fiction";
import Romance from "../page/Romance";
import Mystery from "../page/Mystery";
import Fantasy from "../page/Fantasy";
import Biography from "../page/Biography";
import History from "../page/History";
import Seft_Help from "../page/Seft-Help";
import ChildBooks from "../page/Children’s_Books";


export default function Router() {
  const routes = useRoutes([
    {
      element: (
        // <Layout>
        <Outlet />
        // </Layout>
      ),
      children: [
        { path: "/homepage", element: <HomePage />, index: true },
        { path: "/login", element: <Login />, index: true },
        { path: "/register", element: <RegisterForm />, index: true },
        { path: "/recover", element: <Recover />, index: true },
        { path: "/seccesslogin", element: <Seccess_Login />, index: true },
        { path: "/seccesssignin", element: <Seccess_Signin />, index: true },
        { path: "/sciencefiction", element: <Science_Fiction />, index: true },
        { path: "/romance", element: <Romance />, index: true },
        { path: "/mystery", element: <Mystery />, index: true },
        { path: "/fantasy", element: <Fantasy />, index: true },
        { path: "/biography", element: <Biography />, index: true },
        { path: "/history", element: <History />, index: true },
        { path: "/sefthelp", element: <Seft_Help />, index: true },
        { path: "/childbooks", element: <ChildBooks />, index: true },
        
      ],
    },
  ]);
  return routes;
}
