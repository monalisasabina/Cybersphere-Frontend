import App from "./App";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import About from "./pages/About";
import SignUp from "./pages/SignUpPage"
import LogIn from "./pages/LoginPage";
import Dashboard from "./pages/DashboardPage";
import Logout from "./Components/ForgotPassword";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";

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
            path: "/forgotpassword",
            element: <ForgotPassword/>
        },
        {
            path: "/dashboard",
            element: <Dashboard/>,
        },
        {
            path: "/resetpassword",
            element: <ResetPassword />
        }

        
      ]
    }
]

export default routes;