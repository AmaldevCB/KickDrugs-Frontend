import axios from "axios";

export const commonApi = async (httpRequest, url, reqbody, reqHeader) => {
    const config = {
        method: httpRequest,
        url,
        data: reqbody,
        headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }
    }
    return await axios(config).then((result) => {
        return result
    }).catch((err) => {
        return err
    })
}