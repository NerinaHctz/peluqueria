import '../../styles/Gallery.css'

export default function Gallery() {
    return <div className="container gallery-page">
        <h2>Aquí puedes ver algunos de nuestros trabajos</h2>
        <p>Cada imagen refleja nuestro compromiso con la creatividad, la calidad y tu estilo personal</p>
        <div className="img-container">
            <img className='img-mechas' src="/img-mechas.png" alt="Mujer con melena rubia de mechas" title='imagen mechas' />
            <img className='img-flequillo' src="/img-flequillo.png" alt="Mujer con melena larga flequillo" title='imagen flequillo' />
            <img className='img-corte' src="/img-corte.png" alt="Hombre con el cabello corto" title='imagen corte' />
            <img className='img-tinte' src="/img-tinte.png" alt="Mujer con media melena castaña" title='imagen tinte' />
            <img className='img-recogido' src="/img-recogido.png" alt="Mujer con el cabello recogido" title='imagen recogido' />
        </div>
    </div>
}