import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import Logo from '../../../public/images/Black_Classic.png';
import GatoVinoImg from '../../../public/images/gato-vino.png';


const LandingPage = () => {
  return (
    <>
      <Navbar />
        <section className="hero text-center py-3 mt-4 mb-8">
          <div className="container mx-auto px-4">
            <header className="hero-header mb-8">
              <div className="hero-image-container">
                <img 
                  src={Logo} 
                  alt="Black Classic" 
                  className="mx-auto w-96" 
                />
              </div>
            </header>

            <article className="hero-description mb-6">
              <div className="description-container max-w-lg mx-auto">
                <p className="text-gray-500">
                  Black Classic no es un destino, es una promesa: la elegancia, como un buen whisky, nunca envejece, solo se perfecciona.
                </p>
              </div>
            </article>

            <div className="hero-action mb-6">
              <div className="button-container">
                <Link to="/acceso"  className="px-6 py-2 bg-black text-white rounded-md">
                  Reservar mesa
                </Link>
              </div>
            </div>

            <div className="hero-footer mt-14 mb-12">
              <div className="footer-image-container">
                <img 
                  src={GatoVinoImg}
                  alt="Gato Vino" 
                  className="w-40 mx-auto" 
                />
              </div>
            </div>
          </div>
        </section>
      <Footer/>
    </>
  );
};

export default LandingPage;
