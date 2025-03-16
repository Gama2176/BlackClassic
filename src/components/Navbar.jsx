import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-center space-x-6 py-4 mt-4">
      <Link to="/" className="text-gray-600 hover:text-black">Inicio</Link>
      <Link to="/novedades" className="text-gray-600 hover:text-black">Novedades</Link>
      <Link to="/encuentranos" className="text-gray-600 hover:text-black">Encuéntranos</Link>
      <Link to="/galeria" className="text-gray-600 hover:text-black">Galería</Link>
    </nav>
  );
};

export default Navbar;
