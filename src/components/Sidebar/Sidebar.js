import React from 'react';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
import logo from '../../assets/230616_RV_logo_restrito_negativo-branco.png';

import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className='sidebar-content'>
        <ul>
            <li>
              {/* <p className='logo'>RV</p> */}
              <img src={logo} alt="Logo" className='logo-image' />
            </li>
          <li>
            <Link to="/">
                <HomeOutlinedIcon style={{ color: '#fff', fontSize: 45 }} className='home-icon' />
            </Link>
        </li>
          <li>
            <Link to="/historico">
            <FormatListNumberedOutlinedIcon style={{ color: '#fff', fontSize: 40 }} />
            </Link></li>
          <li>
            <Link to="/login" className='logout'>
                <LogoutOutlinedIcon style={{ color: '#fff', fontSize: 45 }} />
            </Link>
        </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
