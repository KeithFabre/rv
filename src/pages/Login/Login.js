import React from 'react';
import './Login.css'
import { Link } from 'react-router-dom';
import logo from '../../assets/230616_RV_logo_restrito_negativo-branco.png';

function Login() {
    return (
        <div className='page-container'>
            <div className='login-container'>
                {/* <div class="background">
                    <div class="shape"></div>
                    <div class="shape"></div>
                </div> */}

                <form>
                    <img src={logo} alt="Logo" className='login-logo' />
                    <h3>Login</h3>

                    <label for="username">Usuário</label>
                    <input type="text" placeholder="Email" id="username" />

                    <label for="password">Senha</label>
                    <input type="password" placeholder="Senha" id="password" />

                    <Link to="/">
                        <button>
                                Entrar na Plataforma RV
                        </button>
                    </Link>

                </form>
  
  
            </div>
        </div>
    );
}

export default Login;