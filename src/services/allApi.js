import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"


// admin login
export const adminLoginApi = async(reqbody)=>{
    return await commonApi('POST',`${serverUrl}/admin-login`,reqbody)
}

// add user
export const addUserApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/add-user`,reqBody)
}

// get gender
export const getGenderApi=async()=>{
    return await commonApi('GET',`${serverUrl}/genders`)
}

// get cetegory
export const getCatApi=async()=>{
    return await commonApi('GET',`${serverUrl}/categories`)
}

// send otp
export const sendOtpApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/admin/send-otp`,reqBody)
}

// submit otp
export const submitOtpApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/admin/admin/verify-otp`,reqBody)
}

// reset password
export const resetPswdApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/admin/reset-password`,reqBody)
}