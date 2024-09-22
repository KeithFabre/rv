import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Statistics.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import Card from '../../components/Card/Card';
import InfoCard from '../../components/InfoCard/InfoCard';

function Statistics() {
    const [performance, setPerformance] = useState(null);
    const [simuladoDate, setSimuladoDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState(''); // Store user's name
    const userID = localStorage.getItem('userID'); // Fetch the userID from localStorage
    const selectedSimuladoID = localStorage.getItem('selectedSimuladoID'); // Fetch selected simulado from localStorage
    const [totalQuestions, setTotalQuestions] = useState(0); // To store the total number of questions

    // Helper function to round the numbers to one decimal place
    const roundToOneDecimal = (number) => {
        return number ? Number(number).toFixed(1) : '-';  // Check if number exists, then round it
    };

    const isUnavailable = (info) => info === '-';

    // Fetch simulado data and performance for the most recent simulado or the selected simulado
    useEffect(() => {
        const fetchSimuladoData = async () => {
            try {
                // Fetch user name from localStorage
                const storedUserName = localStorage.getItem('userName');
                if (storedUserName) {
                    const firstName = storedUserName.split(' ')[0];
                    setUserName(firstName); // Set user's first name
                }
    
                // Fetch the list of simulados for the user
                const responseSimulado = await fetch(`https://rvcurso.com.br/get.php?action=get_simulados_by_aluno&ID_aluno=${userID}`);
                const simuladoData = await responseSimulado.json();
                
                // Map the simulado data into an array
                const simuladosData = simuladoData.simulado_IDs.map((id, index) => ({
                    id,
                    date: simuladoData.simulado_datas[index],
                }));
                
                let selectedSimulado;
    
                // Check if a simulado was previously selected
                if (selectedSimuladoID) {
                    selectedSimulado = simuladosData.find(simulado => simulado.id === selectedSimuladoID);
                }
                
                // If no simulado is selected or the selected one doesn't exist, use the last one
                if (!selectedSimulado) {
                    selectedSimulado = simuladosData[simuladosData.length - 1];
                }
                
                // Set the selected simulado date
                setSimuladoDate(selectedSimulado.date);
                
                // Fetch performance data
                const responsePerformance = await fetch(`https://rvcurso.com.br/get.php?action=getPerformance&ID_usuario=${userID}&ID_prova=${selectedSimulado.id}`);
                const performanceData = await responsePerformance.json();
                const performanceInfo = performanceData[0];
                
                // Set performance and total questions from performance data
                setPerformance(performanceInfo);
                setTotalQuestions(Number(performanceInfo.n_questoes));  // Use n_questoes for total questions
                
                setLoading(false);
            } catch (error) {
                console.error('Error fetching simulado or performance data:', error);
                setLoading(false);
            }
        };
    
        if (userID) {
            fetchSimuladoData();
        } else {
            console.error('No userID found in localStorage.');
        }
    }, [userID, selectedSimuladoID]);

    if (loading) {
        return <div>Loading...</div>;  // Show a loading message until data is fetched
    }

    if (!performance) {
        return <div>No performance data available.</div>;  // Message if no performance data is available
    }

    const { Notas, Acertos, Classificacao_geral, Classificacao_grupo } = performance;

    return (
        <div className='page-container'>
            <div className='menu'>
                <Sidebar />
            </div>
            <div className='content'>

                <div className='exam-link-container'>
                    <p className="result-text"> Oi, {userName}! Confira aqui seus resultados: </p>
                    <div className='exam dashboard-link'>
                    <Link to="/historico" className="no-link-style">
                        Simulado realizado em {simuladoDate}
                    </Link>
                    </div>
                </div>

                <div className='card-container'>
                    <div className='welcome-card'>
                        <p className='welcome-message'>
                            Classificação geral: <span className='placing'>{Classificacao_geral}º</span>
                            <br /> Classificação do grupo: <span className='placing'>{Classificacao_grupo}º</span>
                        </p>
                        <LeaderboardOutlinedIcon className='icon' style={{ fontSize: 65 }} />
                    </div>
                    <InfoCard title="Média sem redação" info={roundToOneDecimal(Notas.Media_sem_redacao)} />
                    <InfoCard title="Média com redação" info={roundToOneDecimal(Notas.Media_com_redacao)} />
                </div>

                <div className='card-container'>
    {/* Card 1: Ciências Humanas e suas Tecnologias */}
    {isUnavailable(roundToOneDecimal(Notas.Ciencias_Humanas)) ? (
        <div className='unavailable'>
            <Card unavailable title="Ciências Humanas e suas Tecnologias" info={roundToOneDecimal(Notas.Ciencias_Humanas)} icon="groups" />
        </div>
    ) : (
        <Link to="/detalhes" state={{ expandedExam: 'CH' }} className="no-link-style">
            <Card title="Ciências Humanas e suas Tecnologias" info={roundToOneDecimal(Notas.Ciencias_Humanas)} icon="groups" />
        </Link>
    )}

    {/* Card 2: Linguagens, Códigos e suas Tecnologias */}
    {isUnavailable(roundToOneDecimal(Notas.Linguagens)) ? (
        <div className='unavailable'>
            <Card unavailable title="Linguagens, Códigos e suas Tecnologias" info={roundToOneDecimal(Notas.Linguagens)} icon="chat" />
        </div>
    ) : (
        <Link to="/detalhes" state={{ expandedExam: 'LC' }} className="no-link-style">
            <Card title="Linguagens, Códigos e suas Tecnologias" info={roundToOneDecimal(Notas.Linguagens)} icon="chat" />
        </Link>
    )}

    {/* Card 3: Ciências da Natureza e suas Tecnologias */}
    {isUnavailable(roundToOneDecimal(Notas.Ciencias_Natureza)) ? (
        <div className='unavailable'>
            <Card unavailable title="Ciências da Natureza e suas Tecnologias" info={roundToOneDecimal(Notas.Ciencias_Natureza)} icon="bio" />
        </div>
    ) : (
        <Link to="/detalhes" state={{ expandedExam: 'CN' }} className="no-link-style">
            <Card title="Ciências da Natureza e suas Tecnologias" info={roundToOneDecimal(Notas.Ciencias_Natureza)} icon="bio" />
        </Link>
    )}

    {/* Card 4: Matemática e suas Tecnologias */}
    {isUnavailable(roundToOneDecimal(Notas.Matematica)) ? (
        <div className='unavailable'>
            <Card unavailable title="Matemática e suas Tecnologias" info={roundToOneDecimal(Notas.Matematica)} icon="functions" />
        </div>
    ) : (
        <Link to="/detalhes" state={{ expandedExam: 'MT' }} className="no-link-style">
            <Card title="Matemática e suas Tecnologias" info={roundToOneDecimal(Notas.Matematica)} icon="functions" />
        </Link>
    )}

    {/* Card 5: Redação */}
    {isUnavailable(roundToOneDecimal(Notas.Redacao)) ? (
        <div className='unavailable'>
            <Card unavailable title="Redação" info={roundToOneDecimal(Notas.Redacao)} icon="create" />
        </div>
    ) : (
        <Link to="/detalhes" state={{ expandedExam: 'R' }} className="no-link-style">
            <Card title="Redação" info={roundToOneDecimal(Notas.Redacao)} icon="create" />
        </Link>
    )}
</div>

                <div className='summary-container'>
                    <div className='summary'>
                        <div className='info'>
                            <p className='card-info' style={{ color: '#5faa5f' }}>{Acertos}</p>
                            <p className='card-title'>acertos</p>
                        </div>

                        <div className='info'>
                            <p className='card-info' style={{ color: '#ff6767' }}>{totalQuestions - Acertos}</p> {/* Subtract correct answers to get incorrect/nulos */}
                            <p className='card-title'>erros</p>
                        </div>

                        <div className='info'>
                            <p className='card-info'>{totalQuestions}</p>  {/* Total number of questions */}
                            <p className='card-title'>questões ao todo</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Statistics;
