import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  return (
    <div>
      <link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/style.css" />
      
      <main className="fondo-error">
        <div className="hoja-superior">
          <img src="/images/hoja-superior.png" alt="" />
        </div>

        <div className="caja-error">
          <div className="textos-error">
            <h1>¡Ups! Algo salió mal</h1>
            <p>No hemos podido registrar tu información, por favor vuelve a intentarlo.</p>
            <Link to="/">
              <button className="boton-volver">Volver al menú</button>
            </Link>
          </div>
        </div>

        <div className="hoja-inferior">
          <img src="/images/hoja-inferior.png" alt="" />
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;