import '../../styles/Home.css'

export default function Home() {
    return <div className="container home-page">
        <h1 className='title'>Descubre tu mejor versión en Nerina Castillo Styling</h1>
        <div className='info-section'>
            <h2 className="subtitle">Nosotros</h2>
            <div className='info-container contraria'>
                <img className="img-salon" src="/img-peluqueria.jpeg" alt="Imagen salón de peluquería" title="imagen peluqueria" />
                <p>En Nerina Castillo Styling contamos con un equipo de profesionales altamente cualificados, con una amplia trayectoria en el sector de la peluquería y el estilismo profesional. Nuestra experiencia nos permite ofrecer un servicio de excelencia, basado en la técnica, la creatividad y la atención al detalle.
                    <br />
                    <br />
                    Bajo el liderazgo de Nerina Castillo, hemos construido un espacio de referencia donde el conocimiento, la formación continua y la innovación son pilares fundamentales. Nuestro equipo se mantiene actualizado en las últimas tendencias en cortes de cabello, coloración, peinados y tratamientos capilares, garantizando resultados modernos y de alta calidad.
                    <br />
                    <br />
                    La satisfacción de nuestros clientes es nuestro principal compromiso. Trabajamos de manera personalizada, escuchando y asesorando a cada persona para lograr resultados que superen sus expectativas. La confianza que nuestros clientes depositan en nosotros es el reflejo de nuestro profesionalismo, dedicación y pasión por el estilismo.
                    <br />
                    <br />
                    En Nerina Castillo Styling no solo ofrecemos servicios de peluquería, ofrecemos experiencia, liderazgo y resultados que marcan la diferencia.
                </p>
            </div>
        </div>
        <div className='info-section belleza'>
            <h2 className="subtitle">Belleza natural, estilo único</h2>
            <div className='info-container'>
                <img src="/img-lavabo.jpeg" alt="Imagen lavado de cabeza" title="imagen lavabo" />
                <p>En Nerina Castillo Styling nos apasiona realzar tu belleza y estilo a través del cuidado profesional del cabello. Nuestro equipo de estilistas profesionales ofrece cortes de cabello, peinados modernos, coloraciones y tratamientos capilares personalizados, adaptados a cada persona y a cada estilo.
                    <br />
                    <br />
                    Creamos un espacio donde la calidad, la creatividad y el cuidado del cabello se unen para brindarte una experiencia única. Desde cortes clásicos hasta looks actuales y peinados para eventos especiales, cada servicio está pensado para resaltar tu personalidad y potenciar tu imagen.
                </p>
            </div>
        </div>
        <div className='info-section contraria'>
            <div className='info-container'>
                <p>En nuestra peluquería trabajamos con productos de alta calidad y técnicas innovadoras que protegen y fortalecen tu cabello. Nuestro trato cercano y profesional garantiza que cada visita sea un momento de bienestar, confianza y renovación.
                    <br />
                    <br />
                    Visítanos y descubre tu mejor versión en Nerina Castillo Styling, donde tu cabello es nuestra inspiración y tu estilo nuestra prioridad.
                </p>
                <img src="/img-productos.jpeg" alt="Imagen productos de peluquería de alta calidad" title="imagen productos" />
            </div>
        </div>

    </div>
}