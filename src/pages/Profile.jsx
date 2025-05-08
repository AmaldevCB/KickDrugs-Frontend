import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import ProfileForm from '../components/ProfileForm'
import { useNavigate } from 'react-router-dom'
import { logout } from '../services/commonFunctions'

function Profile() {
    const navigate = useNavigate()

    useEffect(()=>{
        const token = sessionStorage.getItem('token');   
        if(!token){
            toast.error('Login for access')
            navigate('/')
        } 
    },[])
    return (
        <>
            <div className="row">
                <div className="col-md-2 p-0">
                    <div className="collapse d-md-block" id="sidebarMenu">
                        <Sidebar />
                    </div>
                </div>
                <div className="col px-5">
                    <div className="d-flex justify-content-between  mt-4">
                        <div className="">
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
                                    <li><a class="dropdown-item" onClick={()=>logout(navigate)}>Logout</a></li>
                                </ul>
                            </div>
                            <button
                                className="btn btn-outline-dark d-md-none"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#sidebarMenu"
                                aria-controls="sidebarMenu"
                                aria-expanded="false"
                                aria-label="Toggle sidebar"
                            >
                                <FontAwesomeIcon icon={faBars} />
                            </button>

                        </div>
                    </div>
                    <h6>Kindly fill your details and make the complete</h6>
                    <div id='box' className='my-4'>
                        <div id='innerBox' className='p-md-4 p-3'>
                            <ProfileForm/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile