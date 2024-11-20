import React from 'react';
import Sidebar from '../../components/base/Sidebar/Sidebar';
import StatisticsContent from '../../components/statistics/statistics_content';
import './statistics.css';

function Statistics() {
  return (
    <div className='page-container'>
      <div className='menu'>
        <Sidebar />
      </div>
      <div className='content'>
        <StatisticsContent />
      </div>
    </div>
  );
}

export default Statistics;