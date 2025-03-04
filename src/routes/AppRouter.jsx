import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/public/LandingPage";
import SeleccionarAcceso from "../pages/public/SeleccionarAcceso";
import Login from "../pages/admin/Login";
import Novedades from "../pages/public/Novedades";
import Encuentranos from "../pages/public/Encuentranos";
import Galeria from "../pages/public/Galeria";

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
    {
        path: "/Novedades",
        element: <Novedades />,
    },
    {
        path: "/Encuentranos",
        element: <Encuentranos />,
    },
    {
        path: "/Galeria",
        element: <Galeria />,
    },
]);

export default router;