import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from '../../assets/logofit.png';
import { Loading } from "../../components";
import { useColor } from "../../components/UseLightMode";
import paths from "../../utils/paths";


const SignUp = () => {

    const { lightMode } = useColor()

    const [UserAccount, setUserAccount] = useState({
        firstName: '',
        lastName: '',
        birthday: '',
        gender: '',
        email: '',
        username: '',
        password: '',
        isActivate: false
    })

    const [loading, setLoading] = useState(false)
    const [Announce, setAnnounce] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [ErrorEmail, setErrorEmail] = useState('')
    const [ErrorUsername, setErrorUsername] = useState('')
    const [ErrorPassword, setErrorPassword] = useState('')
    const [ErrorConfirmPassword, setErrorConfirmPassword] = useState('')



    const isExistEmail = async (email) => {
        const url = `http://localhost:8080/user-entity/search/existsByEmail?email=${email}`

        try {
            const response = await fetch(url)
            const data = await response.text()
            if (data === "true") {
                setErrorEmail('Email has already exist')
                return true
            }
            return false
        } catch (error) {
            console.log("Error when check email: ", error);
            return false
        }
    }

    const handleInputEmail = (e) => {
        setUserAccount(prev => ({ ...prev, email: e.target.value }))
        setErrorEmail('')

        return isExistEmail(e.target.value)
    }

    const isExistUsername = async (username) => {
        const url = `http://localhost:8080/user-entity/search/existsByUsername?username=${username}`

        try {
            const response = await fetch(url)
            const data = await response.text()
            if (data === "true") {
                setErrorUsername('Username has already exist')
                return true
            }
            return false
        } catch (error) {
            console.log("Error when check Username: ", error);
            return false
        }
    }

    const handleInputUsername = (e) => {
        setUserAccount(prev => ({ ...prev, username: e.target.value }))
        setErrorUsername('')
        return isExistUsername(e.target.value)
    }


    const checkPassword = (password) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
        if (!passwordRegex.test(password)) {
            setErrorPassword("Password must be include at least 1 character (!@#$%^&*) and length is more than or equal 8")
            return true
        }
        else {
            setErrorPassword('')
            return false
        }
    }

    const handleInputPassword = (e) => {
        setUserAccount(prev => ({ ...prev, password: e.target.value }))
        setErrorPassword('')
        return checkPassword(e.target.value)
    }

    const checkConfirmPassword = (confirmPassword) => {
        if (confirmPassword !== UserAccount.password) {
            setErrorConfirmPassword("Confirm Password is incorrect")
            return true
        }
        else {
            setErrorConfirmPassword('')
            return false
        }
    }

    const handleInputConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
        setErrorConfirmPassword('')
        return checkConfirmPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        setErrorEmail('')
        setErrorUsername('')
        setErrorPassword('')
        setErrorConfirmPassword('')

        e.preventDefault()

        const checkEmail = !await isExistEmail(UserAccount.email)
        const checkUsername = !await isExistUsername(UserAccount.username)
        const check_password = !checkPassword(UserAccount.password)
        const check_confirmPassword = !checkConfirmPassword(ConfirmPassword)

        if (checkEmail && checkUsername && check_password && check_confirmPassword) {
            setLoading(true)
            try {
                const url = 'http://localhost:8080/api/user-account/register';

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName: UserAccount.firstName,
                        lastName: UserAccount.lastName,
                        birthday: UserAccount.birthday,
                        gender: UserAccount.gender,
                        email: UserAccount.email,
                        username: UserAccount.username,
                        password: UserAccount.password,
                        isActivate: UserAccount.isActivate
                    })
                });

                if (response.ok) {
                    setAnnounce('Please check your email to activate your account')
                } else {
                    const errorData = await response.json()
                    setAnnounce('Error when registering! Error: ' + errorData)
                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setAnnounce('Error when registering! Error: ' + error)
            }
        }
    }



    return (
        <section className={`${lightMode ? 'bg-gray-1' : 'bg-dark'} py-20 lg:py-[120px]`}>
            {loading && <Loading />}
            <div className="container mx-auto">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className={`relative mx-auto max-w-[525px] overflow-hidden rounded-lg ${lightMode ? 'bg-white' : 'bg-dark'} px-10 py-16 text-center sm:px-12 md:px-[60px]`}>
                            <div className="mb-10 text-center md:mb-16">
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
                                    <label htmlFor="firstName"></label>
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        id="firstName"
                                        value={UserAccount.firstName}
                                        onChange={(e) => {
                                            setUserAccount(prev => ({ ...prev, firstName: e.target.value }))
                                        }}
                                        className={`w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-blue-500 focus-visible:shadow-none ${lightMode ? 'text-black' : 'text-white'}`}
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="lastName"></label>
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        id="lastName"
                                        value={UserAccount.lastName}
                                        required="required"
                                        onChange={(e) => {
                                            setUserAccount(prev => ({ ...prev, lastName: e.target.value }))
                                        }}
                                        className={`w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-blue-500 focus-visible:shadow-none ${lightMode ? 'text-black' : 'text-white'}`}
                                    />
                                </div>
                                <div className="mb-6 flex w-full items-center justify-between gap-2">
                                    <label htmlFor="birthday"></label>
                                    <input className={`w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-blue-500 focus-visible:shadow-none ${lightMode ? 'text-black' : 'text-white'}`}
                                        type="date" id="birthday" required="required" value={UserAccount.birthday}
                                        onChange={(e) => {
                                            setUserAccount(prev => ({ ...prev, birthday: e.target.value }))
                                        }} />
                                    <label className={`w-[15%] ${lightMode ? 'text-black' : 'text-white'}`} htmlFor="gender">Gender: </label>
                                    <select name="gender" id="gender" value={UserAccount.gender}
                                        onChange={(e) => {
                                            setUserAccount(prev => ({ ...prev, gender: e.target.value }))
                                        }}>
                                        <option value={null}></option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="email"></label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        id="email"
                                        required="required"
                                        value={UserAccount.email}
                                        onChange={handleInputEmail}
                                        onKeyUp={(e) => {
                                            if (e.target.value.length === 0) {
                                                setErrorEmail("Please fill your email in this field!")
                                            } else setErrorEmail('')
                                        }}
                                        className={`w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-blue-500 focus-visible:shadow-none ${lightMode ? 'text-black' : 'text-white'}`}
                                    />
                                    <small className="text-red-500">{ErrorEmail}</small>
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="phoneNumber"></label>
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        id="username"
                                        required="required"
                                        value={UserAccount.username}
                                        onChange={handleInputUsername}
                                        onKeyUp={(e) => {
                                            if (e.target.value.length === 0) {
                                                setErrorUsername("Please fill your username in this field!")
                                            } else setErrorUsername('')
                                        }}
                                        className={`w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-blue-500 focus-visible:shadow-none ${lightMode ? 'text-black' : 'text-white'}`}
                                    />
                                    <small className="text-red-500">{ErrorUsername}</small>
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="password"></label>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        id="password"
                                        required="required"
                                        value={UserAccount.password}
                                        onChange={handleInputPassword}
                                        className={`w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-blue-500 focus-visible:shadow-none ${lightMode ? 'text-black' : 'text-white'}`}
                                    />
                                    <small className="text-red-500" >{ErrorPassword}</small>
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="ConfirmPassword"></label>
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        id="ConfirmPassword"
                                        required="required"
                                        value={ConfirmPassword}
                                        onChange={handleInputConfirmPassword}
                                        className={`w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-blue-500 focus-visible:shadow-none ${lightMode ? 'text-black' : 'text-white'}`}
                                    />
                                    <small className="text-red-500">{ErrorConfirmPassword}</small>
                                </div>
                                <div className="mb-10">
                                    <button type="submit" className={`w-full rounded-md bg-blue-500 px-5 py-3 text-base font-medium text-white cursor-pointer transition hover:bg-opacity-90`}>Sign Up</button>
                                    <small className={`${Announce.includes('Please') ? 'text-green-500' : 'text-red-500'}`}>{Announce}</small>
                                </div>
                            </form>
                            <p className="text-base text-body-color dark:text-dark-6">
                                <span className={`pr-0.5 ${lightMode ? 'tex-black' : 'text-white'}`}>Do you have an account? </span>
                                <NavLink
                                    to='/login'
                                    className="text-blue-500 hover:underline"
                                >
                                    Log In
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
            </div>
        </section>
    );
};

export default SignUp;