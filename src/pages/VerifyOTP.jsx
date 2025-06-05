import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { tokenIsVerified, verifyOTP } from '../apis/auth.api'
import { getUserData } from '../apis/user.api'
import axios from 'axios'


function VerifyOTP() {
    const navigate = useNavigate()

    const getUser = async () => await getUserData()
    const email = getUser().email

    useEffect(() => {
        const checkVerificationStatus = async () => {
            const token = localStorage.getItem('token')
            if (!token){ 
                navigate('/sign-up')
                return;
            }

            try {
                const res = await tokenIsVerified()
                console.log(res.data)
                if (res.data){ navigate('/dashboard') }
            }
            catch (err) {
                console.error(err)
                navigate('/sign-up')
            }
        }
        checkVerificationStatus()
    }, [])

    useEffect(() => {
        async () => await sendOtp(email)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const otp = form.get('otp')
        if (!otp){
            alert("Please enter your credentials")
        }
        else{
            const res = await verifyOTP(email, otp)
            if (res.success) navigate('/dashboard')
        }
    }

    const styles = {
        page: "flex justify-center items-center h-screen text-lg text-[#367c62]",
        container: "bg-white w-200 px-10 py-7 mx-auto rounded-2xl shadow-lg/20",

        header: "font-bold text-3xl border-b-2 pb-3",
        text: "my-3",

        form: "flex flex-col items-center gap-5",
        data_input: "flex flex-col font-semibold w-full",
        input: "bg-gray-100 p-3 rounded-xl border border-neutral-300 font-light text-gray-500",
        submit: "text-white bg-[#367c62] w-full h-14 rounded-xl text-xl"
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div>
                    <h1 className={styles.header}>Verify Account</h1>
                    <p className={styles.text}>We have sent an OTP code to your email account <br /> Please enter the code</p>
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.data_input}>
                        <label htmlFor="username">OTP code</label>
                        <input type="text" id='otp' name='otp' className={styles.input} placeholder='OTP Code'/>
                    </div>
                    <button type='submit' className={styles.submit}>Verify</button>
                </form>
            </div>
        </div>
    )
}

export default VerifyOTP