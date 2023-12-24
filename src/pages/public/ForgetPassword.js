import React, { useState } from 'react'
import { Loading } from '../../components'
import { useColor } from '../../components/UseLightMode'

const ForgetPassword = () => {

    const { lightMode } = useColor()

    const [UserAccount, setUserAccount] = useState({
        username: '',
        email: '',
        password: ''
    })


    const [loading, setLoading] = useState(false)
    const [Announce, setAnnounce] = useState('')
    const [ErrorUsername, setErrorUsername] = useState('')
    const [ErrorEmail, setErrorEmail] = useState('')
    const [ErrorPassword, setErrorPassword] = useState('')
    const [ErrorConfirmPassword, setErrorConfirmPassword] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const url = 'http://localhost:8080/api/user-account/forget-password'
            setLoading(true)
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    username: UserAccount.username,
                    email: UserAccount.email,
                    password: UserAccount.password
                })
            });

            if (response.ok) {
                setAnnounce("Please check email to change password")
            } else {
                const errData = await response.json()
                setAnnounce('Error when changing password! Error: ' + JSON.stringify(errData))
            }
            setLoading(false)

        } catch (error) {
            setAnnounce('Error when changing password! Error: ' + error)
            setLoading(false)
        }
    }



    return (
        <div className={`relative isolate overflow-hidden ${lightMode ? 'bg-white' : 'bg-black'}  py-16 sm:px-24 lg:px-32`}>
            {loading && <Loading />}
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                <div className="max-w-xl lg:max-w-lg">
                    <h2 className={`text-3xl font-bold tracking-tight ${lightMode ? 'text-black' : 'text-white'} sm:text-4xl`}>Forget Your Password?</h2>
                    <p className={`mt-4 text-lg leading-8 ${lightMode ? 'text-black' : 'text-white'}`}>
                        Don't worry! If you've forgotten your password, you can reset it by providing the email address associated with your account. We'll send you instructions on how to reset your password shortly.
                    </p>
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
                                    } else {
                                        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
                                        if (!passwordRegex.test(e.target.value)) {
                                            setErrorPassword("Password must be include at least 1 character (!@#$%^&*) and length is more than or equal 8")
                                        } else {
                                            setErrorPassword('')
                                        }
                                    }
                                }}
                                onChange={(e) => {
                                    setUserAccount(prev => ({ ...prev, password: e.target.value }))
                                }}
                                className={`w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-blue-500 focus-visible:shadow-none ${lightMode ? 'text-black' : 'text-white'}`}
                            />
                            <small className="text-red-500">{ErrorPassword}</small>
                        </div>
                        <div className="mb-6">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                onChange={(e) => {
                                    if (e.target.value !== UserAccount.password)
                                        setErrorConfirmPassword('Confirm Password is incorrect')
                                    else setErrorConfirmPassword('')
                                }}
                                className={`w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-blue-500 focus-visible:shadow-none ${lightMode ? 'text-black' : 'text-white'}`}
                            />
                            <small className="text-red-500">{ErrorConfirmPassword}</small>
                        </div>
                        <div className="mb-10">
                            <button type="submit" className={`w-full rounded-md bg-blue-500 px-5 py-3 text-base font-medium ${lightMode ? 'text-white' : 'text-black'} cursor-pointer transition hover:bg-opacity-90`}>Reset Password</button>
                            <small className={`${Announce.includes('Please') ? 'text-green-500' : 'text-red-500'}`}>{Announce}</small>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword
