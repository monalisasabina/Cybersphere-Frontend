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
import RequireAdmin from "./Components/RequireAdmin";
import AdminApp from "./Components/AdminApp";
import DisplayUsers from "./pages/Users";

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
            path: "/login",
            element: <LogIn/>,
        },
        {
            path: "/forgotpassword",
            element: <ForgotPassword/>
        },
        {
            path: "/resetpassword",
            element: <ResetPassword />
        }
      ]
    },

    {
        path: "/dashboard",
        element: (
            <RequireAdmin>
                  <AdminApp/>
            </RequireAdmin>
        ),
        children: [
            {
                path: "",
                element: <Dashboard />
            },
            {
                path: "signup",
                element: <SignUp />
            },
            {
                path: "users",
                element: <DisplayUsers/>
            }

        ],
    },
];

export default routes;