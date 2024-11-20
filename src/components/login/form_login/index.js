import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../../assets/230616_RV_logo_principal_positivo-cor.png';
// import './form_login.css';

function FormLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // não deixa a submissão recarregar a página


    try {

        const response = await fetch(`https://rvcurso.com.br/get.php?action=login&email=${email}&password=${password}`
        );

        const data = await response.json();
        console.log(data)

        if (data.status === 0) {
            // guarda nome e id no localStorage
            localStorage.setItem('userID', data.ID_usuario);
            localStorage.setItem('userName', data.nome);

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
    <form onSubmit={handleLogin}>
        <Link to="/login" className="no-link-style">
        <img src={logo} alt="Logo" className='login-logo' />
      </Link>
      <input type="text" placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button className='button' type="submit"> Entrar </button>
    </form>
  );
}

export default FormLogin;