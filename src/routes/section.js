import { Outlet, useRoutes } from "react-router-dom";
// import HomePage from "../page/Fantasy/Fantasy";
import LoginForm from "../page/Login/Login";
import RegisterForm from "../page/Register/Register";
import Recover from "../page/Recover/Recover";
import SeccessLogin from "../page/SeccessLogin/SeccessLogin";
import SeccessSignin from "../page/SeccessSignin/SeccessSignin";
import ScienceFiction from "../page/ScienceFiction/ScienceFiction";
import Romance from "../page/Romance/Romance";
import Mystery from "../page/Mystery/Mystery";
import Fantasy from "../page/Fantasy/Fantasy";
import Biography from "../page/Biography/Biography";
import SeftHelp from "../page/SeftHelp/SeftHelp";
import ChildrenBooks from "../page/ChildrenBooks/ChildrenBooks";
import History from "../page/History/History";
import Main from "../layouts/main/Main";
import HomePage from "../page/Home/HomePage";
import VerseBook from "../page/VerseBook/VerseBook";

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        // <Layout>
        <Main>
          <Outlet />
        </Main>
        // </Layout>
      ),
      children: [
        { path: "/", element: <HomePage />, index: true },
        { path: "/login", element: <LoginForm />, index: true },
        { path: "/register", element: <RegisterForm />, index: true },
        { path: "/recover", element: <Recover />, index: true },
        { path: "/seccesslogin", element: <SeccessLogin />, index: true },
        { path: "/seccesssignin", element: <SeccessSignin />, index: true },
        { path: "/sciencefiction", element: <ScienceFiction />, index: true },
        { path: "/romance", element: <Romance />, index: true },
        { path: "/mystery", element: <Mystery />, index: true },
        { path: "/fantasy", element: <Fantasy />, index: true },
        { path: "/biography", element: <Biography />, index: true },
        { path: "/history", element: <History />, index: true },
        { path: "/sefthelp", element: <SeftHelp />, index: true },
        { path: "/childbooks", element: <ChildrenBooks />, index: true },
        { path: "/versebook", element: <VerseBook />, index: true },
      ],
    },
  ]);
  return routes;
}
