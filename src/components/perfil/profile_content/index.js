import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import './profile_content.css';
import { ReactComponent as SaludationSvg } from '../../../assets/saludation.svg';

function ProfileContent() {
  const [firstAccess, setFirstAccess] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedFirstAccess = localStorage.getItem('firstAccess');
    const storedUserName = localStorage.getItem('userName');

    if (storedFirstAccess === 'false') {
      setFirstAccess(true);
    }

    if (storedUserName) {
      setUserName(storedUserName);
      localStorage.setItem('firstAccess', 'false');
    }
  }, []);

  const handleFinalizeCadastro = () => {
    setFirstAccess(true);
    localStorage.setItem('firstAccess', 'false');
  };

  return (
    <div className='user-info'>
      <h2 className='saludation-hey'>Olá, {userName}!</h2>
      <SaludationSvg className='saludation-svg profile'/>
    </div>
  );
}

export default ProfileContent;