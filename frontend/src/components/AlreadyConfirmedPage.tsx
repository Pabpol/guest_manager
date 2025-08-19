import React from 'react';
import { Link } from 'react-router-dom';

const AlreadyConfirmedPage: React.FC = () => {
  return (
    <div>
      <link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/style.css" />
      
      <main className="fondo-error">
        <div className="hoja-superior">
          <img src="/images/hoja-superior.png" alt="" />
        </div>

        <div className="caja-error">
          <div className="textos-error">
            <h1>Ya estás registrado</h1>
            <p>El mail que ingresaste ya se encuentra registrado. Te recomendamos que revises tu bandeja de entrada.</p>
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

export default AlreadyConfirmedPage;