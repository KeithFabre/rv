import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import './Perfil.css';

import { ReactComponent as SaludationSvg } from '../../assets/saludation.svg';

function Perfil() {
    const [firstAccess, setFirstAccess] = useState(true);
    const [userName, setUserName] = useState(''); // Store user's name

    useEffect(() => {
        // Retrieve firstAccess and userName from localStorage
        const storedFirstAccess = localStorage.getItem('firstAccess');
        const storedUserName = localStorage.getItem('userName'); // Retrieve user's name from localStorage

        // pra tirar página de primeiro acesso, voltar pra set(false depois)
        if (storedFirstAccess === 'false') {
            setFirstAccess(true);
        }

        if (storedUserName) {
            setUserName(storedUserName); 
            // coloquei pra tirar página de primeiro acesso
            localStorage.setItem('firstAccess', 'false');
        }
    }, []);

    const handleFinalizeCadastro = () => {
        // Set firstAccess to false and update localStorage
        setFirstAccess(true);
        localStorage.setItem('firstAccess', 'false');
    };

    return (
        <div className='page-container profile'>
            <div className='menu'>
                <Sidebar />
            </div>
            <div className='content'>
            {/* {firstAccess && (
                <div className='form-profile'>
                    <h1>Olá, {userName}!</h1> 
                    <h3>Finalize seu cadastro</h3>
                    <Link to="/">
                        <button className='button first-access' onClick={handleFinalizeCadastro}>
                            Finalizar cadastro
                        </button>
                    </Link>
                </div>
            )} */}
                <div className='user-info'>
                    <h2>Olá, {userName}!</h2> 
                    <SaludationSvg className='saludation-svg profile'/>   
                </div>

            {/* {!firstAccess && (
            )} */}

            </div>
        </div>
    );
}

export default Perfil;
