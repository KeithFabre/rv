import React from 'react';
import Sidebar from '../../components/base/Sidebar/Sidebar';
import RankingContent from '../../components/ranking/ranking_content';
import './ranking.css';

function Ranking() {
  return (
    <div className='page-container'>
      <div className='menu'>
        <Sidebar />
      </div>
      <div className='content'>
        <RankingContent />
      </div>
    </div>
  );
}

export default Ranking;