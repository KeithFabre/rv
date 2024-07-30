import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';

function ExamHistory() {
    return (
        <div className='page-container'>
            <div className='menu'>
                <Sidebar />
            </div>
            <div className='content'>
                <h2>Histórico de Simulados</h2>
            </div>
        </div>
    );
}

export default ExamHistory;
