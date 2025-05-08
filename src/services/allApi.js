import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"


// admin login
export const adminLoginApi = async(reqbody)=>{
    return await commonApi('POST',`${serverUrl}/admin-login`,reqbody)
}

// add user
export const addUserApi=async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/add-user`,reqBody,reqHeader)
}

// get gender
export const getGenderApi=async()=>{
    return await commonApi('GET',`${serverUrl}/genders`)
}

// get cetegory
export const getCatApi=async()=>{
    return await commonApi('GET',`${serverUrl}/categories`)
}