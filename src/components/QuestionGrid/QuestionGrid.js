import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './QuestionGrid.css';

function QuestionGrid() {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [questionStatus, setQuestionStatus] = useState([]);
    const [alternatives, setAlternatives] = useState([]);
    const [selectedAlternatives, setSelectedAlternatives] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const location = useLocation();
    const expandedExam = location.state?.expandedExam || 'C. H. T.';

    useEffect(() => {
        generateQuestions();
    }, []);

    const generateQuestions = () => {
        const totalQuestions = 45;
        const minCorrectAnswers = Math.ceil(totalQuestions / 2) + 1; // Ensure more correct answers
        const initialAlternatives = [];
        const status = [];

        // Ensure a minimum number of correct answers
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

        // Fill the rest of the questions
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

    return (
        <div className="questions-container">
            <div className='exam-selector'>
                <Link to="/detalhes" state={{ expandedExam: 'C. H. T.' }} className="no-link-style" onClick={handleLinkClick}>
                    <div className='exam'>{expandedExam === 'C. H. T.' ? 'Ciências Humanas e Suas Tecnologias' : 'C. H. T.'}</div>
                </Link>
                <Link to="/detalhes" state={{ expandedExam: 'C. N. T.' }} className="no-link-style" onClick={handleLinkClick}>
                    <div className='exam'>{expandedExam === 'C. N. T.' ? 'Ciências da Natureza e suas Tecnologias' : 'C. N. T.'}</div>
                </Link>
                <Link to="/detalhes" state={{ expandedExam: 'L. C. T.' }} className="no-link-style" onClick={handleLinkClick}>
                    <div className='exam'>{expandedExam === 'L. C. T.' ? 'Linguagens, Códigos e suas Tecnologias' : 'L. C. T.'}</div>
                </Link>
                <Link to="/detalhes" state={{ expandedExam: 'M. T.' }} className="no-link-style" onClick={handleLinkClick}>
                    <div className='exam'>{expandedExam === 'M. T.' ? 'Matemática e suas Tecnologias' : 'M. T.'}</div>
                </Link>
                <Link to="/detalhes" state={{ expandedExam: 'R.' }} className="no-link-style" onClick={handleLinkClick}>
                    <div className='exam'>{expandedExam === 'R.' ? 'Redação' : 'R.'}</div>
                </Link>
            </div>

            <div className="grid-container">
                <div className="grid">
                    {questionStatus.map((status, index) => (
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
                {selectedQuestion !== null && (
                    <div className="question-sidebar">
                        <p className='question-sidebar-title'>Detalhes da Questão {selectedQuestion + 1}</p>
                        <div className="question-sidebar-statistic-container">
                            <div className="question-sidebar-statistic"></div>
                            <div className="question-sidebar-statistic"></div>
                        </div>
                    </div>
                )}
            </div>
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
        </div>
    );
}

export default QuestionGrid;
