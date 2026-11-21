import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { LayoutDashboard, Tags, Users, Building2, Clapperboard, Film } from 'lucide-react';
import Home from './pages/Home';
import Generos from './pages/Generos';
import Directores from './pages/Directores';
import Productoras from './pages/Productoras';
import Tipos from './pages/Tipos';
import Media from './pages/Media';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <Film color="#38bdf8" size={28} />
            <span style={{ fontWeight: '600', letterSpacing: '0.5px' }}>CineAdmin</span>
          </Link>
          <div className="navbar-nav gap-2">
            <Link className="nav-link d-flex align-items-center gap-1" to="/"><LayoutDashboard size={18} /> Inicio</Link>
            <Link className="nav-link d-flex align-items-center gap-1" to="/generos"><Tags size={18} /> Géneros</Link>
            <Link className="nav-link d-flex align-items-center gap-1" to="/directores"><Users size={18} /> Directores</Link>
            <Link className="nav-link d-flex align-items-center gap-1" to="/productoras"><Building2 size={18} /> Productoras</Link>
            <Link className="nav-link d-flex align-items-center gap-1" to="/tipos"><Clapperboard size={18} /> Tipos</Link>
            <Link className="nav-link d-flex align-items-center gap-1" to="/media"><Film size={18} /> Media</Link>
          </div>
        </div>
      </nav>

      <div className="container-fluid px-4 py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generos" element={<Generos />} />
          <Route path="/directores" element={<Directores />} />
          <Route path="/productoras" element={<Productoras />} />
          <Route path="/tipos" element={<Tipos />} />
          <Route path="/media" element={<Media />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;