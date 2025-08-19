import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ConfirmationPage from './components/ConfirmationPage';
import AlreadyConfirmedPage from './components/AlreadyConfirmedPage';
import ErrorPage from './components/ErrorPage';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/confirmado" element={<ConfirmationPage />} />
          <Route path="/ya-confirmado" element={<AlreadyConfirmedPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/invitados" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
