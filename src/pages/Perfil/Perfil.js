// pages/Perfil.js
import React from 'react';
import Sidebar from '../../components/base/Sidebar/Sidebar';
import ProfileContent from '../../components/perfil/profile_content';
import './perfil.css';

function Perfil() {
  return (
    <div className='page-container profile'>
      <div className='menu'>
        <Sidebar />
      </div>
      <div className='content'>
        <ProfileContent />
      </div>
    </div>
  );
}

export default Perfil;