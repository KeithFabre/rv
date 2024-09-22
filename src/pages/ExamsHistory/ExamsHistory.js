import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import './ExamsHistory.css';

function ExamHistory() {
    // State to hold the list of simulados and their performance data
    const [simulados, setSimulados] = useState([]);
    const [simuladoPerformances, setSimuladoPerformances] = useState({});
    const userID = localStorage.getItem('userID'); // Get the userID from localStorage

    // Helper function to convert date from dd/mm/yyyy to yyyy-mm-dd for sorting
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
    };

    // Fetch simulados when the component mounts
    useEffect(() => {
        const fetchSimulados = async () => {
            if (!userID) {
                console.error('No userID found in localStorage.');
                return;
            }

            try {
                const response = await fetch(`https://rvcurso.com.br/get.php?action=get_simulados_by_aluno&ID_aluno=${userID}`);
                const data = await response.json();
                const simuladoIDs = data.simulado_IDs;
                const simuladoNames = data.simulado_names;
                const simuladoDates = data.simulado_datas;

                // Combine the IDs, names, and dates into one array and sort by date (most recent first)
                const simuladosData = simuladoIDs.map((id, index) => ({
                    id,
                    name: simuladoNames[index],
                    date: simuladoDates[index],
                })).sort((a, b) => parseDate(b.date) - parseDate(a.date));

                setSimulados(simuladosData);

                // Fetch performance for each simulado
                for (let simulado of simuladosData) {
                    const performanceResponse = await fetch(
                        `https://rvcurso.com.br/get.php?action=getPerformance&ID_usuario=${userID}&ID_prova=${simulado.id}`
                    );
                    const performanceData = await performanceResponse.json();
                    setSimuladoPerformances((prevPerformances) => ({
                        ...prevPerformances,
                        [simulado.id]: performanceData[0],  // Assuming the first item is the relevant one
                    }));
                }
            } catch (error) {
                console.error('Error fetching simulados or performance data:', error);
            }
        };

        fetchSimulados();
    }, [userID]);

    // Handle simulado card click: store the selected simulado ID in localStorage
    const handleSimuladoClick = (simuladoID) => {
        localStorage.setItem('selectedSimuladoID', simuladoID); // Store the clicked simulado ID
    };

    const roundToOneDecimal = (number) => {
        return number ? Number(number).toFixed(1) : '-';  // Check if number exists, then round it
    };

    return (
        <div className='page-container'>
            <div className='menu'>
                <Sidebar />
            </div>
            <div className='exam-history-container'>
                {simulados.map((simulado) => {
                    const performance = simuladoPerformances[simulado.id];
                    const mediaSemRedacao = roundToOneDecimal(performance?.Notas?.Media_sem_redacao);
                    const mediaComRedacao = roundToOneDecimal(performance?.Notas?.Media_com_redacao);

                    return (
                        <Link
                            to="/" // Adjust the link as per your routing setup
                            className="no-link-style"
                            key={simulado.id}
                            onClick={() => handleSimuladoClick(simulado.id)} // Store the clicked simulado ID
                        >
                            <div className='exam-history'>
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
