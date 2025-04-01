import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/public/LandingPage";
import SeleccionarAcceso from "../pages/public/SeleccionarAcceso";
import Login from "../pages/admin/Login";
import Novedades from "../pages/public/Novedades";
import Encuentranos from "../pages/public/Encuentranos";
import Galeria from "../pages/public/Galeria";
import Mesas from "../pages/public/Mesas";
import DetallesReservas from "../pages/public/DetallesReservas";
import Recepcion from "../pages/admin/Recepcion";

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
        path: "/novedades",
        element: <Novedades />,
    },
    {
        path: "/encuentranos",
        element: <Encuentranos />,
    },
    {
        path: "/galeria",
        element: <Galeria />,
    },
    {
        path: "/mesas",
        element: <Mesas />,
    },
    {
        path: "/detalles-reserva/:id",
        element: <DetallesReservas />,
    },
    {
        path: "/recepcion",
        element: <Recepcion />,
    }

]);

export default router;