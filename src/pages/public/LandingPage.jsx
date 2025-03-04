import React from 'react';
import Navbar from '../../components/Navbar';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <section className="hero text-center py-3 mt-8 mb-8">
        <div className="container mx-auto px-4">
          <header className="hero-header mb-8">
            <div className="hero-image-container">
              <img 
                src="/src/assets/images/Black Classic.png" 
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
              <button className="px-6 py-2 bg-black text-white rounded-md">
                Reservar Ahora
              </button>
            </div>
          </div>

          <footer className="hero-footer mt-14 mb-12">
            <div className="footer-image-container">
              <img 
                src="/src/assets/images/gato-vino.png" 
                alt="Gato Vino" 
                className="w-40 mx-auto" 
              />
            </div>
          </footer>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
