import React, { useEffect, useState } from 'react'
import './ProfileForm.css'
import kickDrug from '../assets/kickDrug.png'
import banner from '../assets/banner.png'
import html2canvas from "html2canvas";
import { addUserApi } from '../services/allApi';
import { toast } from 'react-toastify';

function ProfileForm() {
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        dateOfBirth: "",
        phone: "",
        email: "",
        district: "",
        panchayat: "",
    });
    const [flag,setFlag]=useState("")
    const [random, setRandom] = useState("")
    console.log(formData);

    const addUser = async () => {
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
        const result = await addUserApi(formData, reqHeader)
        console.log(result);
        
        if (result.status == 200) {
            toast.success('User added successfully')
            setFlag(result)
        } else if(result.status == 406) {
            toast.warning('Profile already exists')
        }else{
            toast.error('Adding failed')
        }
        return result;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleImageChange = (e) => {
        const image = e.target.files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            setFormData({ ...formData, image: reader.result });
        }
        if (image) {
            reader.readAsDataURL(image)
        }
    };
    const handleDownload = async (e) => {
        e.preventDefault();
        const res = await addUser()
        if (res?.status == 200) {
            const cardElement = document.getElementById("card-preview");
            html2canvas(cardElement).then((canvas) => {
                const link = document.createElement("a");
                link.download = "card.png";
                link.href = canvas.toDataURL();
                link.click();
            });
            setFormData({
                name: "",
                image: "",
                dateOfBirth: "",
                phone: "",
                email: "",
                district: "",
                panchayat: "",
            })
    
        }
    };
    const randomId = () => {
        const id = Math.random().toString(36).substr(2, 7).toUpperCase()
        setRandom(id)
    }
    useEffect(() => {
        randomId()
    }, [flag])
    console.log(random);

    return (
        <>
            <div className="row g-5">
                <div className="col-md-6">
                    <form action="">
                        <div className='mb-3'>
                            <h6 className='fw-bold'>Your Full Name <span className="text-danger">*</span></h6>
                            <div id="out">
                                <div id="inn">
                                    <input value={formData.name} onChange={handleChange} type="text" name='name' className='form-control' placeholder='Type Text here' required />
                                </div>
                            </div>
                        </div>
                        <div className='mb-3 row g-2'>
                            <div className='col-sm-6'>
                                <h6 className='fw-bold'>Add Your Images <span className="text-danger">*</span></h6>
                                <div id="out">
                                    <div id="inn">
                                        <input onChange={handleImageChange} type="file" name='image' className='form-control' required />
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <h6 className='fw-bold'>Date of Birth <span className="text-danger">*</span></h6>
                                <div id="out">
                                    <div id="inn">
                                        <input value={formData.dateOfBirth} onChange={handleChange} type="date" name='dateOfBirth' className='form-control' required />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mb-3'>
                            <h6 className='fw-bold'>Phone Number <span className="text-danger">*</span></h6>
                            <div id="out">
                                <div id="inn">
                                    <input inputMode="numeric" pattern="[0-9]*" value={formData.phone} onChange={handleChange} type="text" name='phone' className='form-control' placeholder='Enter Phone Number' required />
                                </div>
                            </div>
                        </div>
                        <div className='mb-3'>
                            <h6 className='fw-bold'>Email Id <span className="text-danger">*</span></h6>
                            <div id="out">
                                <div id="inn">
                                    <input value={formData.email} onChange={handleChange} type="text" name='email' className='form-control' placeholder='Enter Email' required />
                                </div>
                            </div>
                        </div>
                        <div className='mb-3'>
                            <h6 className='fw-bold'>District <span className="text-danger">*</span></h6>
                            <div id="out">
                                <div id="inn">
                                    <input value={formData.district} onChange={handleChange} type="text" name='district' className='form-control' placeholder='Enter your District' required />
                                </div>
                            </div>
                        </div>
                        <div className='mb-3'>
                            <h6 className='fw-bold'>Panchayath <span className="text-danger">*</span></h6>
                            <div id="out">
                                <div id="inn">
                                    <input value={formData.panchayat} onChange={handleChange} type="text" name='panchayat' className='form-control' placeholder='Enter your Panchayath' required />
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <button type='submit' onClick={handleDownload} className="btn btn-success w-100">
                                Submit & Download
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-md-6">
                    <div id="out" className=''>
                        <div id="inn-card" className='p-4'>
                            <div id='card-preview'>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="bg-success text-center mx-3 text-light py-2 px-md-4 px-1">
                                            ID <span className='fs-6'>{random}</span>
                                        </div>
                                        <div className="text-center mt-3">
                                            <img src={kickDrug} className='img-fluid' alt="" />
                                        </div>
                                        <div className="text-left ms-md-5 mt-3">
                                            <h6>Kerala's largest</h6>
                                            <h6>Anti Drug Campaign</h6>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mt-3 mx-2" id='img'>
                                            <div className='d-flex justify-content-center' style={{ maxHeight: "300px" }}>
                                                <img style={{ borderRadius: "30%", objectFit: 'cover' }} className='img-fluid' src={formData.image ? formData.image : 'https://cdn-icons-png.flaticon.com/512/8801/8801434.png'} alt="Your Image" />
                                            </div>
                                        </div>
                                        <div className="mt-1 text-center">
                                            <h5 style={{ color: "#6DB143" }}>{formData.name ? formData.name : 'Your Name'}</h5>
                                            <h6 className="text-start">Panchayath : {formData.panchayat}</h6>
                                            <h6 className="text-start">District : {formData.district}</h6>

                                        </div>
                                    </div>
                                </div>
                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                    <img src={banner} className='img-fluid' alt="" />
                                    <img style={{ position: "absolute", top: '35%', left: '65%' }} src="https://qrcg-free-editor.qr-code-generator.com/main/assets/images/websiteQRCode_noFrame.png" className='img-fluid ms-5 mb-1' width={"50px"} alt="Qr Code" />
                                    <div style={{ position: "absolute", top: '75%', left: '50%' }}>
                                        <h6 className='text-light fw-normal'>Self Issued: {new Date().toLocaleDateString()}</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center py-2 mt-3 bg-success w-100 text-light rounded">Live Preview</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileForm