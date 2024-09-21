import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Statistics.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import Card from '../../components/Card/Card';
import InfoCard from '../../components/InfoCard/InfoCard';

function Statistics() {
    // State to hold the performance, simulado date, and user's first name
    const [performance, setPerformance] = useState(null);
    const [simuladoDate, setSimuladoDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState(''); // Store user's name

    // Fetch simulado data and performance for simulado with ID 1
    useEffect(() => {
        const fetchSimuladoData = async () => {
            try {
                // Retrieve user's name from localStorage
                const storedUserName = localStorage.getItem('userName');
                if (storedUserName) {
                    // Get only the first word of the name
                    const firstName = storedUserName.split(' ')[0];
                    setUserName(firstName); // Set user's first name
                }

                // Fetch the list of simulados
                const responseSimulado = await fetch('https://rvcurso.com.br/get.php?action=get_simulados_by_aluno&ID_aluno=1');
                const simuladoData = await responseSimulado.json();

                // Get the date for simulado with ID 1 (simulado_IDs[0])
                setSimuladoDate(simuladoData.simulado_datas[0]);

                // Fetch the performance data for simulado with ID 1
                const responsePerformance = await fetch('https://rvcurso.com.br/get.php?action=getPerformance&ID_usuario=1&ID_prova=1');
                const performanceData = await responsePerformance.json();
                setPerformance(performanceData[0]);  // Assuming performance data is an array and we want the first item
                setLoading(false);
            } catch (error) {
                console.error('Error fetching simulado or performance data:', error);
                setLoading(false);
            }
        };

        fetchSimuladoData();
    }, []);

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
                    <p className="result-text"> Oi, {userName}! Confira aqui seus resultados: </p> {/* Use userName here (only first word) */}
                    <div className='exam dashboard-link'>
                        Simulado realizado em {simuladoDate}
                    </div>
                </div>

                {/* Performance data for simulado with ID 1 */}
                <div className='card-container'>
                    <div className='welcome-card'>
                        <p className='welcome-message'>
                            Classificação geral: <span className='placing'>{Classificacao_geral}º</span>
                            <br /> Classificação do grupo: <span className='placing'>{Classificacao_grupo}º</span>
                        </p>
                        <LeaderboardOutlinedIcon className='icon' style={{ fontSize: 65 }} />
                    </div>
                    {/* validar aqui */}
                    <InfoCard title="Média sem redação" info={Notas.Media_sem_redacao} />   
                    <InfoCard title="Média com redação" info={Notas.Media_com_redacao} />
                </div>

                <div className='card-container'>
                    <Link to="/detalhes" state={{ expandedExam: 'CH' }} className="no-link-style">
                        <Card title="Ciências Humanas e suas Tecnologias" info={Notas.Ciencias_Humanas} icon="groups" />
                    </Link>
                    <Link to="/detalhes" state={{ expandedExam: 'CN' }} className="no-link-style">
                        <Card title="Ciências da Natureza e suas Tecnologias" info={Notas.Ciencias_Natureza} icon="bio" />
                    </Link>
                    <Link to="/detalhes" state={{ expandedExam: 'LC' }} className="no-link-style">
                        <Card title="Linguagens, Códigos e suas Tecnologias" info={Notas.Linguagens} icon="chat" />
                    </Link>
                    <Link to="/detalhes" state={{ expandedExam: 'MT' }} className="no-link-style">
                        <Card title="Matemática e suas Tecnologias" info={Notas.Matematica} icon="functions" />
                    </Link>
                    <Link to="/detalhes" state={{ expandedExam: 'R' }} className="no-link-style">
                        <Card title="Redação" info={Notas.Redacao} icon="create" />
                    </Link>
                </div>

                <div className='summary-container'>
                    <div className='summary'>
                        <div className='info'>
                            <p className='card-info' style={{ color: '#5faa5f' }}>{Acertos}</p>
                            <p className='card-title'>acertos</p>
                        </div>

                        <div className='info'>
                            <p className='card-info' style={{ color: '#ff6767' }}>{180 - Acertos}</p> {/* pegar total das questões e subtrair dos acertos */}
                            <p className='card-title'>erros/nulos</p>
                        </div>

                        <div className='info'>
                            <p className='card-info'>{180}</p>
                            <p className='card-title'>questões ao todo</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Statistics;
