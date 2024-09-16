import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Statistics from './pages/Statistics/Statistics'
import ExamDetails from './pages/ExamDetails/ExamDetails';

import './App.css'
import ExamHistory from './pages/ExamsHistory/ExamsHistory';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro'
import EsqueciSenha from './pages/EsqueciSenha/EsqueciSenha'
import Perfil from './pages/Perfil/Perfil'

function App() {

    return (
        <Router>
                <Routes>
                    <Route path="/" element={<Statistics />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/detalhes" element={<ExamDetails />} />
                    {/* <Route path="*" element={<NotFound />} /> */}
                    <Route path="/historico" element={<ExamHistory />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/esqueciasenha" element={<EsqueciSenha />} />
                    <Route path="/perfil" element={<Perfil />} />
                </Routes>
        </Router>
    );
}

export default App;