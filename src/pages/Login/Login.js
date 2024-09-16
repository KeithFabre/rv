import React from 'react';
import './Login.css'
import { Link } from 'react-router-dom';
import logo from '../../assets/230616_RV_logo_principal_positivo-cor.png';

function Login() {
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

                    <input type="text" placeholder="Email" id="email" />

                    <input type="password" placeholder="Senha" id="password" />

                    <Link to="/perfil">
                        <button className='button'>
                                Entrar
                        </button>
                    </Link>

                    <Link to="/cadastro" className="no-link-style" >
                        <div className='link-cadastro'>
                                Cadastre-se aqui
                        </div>
                    </Link>

                    <Link to="/esqueciasenha" className="no-link-style" >
                        <div className='link-cadastro esqueci-senha'>
                                Esqueci a Senha
                        </div>
                    </Link>

                </form>
  
  
            </div>
        </div>
    );
}

export default Login;