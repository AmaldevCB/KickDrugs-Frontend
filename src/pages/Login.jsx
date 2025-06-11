import React, { useEffect, useState } from 'react';
import './login.css';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { adminLoginApi } from '../services/allApi';
import { toast } from 'react-toastify';
import { serverUrl } from '../services/serverUrl';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({
        username: "",
        password: "",
        role: "",
        remember: false
    })
    console.log(userDetails);
   const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!userDetails.username || !userDetails.password || !userDetails.role) {
        toast.warning('Please fill the details completly');
        return;
    }

    try {
        const result = await adminLoginApi(userDetails);
        console.log(result);

        if (result.status === 200) {
            toast.success('Administrator logged in');
            navigate('/dashboard', { replace: true });
        } else if (result.status === 401) {
            toast.warning('Wrong Email/Password');
        } else {
            toast.error('Something went wrong');
        }
    } catch (error) {
        console.error("Login Error:", error);  
        toast.error('Login failed: ' + (error.response?.data?.message || error.message));
    }
};

    useEffect(() => {
        axios.get(`${serverUrl}/dashboard`, { withCredentials: true })
            .then(() => {
                navigate('/dashboard', { replace: true }); 
            })
            .catch(() => {
            });
    }, [navigate]);
    return (
        <>
            <Header />
            <div id="main" className="d-flex justify-content-center container mt-4 mb-5">
                <div className='row d-flex justify-content-center'>
                    <div id="loginDiv" className='col-lg-5 col-10 col-md-8'>
                        <form className="p-4" onSubmit={handleAdminLogin}>
                            <h4 className="fw-bold mt-2 mb-3">Admin Login</h4>

                            <div className="mb-3">
                                <input required onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} value={userDetails.username} type="email" id='input' className="form-control" placeholder="Enter Email ID/username" />
                            </div>

                            <div className="mb-3">
                                <input required onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} value={userDetails.password} type="password" id='input' className="form-control" placeholder="Enter Password" />
                            </div>

                            <div className="mb-3">
                                <select required onChange={(e) => setUserDetails({ ...userDetails, role: e.target.value })} id='input' className="form-select">
                                    <option value="" selected disabled>Choose Category (Admin, Super Admin, etc)</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Super Admin">Super Admin</option>
                                </select>
                            </div>

                            <div className="mb-3 d-flex justify-content-between">
                                <div className="form-check" >
                                    <input className="form-check-input" type="checkbox" id="rememberMe" checked={userDetails.remember} onChange={(e) => setUserDetails({ ...userDetails, remember: e.target.value })} />
                                    <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                                </div>
                                <Link to="/forgotPassword" className="text-danger small">Forgot Password?</Link>
                            </div>

                            <button type='submit' className="btn btn-success w-100">Login</button>
                        </form>
                    </div>
                </div>
            </div>
            <footer className='container'>
                <hr />
                <p className='text-center fst-italic text-primary'>Designed and Developed By Penoft Technologies</p>
            </footer>
        </>
    );
}

export default Login;
