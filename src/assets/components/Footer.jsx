import '../../styles/Footer.css'

export default function Footer() {
    return <footer>
        <div className='container'>
            <h2>Contáctanos aquí</h2>
            <div className="nav-links">
                <a href="https://www.instagram.com/nerinacastillostyling/">
                    <img src="/icono-instagram.png" alt="Icono Instagram" title="icono instagram" />
                </a>
                <a href="https://www.facebook.com/share/1AAvKKZhfS/">
                    <img src="/icono-facebook.png" alt="Icono Facebook" title="icono facebook" />
                </a>
                <a href="mailto:nerinacastillostyling@gmail.com">
                    <img src="/icono-email.png" alt="Icono Email" title="icono email" />
                </a>
            </div>
        </div>
    </footer>

}