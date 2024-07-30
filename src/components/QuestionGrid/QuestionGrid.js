import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './QuestionGrid.css';

function QuestionGrid() {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [questionStatus, setQuestionStatus] = useState([]);
    const [alternatives, setAlternatives] = useState([]);
    const [selectedAlternatives, setSelectedAlternatives] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [sortOrder, setSortOrder] = useState('chronological');

    const location = useLocation();
    const expandedExam = location.state?.expandedExam || 'CH';

    useEffect(() => {
        generateQuestions();
    }, []);

    const generateQuestions = () => {
        const totalQuestions = 45;
        const minCorrectAnswers = Math.ceil(totalQuestions / 2) + 1; // mais respostas corretas
        const initialAlternatives = [];
        const status = [];

        // garante o mínimo de respostas corretas
        for (let i = 0; i < minCorrectAnswers; i++) {
            const options = ['a', 'b', 'c', 'd'];
            const correct = options[Math.floor(Math.random() * options.length)];
            const selected = options[Math.floor(Math.random() * options.length)];
            initialAlternatives.push(
                options.map(option => ({
                    option,
                    text: `Lorem Ipsum dolor sit amet`,
                    correct: option === correct,
                    selected: option === selected
                }))
            );
            status.push('correct');
        }

        // preenche o resto das mensagens
        for (let i = minCorrectAnswers; i < totalQuestions; i++) {
            const options = ['a', 'b', 'c', 'd'];
            const correct = options[Math.floor(Math.random() * options.length)];
            const selected = options[Math.floor(Math.random() * options.length)];
            initialAlternatives.push(
                options.map(option => ({
                    option,
                    text: `Lorem Ipsum dolor sit amet`,
                    correct: option === correct,
                    selected: option === selected
                }))
            );
            status.push('incorrect');
        }

        // Shuffle the status array to distribute correct/incorrect statuses randomly
        for (let i = status.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [status[i], status[j]] = [status[j], status[i]];
        }

        setAlternatives(initialAlternatives);

        const selectedAlt = initialAlternatives.map(alts => 
            alts.find(alt => alt.selected).option
        );
        setSelectedAlternatives(selectedAlt);

        const finalStatus = initialAlternatives.map((alts, index) =>
            alts.find(alt => alt.selected).correct ? 'correct' : 'incorrect'
        );
        setQuestionStatus(finalStatus);
    };

    const handleQuestionClick = (index) => {
        setSelectedQuestion(index);
        setIsCollapsed(false); // Ensure the questions are expanded when a new question is clicked
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleLinkClick = () => {
        window.location.reload(); // Reload the page
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
    };

    const getSortedQuestions = () => {
        const questions = questionStatus.map((status, index) => ({
            index,
            status,
        }));

        if (sortOrder === 'chronological') {
            return questions;
        } else if (sortOrder === 'correct-first') {
            return questions.sort((a, b) => (a.status === 'correct' ? -1 : 1));
        } else if (sortOrder === 'wrong-first') {
            return questions.sort((a, b) => (a.status === 'incorrect' ? -1 : 1));
        }

        return questions;
    };

    const sortedQuestions = getSortedQuestions();

    return (
        <div className="questions-container">

            <div className='question-buttons'>
                {/* navegação pra escolher prova */}
                <div className='exam-selector'>
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
                        <div className='exam'>{expandedExam === 'R' ? 'Redação' : 'R'}</div>
                    </Link>
                </div>

                {expandedExam !== 'R' ? (
                    <div className="sort-selector">
                        <div className='sort' onClick={() => handleSortChange('chronological')}>1-45</div>
                        <div className='sort' onClick={() => handleSortChange('correct-first')}>Corretas</div>
                        <div className='sort' onClick={() => handleSortChange('wrong-first')}>Erradas</div>
                    </div>
                ) : null}


            </div>


            <div className="grid-container">
                

                {/* grid de questões (CH, CN, LC, MT) */}
                {expandedExam !== 'R' ? (
                    <div className="grid">
                        {sortedQuestions.map(({ index, status }) => (
                            (!isCollapsed || selectedQuestion === index) && (
                                <div
                                    key={index}
                                    className={`square ${status} ${selectedQuestion === index ? 'selected' : ''}`}
                                    onClick={() => handleQuestionClick(index)}
                                >
                                    {index + 1}
                                </div>
                            )
                        ))}
                        {selectedQuestion !== null && (
                            <div
                                className="square toggle-square"
                                onClick={toggleCollapse}
                            >
                                {isCollapsed ? '+' : '-'}
                            </div>
                        )}
                    </div>
                ) : null}

                {/* detalhes da questão (todas) */}
                {(selectedQuestion !== null) && (
                    <div className="question-sidebar">
                        <p className='question-sidebar-title'>Detalhes da Questão {selectedQuestion + 1}</p>
                        <div className="question-sidebar-statistic-container">
                            <div className="question-sidebar-statistic"></div>
                            <div className="question-sidebar-statistic"></div>
                        </div>
                    </div>
                )}
            </div>

            {/* corpo da questão com alternativas (CH, CN, LC, MT) */}
            <div>
                {selectedQuestion !== null && (
                    <div className="question-box-container">
                        <div className="question-box">
                            <p className='question-title'>
                                Questão {selectedQuestion + 1}
                            </p>
                            <p className='question-body'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel fermentum libero. Integer vel vehicula turpis, at placerat lacus. Sed lacinia, est sit amet tempus suscipit, risus elit euismod elit, ut dapibus odio risus non felis. Donec volutpat urna at mi laoreet, nec dignissim nisi malesuada. Nulla facilisi.
                                <br />
                                Maecenas convallis, erat in luctus convallis, arcu purus fringilla est, nec fermentum orci urna vel nulla. Morbi tincidunt, urna nec commodo vulputate, nisi nunc commodo libero, vel lacinia elit metus et quam. Phasellus ac magna ut erat ultrices efficitur. Nullam fermentum massa sed nunc fringilla, nec lacinia turpis dictum.
                            </p>
                            <div className="alternatives">
                                {alternatives[selectedQuestion].map((alt, idx) => (
                                    <div
                                        key={idx}
                                        className={`alternative ${selectedAlternatives[selectedQuestion] === alt.option ? 'selected' : ''}`}
                                    >
                                        <div className={`radio-alternative ${alt.correct ? 'correct' : ''} ${selectedAlternatives[selectedQuestion] === alt.option && !alt.correct ? 'wrong' : ''}`}>
                                            <input
                                                type="radio"
                                                name={`question-${selectedQuestion}`}
                                                value={alt.option}
                                                checked={selectedAlternatives[selectedQuestion] === alt.option}
                                                readOnly
                                                className="alternative-input"
                                            />
                                            <span className='label-option'>{alt.option.toUpperCase()}</span> 
                                        </div>
                                        <label className='label-text'>
                                            {alt.text}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

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
    );
}

export default QuestionGrid;
