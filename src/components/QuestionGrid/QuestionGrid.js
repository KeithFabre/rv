import React, { useState, useEffect, useRef } from 'react'; 
import { Link, useLocation } from 'react-router-dom';
import './QuestionGrid.css';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

function QuestionGrid() {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [questionStatus, setQuestionStatus] = useState([]); // Status of correct/incorrect
    const [isCollapsed, setIsCollapsed] = useState(false); // Collapse/Expand the grid
    const [sortOrder, setSortOrder] = useState('chronological'); // Sorting order
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); 
    const [activeStatistic, setActiveStatistic] = useState(null); // For statistics

    const [questionImage, setQuestionImage] = useState(null); 
    const [questionStatistics, setQuestionStatistics] = useState(null); 
    const [studentStatistics, setStudentStatistics] = useState(null); 
    const [questionVideo, setQuestionVideo] = useState(null); 
    const [questionAnswer, setQuestionAnswer] = useState(null); 
    const [questionSubjects, setQuestionSubjects] = useState({}); // Holds the subject data

    const location = useLocation();
    const expandedExam = location.state?.expandedExam || 'CH';

    const examSelectorRef = useRef(null); 

    useEffect(() => {
        generateQuestions();
    }, []);

    useEffect(() => {
        // T
        const handleClickOutside = (event) => {
            if (examSelectorRef.current && !examSelectorRef.current.contains(event.target)) {
                setIsDropdownVisible(false); 
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []); 

    // gera questões e seus status (certo ou errado)
    const generateQuestions = async () => {
        const totalQuestions = 180;
        const status = [];
        const subjects = {}; // guarda os assuntos pra cada questão
    
        try {
            // pega a performance do usuário
            const userPerformanceResponse = await fetch('https://rvcurso.com.br/get.php?action=getPerformance&ID_usuario=1&ID_prova=1');
            const performanceData = await userPerformanceResponse.json();
            const userAnswers = performanceData[0].Respostas;

            // pega informações da questão pra cada questão
            const infoSimuladoResponse = await fetch('https://rvcurso.com.br/get.php?action=get_info_simulado&ID_simulado=1');
            const questionData = await infoSimuladoResponse.json();

            // processa cada questão
            for (let i = 91; i <= 180; i++) {
                const questionInfo = questionData[i.toString()];
                if (questionInfo) {
                    const [subject, correctAnswer, isCorrect] = questionInfo;

                    // guarda o assunto
                    subjects[i] = subject;

                    // compara resposta do usuario com gabarito
                    const userAnswer = userAnswers[`Q${i}`];
                    if (userAnswer === correctAnswer) {
                        status[i] = 'correct';  // resposta certa
                    } else {
                        status[i] = 'incorrect';  // resposta errada
                    }
                }
            }
    
            // Update state once all questions are processed
            setQuestionStatus(status);  // Set the correct/incorrect status
            setQuestionSubjects(subjects);  // Set subjects mapped to question numbers
        } catch (error) {
            console.error('Error fetching user performance or question data:', error);
        }
    };

    const fetchQuestionData = async (questionNumber) => {
        try {
            const response = await fetch(`https://rvcurso.com.br/get.php?action=get_question&ID_simulado=1&questao=${questionNumber}`);
            const data = await response.json();
            if (data) {
                setQuestionImage(data.link_imagem); 
                setQuestionAnswer(data.gabarito);
                setQuestionStatistics(data.link_statistics); 
                setStudentStatistics(data.link_statistics);
                setQuestionVideo(data.link_resolution_video);
            } else {
                console.error('Data not found for question:', questionNumber);
            }
        } catch (error) {
            console.error('Error fetching question data:', error);
        }
    };

    const handleQuestionClick = (index) => {
        setSelectedQuestion(index);
        setIsCollapsed(false);
        fetchQuestionData(index);
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleLinkClick = () => {
        window.location.reload();
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
        setIsDropdownVisible(false); 
    };

    const getSortedQuestions = () => {
        let start = 1;
        let end = 45;

        if (expandedExam === 'CH') {
            start = 1;
            end = 45;
        } else if (expandedExam === 'CN') {
            start = 46;
            end = 90;
        } else if (expandedExam === 'LC') {
            start = 91;
            end = 135;
        } else if (expandedExam === 'MT') {
            start = 136;
            end = 180;
        }

        const questions = Array.from({ length: end - start + 1 }, (_, index) => start + index); // Create an array of question numbers

        if (sortOrder === 'chronological') {
            return questions;
        } else if (sortOrder === 'correct-first') {
            return questions.sort((a, b) => (questionStatus[a - 1] === 'correct' ? -1 : 1));
        } else if (sortOrder === 'wrong-first') {
            return questions.sort((a, b) => (questionStatus[a - 1] === 'incorrect' ? -1 : 1));
        }

        return questions;
    };

    const sortedQuestions = getSortedQuestions();

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const showStatistics = (type) => {
        setActiveStatistic(type);
    };

    const hideStatistics = () => {
        setActiveStatistic(null);
    };

    return (
        <div className="questions-container">

            <div className='question-area'>

            <div className='question-buttons'>
                <div className='exam-selector' ref={examSelectorRef}>
                    <Link to="/detalhes" state={{ expandedExam: 'CH' }} className="no-link-style" onClick={handleLinkClick}>
                        <div className='exam'>{expandedExam === 'CH' ? 'Ciências Humanas e suas Tecnologias' : 'CH'}</div>
                    </Link>
                    <Link to="/detalhes" state={{ expandedExam: 'CN' }} className="no-link-style" onClick={handleLinkClick}>
                        <div className='exam'>{expandedExam === 'CN' ? 'Ciências da Natureza e suas Tecnologias' : 'CN'}</div>
                    </Link>
                    <Link to="/detalhes" state={{ expandedExam: 'LC' }} className="no-link-style" onClick={handleLinkClick}>
                        <div className='exam'>{expandedExam === 'LC' ? 'Linguagens, Códigos e suas Tecnologias' : 'LC'}</div>
                    </Link>
                    <Link to="/detalhes" state={{ expandedExam: 'MT' }} className="no-link-style" onClick={handleLinkClick}>
                        <div className='exam'>{expandedExam === 'MT' ? 'Matemática e suas Tecnologias' : 'MT'}</div>
                    </Link>
                    <Link to="/detalhes" state={{ expandedExam: 'R' }} className="no-link-style" onClick={handleLinkClick}>
                        <div className='exam'>{expandedExam === 'R' ? 'Redação' : 'RE'}</div>
                    </Link>
                    {(expandedExam !== 'R') && (
                        <div className='filter-icon' onClick={toggleDropdown}>
                            <FilterListOutlinedIcon style={{ color: '#242828', fontSize: 35 }} className='filter-icon' />

                                {isDropdownVisible && (
                                    <div className="dropdown">
                                        <div className='dropdown-item' onClick={() => handleSortChange('chronological')}>1-45</div>
                                        <div className='dropdown-item' onClick={() => handleSortChange('correct-first')}>Corretas</div>
                                        <div className='dropdown-item' onClick={() => handleSortChange('wrong-first')}>Erradas</div>
                                    </div>
                                )}

                        </div>
                    )}
                </div>
            </div>

            <div className="grid-container" >

                {expandedExam !== 'R' ? (
                    <div className='question-container'> 
                        <div className={`grid ${isCollapsed ? 'collapsed' : 'expanded'}`}>
                        {sortedQuestions.map((questionNumber, index) => (
                            (!isCollapsed || selectedQuestion === questionNumber) && (
                                <div
                                    key={questionNumber}
                                    className={`square ${questionStatus[index]} ${selectedQuestion === questionNumber ? 'selected' : ''}`}
                                    onClick={() => handleQuestionClick(questionNumber)}
                                >
                                    {questionNumber}
                                    <span className={`subject ${questionStatus[index]}`}>
                                        <span className="first-letter">{questionSubjects[questionNumber]?.charAt(0)}</span>
                                        {questionSubjects[questionNumber]?.slice(1)}
                                    </span>
                                </div>
                            )
                        ))}

                            {selectedQuestion !== null && (
                                <div
                                    className="square toggle-square"
                                    onClick={toggleCollapse}
                                >
                                    {isCollapsed ? <ArrowDropDownIcon style={{ color: '#242828', fontSize: 50 }} /> : <ArrowDropUpIcon style={{ color: '#242828', fontSize: 50 }} />}
                                </div>
                            )}
                        </div>

                        {(selectedQuestion !== null) && (
                        <div className="question-box-container">

                            {/* Detalhes da Questão */}
                            <div  className={`question-box ${isCollapsed ? 'collapsed' : ''}`}>

                                <div className='question-img-container'>
                                    <img 
                                        src={questionImage}
                                        className="question-img"
                                    />
                                </div>
                            
                            </div>

                        </div>
                        )}

                    </div>

                ) : null}

                <div className='essay-corrected'>
                    {expandedExam === 'R' ? (
                        <div className="question-box-container">
                            <div className="question-box">
                                <p className='question-title'>
                                    Redação Corrigida
                                </p>
                                <p className='question-body'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel fermentum libero. Integer vel vehicula turpis, at placerat lacus. Sed lacinia, est sit amet tempus suscipit, risus elit euismod elit, ut dapibus odio risus non felis. Donec volutpat urna at mi laoreet, nec dignissim nisi malesuada. Nulla facilisi.
                                    <br />
                                    Maecenas convallis, erat in luctus convallis, arcu purus fringilla est, nec fermentum orci urna vel nulla. Morbi tincidunt, urna nec commodo vulputate, nisi nunc commodo libero, vel lacinia elit metus et quam. Phasellus ac magna ut erat ultrices efficitur. Nullam fermentum massa sed nunc fringilla, nec lacinia turpis dictum.
                                </p>
                            </div>
                        </div>
                    ) : null}
                </div>

            </div>

            
            </div>

            <div className='question-details-area'>
                {(selectedQuestion !== null) && (
                    <div className="question-sidebar">
                        
                        <div className="question-sidebar-statistic-container">
                            <p className='question-sidebar-title'>Detalhes da Questão {selectedQuestion + 1}</p>
                            <div className="question-buttons-container">

                                <div 
                                    className={`exam details ${activeStatistic === 'Estatísticas da Questão' ? 'active' : ''}`}
                                    onClick={() => showStatistics('Estatísticas da Questão')}>
                                    Estatísticas da Questão
                                </div>

                                <div 
                                    className={`exam details ${activeStatistic === 'Estatísticas do Aluno' ? 'active' : ''}`}
                                    onClick={() => showStatistics('Estatísticas do Aluno')}>
                                    Estatísticas do Aluno
                                </div>

                                <div 
                                    className={`exam details ${activeStatistic === 'Resolução em Vídeo' ? 'active' : ''}`}
                                    onClick={() => showStatistics('Resolução em Vídeo')}>
                                    Resolução em Vídeo
                                </div>

                                <div 
                                    className={`exam details ${activeStatistic === 'Gabarito' ? 'active' : ''}`} 
                                    onClick={() => showStatistics('Gabarito')}>
                                    Gabarito
                                </div>

                            </div>
                        </div>
                        
                        {activeStatistic && (
                            <div className="popup-overlay">
                                <div className="popup-content">
                                    <p className='question-title'>
                                        {activeStatistic}
                                    </p>
            
                                    <div className='question-body'>

                                    {activeStatistic === 'Estatísticas da Questão' ? (
                                        <div className='question-details-image'>
                                            <img src={questionStatistics}></img>
                                        </div>
                                    ) : null}

                                    {activeStatistic === 'Estatísticas do Aluno' ? (
                                        <div className='question-details-image'>
                                            <img src={studentStatistics} ></img>
                                        </div>
                                    ) : null}

                                    {activeStatistic === 'Resolução em Vídeo' ? (
                                        <div className='question-details-video'>
                                            <video controls>
                                            <source src={questionVideo} type="video/mp4" />
                                            Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    ) : null}

                                    {activeStatistic === 'Gabarito' ? (
                                        <div className='question-details-answer'>
                                            {questionAnswer}
                                        </div>
                                    ) : null}

                                    

                                    </div>
            
                                    <button className="close-popup-button" onClick={hideStatistics}>Esconder {activeStatistic}</button>
                                </div>
                            </div>
                        )}

                    </div>
                )}
            </div>

        </div>
    );
}

export default QuestionGrid;
