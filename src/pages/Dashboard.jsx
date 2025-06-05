import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { faBars, faBell, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DashboardCharts from '../components/DashboardCharts'
import './Dashboard.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout } from '../services/commonFunctions'
import axios from 'axios'
import { serverUrl } from '../services/serverUrl'

function Dashboard() {
    const navigate = useNavigate()

    useEffect(()=>{
       axios.get(`${serverUrl}/dashboard`, { withCredentials: true })
      .then(() => {})
      .catch(() => {
        toast.error('Login required for access');
        navigate('/');
      });
    },[navigate])
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
                        <div className="">
                            <h3>Hi, Admin</h3>
                        </div>
                        <div className=" d-flex align-items-center">
                            <FontAwesomeIcon className='fs-4 text-secondary ' icon={faBell} />
                            <FontAwesomeIcon className='text-success fs-4 ms-2 ' icon={faCircleUser} />
                            <div class="dropdown">
                                <button class="btn dropdown-toggle " type="button" id="loginSignupDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    Admin
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
            <footer className='container'>
                <hr />
                <p className='text-center fst-italic text-primary'>Designed and Developed By Penoft Technologies</p>
            </footer>
        </>
    )
}

export default Dashboard