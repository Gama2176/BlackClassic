import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import IconFooterImg from '../../public/images/logo_footer.png'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#000000] to-[#000000] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 sm:gap-12">
        {/* Columna 1 - Branding */}
        <div className="flex flex-col text-left items-start">
          <img
            src={IconFooterImg}
            alt="BlackClassic-Logo"
            className="w-48 h-auto mb-6 object-contain"
          />
          <p className="text-sm text-gray-300 mb-6">
          Black Classic no es un destino, es una promesa: la elegancia, como un buen whisky, nunca envejece, solo se perfecciona.
          </p>
          <div className="flex mt-4 space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <Facebook className="h-6 w-6 text-gray-300 hover:text-blue-600" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <Instagram className="h-6 w-6 text-gray-300 hover:text-pink-600" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <Twitter className="h-6 w-6 text-gray-300 hover:text-blue-400" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <Youtube className="h-6 w-6 text-gray-300 hover:text-red-600" />
            </a>
          </div>
        </div>

        {/* Columna 2 - Soluciones */}
        <div className="text-left">
          <h3 className="text-lg font-semibold text-white tracking-wider mb-4">Nosotros</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Inicio
              </a>
            </li>
            <li>
              <a href="#Novedades" className="hover:text-white transition-colors">
                Novedades
              </a>
            </li>
            <li>
              <a href="#Encuentranos" className="hover:text-white transition-colors">
                Encuentranos
              </a>
            </li>
            <li>
              <a href="#Galeria" className="hover:text-white transition-colors">
                Galería
              </a>
            </li>
          </ul>
        </div>

        {/* Columna 3 - Soporte */}
        <div className="text-left">
          <h3 className="text-lg font-semibold text-white tracking-wider mb-4">Soporte</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li>
              <a href="" className="hover:text-white transition-colors">
                Contacto +52 961 456 7788
              </a>
            </li>
            <li>
              <a href="https://api.whatsapp.com/send?phone=525535209725" className="hover:text-white transition-colors">
                WhatsApp
              </a>
            </li>
            <li>
              <a href="tel:+52-55-3520-9725" className="hover:text-white transition-colors">
                Llamada
              </a>
            </li>
          </ul>
        </div>

        {/* Columna 4 - Legal */}
        <div className="text-left">
          <h3 className="text-lg font-semibold text-white tracking-wider mb-4">Legal</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li>
              <a href="/" className="hover:text-white transition-colors">
                Términos y condiciones
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white transition-colors">
                Política de privacidad
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white transition-colors">
                Aviso legal
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Inferior */}
      <div className="mt-16 flex flex-col items-center">
        <p className="text-sm text-gray-400">
          BlackClassic. © todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
