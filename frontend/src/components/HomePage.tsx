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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '' });

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

  const openModal = (type: string) => {
    let title = '';
    let body = '';
    
    switch(type) {
      case 'ceremony':
        title = '¡Agenda el día!';
        body = `
          <p>Te invitamos a acompañarnos en nuestra ceremonia el día 24 de junio de 2023 a las 18:30 hrs en la Quinta Valle Antilén:</p>
          <h2>Dirección</h2>
          <div class="direccion"><img src="/images/map_pin.svg"><p>Quinta Valle Antilén</p></div>
        `;
        break;
      case 'party':
        title = '¡Vamos a celebrar!';
        body = `
          <p>Después de la ceremonia los esperamos para disfrutar una rica cena en la Quinta Valle Antilén a las 20:00 hrs.</p>
          <h2>Dirección</h2>
          <div class="direccion"><img src="/images/map_pin.svg"><p>Quinta Valle Antilén</p></div>
        `;
        break;
      case 'code':
        title = 'Código Novios';
        body = `
          <p>Si quieres dejarnos un regalito o compras regularmente en tiendas Paris te invitamos a dejar nuestro código de novios:</p>
          <a class="btn-transparente"><button class="ripple">4911261</button></a>
          <p>Puedes utilizarlo en cualquier tienda de Chile</p>
        `;
        break;
    }
    
    setModalContent({ title, body });
    setIsModalOpen(true);
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
            <label className="btn" htmlFor="btnCodigo" onClick={() => openModal('code')}>
              <img id="icono-regalo" src="/images/regalo.png" alt="" />
            </label>
            <p>Código<br /> Novios</p>
          </div>
          <div className="menu-boton" id="confirmar">
            <input type="checkbox" id="btnConfirmar" />
            <label className="btn" htmlFor="btnConfirmar" onClick={() => setIsFormOpen(true)}>
              <img src="/images/confirmar.png" alt="" />
            </label>
            <p>¡Confirma<br /> aquí!</p>
          </div>
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div id="simpleModal" className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <h1 dangerouslySetInnerHTML={{ __html: modalContent.title }} />
              </div>
              <img className="closeBtn" src="/images/cerrar.png" alt="" 
                onClick={() => setIsModalOpen(false)} />
            </div>
            <div className="modal-body" dangerouslySetInnerHTML={{ __html: modalContent.body }}>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <div id="simpleForm" className="form-overlay">
          <div className="form-content">
            <div className="form-header">
              <div className="form-title">
                <h1>Confirma <br /> tu asistencia</h1>
                <p>llenando el siguiente formulario.</p>
              </div>
              <img className="closeBtnForm" src="/images/cerrar.png" alt="" 
                onClick={() => setIsFormOpen(false)} />
            </div>
            <div className="form-body">
              <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Nombre:</label>
                  <input
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Ingresa tu nombre aquí..."
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Apellido:</label>
                  <input
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    placeholder="Ingresa tu apellido aquí..."
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                  <input
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    type="email"
                    name="mail"
                    value={formData.mail}
                    onChange={handleInputChange}
                    placeholder="Ingresa tu email aquí..."
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>¿Necesitas un menú especial?</label>
                  <select name="menu" value={formData.menu} onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}>
                    <option value="">No</option>
                    <option value="vegetariano">Vegetariano</option>
                    <option value="Sin gluten">Sin gluten</option>
                    <option value="Sin azucar">Sin azúcar</option>
                    <option value="Sin Lacteos">Sin Lacteos</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <input
                      type="checkbox"
                      name="tieneAcompanante"
                      checked={formData.tieneAcompanante}
                      onChange={handleInputChange}
                      style={{ marginRight: '8px' }}
                    />
                    ¿Tienes acompañante?
                  </label>
                </div>
                {formData.tieneAcompanante && (
                  <>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px' }}>Nombre Acompañante:</label>
                      <input
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                        type="text"
                        name="nombreAcompnanante"
                        value={formData.nombreAcompnanante}
                        onChange={handleInputChange}
                        placeholder="Ingresa su nombre aquí..."
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px' }}>Apellido Acompañante:</label>
                      <input
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                        type="text"
                        name="apellidoAcompanante"
                        value={formData.apellidoAcompanante}
                        onChange={handleInputChange}
                        placeholder="Ingresa su apellido aquí..."
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px' }}>¿Menú especial para acompañante?</label>
                      <select name="menuAcompanante" value={formData.menuAcompanante} onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}>
                        <option value="">No</option>
                        <option value="vegetariano">Vegetariano</option>
                        <option value="Sin gluten">Sin gluten</option>
                        <option value="Sin azucar">Sin azúcar</option>
                        <option value="Sin Lacteos">Sin Lacteos</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                  </>
                )}
                <button type="submit" style={{ 
                  width: '100%', 
                  padding: '12px', 
                  backgroundColor: '#4CAF50', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}>
                  Confirmar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;