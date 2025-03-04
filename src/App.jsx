import React from 'react';
import LandingPage from './pages/public/LandingPage';
import Encuentranos from "./pages/Encuentranos"
import Galeria from "./pages/Galeria";

const App = () => {
  return (
    <>
    <LandingPage />
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/novedades" element={<Novedades />} />
        <Route path="/encuentranos" element={<Encuentranos />} />
        <Route path="/galeria" element={<Galeria />} />
      </Routes>
      <Footer />
    </Router>
    </>
  );
};

export default App;