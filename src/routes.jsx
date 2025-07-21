import App from "./App";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import About from "./pages/About";
import SignUp from "./pages/SignUpPage"
import LogIn from "./pages/LoginPage";
import Dashboard from "./pages/DashboardPage";
import Logout from "./pages/logout";

const routes = [
    {
      path: "/",
      element:<App />,
      errorElement:<ErrorPage/>,
      children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/about",
            element: <About/>,
        },
        {
            path: "/signup",
            element: <SignUp/>,
        },
        {
            path: "/login",
            element: <LogIn/>,
        },
        {
            path: "/logout",
            element: <Logout/>
        },
        {
            path: "/dashboard",
            element: <Dashboard/>,
        },

        
      ]
    }
]

export default routes;