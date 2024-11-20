import React from 'react';
import Sidebar from '../../components/base/Sidebar/Sidebar';
import ExamsHistoryContent from '../../components/exams_history/exams_history_content';
import './exams_history.css';

function ExamsHistory() {
  return (
    <div className='page-container'>
      <div className='menu'>
        <Sidebar />
      </div>
      <div className='content'>
        <ExamsHistoryContent />
      </div>
    </div>
  );
}

export default ExamsHistory;