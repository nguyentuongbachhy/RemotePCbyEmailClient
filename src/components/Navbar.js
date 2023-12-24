import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logofit.png";
import { icons } from "../utils/icons";
import paths from "../utils/paths";
import { useColor } from "./UseLightMode";
import { useUser } from "./UserContext";


const { CiDark, CiLight } = icons
const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { lightMode, setLightMode } = useColor()

    const { username } = useUser()
    const togglelightMode = () => {
        setLightMode(prev => !prev);
    };


    return (
        <header className={`flex w-full items-center ${lightMode ? 'bg-white' : 'bg-dark'} px-4`}>
            <div className="container">
                <div className="relative -mx-4 flex items-center justify-between">
                    <div className="w-60 max-w-full px-4">
                        <div className="h"></div>
                        <NavLink to={paths.HOME_PAGE} className="block w-full py-5">
                            <img
                                src={logo}
                                alt="logo"
                                className="dark:hidden"
                            />
                            <img
                                src={logo}
                                alt="logo"
                                className="hidden dark:block"
                            />
                        </NavLink>
                    </div>
                    <div className="flex w-full items-center justify-between px-4">
                        <div>
                            <button
                                onClick={() => setOpen(!open)}
                                id="navbarToggler"
                                className={` ${open && "navbarTogglerActive"
                                    } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-gray-500 focus:ring-2 lg:hidden`}
                            >
                                <span className={`relative my-[6px] block h-[2px] w-[30px] ${lightMode ? 'bg-dark' : 'bg-white'}`}></span>
                                <span className={`relative my-[6px] block h-[2px] w-[30px] ${lightMode ? 'bg-dark' : 'bg-white'}`}></span>
                                <span className={`relative my-[6px] block h-[2px] w-[30px] ${lightMode ? 'bg-dark' : 'bg-white'}`}></span>
                            </button>
                            <nav
                                id="navbarCollapse"
                                className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg ${lightMode ? 'bg-white' : 'bg-dark'}  px-6 py-5 shadow lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${!open && "hidden"
                                    } `}
                            >
                                <ul className="block lg:flex">
                                    <ListItem link={paths.HOME_PAGE} lightMode={lightMode} >Home</ListItem>
                                    <ListItem link={paths.ABOUT_PAGE} lightMode={lightMode} >About Us</ListItem>
                                    {username && <ListItem link={paths.CONTACT_PAGE} lightMode={lightMode} >Contact Us</ListItem>}
                                </ul>
                            </nav>
                        </div>



                        <div className="hidden justify-end pr-16 sm:flex lg:pr-0 gap-2">
                            <button
                                className={`rounded-xl ${lightMode ? "bg-white" : "bg-dark"
                                    } px-7 py-3 text-base font-medium text-${lightMode ? "black" : "white"
                                    } hover:bg-opacity-90 hover:text-blue-500`}
                                onClick={togglelightMode}
                            >
                                {lightMode ? <CiLight size={24} /> : <CiDark size={24} />}
                            </button>
                            {username !== null ?
                                (<button
                                    className={`rounded-xl bg-primary px-7 py-3 text-base font-medium ${lightMode ? 'text-white' : 'text-black'} hover:bg-opacity-90 bg-blue-500`}
                                    onClick={() => {
                                        localStorage.removeItem('token')
                                        localStorage.removeItem('email')
                                        localStorage.removeItem('password')
                                        window.location.reload();
                                    }}
                                >
                                    Log Out
                                </button>)
                                : (
                                    <>
                                        <NavLink
                                            to={`/${paths.LOGIN_PAGE}`}
                                            className={`px-7 py-3 text-base font-medium hover:text-blue-500 ${lightMode ? 'text-black' : 'text-white'} border border-blue-500 rounded-xl`}
                                        >
                                            Sign in
                                        </NavLink>

                                        <NavLink
                                            to={`/${paths.SIGNUP_PAGE}`}
                                            className={`rounded-xl bg-primary px-7 py-3 text-base font-medium ${lightMode ? 'text-white' : 'text-black'} hover:bg-opacity-90 bg-blue-500`}
                                        >
                                            Sign Up
                                        </NavLink>
                                    </>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </header >
    );
};

export default Navbar;

const ListItem = ({ children, link, lightMode }) => {
    return (
        <li>
            <NavLink
                to={link}
                className={`flex py-2 text-base font-medium ${lightMode ? 'text-black' : 'text-white'} hover:text-blue-500 lg:ml-12 lg:inline-flex`}
            >
                {children}
            </ NavLink>
        </li>
    );
};
