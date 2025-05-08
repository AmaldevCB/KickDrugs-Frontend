import React from 'react'
import { faBell, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.png'
import './Header.css'

function Header() {
    return (
        <>
            <Navbar expand="lg" id='nav-bar' className=" py-3 px-4">
                <Navbar.Brand href="#home">
                    <img src={logo} alt="" width={"100vh"} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-md-5">
                        <Nav.Link className='me-5' href="#home">Menu 1</Nav.Link>
                        <Nav.Link className='me-5' href="#link">Menu 2</Nav.Link>
                        <Nav.Link className='me-5' href="#home">Menu 3</Nav.Link>
                        <Nav.Link className='me-5' href="#link">Menu 4</Nav.Link>
                    </Nav>
                    <div className='ms-auto'>
                        <div className=" d-flex">
                            <FontAwesomeIcon className='fs-4 text-secondary mt-2' icon={faBell} />
                            <FontAwesomeIcon className='text-success fs-4 ms-2 mt-2' icon={faCircleUser} />
                            <div class="dropdown">
                                <button class="btn dropdown-toggle text-success" type="button" id="loginSignupDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    Login/Signup
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="loginSignupDropdown">
                                    <li><a class="dropdown-item" href="/">Login</a></li>
                                    <li><a class="dropdown-item" href="#">Signup</a></li>
                                </ul>
                            </div>
                        </div>
                        <span id='signup' >Kindly login or signup to proceed</span>
                    </div>

                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Header