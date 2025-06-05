import React, { useEffect, useState } from 'react'
import './ProfileForm.css'
import html2canvas from "html2canvas";
import { addUserApi } from '../services/allApi';
import { toast } from 'react-toastify';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';

function ProfileForm() {
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        dateOfBirth: "",
        phone: "",
        email: "",
        district: "",
        panchayat: "",
        card: ""
    });
    const today = new Date().toISOString().split('T')[0];
    const [flag, setFlag] = useState("")
    const [random, setRandom] = useState("")
    console.log(formData);

    const addUser = async () => {
        const canvas = await html2canvas(document.getElementById("card-preview"));
        const cardImg = canvas.toDataURL("image/png");
        const updatedFormData = { ...formData, card: cardImg }
        const result = await addUserApi(updatedFormData)
        console.log(result);

        if (result.status == 200) {
            toast.success('User added successfully \n Your ID card sent to Email')
            setFlag(result)
        } else if (result.status == 406) {
            toast.warning('Profile already exists')
        } else {
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
        if (formData.phone.length !== 10) {
            toast.error("Phone number must be exactly 10 digits");
            return;
        }
        const res = await addUser()
        if (res?.status == 200) {
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
                                        <input onChange={handleImageChange} max-size="2048" accept='.jpg,.jpeg,.png' type="file" name='image' className='form-control' required />
                                    </div>
                                </div>
                                <p className="text-danger">Only jpg, jpeg, png less than 2MB</p>
                            </div>
                            <div className='col-sm-6'>
                                <h6 className='fw-bold'>Date of Birth <span className="text-danger">*</span></h6>
                                <div id="out">
                                    <div id="inn">
                                        <input value={formData.dateOfBirth} onChange={handleChange} type="date" name='dateOfBirth' max={today} className='form-control' required />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mb-3'>
                            <h6 className='fw-bold'>Phone Number <span className="text-danger">*</span></h6>
                            <div id="out">
                                <div id="inn">
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="form-control"
                                        placeholder="Enter Phone Number"
                                        maxLength="10"
                                        value={formData.phone}
                                        onChange={(e) => {
                                            const onlyDigits = e.target.value.replace(/\D/g, '');
                                            if (onlyDigits.length <= 10) {
                                                setFormData({ ...formData, phone: onlyDigits });
                                            }
                                        }}
                                        required
                                    />
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
                                    <select value={formData.district} name="district" id="district" className='form-select' onChange={handleChange}>
                                        <option value="" selected disabled>Select your district</option>
                                        <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                                        <option value="Kollam">Kollam</option>
                                        <option value="Pathanamthitta">Pathanamthitta</option>
                                        <option value="Alappuzha">Alappuzha</option>
                                        <option value="Kottayam">Kottayam</option>
                                        <option value="Idukki">Idukki</option>
                                        <option value="Ernakulam">Ernakulam</option>
                                        <option value="Thrissur">Thrissur</option>
                                        <option value="Plakkad">Plakkad</option>
                                        <option value="Malappuram">Malappuram</option>
                                        <option value="Wayanad">Wayanad</option>
                                        <option value="Kozhikode">Kozhikode</option>
                                        <option value="Kannur">Kannur</option>
                                        <option value="Kasargod">Kasargod</option>

                                    </select>
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
                            <div id="card-preview" className="d-flex justify-content-center align-items-center py-4">
                                <div className="id-card">
                                    <div className="id-badge">ID {random}</div>

                                    <img src={formData.image || 'https://cdn-icons-png.flaticon.com/512/8801/8801434.png'} alt="Candidate" className="id-photo" />

                                    <div className="id-name">{formData.name || 'Your Name'}</div>

                                    <div className="id-location">
                                        Panchayat: {formData.panchayat} <br />
                                        District: {formData.district}
                                    </div>

                                    <div className="id-qr">
                                        <QRCodeCanvas
                                            value={random}
                                            bgColor="#ffffff"
                                            fgColor="#000000"
                                            renderAs="svg"
                                            level="H"
                                        />
                                    </div>
                                    <div className="id-issued">Self Issued: {today}</div>
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