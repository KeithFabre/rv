import React, { useState, useEffect, useRef } from 'react'; 
import { Link, useLocation } from 'react-router-dom';
import './QuestionGrid.css';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropDown';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function QuestionGrid() {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [questionStatus, setQuestionStatus] = useState([]); 
    const [isCollapsed, setIsCollapsed] = useState(false); 
    const [sortOrder, setSortOrder] = useState('chronological'); 
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); 
    const [activeStatistic, setActiveStatistic] = useState(null); 

    const [questionImage, setQuestionImage] = useState(null); 
    const [questionStatistics, setQuestionStatistics] = useState(null); 
    const [studentStatistics, setStudentStatistics] = useState(null); 
    const [questionVideo, setQuestionVideo] = useState(null); 
    const [questionAnswer, setQuestionAnswer] = useState(null); 
    const [questionSubjects, setQuestionSubjects] = useState({}); 
    const [availableQuestions, setAvailableQuestions] = useState({}); 
    const [hasVideo, setHasVideo] = useState({});
    const [userAnswers, setUserAnswers] = useState({}); 
    const [questionComentario, setQuestionComentario] = useState(''); 
    const [questionAnswers, setQuestionAnswers] = useState({}); 

    const [activeFilter, setActiveFilter] = useState('chronological'); 


    const location = useLocation();
    const expandedExam = location.state?.expandedExam || 'CH';

    const examSelectorRef = useRef(null); 

    useEffect(() => {
        generateQuestions();
    }, []);

    useEffect(() => {
        
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


const generateQuestions = async () => {
    const userID = localStorage.getItem('userID');
    const selectedSimulado = localStorage.getItem('selectedSimuladoID');

    const status = [];
    const subjects = {};
    const availableQuestionsTemp = {};
    const hasVideoTemp = {};
    const answersTemp = {}; 

    try {
        const userPerformanceResponse = await fetch(`https://rvcurso.com.br/get.php?action=getPerformance&ID_usuario=${userID}&ID_prova=${selectedSimulado}`);
        const performanceData = await userPerformanceResponse.json();
        const userAnswers = performanceData[0]?.Respostas;

        if (!userAnswers) {
            return;
        }

        setUserAnswers(userAnswers);  

        
        const infoSimuladoResponse = await fetch(`https://rvcurso.com.br/get.php?action=get_info_simulado&ID_simulado=${selectedSimulado}`);
        const questionData = await infoSimuladoResponse.json();

        
        for (let i = 91; i <= 180; i++) {
            const questionInfo = questionData[i.toString()];
            if (questionInfo) {
                const [subject, correctAnswer, videoAvailable] = questionInfo;

                subjects[i] = subject;
                availableQuestionsTemp[i] = true;
                hasVideoTemp[i] = videoAvailable;
                answersTemp[i] = correctAnswer;  

                const userAnswer = userAnswers[i.toString()];
                status[i] = userAnswer === correctAnswer ? 'correct' : 'incorrect';
            }
        }

        setQuestionStatus(status);
        setQuestionSubjects(subjects);
        setAvailableQuestions(availableQuestionsTemp);
        setHasVideo(hasVideoTemp);
        setQuestionAnswers(answersTemp);  
    } catch (error) {
        console.error('Erro ao buscar performance do usuário ou dados de questão: ', error);
    }
};

    
    
    

    const fetchQuestionData = async (questionNumber) => {
        try {
            const selectedSimulado = localStorage.getItem('selectedSimuladoID') || '1';
            const response = await fetch(`https://rvcurso.com.br/get.php?action=get_question&ID_simulado=${selectedSimulado}&questao=${questionNumber}`);
            const data = await response.json();
            if (data) {
                setQuestionImage(data.link_imagem); 
                setQuestionAnswer(data.gabarito);
                setQuestionStatistics(data.link_statistics); 
                setStudentStatistics(data.link_statistics);
                setQuestionVideo(data.link_resolution_video);
                setQuestionComentario(data.comentario);  
            } else {
                console.error('Data not found for question:', questionNumber);
            }
        } catch (error) {
            console.error('Error fetching question data:', error);
        }
    };
    

    const handleQuestionClick = (index) => {
        if (availableQuestions[index]) {  
            setSelectedQuestion(index);
            setIsCollapsed(false);
            fetchQuestionData(index);
        }
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleLinkClick = () => {
        window.location.reload();
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
        setActiveFilter(order); 
        setIsDropdownVisible(false);
    };
    

    const abbreviateSubject = (subject) => {
        if (subject === 'matematica') return 'Mat';
        if (subject === 'biologia') return 'Bio';
        if (subject === 'quimica') return 'Qui';
        if (subject === 'fisica') return 'Fis';
        return subject; // Return subject as is for all other subjects
    };
    
    const getSortedQuestions = () => {
        let start = 1;
        let end = 45;
    
        if (expandedExam === 'CH') {
            start = 1;
            end = 45;
        } else if (expandedExam === 'LC') {
            start = 46;
            end = 90;
        } else if (expandedExam === 'CN') {
            start = 91;
            end = 135;
        } else if (expandedExam === 'MT') {
            start = 136;
            end = 180;
        }
    
        
        const questions = Array.from({ length: end - start + 1 }, (_, index) => start + index);
    
        
        if (sortOrder === 'correct-first') {
            return questions.filter(q => questionStatus[q] === 'correct')
                            .concat(questions.filter(q => questionStatus[q] !== 'correct'));
        } else if (sortOrder === 'wrong-first') {
            return questions.filter(q => questionStatus[q] === 'incorrect')
                            .concat(questions.filter(q => questionStatus[q] !== 'incorrect'));
        }
    
        return questions; 
    };
    

    const sortedQuestions = getSortedQuestions();

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const toggleStatistics = (type) => {
        setActiveStatistic((prevStatistic) => (prevStatistic === type ? null : type));
    };

    
    const handleNextQuestion = () => {
        const currentIndex = sortedQuestions.indexOf(selectedQuestion);
        if (currentIndex < sortedQuestions.length - 1) {
            const nextQuestion = sortedQuestions[currentIndex + 1];
            setSelectedQuestion(nextQuestion);
            fetchQuestionData(nextQuestion); // Update the question data
        }
    };

    
    const handlePreviousQuestion = () => {
        const currentIndex = sortedQuestions.indexOf(selectedQuestion);
        if (currentIndex > 0) {
            const prevQuestion = sortedQuestions[currentIndex - 1];
            setSelectedQuestion(prevQuestion);
            fetchQuestionData(prevQuestion); 
        }
    };


    return (
        <div className="questions-container">
            <div className='question-area'>
                <div className='question-buttons'>
                    <div className='exam-selector' ref={examSelectorRef}>
                        {/* <Link to="/detalhes" state={{ expandedExam: 'CH' }} className="no-link-style" onClick={handleLinkClick}>
                            <div className='exam'>{expandedExam === 'CH' ? 'Ciências Humanas e suas Tecnologias' : 'CH'}</div>
                        </Link>
                        <Link to="/detalhes" state={{ expandedExam: 'LC' }} className="no-link-style" onClick={handleLinkClick}>
                            <div className='exam'>{expandedExam === 'LC' ? 'Linguagens, Códigos e suas Tecnologias' : 'LC'}</div>
                        </Link> */}
                        <Link to="/detalhes" state={{ expandedExam: 'CN' }} className="no-link-style" onClick={handleLinkClick}>
                            <div className='exam'>{expandedExam === 'CN' ? 'Ciências da Natureza e suas Tecnologias' : 'CN'}</div>
                        </Link>
                        <Link to="/detalhes" state={{ expandedExam: 'MT' }} className="no-link-style" onClick={handleLinkClick}>
                            <div className='exam'>{expandedExam === 'MT' ? 'Matemática e suas Tecnologias' : 'MT'}</div>
                        </Link>

                        {/* <Link to="/detalhes" state={{ expandedExam: 'R' }} className="no-link-style" onClick={handleLinkClick}>
                            <div className='exam'>{expandedExam === 'R' ? 'Redação' : 'RE'}</div>
                        </Link> */}


                        {(expandedExam !== 'R') && (
                            <div className='filter-icon' onClick={toggleDropdown}>
                                <FilterListOutlinedIcon style={{ color: '#242828', fontSize: 35 }} className='filter-icon' />
                                    {isDropdownVisible && (
                                        <div className="dropdown">
                                        <div
                                            className={`dropdown-item ${activeFilter === 'chronological' ? 'active-filter' : ''}`}
                                            onClick={() => handleSortChange('chronological')}
                                        >
                                            1,2,3,...
                                        </div>
                                        <div
                                            className={`dropdown-item ${activeFilter === 'correct-first' ? 'active-filter' : ''}`}
                                            onClick={() => handleSortChange('correct-first')}
                                        >
                                            Corretas
                                        </div>
                                        <div
                                            className={`dropdown-item ${activeFilter === 'wrong-first' ? 'active-filter' : ''}`}
                                            onClick={() => handleSortChange('wrong-first')}
                                        >
                                            Erradas
                                        </div>
                                    </div>
                                    
                                    )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid-container">
                    {expandedExam !== 'R' ? (
                        <div className='question-container'> 

                            <div className={`grid ${isCollapsed ? 'collapsed' : 'expanded'}`}>
                            {sortedQuestions.map((questionNumber, index) => (
                                (!isCollapsed || selectedQuestion === questionNumber) && (
                                    <div
                                        key={questionNumber}
                                        className={`square ${questionAnswers[questionNumber] === 'X' ? 'anulada' : ''} ${availableQuestions[questionNumber] ? questionStatus[questionNumber] : 'unavailable'} ${selectedQuestion === questionNumber ? 'selected' : ''}`}
                                        onClick={() => handleQuestionClick(questionNumber)}
                                        style={{ cursor: availableQuestions[questionNumber] ? 'pointer' : 'default' }} // Make unclickable if not in availableQuestions
                                        >
                                        {questionNumber}
                                        <span className={`subject ${questionStatus[questionNumber]}`}>
                                            <span className="first-letter">{abbreviateSubject(questionSubjects[questionNumber])}</span>
                                        </span>
                                        {hasVideo[questionNumber] && (  
                                            <span className={`camera-icon ${questionStatus[questionNumber]}`}>
                                            <PlayCircleFilledWhiteOutlinedIcon style={{ fontSize: 17 }} />
                                            </span>
                                        )}
                                    </div>
                                )
                            ))}

                                {selectedQuestion !== null && (
                                    <div
                                        className="square toggle-square"
                                        onClick={toggleCollapse}
                                    >
                                        {isCollapsed ? <ArrowDropUpIcon style={{ color: '#242828', fontSize: 50 }} /> : <ArrowDropDownIcon style={{ color: '#242828', fontSize: 50 }} />}
                                    </div>
                                )}

                                {selectedQuestion !== null && (
                                    
                                
                                <button
                                        className="arrow-button left-arrow"
                                        onClick={handlePreviousQuestion}
                                        disabled={selectedQuestion === sortedQuestions[0]}
                                    >
                                        <ArrowBackIosIcon />
                                    </button>
                                
                                )}

                                {selectedQuestion !== null && (
                                    
                                    <button
                                    className="arrow-button right-arrow"
                                    onClick={handleNextQuestion}
                                    disabled={selectedQuestion === sortedQuestions[sortedQuestions.length - 1]}
                                >
                                    <ArrowForwardIosIcon />
                            </button>

                                )}



                            </div>

                            {selectedQuestion !== null && (
                                <div className="question-box-container">


                                    <div className={`question-box ${isCollapsed ? 'collapsed' : ''}`}>

                                        <div className='question-img-container'>
                                            <img src={questionImage} className="question-img" />
                                        </div>

                                    </div>


                                </div>
                            )}



                        </div>
                    ) : null}
                </div>

                <div className='essay-corrected'>
                    {expandedExam === 'R' ? (
                        <div className="question-box-container">
                            <div className="question-box">
                                <p className='question-title'>A Revolução do Miojo na Alimentação Contemporânea</p>
                                <p className='question-body'>

                                 {/* <br/><br/> */}

                                    O miojo, conhecido por sua praticidade e preço acessível, tornou-se um dos alimentos mais populares do mundo. Inventado em 1958 pelo japonês Momofuku Ando, o macarrão instantâneo rapidamente conquistou adeptos em diversas culturas, devido à sua rapidez no preparo, baixo custo e versatilidade. Contudo, o sucesso do miojo reflete questões mais profundas relacionadas à alimentação contemporânea, como a necessidade de refeições rápidas em uma sociedade marcada pela correria e o impacto dessa escolha na saúde pública.
                                    <br/>
Um dos fatores que explica a popularização do miojo é a transformação do ritmo de vida moderno. Com a urbanização acelerada e a inserção crescente de homens e mulheres no mercado de trabalho, a alimentação passou a ser uma questão de conveniência. Nesse contexto, alimentos rápidos e prontos, como o miojo, preenchem uma lacuna importante. O tempo, antes dedicado ao preparo das refeições, foi substituído pela necessidade de refeições instantâneas, criando uma cultura de consumo voltada para a agilidade e a praticidade.
<br/>
Entretanto, apesar de ser uma solução prática, o consumo excessivo de alimentos industrializados, como o miojo, traz à tona discussões sobre a saúde pública. Pesquisas indicam que o macarrão instantâneo possui altos níveis de sódio, gorduras saturadas e aditivos químicos, os quais podem contribuir para o desenvolvimento de doenças crônicas, como hipertensão e problemas cardiovasculares. O desafio, portanto, é equilibrar a conveniência com escolhas alimentares saudáveis, um dilema cada vez mais presente em sociedades urbanizadas.
<br/>
Além disso, a questão do miojo também toca em pontos importantes sobre o acesso à alimentação. Em regiões de baixa renda, o macarrão instantâneo se tornou uma opção viável para quem não dispõe de recursos financeiros ou tempo para preparar refeições mais elaboradas. Nesse sentido, a popularidade do miojo reflete a desigualdade socioeconômica, evidenciando que muitas pessoas optam por soluções rápidas por falta de acesso a alimentos mais nutritivos e frescos.
<br/>
Em suma, o miojo simboliza tanto as mudanças sociais e econômicas quanto os desafios da alimentação moderna. Seu impacto vai além da conveniência, abordando questões de saúde e desigualdade. Para avançar em direção a um futuro mais saudável e equilibrado, é essencial promover políticas públicas que incentivem a educação alimentar e o acesso a uma dieta mais nutritiva e acessível, sem deixar de lado a necessidade de praticidade no dia a dia.
                                </p>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>

            <div className='question-details-area'>
                {(selectedQuestion !== null) && (
                    <div className="question-sidebar">
                        <div className="question-sidebar-statistic-container">
                            <p className='question-sidebar-title'>Detalhes da Questão {selectedQuestion}</p>
                            <div className="question-buttons-container">


                                
                                <div className={`exam details ${activeStatistic === 'Estatísticas da Questão' ? 'active' : ''}`} onClick={() => toggleStatistics('Estatísticas da Questão')}>Estatísticas da Questão</div>
                                
                                {activeStatistic && (
                                    <div className="popup-overlay">
                                        <div className="popup-content">
                                            <div className='question-body'>
                                                {activeStatistic === 'Estatísticas da Questão' && <div className='question-details-image'><img src={questionStatistics}></img></div>}
                                            </div>
                                            
                                        </div>
                                    </div>
                                )}
         
                                
                                <div
                                    className={`exam details ${activeStatistic === 'Resolução em Vídeo' ? 'active' : ''} ${!hasVideo[selectedQuestion] ? 'unavailable' : ''}`}
                                    onClick={() => hasVideo[selectedQuestion] && toggleStatistics('Resolução em Vídeo')}
                                >
                                    Resolução em Vídeo
                                </div>

                                {activeStatistic && (
                            <div className="popup-overlay">
                                <div className="popup-content">
                                    <div className='question-body'>
                                        {activeStatistic === 'Resolução em Vídeo' && (
                                            <div className='question-details-video'>
                                                {hasVideo[selectedQuestion] && (
                                                    <video controls key={questionVideo} autoPlay>
                                                        <source src={questionVideo} type="video/mp4" />Seu browser não suporta a tag de video.
                                                    </video>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                                )}

                                
                                <div className={`exam details ${activeStatistic === 'Resposta do Aluno' ? 'active' : ''}`} onClick={() => toggleStatistics('Resposta do Aluno')}>Resposta do Aluno</div>
                                {activeStatistic && (
                                    <div className="popup-overlay">
                                        <div className="popup-content">
                                            <div className='question-body'>
                                                
                                                {activeStatistic === 'Resposta do Aluno' && (
                                                <div className='question-details-answer'>
                                                    {userAnswers[selectedQuestion] || 'No answer available'}
                                                </div>
                                            )}

                                            </div>
                                            
                                        </div>
                                    </div>
                                )}

                                
                                <div className={`exam details ${activeStatistic === 'Gabarito' ? 'active' : ''}`} onClick={() => toggleStatistics('Gabarito')}>Gabarito</div>
                                {activeStatistic && (
                                    <div className="popup-overlay">
                                        <div className="popup-content">
                                            <div className='question-body'>
                                            
                                            {activeStatistic === 'Gabarito' && (
                                                <div className='question-details-answer'>
                                                    {questionAnswer}
                                                    
                                                    {questionComentario && (
                                                        <div className='question-img-container gabarito'>
                                                            <img src={`https://rvcurso.com.br/${questionComentario}`} className="question-img" />
                                                        </div>
                                                    ) }

                                                </div>
                                            )}

                                            </div>
                                            
                                        </div>
                                    </div>
                                )}                                



                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

export default QuestionGrid;
