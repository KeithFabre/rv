import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import QuestionGrid from '../../components/QuestionGrid/QuestionGrid';

function ExamDetails() {
    const location = useLocation();
    const expandedExam = location.state?.expandedExam || null;

    return (
        <div className='page-container'>
            <div className='menu'>
                <Sidebar />
            </div>
            <div className='content questions'>
                <QuestionGrid />
            </div>
        </div>
    );
}

export default ExamDetails;
