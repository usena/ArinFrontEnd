import axios from "axios";

const URL = `http://localhost:5000/services/auth`

export const tokenIsVerified = async () => {
    try {
        const res = axios.get(URL + "/verify-status", { 
            headers: { Authorization: `Bearer ${ localStorage.getItem('token') }` } 
        })
        return { success: true, data: res.isVerified }
    }
    catch (err) {
        console.error("Failed to verify")
        return { success: false, data: err.message }
    }
}

export const sendOTP = async (email) => {
    try {
        const res = axios.post(URL + '/send-otp', { email }, { withCredentials: true })
        return { success: true, data: res.data }
    }
    catch (err) {
        console.error("Failed to send OTP")
        return { success: false, data: err.message }
    }
}

export const verifyOTP = async (email, otp) => {
    try {
        const res = axios.post(URL + '/verify-otp', { email, otp }, { withCredentials: true })
        return { success: true, data: res.data }
    }
    catch (err) {
        console.error("Failed to send OTP")
        return { success: false, data: err.message }
    }
}