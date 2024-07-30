import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import './ExamsHistory.css';

function ExamHistory() {
    return (
        <div className='page-container'>
            <div className='menu'>
                <Sidebar />
            </div>
            <div className='exam-history-container'>
                <Link to="/" className="no-link-style">
                    <div className='exam-history'>
                        <div className='exam-date'>Simulado realizado em 30/07/2024</div>
                        <div className='exam-grades'>
                            <div className='exam-grade'>
                                <div className='info'>
                                    <p className='info-card-note'>709,2</p>
                                    <p className='info-card-text'>Média sem redação</p>
                                </div>
                            </div>
                            <div className='exam-grade-essay'>
                                <div className='info'>
                                    <p className='info-card-note'>759,4</p>
                                    <p className='info-card-text'>Média com redação</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

                <Link to="/" className="no-link-style">
                    <div className='exam-history'>
                        <div className='exam-date'>Simulado realizado em 30/07/2024</div>
                        <div className='exam-grades'>
                            <div className='exam-grade'>
                                <div className='info'>
                                    <p className='info-card-note'>709,2</p>
                                    <p className='info-card-text'>Média sem redação</p>
                                </div>
                            </div>
                            <div className='exam-grade-essay'>
                                <div className='info'>
                                    <p className='info-card-note'>759,4</p>
                                    <p className='info-card-text'>Média com redação</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

                <Link to="/" className="no-link-style">
                    <div className='exam-history'>
                        <div className='exam-date'>Simulado realizado em 30/07/2024</div>
                        <div className='exam-grades'>
                            <div className='exam-grade'>
                                <div className='info'>
                                    <p className='info-card-note'>709,2</p>
                                    <p className='info-card-text'>Média sem redação</p>
                                </div>
                            </div>
                            <div className='exam-grade-essay'>
                                <div className='info'>
                                    <p className='info-card-note'>759,4</p>
                                    <p className='info-card-text'>Média com redação</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

                <Link to="/" className="no-link-style">
                    <div className='exam-history'>
                        <div className='exam-date'>Simulado realizado em 30/07/2024</div>
                        <div className='exam-grades'>
                            <div className='exam-grade'>
                                <div className='info'>
                                    <p className='info-card-note'>709,2</p>
                                    <p className='info-card-text'>Média sem redação</p>
                                </div>
                            </div>
                            <div className='exam-grade-essay'>
                                <div className='info'>
                                    <p className='info-card-note'>759,4</p>
                                    <p className='info-card-text'>Média com redação</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

                <Link to="/" className="no-link-style">
                    <div className='exam-history'>
                        <div className='exam-date'>Simulado realizado em 30/07/2024</div>
                        <div className='exam-grades'>
                            <div className='exam-grade'>
                                <div className='info'>
                                    <p className='info-card-note'>709,2</p>
                                    <p className='info-card-text'>Média sem redação</p>
                                </div>
                            </div>
                            <div className='exam-grade-essay'>
                                <div className='info'>
                                    <p className='info-card-note'>759,4</p>
                                    <p className='info-card-text'>Média com redação</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

                <Link to="/" className="no-link-style">
                    <div className='exam-history'>
                        <div className='exam-date'>Simulado realizado em 30/07/2024</div>
                        <div className='exam-grades'>
                            <div className='exam-grade'>
                                <div className='info'>
                                    <p className='info-card-note'>709,2</p>
                                    <p className='info-card-text'>Média sem redação</p>
                                </div>
                            </div>
                            <div className='exam-grade-essay'>
                                <div className='info'>
                                    <p className='info-card-note'>759,4</p>
                                    <p className='info-card-text'>Média com redação</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default ExamHistory;
