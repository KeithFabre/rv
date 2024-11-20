import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import './statistics_content.css';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import Card from '../../../components/base/Card/Card';
import Sidebar from '../../../components/base/Sidebar/Sidebar';
import InfoCard from '../../../components/base/InfoCard/InfoCard';

function StatisticsContent() {
  const [performance, setPerformance] = useState(null);
  const [simuladoDate, setSimuladoDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const userID = localStorage.getItem('userID');
  const selectedSimuladoID = localStorage.getItem('selectedSimuladoID');
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [nullQuestions, setNullQuestions] = useState(0);

  const roundToOneDecimal = (number) => {
    return number ? Number(number).toFixed(1).replace('.', ',') : '-';
  };

  const isUnavailable = (info) => info === '-';

  useEffect(() => {
    const fetchSimuladoData = async () => {
        try {
            
            const storedUserName = localStorage.getItem('userName');

            if (storedUserName) {
                const firstName = storedUserName.split(' ')[0];
                setUserName(firstName); 
            }

           
            const responseSimulado = await fetch(`https://rvcurso.com.br/get.php?action=get_simulados_by_aluno&ID_aluno=${userID}`);
            const simuladoData = await responseSimulado.json();
            
           
            const simuladosData = simuladoData.simulado_IDs.map((id, index) => ({
                id,
                date: simuladoData.simulado_datas[index],
            }));
            
            let selectedSimulado;

           
            if (selectedSimuladoID) {
                selectedSimulado = simuladosData.find(simulado => simulado.id === selectedSimuladoID);
            }
            
            
            if (!selectedSimulado) {
                selectedSimulado = simuladosData[simuladosData.length - 1];
                localStorage.setItem('selectedSimuladoID', selectedSimulado.id);
            }
            
           
            setSimuladoDate(selectedSimulado.date);
            
           
            const responsePerformance = await fetch(`https://rvcurso.com.br/get.php?action=getPerformance&ID_usuario=${userID}&ID_prova=${selectedSimulado.id}`);
            const performanceData = await responsePerformance.json();
            const performanceInfo = performanceData[0];
            
           
            setPerformance(performanceInfo);
            setTotalQuestions(Number(performanceInfo.n_questoes));  
            setNullQuestions(Number(performanceInfo.n_anuladas));  
            
            setLoading(false);
        } catch (error) {
            console.error('Error fetching simulado or performance data:', error);
            setLoading(false);
        }
    };

    if (userID) {
        fetchSimuladoData();
    } else {
        console.error('Nenhum userID encontrado no localStorage.');
    }
}, [userID, selectedSimuladoID]);

  if (loading) {
    return <div className='loading'>Carregando...</div>;
  }

  if (!performance) {
    return <div className='page-container'> <div className='menu'> <Sidebar /> </div> </div>;
  }

  const { Notas, Acertos, Classificacao_geral, Classificacao_grupo } = performance;

  return (
    <div className='content'>
      <div className='exam-link-container'>
        <p className="result-text"> Oi, {userName}! Confira aqui seus resultados: </p>
        <div className='exam dashboard-link'>
          <Link to="/historico" className="no-link-style"> Simulado realizado em {simuladoDate} </Link>
        </div>
      </div>
      <div className='card-container'>
        <Link to="/ranking" className='no-link-style'>
          <div className='welcome-card'>
            <p className='welcome-message'> Classificação geral: <span className='placing'>{Classificacao_geral}º</span> {/* <br /> Classificação do grupo: <span className='placing'>{Classificacao_grupo}º</span> */} </p>
            <LeaderboardOutlinedIcon className='icon' style={{ fontSize: 65 }} />
          </div>
        </Link>
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
          // <Link to="/detalhes" state={{ expandedExam: 'R' }} className="no-link-style">
          <Card title="Redação" info={roundToOneDecimal(Notas.Redacao)} icon="create"/>
          // </Link>
        )}
      </div>
      <div className='summary-container'>
        <div className='summary'>
          <div className='info'>
            <p className='card-info' style={{ color: '#5faa5f' }}>{Acertos}</p>
            <p className='card-title'>acertos</p>
          </div>
          <div className='info'>
            <p className='card-info' style={{ color: '#ff6767' }}>{totalQuestions - nullQuestions - Acertos}</p>
            <p className='card-title'>erros</p>
          </div>
          <div className='info'>
            <p className='card-info' style={{ color: '#909090' }}>{nullQuestions}</p>
            <p className='card-title'>anuladas</p>
          </div>
          <div className='info'>
            <p className='card-info'>{totalQuestions}</p>
            <p className='card-title'>total</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsContent;