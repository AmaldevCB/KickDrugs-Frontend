import React, { useState } from 'react'
import { resetPswdApi, sendOtpApi } from '../services/allApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function ForgotPswd() {
    const navigate = useNavigate()
    const [flag, setFlag] = useState("1")
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [pass,setPass]=useState({
        new:"",
        confirm:""
    })
    const sendOtp = async () => {
        const result = await sendOtpApi({ email })
        console.log(result);
        if (result.status == 200) {
            toast.success("OTP send to your Email")
            setFlag("2")
        } else {
            toast.error("Invalid email")
        }
    }
    const submitOtp = async () => {
        const result = await sendOtpApi({ email, otp })
        console.log(result);
        if (result.status == 200) {
            toast.success("OTP verified successfully")
            setFlag("3")
            return
        }
        if (result.status == 400) {

        }
    }
    const newPass=async()=>{
        if(pass.new==pass.confirm){
            const result = await resetPswdApi({email,newPassword:pass.new})
            if (result.status == 200) {
            toast.success("Password updated successfully")
            navigate("/", { replace: true });
        }
        }else{
            toast.warning('Please Comfirm the password')
            return
        }
    }
    return (
        <>
            <div className="container">
                <div className=" mt-5 border border-2 rounded border-success" style={{ height: "90vh" }}>

                    <div className="d-flex justify-content-center">

                        {flag == 1 &&
                            <div className="mt-5 border border-success border-2 rounded p-4">
                                <h1 className='text-success text-center'>Forgot Password</h1>
                                <hr className='' />
                                <input required type="email" onChange={(e) => setEmail(e.target.value)} value={email} className='form-control border-2' placeholder='Enter your email' />
                                <button onClick={sendOtp} className="btn btn-secondary w-100 mt-2 ">Get Otp</button>
                            </div>
                        }
                        {flag == 2 &&
                            <div className="mt-5 border border-success border-2 rounded p-4">
                                <h1 className='text-danger text-center'>Enter OTP</h1>
                                <hr className='' />
                                <input required type="text" onChange={(e) => setOtp(e.target.value)} value={otp} className='form-control border-2' placeholder='Enter the otp' />
                                <button onClick={submitOtp} className="btn btn-success w-100 mt-2 ">Verify Otp</button>
                            </div>}
                       {flag==3&& 
                        <div className="mt-5 border border-success border-2 rounded p-4">
                            <h1 className='text-primary text-center'>New Password</h1>
                            <hr className='' />
                            <input required type="password" onChange={(e) => setPass({...pass,new:e.target.value})} className='form-control border-2' placeholder='Enter new password' />
                            <input required type="password" onChange={(e) => setPass({...pass,confirm:e.target.value})}  className='form-control border-2 mt-2' placeholder='Confirm new password' />

                            <button onClick={newPass} className="btn btn-success w-100 mt-2 ">Set new password</button>
                        </div>}
                    </div>
                </div>
            </div>

        </>

    )
}

export default ForgotPswd