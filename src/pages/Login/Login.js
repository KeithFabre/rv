import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/230616_RV_logo_principal_positivo-cor.png';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // To programmatically navigate after login

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page


        try {

            const response = await fetch(`https://rvcurso.com.br/get.php?action=login&email=${email}&password=${password}`
            );

            const data = await response.json();
            console.log(data)

            if (data.status === 0) {
                // Store ID and name in localStorage
                localStorage.setItem('userID', data.ID_usuario);
                localStorage.setItem('userName', data.nome);

                // Login successful, navigate to the profile page
                // coloquei / por enquanto, depois voltar pra /perfil 
                // quando mandar pra /perfil ele vai contar uns segundos e depois
                // redirecionar pro /
                navigate('/', { state: { userID: data.ID_usuario, userName: data.nome } });
            } else {
                // Login failed, show an error message
                setErrorMessage('Login falhou. Cheque suas credenciais.');
            }
        } catch (error) {
            console.error('Erro ao logar: ', error);
            setErrorMessage('Um erro ocorreu. Tente novamente mais tarde.');
        }



        
    };

    return (
        <div className='page-container login'>
            <div className='login-container'>
                <form onSubmit={handleLogin}>
                    <Link to="/login" className="no-link-style">
                        <img src={logo} alt="Logo" className='login-logo' />
                    </Link>

                    <input 
                        type="text" 
                        placeholder="Email" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />

                    <input 
                        type="password" 
                        placeholder="Senha" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <button className='button' type="submit">
                        Entrar
                    </button>

                    {/* <Link to="/cadastro" className="no-link-style">
                        <div className='link-cadastro'>
                            Cadastre-se aqui
                        </div>
                    </Link>

                    <Link to="/esqueciasenha" className="no-link-style">
                        <div className='link-cadastro esqueci-senha'>
                            Esqueci a Senha
                        </div>
                    </Link> */}


                </form>
            </div>
        </div>
    );
}

export default Login;