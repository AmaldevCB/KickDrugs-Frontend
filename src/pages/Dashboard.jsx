import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { faBars, faBell, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DashboardCharts from '../components/DashboardCharts'
import './Dashboard.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout } from '../services/commonFunctions'

function Dashboard() {
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
                            <h3>Hi, User!</h3>
                        </div>
                        <div className=" d-flex align-items-center">
                            <FontAwesomeIcon className='fs-4 text-secondary ' icon={faBell} />
                            <FontAwesomeIcon className='text-success fs-4 ms-2 ' icon={faCircleUser} />
                            <div class="dropdown">
                                <button class="btn dropdown-toggle " type="button" id="loginSignupDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    User
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="loginSignupDropdown">
                                    <li  onClick={()=>logout(navigate)}><a class="dropdown-item">Logout</a></li>
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
                    <h6>Here is your analytics</h6>
                    <div id='box' className='my-4'>
                        <div id='innerBox'>
                            <DashboardCharts />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard