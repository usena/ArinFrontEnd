import React from 'react'
import logo from '../assets/citilink-logo.png'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../apis/user.api'

function SignUp() {
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const form = new FormData(e.currentTarget)
        const data = {
            username: form.get("username"),
            email: form.get("email"),
            password: form.get("password"),
        }
    
        if (Object.values(data).some(value => !value)){
            alert("Please enter your credentials")
        }
    
        else {
            const res = await registerUser(data.username, data.email, data.password)
            if (res.success) navigate('/auth/verify-otp')

            const token = res.data.token
            localStorage.setItem('token', token)
        }
    }

    const styles = {
        page: "flex justify-center items-center h-screen text-lg text-[#367c62]",
        container: "bg-white w-2/3 px-10 py-7 mx-auto rounded-2xl shadow-lg/20",

        header: "flex flex-col items-center w-2/3 mb-5 mx-auto",
        header_title: "text-3xl font-bold",
        header_sub: "my-3",

        form: "flex flex-col items-center gap-5",
        data_input: "flex flex-col font-semibold w-full",
        input: "bg-gray-100 p-3 rounded-xl border border-neutral-300 font-light text-gray-500",
        submit: "text-white bg-[#367c62] hover:bg-[#2f614e] transition-colors w-full h-14 mt-10 rounded-xl text-xl"
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <img src={logo} className={styles.logo_img} />
                    <h1 className={styles.header_title}><u>Helpdesk Ticketing System</u></h1>
                    <p className={styles.header_sub}>Sign Up</p>
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.data_input}>
                        <label htmlFor="username">Username</label>
                        <input type="text" id='username' name='username' className={styles.input} placeholder='Enter your username'/>
                    </div>
                    <div className={styles.data_input}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' name='email' className={styles.input} placeholder='Enter your email'/>
                    </div>
                    <div className={styles.data_input}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' name='password' className={styles.input} placeholder='Enter your password'/>
                    </div>
                    <input type="submit" className={styles.submit} value="Sign Up"/>
                    <button onClick={(e) => {
                        e.preventDefault()
                        navigate('/')
                    }}><u>Already have an account? Log In</u></button>
                </form>
            </div>
        </div>
    )
}

export default SignUp