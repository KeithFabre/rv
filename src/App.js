import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import Statistics from './pages/statistics/statistics';
import ExamDetails from './pages/exam_details/exam_details';
import './App.css';
import ExamHistory from './pages/exams_history/exams_history';
import Login from './pages/login/login';
import Cadastro from './pages/cadastro/cadastro';
import EsqueciSenha from './pages/esqueci_senha/esqueci_senha';
import Perfil from './pages/perfil/perfil';
import Ranking from './pages/ranking/ranking';

const ProtectedRoutes = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const userID = localStorage.getItem('userID');
        if (!userID) {
            navigate('/login'); 
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

                <Route 
                    path="/dashboard" 
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
                    path="/ranking" 
                    element={
                        <ProtectedRoutes>
                            <Ranking />
                        </ProtectedRoutes>
                    } 
                />

                <Route 
                    path="/" 
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
