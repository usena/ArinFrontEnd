import React, { useEffect } from 'react'
import logo from '../assets/citilink-logo.png'
import { useNavigate } from 'react-router-dom'
import { userLogin } from '../apis/user.api'

function Login() {
    const navigate = useNavigate()
    useEffect(() => {
            const token = localStorage.getItem('token');
            if (token) {
                navigate('/dashboard');
            }
        }, 
    []);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = new FormData(e.currentTarget)
        const data = {
            identifier: form.get("identifier"),
            password: form.get("password"),
        }

        if (Object.values(data).some(value => !value)){
            alert("Please enter your credentials")
        }

        else {
            const login = await userLogin(data.identifier, data.password)
            if (login.success) navigate('/dashboard')

            const token = login.data
            localStorage.setItem('token', token)
            console.log(localStorage.getItem('token'))
        }
    }

    const styles = {
        page: "flex justify-center items-center h-screen text-lg text-[#367c62]",
        container: "bg-white w-200 px-15 py-7 mx-auto rounded-2xl shadow-lg/20",

        header: "flex flex-col items-center w-2/3 mb-5 mx-auto",
        header_title: "text-3xl font-bold",
        header_sub: "my-3",

        form: "flex flex-col items-center gap-5",
        data_input: "flex flex-col font-semibold w-full",
        input: "bg-gray-100 p-3 rounded-xl border border-neutral-300 font-light text-gray-500",
        submit: "text-white bg-[#367c62] hover:bg-[#2f614e] transition-colors w-full h-14 rounded-xl text-xl"
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <img src={logo} className={styles.logo_img} />
                    <h1 className={styles.header_title}><u>Helpdesk Ticketing System</u></h1>
                    <p className={styles.header_sub}>Log in</p>
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.data_input}>
                        <label htmlFor="identifier">Username/Email</label>
                        <input type="text" id="identifier" name="identifier" className={styles.input} placeholder='Enter your username or email'/>
                    </div>
                    <div className={styles.data_input}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" className={styles.input} placeholder='Enter your password'/>
                    </div>
                    <input type="submit" className={styles.submit} value="Log In"/>
                    <button onClick={(e) => {
                        e.preventDefault()
                        navigate('/sign-up')
                    }}><u>Don't have an account? Sign Up</u></button>
                </form>
            </div>
        </div>
    )
}

export default Login