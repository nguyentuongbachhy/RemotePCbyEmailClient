import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../assets/logofit.png';
import { Loading } from "../../components";
import { useColor } from "../../components/UseLightMode";
import paths from "../../utils/paths";

const Login = () => {

    const { lightMode } = useColor()

    const [UserAccount, setUserAccount] = useState({
        username: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [Announce, setAnnounce] = useState('')
    const [ErrorUsername, setErrorUsername] = useState('')
    const [ErrorEmail, setErrorEmail] = useState('')
    const [ErrorPassword, setErrorPassword] = useState('')

    const handleSubmit = async (e) => {

        setErrorUsername('')
        setErrorEmail('')
        setErrorPassword('')

        e.preventDefault()

        try {
            const url = 'http://localhost:8080/api/user-account/login';
            setLoading(true)
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    username: UserAccount.username,
                    email: UserAccount.email,
                    password: UserAccount.password
                })
            }).then(
                (response) => {
                    if (response.ok) {
                        setLoading(false)
                        setAnnounce('Login successfully!')
                        return response.json()
                    } else {
                        setLoading(false)
                        setAnnounce('Login failed!')
                        throw new Error('Login failed!')
                    }
                }
            ).then(
                (data) => {
                    const { jwt } = data;
                    localStorage.setItem('token', jwt);
                    localStorage.setItem('email', UserAccount.email);
                    navigate(`/${paths.HOME_PAGE}`)
                }
            )

        } catch (error) {
            setLoading(false)
            setAnnounce('Error when logging in! Error: ' + error)
        }
    }


    return (
        <section className={`py-20  lg:py-[120px] ${lightMode ? 'bg-gray-1' : 'bg-dark'}`}>
            {loading && <Loading />}
            <div className="container mx-auto">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className={`relative mx-auto max-w-[525px] overflow-hidden rounded-lg ${lightMode ? 'bg-gray-1' : 'bg-dark'} px-10 py-16 text-center sm:px-12 md:px-[60px]`}>
                            <div className="mb-10 text-center md:mb-16 ">
                                <NavLink
                                    to={`/${paths.HOME_PAGE}`}
                                    className="mx-auto inline-block max-w-[160px]"
                                >
                                    <img
                                        src={logo}
                                        alt="logo"
                                    />
                                </NavLink>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        onKeyUp={(e) => {
                                            if (e.target.value.length === 0) {
                                                setErrorUsername("Please fill your username in this field!")
                                            } else setErrorUsername('')
                                        }}
                                        onChange={(e) => {
                                            setUserAccount(prev => ({ ...prev, username: e.target.value }))
                                        }}
                                        className={`w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-blue-500 focus-visible:shadow-none ${lightMode ? 'text-black' : 'text-white'}`}
                                    />
                                    <small className="text-red-500">{ErrorUsername}</small>
                                </div>
                                <div className="mb-6">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        onKeyUp={(e) => {
                                            if (e.target.value.length === 0) {
                                                setErrorEmail("Please fill your email in this field!")
                                            } else setErrorEmail('')
                                        }}
                                        onChange={(e) => {
                                            setUserAccount(prev => ({ ...prev, email: e.target.value }))
                                        }}
                                        className={`w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-blue-500 focus-visible:shadow-none ${lightMode ? 'text-black' : 'text-white'}`}
                                    />
                                    <small className="text-red-500">{ErrorEmail}</small>
                                </div>
                                <div className="mb-6">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        onKeyUp={(e) => {
                                            if (e.target.value.length === 0) {
                                                setErrorPassword("Please fill password in this field!")
                                            } else setErrorPassword('')
                                        }}
                                        onChange={(e) => {
                                            setUserAccount(prev => ({ ...prev, password: e.target.value }))
                                        }}
                                        className={`w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-blue-500 focus-visible:shadow-none ${lightMode ? 'text-black' : 'text-white'}`}
                                    />
                                    <small className="text-red-500">{ErrorPassword}</small>
                                </div>
                                <div className="mb-10">
                                    <button type="submit" className={`w-full rounded-md bg-blue-500 px-5 py-3 text-base font-medium ${lightMode ? 'text-white' : 'text-black'} cursor-pointer transition hover:bg-opacity-90`}>Log In</button>
                                    <small className={`${Announce.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{Announce}</small>
                                </div>
                            </form>
                            <p className={`mb-6 text-base text-secondary-color ${lightMode ? 'text-white' : 'text-black'}`}>
                                Connect With
                            </p>
                            <NavLink
                                to={'/forget-password'}
                                className={`mb-2 inline-block text-base hover:text-blue-500 hover:underline ${lightMode ? 'text-black' : 'text-white'}`}
                            >
                                Forget Password?
                            </NavLink>
                            <p className="text-base text-body-color dark:text-dark-6">
                                <span className={`pr-0.5 ${lightMode ? 'tex-black' : 'text-white'}`}>Do not have an account? </span>
                                <NavLink
                                    to='/sign-up'
                                    className="text-blue-500 hover:underline"
                                >
                                    Sign Up
                                </NavLink>
                            </p>

                            <div>
                                <span className="absolute right-1 top-1">
                                    <svg
                                        width="40"
                                        height="40"
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            cx="1.39737"
                                            cy="38.6026"
                                            r="1.39737"
                                            transform="rotate(-90 1.39737 38.6026)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="1.39737"
                                            cy="1.99122"
                                            r="1.39737"
                                            transform="rotate(-90 1.39737 1.99122)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="13.6943"
                                            cy="38.6026"
                                            r="1.39737"
                                            transform="rotate(-90 13.6943 38.6026)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="13.6943"
                                            cy="1.99122"
                                            r="1.39737"
                                            transform="rotate(-90 13.6943 1.99122)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="25.9911"
                                            cy="38.6026"
                                            r="1.39737"
                                            transform="rotate(-90 25.9911 38.6026)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="25.9911"
                                            cy="1.99122"
                                            r="1.39737"
                                            transform="rotate(-90 25.9911 1.99122)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="38.288"
                                            cy="38.6026"
                                            r="1.39737"
                                            transform="rotate(-90 38.288 38.6026)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="38.288"
                                            cy="1.99122"
                                            r="1.39737"
                                            transform="rotate(-90 38.288 1.99122)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="1.39737"
                                            cy="26.3057"
                                            r="1.39737"
                                            transform="rotate(-90 1.39737 26.3057)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="13.6943"
                                            cy="26.3057"
                                            r="1.39737"
                                            transform="rotate(-90 13.6943 26.3057)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="25.9911"
                                            cy="26.3057"
                                            r="1.39737"
                                            transform="rotate(-90 25.9911 26.3057)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="38.288"
                                            cy="26.3057"
                                            r="1.39737"
                                            transform="rotate(-90 38.288 26.3057)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="1.39737"
                                            cy="14.0086"
                                            r="1.39737"
                                            transform="rotate(-90 1.39737 14.0086)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="13.6943"
                                            cy="14.0086"
                                            r="1.39737"
                                            transform="rotate(-90 13.6943 14.0086)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="25.9911"
                                            cy="14.0086"
                                            r="1.39737"
                                            transform="rotate(-90 25.9911 14.0086)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="38.288"
                                            cy="14.0086"
                                            r="1.39737"
                                            transform="rotate(-90 38.288 14.0086)"
                                            fill="#3056D3"
                                        />
                                    </svg>
                                </span>
                                <span className="absolute bottom-1 left-1">
                                    <svg
                                        width="29"
                                        height="40"
                                        viewBox="0 0 29 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            cx="2.288"
                                            cy="25.9912"
                                            r="1.39737"
                                            transform="rotate(-90 2.288 25.9912)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="14.5849"
                                            cy="25.9911"
                                            r="1.39737"
                                            transform="rotate(-90 14.5849 25.9911)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="26.7216"
                                            cy="25.9911"
                                            r="1.39737"
                                            transform="rotate(-90 26.7216 25.9911)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="2.288"
                                            cy="13.6944"
                                            r="1.39737"
                                            transform="rotate(-90 2.288 13.6944)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="14.5849"
                                            cy="13.6943"
                                            r="1.39737"
                                            transform="rotate(-90 14.5849 13.6943)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="26.7216"
                                            cy="13.6943"
                                            r="1.39737"
                                            transform="rotate(-90 26.7216 13.6943)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="2.288"
                                            cy="38.0087"
                                            r="1.39737"
                                            transform="rotate(-90 2.288 38.0087)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="2.288"
                                            cy="1.39739"
                                            r="1.39737"
                                            transform="rotate(-90 2.288 1.39739)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="14.5849"
                                            cy="38.0089"
                                            r="1.39737"
                                            transform="rotate(-90 14.5849 38.0089)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="26.7216"
                                            cy="38.0089"
                                            r="1.39737"
                                            transform="rotate(-90 26.7216 38.0089)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="14.5849"
                                            cy="1.39761"
                                            r="1.39737"
                                            transform="rotate(-90 14.5849 1.39761)"
                                            fill="#3056D3"
                                        />
                                        <circle
                                            cx="26.7216"
                                            cy="1.39761"
                                            r="1.39737"
                                            transform="rotate(-90 26.7216 1.39761)"
                                            fill="#3056D3"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    );
};

export default Login;