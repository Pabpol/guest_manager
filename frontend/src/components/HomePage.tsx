import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface GuestFormData {
  nombre: string;
  apellido: string;
  menu: string;
  tieneAcompanante: boolean;
  nombreAcompnanante: string;
  apellidoAcompanante: string;
  menuAcompanante: string;
  mail: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<GuestFormData>({
    nombre: '',
    apellido: '',
    menu: '',
    tieneAcompanante: false,
    nombreAcompnanante: '',
    apellidoAcompanante: '',
    menuAcompanante: '',
    mail: '',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/form', formData);
      if (response.data.success) {
        navigate(response.data.redirect);
      }
    } catch (error) {
      navigate('/error');
    }
  };

  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Lato:wght@100;300;400;700&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" 
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous" />
      <link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/style.css" />

      <main className="fondo-home">
        <div className="hoja-superior">
          <img src="/images/hoja-superior.png" alt="" />
        </div>

        <div className="invitacion-home">
          <div className="novios">
            <h1>Carol & Daniel</h1>
          </div>
          <div className="fecha">
            <p>24 de Junio del 2023</p>
            <p>Quinta Valle Antilen</p>
          </div>
          <div className="hojas-left">
            <img src="/images/hojas-left.png" alt="" />
          </div>
          <div className="hojas-right">
            <img src="/images/hojas-right.png" alt="" />
          </div>
        </div>

        <div className="hoja-inferior">
          <img src="/images/hoja-inferior.png" alt="" />
        </div>
      </main>

      <nav className="nav-bottom">
        <div className="menu-container">
          <div className="menu-boton">
            <input type="checkbox" id="btnCodigo" />
            <label className="btn" htmlFor="btnCodigo">
              <img id="icono-regalo" src="/images/regalo.png" alt="" />
            </label>
            <p>Código<br /> Novios</p>
          </div>
          <div className="menu-boton" id="confirmar">
            <input type="checkbox" id="btnConfirmar" onChange={() => setIsFormOpen(true)} />
            <label className="btn" htmlFor="btnConfirmar">
              <img src="/images/confirmar.png" alt="" />
            </label>
            <p>¡Confirma<br /> aquí!</p>
          </div>
        </div>
      </nav>

      {/* Form Modal */}
      {isFormOpen && (
        <div id="simpleForm" className="form-overlay">
          <div className="form-content">
            <div className="form-header">
              <div className="form-title"></div>
              <img className="closeBtnForm" src="/images/cerrar.png" alt="" 
                onClick={() => setIsFormOpen(false)} />
            </div>
            <div className="form-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Nombre:</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Apellido:</label>
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="mail"
                    value={formData.mail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Menú:</label>
                  <select name="menu" value={formData.menu} onChange={handleInputChange}>
                    <option value="">Seleccionar</option>
                    <option value="normal">Normal</option>
                    <option value="vegetariano">Vegetariano</option>
                    <option value="vegano">Vegano</option>
                    <option value="celiaco">Celíaco</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      name="tieneAcompanante"
                      checked={formData.tieneAcompanante}
                      onChange={handleInputChange}
                    />
                    ¿Tienes acompañante?
                  </label>
                </div>
                {formData.tieneAcompanante && (
                  <>
                    <div className="form-group">
                      <label>Nombre Acompañante:</label>
                      <input
                        type="text"
                        name="nombreAcompnanante"
                        value={formData.nombreAcompnanante}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Apellido Acompañante:</label>
                      <input
                        type="text"
                        name="apellidoAcompanante"
                        value={formData.apellidoAcompanante}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Menú Acompañante:</label>
                      <select name="menuAcompanante" value={formData.menuAcompanante} onChange={handleInputChange}>
                        <option value="">Seleccionar</option>
                        <option value="normal">Normal</option>
                        <option value="vegetariano">Vegetariano</option>
                        <option value="vegano">Vegano</option>
                        <option value="celiaco">Celíaco</option>
                      </select>
                    </div>
                  </>
                )}
                <button type="submit">Confirmar</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;