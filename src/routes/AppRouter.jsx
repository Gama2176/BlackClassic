import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/public/LandingPage";
import SeleccionarAcceso from "../pages/public/SeleccionarAcceso";
import Login from "../pages/admin/Login";


const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/acceso",
        element: <SeleccionarAcceso />,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

export default router;