import axios from "axios";

const URL = `http://localhost:5000/services/user`
const token = localStorage.getItem('token')
console.log(token)

export const registerUser = async (username, email, password) => {
    try {
        const res = await axios.post(URL + "/sign-up", { username, email, password }, { withCredentials: true })
        return { success: true, data: res.data }
    }
    catch (err) {
        console.error("Whoops, there was a problem signing you in")
        return { success: false, data: err }
    }
}

export const userLogin = async (identifier, password) => {
    try {
        const res = await axios.post(URL + "/log-in", { identifier, password }, { withCredentials: true })
        return { success: true, data: res.data }
    }
    catch (err) {
        console.error("Whoops, there was a problem signing you in")
        return { success: false, data: err }
    }
}

export const getUserData = async () => {
    try {
        console.log(token)
        const res = axios.get(URL + "/me", { 
            withCredentials: true, 
            headers: { Authorization: `Bearer ${token}` }
        })
        return { success: true, data: res.data }
    }
    catch (err) {
        console.error("Whoops, there was a problem signing you in")
        return { success: false, data: err }
    }
}