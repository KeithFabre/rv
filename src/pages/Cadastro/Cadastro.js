import React from 'react';
import './Cadastro.css'
import { Link } from 'react-router-dom';
import logo from '../../assets/230616_RV_logo_principal_positivo-cor.png';

function Cadastro() {
    return (
        <div className='page-container login'>
            <div className='login-container signup'>

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

                    <input type="text" placeholder="Nome Completo" id="nome" />

                    <input type="number" placeholder="CPF" id="cpf" />

                    <input type="date" placeholder="Data de Nascimento" id="data_nascimento" />

                    <input type="text" placeholder="Pronome" id="pronome" />

                    <input type="text" placeholder="Nome Curto" id="nome_curto" />

                    <input type="text" placeholder="CEP" id="cep" />

                    <input type="text" placeholder="Endereço" id="endereco" />

                    <input type="number" placeholder="Celular" id="nome" />

                    <input type="number" placeholder="Tipo do usuário" id="nome" />

                    <Link to="/login">
                        <button className='button'>
                                Cadastrar
                        </button>
                    </Link>

                </form>
  
  
            </div>
        </div>
    );
}

export default Cadastro;