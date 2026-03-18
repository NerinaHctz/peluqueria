import { NavLink } from 'react-router-dom'
import '../../styles/Header.css'

export default function Header() {
    return <header>
        <div className='container'>
            <div className='first-nav'>
                <div className='title'>
                    <h1>Nerina Castillo Styling</h1>
                </div>
                <div className='tel'>
                    <img src="/icono-llamada.png" alt="Icono llamanos" title="icono llamada" />
                    <a href="tel:9000000">900 00 00</a>
                </div>
            </div>
            <div className="nav-links">
                <NavLink to="/">Inicio</NavLink>
                <NavLink to="/Services">Servicios</NavLink>
                <NavLink to="/Gallery">Galería</NavLink>
                <NavLink to="/Contact">Contacto</NavLink>
            </div>
        </div>
    </header>
}