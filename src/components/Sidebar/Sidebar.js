import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import logo from '../../assets/230616_RV_logo_restrito_negativo-branco.png';

import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';

import './Sidebar.css';

function Sidebar() {

  const [firstAccess, setFirstAccess] = useState(true);
  const navigate = useNavigate();

    useEffect(() => {
        const storedFirstAccess = localStorage.getItem('firstAccess');
        if (storedFirstAccess === 'false') {
            setFirstAccess(false);
        }
    }, []);


    // melhorar isso aqui
    const handleLogout = () => {
      // Clear localStorage
      localStorage.clear();
      // Redirect to login page
      navigate('/login');
    };

  return (
    <div className="sidebar">
      <div className='sidebar-content'>
        <ul>
            <li>
            <Link to="/">
              <img src={logo} alt="Logo" className='logo-image' />
            </Link>              
            </li>

              <li>
                <Link to="/dashboard">
                    <DescriptionOutlinedIcon style={{ color: '#fff', fontSize: 45 }} className='sidebar-icon' />
                </Link>
            </li>

            {/* {!firstAccess && (
            )} */}

                <li>
                  <Link to="/historico">
                  <SignalCellularAltOutlinedIcon style={{ color: '#fff', fontSize: 40 }} className='sidebar-icon' />
                  </Link>
                </li>


            {/* {!firstAccess && (
            )} */}

          

          {/* <li>
            <Link to="/perfil">
            <PersonOutlineOutlinedIcon style={{ color: '#fff', fontSize: 40 }} className='sidebar-icon' />
            </Link>
          </li> */}

          <li>
            <Link to="/ranking">
            <EmojiEventsOutlinedIcon style={{ color: '#fff', fontSize: 40 }} className='sidebar-icon' />
            </Link>
          </li>


          <li onClick={handleLogout}>
            <Link to="/login" className='logout'>
                <LogoutOutlinedIcon style={{ color: '#fff', fontSize: 45 }} className='logout-icon'/>
            </Link>
        </li>





        </ul>
      </div>
    </div>
  );
}

export default Sidebar;