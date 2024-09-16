import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import './Perfil.css';

import { ReactComponent as SaludationSvg } from '../../assets/saludation.svg';

function Perfil() {
    const [firstAccess, setFirstAccess] = useState(true);

    useEffect(() => {
        const storedFirstAccess = localStorage.getItem('firstAccess');
        if (storedFirstAccess === 'false') {
            setFirstAccess(false);
        }
    }, []);

    const handleFinalizeCadastro = () => {
        // Set firstAccess to false and update localStorage
        setFirstAccess(false);
        localStorage.setItem('firstAccess', 'false');
    };

    return (
        <div className='page-container profile'>
            <div className='menu'>
                <Sidebar />
            </div>
            <div className='profile-container'>
            {firstAccess && (
                <div className='form-profile'>
                    <h1>Olá, [usuário]!</h1>
                    <h3>Finalize seu cadastro</h3>
                        <Link to="/">
                            <button className='button first-access' onClick={handleFinalizeCadastro}>
                                Finalizar cadastro
                            </button>
                        </Link>
                </div>
            )}

            {!firstAccess && (
                <div className='user-info'>
                    <h2>Olá, [usuário]!</h2>
                    <SaludationSvg className='saludation-svg profile'/>   
                </div>
            )}

            

            </div>
        </div>
    );
}

export default Perfil;
