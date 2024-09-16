import React from 'react';
import { Link } from 'react-router-dom';
import './Statistics.css';
import Sidebar from '../../components/Sidebar/Sidebar';
// import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';

import Card from '../../components/Card/Card';
import InfoCard from '../../components/InfoCard/InfoCard'
import { ReactComponent as SaludationSvg } from '../../assets/saludation.svg';

function Statistics() {

    return (
        <div className='page-container'>
            <div className='menu'>
                <Sidebar />
            </div>
            <div className='content'>
                    <div className='exam-link-container'>
                        <Link to="/historico" className="no-link-style">
                            <div className='exam dashboard-link'>
                                Simulado realizado em 30/07/2024
                            </div>
                        </Link>
                    </div>
                <div className='card-container'>
                    <div className='welcome-card'>
                        <p className='welcome-message'>
                            {/* <span style={{'font-weight': '700', 'font-size': '1.3rem'}} className=''>Olá, [usuário]!</span> */}
                            Classificação geral: <span className='placing'>1º</span>
                            <br /> Classificação do grupo: <span className='placing'>1º</span>
                        
                        </p>

                        <LeaderboardOutlinedIcon className='icon' style={{ fontSize: 65 }} />
                        {/* <SaludationSvg className='saludation-svg'/>    */}
                    </div>
                    <InfoCard title="Média sem redação" info="709,2"/>
                    <InfoCard title="Média com redação" info="759,4"/>
                </div>

                <div className='card-container'>
                    <Link 
                        to="/detalhes"
                        state={{ expandedExam: 'CH' }}
                        className="no-link-style"
                    >
                        <Card title="Ciências Humanas e suas Tecnologias" info="694,6" icon="groups"/>
                    </Link>
                    <Link 
                        to="/detalhes"
                        state={{ expandedExam: 'CN' }}
                        className="no-link-style"
                    >
                        <Card title="Ciências da Natureza e suas Tecnologias" info="712,4" icon="bio"/>
                    </Link>
                    <Link 
                        to="/detalhes"
                        state={{ expandedExam: 'LC' }}
                        className="no-link-style"
                    >
                        <Card title="Linguagens, Códigos e suas Tecnologias" info="650,1" icon="chat"/>
                    </Link>
                    <Link 
                        to="/detalhes"
                        state={{ expandedExam: 'MT' }}
                        className="no-link-style"
                    >
                        <Card title="Matemática e suas Tecnologias" info="779,8" icon="functions"/>
                    </Link>
                    <Link 
                        to="/detalhes"
                        state={{ expandedExam: 'R' }}
                        className="no-link-style"
                    >
                        <Card title="Redação" info="960,0" icon="create"/>
                    </Link>
                </div>
                
                <div className='summary-container'>

                    <div className='summary'>

                        <div className='info'>
                            <p className='card-info' style={{'color': '#5faa5f'}}>130</p>
                            <p className='card-title'>acertos</p>
                        </div>

                        <div className='info'>
                            <p className='card-info' style={{'color': '#ff6767'}}>50</p>
                            <p className='card-title'>erros/nulos</p>
                        </div>

                        <div className='info'>
                            <p className='card-info'>180</p>
                            <p className='card-title'>questões ao todo</p>
                        </div>
                        
                    </div>


                    </div>
            </div>
        </div>
    );
}

export default Statistics;
