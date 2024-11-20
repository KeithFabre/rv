import React from 'react';
import './login.css';
import logo from '../../assets/230616_RV_logo_principal_positivo-cor.png';
import FormLogin from '../../components/login/form_login';

function Login() {
  return (
    <div className='page-container login'>
      <div className='login-container'>
        <FormLogin />
      </div>
    </div>
  );
}

export default Login;