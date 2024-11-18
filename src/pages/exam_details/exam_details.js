import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../../components/base/Sidebar/Sidebar';
import QuestionGrid from '../../components/base/QuestionGrid/QuestionGrid';

function ExamDetails() {
    const location = useLocation();
    // const expandedExam = location.state?.expandedExam || null;

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
