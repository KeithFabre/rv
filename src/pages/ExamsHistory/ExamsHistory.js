import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import './ExamsHistory.css';

function ExamHistory() {
    
    const [simulados, setSimulados] = useState([]);
    const [simuladoPerformances, setSimuladoPerformances] = useState({});
    const userID = localStorage.getItem('userID'); 

    
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
    };


    useEffect(() => {
        const fetchSimulados = async () => {
            if (!userID) {
                console.error('Nenhum ID de usuário encontrado');
                return;
            }

            try {
                const response = await fetch(`https://rvcurso.com.br/get.php?action=get_simulados_by_aluno&ID_aluno=${userID}`);
                const data = await response.json();
                const simuladoIDs = data.simulado_IDs;
                const simuladoNames = data.simulado_names;
                const simuladoDates = data.simulado_datas;

                const simuladosData = simuladoIDs.map((id, index) => ({
                    id,
                    name: simuladoNames[index],
                    date: simuladoDates[index],
                })).sort((a, b) => parseDate(b.date) - parseDate(a.date));

                setSimulados(simuladosData);

                for (let simulado of simuladosData) {
                    const performanceResponse = await fetch(
                        `https://rvcurso.com.br/get.php?action=getPerformance&ID_usuario=${userID}&ID_prova=${simulado.id}`
                    );
                    const performanceData = await performanceResponse.json();
                    setSimuladoPerformances((prevPerformances) => ({
                        ...prevPerformances,
                        [simulado.id]: performanceData[0],  
                    }));
                }
            } catch (error) {
                console.error('Erro ao buscar simulados ou dados de performance: ', error);
            }
        };

        fetchSimulados();
    }, [userID]);

    const handleSimuladoClick = (simuladoID) => {
        localStorage.setItem('selectedSimuladoID', simuladoID); 
    };

    const roundToOneDecimal = (number) => {
        return number ? Number(number).toFixed(1).replace('.', ',') : '-';  
    };

    return (
        <div className='page-container'>
            <div className='menu'>
                <Sidebar />
            </div>
            <div className='exam-history-container'>
                {simulados.map((simulado, index) => {
                    const performance = simuladoPerformances[simulado.id];
                    const mediaSemRedacao = roundToOneDecimal(performance?.Notas?.Media_sem_redacao);
                    const mediaComRedacao = roundToOneDecimal(performance?.Notas?.Media_com_redacao);

                    const mostRecentClass = index === 0 ? 'most-recent' : '';

                    return (
                        <Link
                            to="/dashboard" 
                            className="no-link-style"
                            key={simulado.id}
                            onClick={() => handleSimuladoClick(simulado.id)} 
                        >
                            <div className={`exam-history ${mostRecentClass}`}>
                                <div className='exam-date'>
                                    Simulado realizado em {simulado.date}
                                </div>
                                <div className='exam-grades'>
                                    <div className='exam-grade'>
                                        <div className='info'>
                                            <p className='info-card-note'>{mediaSemRedacao}</p>
                                            <p className='info-card-text'>Média sem redação</p>
                                        </div>
                                    </div>
                                    <div className='exam-grade-essay'>
                                        <div className='info'>
                                            <p className='info-card-note'>{mediaComRedacao}</p>
                                            <p className='info-card-text'>Média com redação</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default ExamHistory;
