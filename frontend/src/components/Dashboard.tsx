import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface DashboardStats {
  totalGuests: number;
  confirmedGuests: number;
  guestsWithCompanion: number;
  specialMenuCount: number;
  totalPeople: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalGuests: 0,
    confirmedGuests: 0,
    guestsWithCompanion: 0,
    specialMenuCount: 0,
    totalPeople: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/invitados');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleDownloadList = () => {
    window.open('http://localhost:3001/api/download-list', '_blank');
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Lato:wght@100;300;400;700&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous" />
      <link rel="stylesheet" type="text/css" media="screen" href="/stylesheets/dashboard.css" />

      <main>
        <div className="title">
          <h1>¡Hola<br /> Carol y Daniel</h1>
        </div>
        
        <div className="guest_counter">
          <p>Hasta el momento han Confirmado:</p>
          <div>
            <p className="guest_confirmed">{stats.confirmedGuests} invitados</p>
          </div>
        </div>
        
        <div className="guest_details">
          <div>
            <p className="number">{stats.guestsWithCompanion}</p>
            <p>De ellos llevan acompañante</p>
          </div>
          <div>
            <p className="number">{stats.specialMenuCount}</p>
            <p>Necesitan un<br />menú especial</p>
          </div>
        </div>
        
        <div className="guest_additional_info">
          <p className="number">{stats.totalPeople}</p>
          <p>Invitados en total</p>
        </div>
        
        <div className="button_container">
          <div className="download_container">
            <button className="descarga" onClick={handleDownloadList}>
              <img src="/images/btn-descarga.svg" height="15px" width="15px" alt="" />
              Descargar lista en excel
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;