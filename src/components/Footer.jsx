const Footer = () => {
    return (
      <footer className="bg-black text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h4 className="text-lg font-semibold">Black Classic</h4>
          <p className="text-sm mt-1">© {new Date().getFullYear()} - Todos los derechos reservados</p>
          <p className="text-sm">Desarrollado por Cristian Avila</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  