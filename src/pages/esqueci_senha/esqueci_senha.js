import React from 'react';
import './esqueci_senha.css'
import { Link } from 'react-router-dom';
import logo from '../../assets/230616_RV_logo_principal_positivo-cor.png';

function EsqueciSenha() {
    return (
        <div className='page-container login'>
            <div className='login-container'>

                {/* <div class="background">
                    <div class="shape"></div>
                    <div class="shape"></div>
                </div> */}

                <form>
                    <Link to="/login" className="no-link-style" >
                        <img src={logo} alt="Logo" className='login-logo' />
                    </Link>

                    {/* <label for="Email">Usuário</label> */}
                    <input type="text" placeholder="Email" id="email" />

                    {/* <label for="password">Senha</label> */}
                    {/* <input type="password" placeholder="Senha" id="password" /> */}

                    <Link to="/login">
                        <button className='button'>
                                Enviar email de recuperação
                        </button>
                    </Link>

                    

                </form>
  
  
            </div>
        </div>
    );
}

export default EsqueciSenha;