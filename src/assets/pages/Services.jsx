import '../../styles/Services.css'
import { Link } from 'react-router-dom'

export default function Services() {
    return <div className='container servicios-page'>
        <div className="cortes-section">
            <h2>Cortes y peinados</h2>
            <div className='info-section'>
                <img className='img-corte' src="/img-corte.png" alt="Hombre con el cabello corto" title='imagen corte' />
                <div className="container">
                    <table>
                        <thead>
                            <tr>
                                <th>Servicio</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Corte mujer</td>
                                <td>25€</td>
                            </tr>
                            <tr>
                                <td>Corte hombre</td>
                                <td>18€</td>
                            </tr>
                            <tr>
                                <td>Corte infantil</td>
                                <td>15€</td>
                            </tr>
                            <tr>
                                <td>Lavado y peinado</td>
                                <td>20€</td>
                            </tr>
                            <tr>
                                <td>Peinado para evento</td>
                                <td>35€</td>
                            </tr>
                            <tr>
                                <td>Recogido</td>
                                <td>45€</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div className="color-section">
            <h2>Coloración</h2>
            <div className='info-section'>
                <img className='img-mechas' src="/img-mechas.png" alt="Mujer con melena rubia de mechas" title='imagen mechas' />
                <div className="container">
                    <table>
                        <thead>
                            <tr>
                                <th>Servicio</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Tinte raíz</td>
                                <td>30€</td>
                            </tr>
                            <tr>
                                <td>Tinte completo</td>
                                <td>45€</td>
                            </tr>
                            <tr>
                                <td>Mechas clásicas</td>
                                <td>55€</td>
                            </tr>
                            <tr>
                                <td>Balayage</td>
                                <td>75€</td>
                            </tr>
                            <tr>
                                <td>Matiz / Baño de color</td>
                                <td>25€</td>
                            </tr>
                            <tr>
                                <td>Decoloración / Fantasía</td>
                                <td>Desde 100€
                                    <p className='legal'>*Preguntar en salón</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div className="color-section">
            <h2>Tratamientos Capilares</h2>
            <div className='info-section'>
                <img src="/img-lavabo.jpeg" alt="Lavado de cabeza" title='imagen lavabo' />
                <div className="container">
                    <table>
                        <thead>
                            <tr>
                                <th>Servicio</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Hidratación profunda</td>
                                <td>25€</td>
                            </tr>
                            <tr>
                                <td>Tratamiento nutritivo</td>
                                <td>30€</td>
                            </tr>
                            <tr>
                                <td>Tratamiento reparador</td>
                                <td>35€</td>
                            </tr>
                            <tr>
                                <td>Tratamiento antiencrespamiento</td>
                                <td>60€</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div className="color-section">
            <h2>Otros Servicios</h2>
            <div className='info-section'>
                <img className='img-flequillo' src="/img-flequillo.png" alt="Mujer con melena larga flequillo" title='imagen flequillo' />
                <div className="container">
                    <table>
                        <thead>
                            <tr>
                                <th>Servicio</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Corte de flequillo</td>
                                <td>8€</td>
                            </tr>
                            <tr>
                                <td>Lavado</td>
                                <td>6€</td>
                            </tr>
                            <tr>
                                <td>Tinte cejas</td>
                                <td>10€</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div className="booking-section">
            <h2>¿Listo para tu próximo look?</h2>
            <p>Reserva tu cita ahora y déjanos cuidar de tu cabello.</p>
            <Link to="/Booking" className="booking-btn">Reservar Cita</Link>
        </div>
    </div>

}