import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faCircleUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import ProfileForm from '../components/ProfileForm'
import { useNavigate } from 'react-router-dom'
import { logout } from '../services/commonFunctions'
import axios from 'axios'
import { serverUrl } from '../services/serverUrl'
import logo from '../assets/logo.png';


function Profile() {
    const navigate = useNavigate()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    useEffect(() => {
        axios.get(`${serverUrl}/dashboard`, { withCredentials: true })
            .then(() => { })
            .catch(() => {
                toast.error('Login required for access');
                navigate('/');
            });
    }, [navigate])
    return (
        <>
            <div className="row">
                <div className="col-md-2 p-0">
                    <div className="collapse d-md-none" id="sidebarMenu">
                        <Sidebar />
                    </div>
                    <div className="d-none d-md-block">
                        <Sidebar />
                    </div>
                </div>
                <div className="col px-5">
                    <div className="d-flex justify-content-between  mt-4">
                        <a className='d-md-none' href="/dashboard"><img src={logo} alt="Logo" width={"100vh"} /></a>
                        <div className="mt-3 d-none d-md-block">
                            <h3>Hi, Admin!</h3>
                        </div>

                        <div className=" d-flex align-items-center">
                            <FontAwesomeIcon className='fs-4 text-secondary ' icon={faBell} />
                            <FontAwesomeIcon className='text-success fs-4 ms-2 ' icon={faCircleUser} />
                            <div class="dropdown">
                                <button class="btn dropdown-toggle " type="button" id="loginSignupDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    Admin
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="loginSignupDropdown">
                                    <li><a class="dropdown-item" onClick={() => logout(navigate)}>Logout</a></li>
                                </ul>
                            </div>
                            <button
                                className="btn btn-outline-dark d-md-none"
                                type="button"
                                onClick={toggleSidebar}
                                data-bs-toggle="collapse"
                                data-bs-target="#sidebarMenu"
                                aria-controls="sidebarMenu"
                                aria-expanded={isSidebarOpen}
                                aria-label="Toggle sidebar"
                            >
                                <FontAwesomeIcon icon={isSidebarOpen ? faXmark : faBars} />
                            </button>

                        </div>
                    </div>
                    <div className="mt-3 d-md-none">
                        <h3>Hi, Admin!</h3>
                    </div>
                    <h6>Kindly fill your details and make the complete</h6>
                    <div id='box' className='my-4'>
                        <div id='innerBox' className='p-md-4 p-3'>
                            <ProfileForm />
                        </div>
                    </div>
                </div>

            </div>
            <footer className='container'>
                <hr />
                <p className='text-center fst-italic text-primary'>Designed and Developed By Penoft Technologies</p>
            </footer>
        </>
    )
}

export default Profile