import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmationPage: React.FC = () => {
  return (
    <div>
      <link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/style.css" />
      
      <main className="fondo-confirmado">
        <div className="hoja-superior-confirmado">
          <img src="/images/hoja-superior-confirmado.png" alt="" />
        </div>

        <div className="caja-confirmado">
          <div className="textos-error">
            <h1>¡Confirmadísimo!</h1>
            <p>Muchas gracias por confirmar tu asistencia, estamos muy felices de compartir este día contigo.</p>
            <Link to="/">
              <button className="boton-volver">Volver al menú</button>
            </Link>
          </div>
        </div>

        <div className="hoja-inferior-confirmado">
          <img src="/images/hoja-inferior-confirmado.png" alt="" />
        </div>
      </main>
    </div>
  );
};

export default ConfirmationPage;