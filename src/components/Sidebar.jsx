import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRightFromBracket, faBox, faDownload, faGear, faLink,
    faLocationDot, faMedal, faTableCellsLarge, faUser, faWarehouse
} from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';
import './Sidebar.css';
import { logout } from '../services/commonFunctions';

function Sidebar() {
    const navigate = useNavigate()
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div id='sidebarMenu' className="p-3 w-100" style={{ backgroundColor: "#F7FFEF" }}>
            <div className="d-flex justify-content-between">
                <a href="/dashboard"><img src={logo} alt="Logo" width={"100vh"} /></a>
                
            </div>
            <ul className="nav flex-column mt-5">
                <Link to="/dashboard" className='nav-link'>
                    <li className={`nav-item rounded ${isActive('/dashboard') ? 'active-link' : ''}`}>
                        <FontAwesomeIcon icon={faTableCellsLarge} className="me-2" /> Dashboard
                    </li>
                </Link>
                <Link to="/menu2" className='nav-link'>
                    <li className={`nav-item rounded ${isActive('/menu2') ? 'active-link' : ''}`}>
                        <FontAwesomeIcon icon={faLocationDot} className="me-2" /> Menu 02
                    </li>
                </Link>
                <Link to="/menu3" className='nav-link'>
                    <li className={`nav-item rounded ${isActive('/menu3') ? 'active-link' : ''}`}>
                        <FontAwesomeIcon icon={faBox} className="me-2" /> Menu 03
                    </li>
                </Link>
                <Link to="/menu4" className='nav-link'>
                    <li className={`nav-item rounded ${isActive('/menu4') ? 'active-link' : ''}`}>
                        <FontAwesomeIcon icon={faWarehouse} className="me-2" /> Menu 04
                    </li>
                </Link>
                <Link to="/menu5" className='nav-link'>
                    <li className={`nav-item rounded ${isActive('/menu5') ? 'active-link' : ''}`}>
                        <FontAwesomeIcon icon={faLink} className="me-2" /> Menu 05
                    </li>
                </Link>
                <Link to="/menu6" className='nav-link'>
                    <li className={`nav-item rounded ${isActive('/menu6') ? 'active-link' : ''}`}>
                        <FontAwesomeIcon icon={faMedal} className="me-2" /> Menu 06
                    </li>
                </Link>
                <Link to="/downloads" className='nav-link'>
                    <li className={`nav-item rounded ${isActive('/downloads') ? 'active-link' : ''}`}>
                        <FontAwesomeIcon icon={faDownload} className="me-2" /> Downloads
                    </li>
                </Link>
            </ul>

            <ul className="nav flex-column mt-4">
                <Link to="/profile" className='nav-link'>
                    <li className={`nav-item rounded ${isActive('/profile') ? 'active-link' : ''}`}>
                        <FontAwesomeIcon icon={faUser} className="me-2" /> My Profile
                    </li>
                </Link>
                <Link to="/settings" className='nav-link'>
                    <li className={`nav-item rounded ${isActive('/settings') ? 'active-link' : ''}`}>
                        <FontAwesomeIcon icon={faGear} className="me-2" /> Settings
                    </li>
                </Link>
                <button onClick={() => logout(navigate)} className='nav-link'>
                    <li className={`nav-item rounded ${isActive('/logout') ? 'active-link' : ''}`}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className="me-2" /> Logout
                    </li>
                </button>
            </ul>

            <p className="mt-3 text-center">Ver 1.21</p>
        </div>
    );
}

export default Sidebar;
