// Modal.js
import React from 'react';
import './terminos.css'; // Create this CSS file for styles

const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="terminos" onClick={onClose}>
            <div className="modal-term" onClick={(e) => e.stopPropagation()}>
                <h2>Términos y Condiciones de D'SYSTEM BLOG</h2>
                <div className='txt-term'>
                    <h3 className='uno'>1. Introducción</h3>
                    <p>Bienvenido a D'SYSTEM BLOG, una mini red social dedicada a los estudiantes y profesionales de la carrera de
                        Desarrollo de Sistemas de Información en el Instituto de Educación Superior Tecnológico Público 'Suiza'.
                        Al utilizar nuestro sitio web, aceptas cumplir y estar sujeto a los siguientes términos y condiciones.
                        Si no estás de acuerdo con estos términos, te pedimos que no utilices nuestro sitio.
                    </p>

                    <h3>2. Registro Y Cuenta</h3>
                    <p>2.1 Para utilizar algunas partes de nuestro sitio web, es posible que necesites registrarte y crear una cuenta.
                        Debes proporcionar información precisa y completa durante el proceso de registro. <br /> 2.2 Eres responsable de mantener
                        la confidencialidad de tu cuenta y contraseña, y aceptas notificar de inmediato a D'SYSTEM BLOG sobre cualquier uso no autorizado de tu cuenta.
                    </p>
                    <h3>3. Uso Aceptable</h3>
                    <p>3.1 Puedes publicar contenido relevante a la carrera de Desarrollo de Sistemas de Información, incluyendo actividades,
                        noticias, proyectos y otros temas relacionados. <br />
                        3.2 No debes publicar contenido que sea ofensivo, difamatorio, discriminatorio, ilegal o que infrinja los derechos de terceros. <br />
                        3.3 Está prohibido el uso de D'SYSTEM BLOG para cualquier propósito comercial no autorizado o para enviar spam.
                    </p>
                    <h3>5. Propiedad Intelectual</h3>
                    <p>4.1 Todo el contenido publicado en D'SYSTEM BLOG, incluidas las publicaciones de los usuarios, está protegido por derechos de autor
                        y otras leyes de propiedad intelectual. <br />
                        4.2 Al publicar contenido en D'SYSTEM BLOG, otorgas a D'SYSTEM BLOG una licencia no exclusiva, mundial, libre de regalías y
                        transferible para usar, reproducir, distribuir, y mostrar dicho contenido en relación con el funcionamiento del sitio.
                    </p>
                    <h3>5. Privacidad</h3>
                    <p>5.1 Nos comprometemos a proteger tu privacidad y a manejar tu información personal de acuerdo con nuestra Política de Privacidad.</p>
                    <h3>6. Limitaciones de Responsalbilidad</h3>
                    <p>6.1 D'SYSTEM BLOG no se hace responsable de ningún daño directo, indirecto, incidental, especial o consecuente que resulte del uso o la imposibilidad de uso del sitio.</p>
                    <h3>7. Modificaciones de los Términos</h3>
                    <p>7.1 D'SYSTEM BLOG se reserva el derecho de modificar estos términos en cualquier momento. Cualquier cambio será efectivo
                        inmediatamente después de su publicación en el sitio. <br />
                        7.2 Es tu responsabilidad revisar estos términos periódicamente. El uso continuado del sitio después de cualquier
                        modificación constituye tu aceptación de los nuevos términos.
                    </p>
                    <h3>8. Terminación</h3>
                    <p>8.1 D'SYSTEM BLOG se reserva el derecho de suspender o terminar tu acceso al sitio en cualquier momento, sin previo aviso, si violas estos términos.  </p>
                    <h3>9. Contacto</h3>
                    <p>9.1 Si tienes alguna pregunta o inquietud sobre estos términos y condiciones, por favor, contáctanos a través de nuestra página de contacto.
                    </p>
                </div>
                <div className="button">
                    <button onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;