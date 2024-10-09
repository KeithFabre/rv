import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import Statistics from './pages/Statistics/Statistics';
import ExamDetails from './pages/ExamDetails/ExamDetails';
import './App.css';
import ExamHistory from './pages/ExamsHistory/ExamsHistory';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import EsqueciSenha from './pages/EsqueciSenha/EsqueciSenha';
import Perfil from './pages/Perfil/Perfil';

const ProtectedRoutes = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const userID = localStorage.getItem('userID');
        if (!userID) {
            navigate('/login'); // Redirect to login if no userID
        }
    }, [navigate]);

    return children;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/esqueciasenha" element={<EsqueciSenha />} />

                {/* Protected routes */}
                <Route 
                    path="/" 
                    element={
                        <ProtectedRoutes>
                            <Statistics />
                        </ProtectedRoutes>
                    } 
                />
                <Route 
                    path="/detalhes" 
                    element={
                        <ProtectedRoutes>
                            <ExamDetails />
                        </ProtectedRoutes>
                    } 
                />
                <Route 
                    path="/historico" 
                    element={
                        <ProtectedRoutes>
                            <ExamHistory />
                        </ProtectedRoutes>
                    } 
                />
                <Route 
                    path="/perfil" 
                    element={
                        <ProtectedRoutes>
                            <Perfil />
                        </ProtectedRoutes>
                    } 
                />
            </Routes>
        </Router>
    );
}

export default App;
