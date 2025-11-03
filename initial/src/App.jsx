import '/src/static/Tailwind.css'
import Base from './features/login/Base'
import { useState } from 'react';
import { Route, Routes, Navigate, Link } from 'react-router-dom';
import UsersPage from './features/usuario/UsersPage';
import AgendaPage from './features/agenda/AgendaPage';
import PacientPage from './features/paciente/PacientPage';
import TerapiasPage from './features/terapias/TerapiasPage';
import CasosPage from './features/casos/CasosPage';
import TestPage from './features/pruebas/TestPage';
import AppLayout  from './layout/AppLayout';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));
  
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  }

  const handleLogOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  return (
    <Routes>
      <Route element={<AppLayout handleLogOut={handleLogOut} isAuthenticated={isAuthenticated} />}>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Base onLoginSuccess={handleLoginSuccess} />} />
        <Route path='/registro' element={isAuthenticated ? <AgendaPage /> : <Base onLoginSuccess={handleLoginSuccess}/>}/>
        <Route path='/' element={isAuthenticated ? <AgendaPage /> : <Navigate to="/login" />} />
        <Route path='/usuario' element={isAuthenticated ? <UsersPage /> : <Navigate to="/login" />} />
        <Route path='/paciente' element={isAuthenticated ? <PacientPage /> : <Navigate to="/login" />} />
        <Route path='/terapias' element={isAuthenticated ? <TerapiasPage /> : <Navigate to="/login" />} />
        <Route path='/casos_especiales' element={isAuthenticated ? <CasosPage /> : <Navigate to="/login" />} />
        <Route path='/test' element={isAuthenticated ? <TestPage /> : <Navigate to="/login" />} />
      </Route>
    </Routes >
  );
}