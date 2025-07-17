import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './routes.jsx'
import ReactDOM from "react-dom/client"

const router = createBrowserRouter(routes, {
    future: {
         v7_startTransition: true,
         v7_relativeSplatPath: true,
    }
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);