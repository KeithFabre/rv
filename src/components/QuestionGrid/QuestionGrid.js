import React, { useState, useEffect, useRef } from 'react'; 
import { Link, useLocation } from 'react-router-dom';
import './QuestionGrid.css';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

function QuestionGrid() {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [sortOrder, setSortOrder] = useState('chronological');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); 
    const [questionImage, setQuestionImage] = useState(null); // State for storing the image URL
    const [questionStatus, setQuestionStatus] = useState([]); // Random correct/incorrect status

    const location = useLocation();
    const expandedExam = location.state?.expandedExam || 'CH';

    const examSelectorRef = useRef(null); 

    useEffect(() => {
        generateQuestions(); // Call this on component mount to generate random correct/incorrect status
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

    const generateQuestions = () => {
        const totalQuestions = 180 - 91 + 1; // From question 91 to 180
        const status = [];

        // Randomly assign "correct" and "incorrect" status to questions
        for (let i = 0; i < totalQuestions; i++) {
            const isCorrect = Math.random() > 0.5 ? 'correct' : 'incorrect'; // Randomly assign correct or incorrect
            status.push(isCorrect);
        }

        setQuestionStatus(status);
    };

    const handleQuestionClick = (questionNumber) => {
        setSelectedQuestion(questionNumber);
        setIsCollapsed(false);
        fetchQuestionImage(questionNumber); // Fetch the image for the selected question
    };

    const fetchQuestionImage = async (questionNumber) => {
        try {
            const response = await fetch(`https://rvcurso.com.br/get.php?action=getQuestionImage&Prova=ENEM_RV2024.1&Questao=${questionNumber}`);
            const imageUrl = response.url;
            setQuestionImage(imageUrl);
        } catch (error) {
            console.error('Error fetching question image:', error);
        }
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
        setIsDropdownVisible(false); 
    };

    const getSortedQuestions = () => {
        const totalQuestions = 180 - 91 + 1; // From question 91 to 180
        const questions = Array.from({ length: totalQuestions }, (_, index) => 91 + index); // Create an array of question numbers

        if (sortOrder === 'chronological') {
            return questions;
        } else if (sortOrder === 'correct-first') {
            return questions.sort((a, b) => (questionStatus[a - 91] === 'correct' ? -1 : 1));
        } else if (sortOrder === 'wrong-first') {
            return questions.sort((a, b) => (questionStatus[a - 91] === 'incorrect' ? -1 : 1));
        }

        return questions;
    };

    const sortedQuestions = getSortedQuestions();

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    return (
        <div className="questions-container">

            <div className='question-area'>
            <div className='question-buttons'>
                <div className='exam-selector' ref={examSelectorRef}>
                    <Link to="/detalhes" state={{ expandedExam: 'CH' }} className="no-link-style">
                        <div className='exam'>{expandedExam === 'CH' ? 'Ciências Humanas e suas Tecnologias' : 'CH'}</div>
                    </Link>
                    <Link to="/detalhes" state={{ expandedExam: 'CN' }} className="no-link-style">
                        <div className='exam'>{expandedExam === 'CN' ? 'Ciências da Natureza e suas Tecnologias' : 'CN'}</div>
                    </Link>
                    <Link to="/detalhes" state={{ expandedExam: 'LC' }} className="no-link-style">
                        <div className='exam'>{expandedExam === 'LC' ? 'Linguagens, Códigos e suas Tecnologias' : 'LC'}</div>
                    </Link>
                    <Link to="/detalhes" state={{ expandedExam: 'MT' }} className="no-link-style">
                        <div className='exam'>{expandedExam === 'MT' ? 'Matemática e suas Tecnologias' : 'MT'}</div>
                    </Link>
                    <Link to="/detalhes" state={{ expandedExam: 'R' }} className="no-link-style">
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
                            <div  className={`question-box ${isCollapsed ? 'collapsed' : ''}`}>
                                <div className='question-img-container'>
                                    {questionImage ? (
                                        <img 
                                            src={questionImage}
                                            className="question-img"
                                            alt={`Questão ${selectedQuestion}`}
                                        />
                                    ) : (
                                        <p>Loading image...</p>
                                    )}
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
                            <p className='question-sidebar-title'>Detalhes da Questão {selectedQuestion}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuestionGrid;