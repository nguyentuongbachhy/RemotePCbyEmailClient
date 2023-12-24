import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../../assets/logo.jpg';
import { useColor } from "../../components/UseLightMode";
import paths from "../../utils/paths";

const HeroAria = () => {
  const { lightMode } = useColor()

  return (
    <>
      <div className={`relative pb-[110px] pt-[120px] ${lightMode ? 'bg-white' : 'bg-dark'} lg:pt-[150px]`}>
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-5/12">
              <div className="hero-content">
                <h1 className={`mb-5 text-4xl font-bold !leading-[1.208] ${lightMode ? 'text-black' : 'text-white'} sm:text-[42px] lg:text-[40px] xl:text-5xl`}>
                  RemotePC Website
                </h1>
                <p className={`mb-8 max-w-[480px] text-base text-body-color ${lightMode ? 'text-black' : 'text-white'}`}>
                  Welcome to RemotePC Website, your gateway to seamless remote computing! Whether you're working from home or accessing your files on the go, we've got you covered. Experience the power of secure and efficient remote services. Sign in now to unlock a world of convenience and productivity.
                </p>
                <ul className="flex flex-wrap items-center gap-3">
                  <li>
                    <NavLink
                      to={`/${paths.LOGIN_PAGE}`}
                      className={`inline-flex items-center justify-center rounded-md bg-blue-500 px-6 py-3 text-center text-base font-medium ${lightMode ? 'text-white' : 'text-black'} transition hover:bg-opacity-90 lg:px-7`}
                    >
                      Get Started
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/${paths.ABOUT_PAGE}`}
                      className={`inline-flex items-center justify-center border border-blue-500 rounded-md px-6 py-3 text-center text-base font-medium ${lightMode ? 'text-black' : 'text-white'} transition hover:bg-opacity-90 lg:px-7 hover:text-blue-500`}
                    >
                      About Us
                    </NavLink>
                  </li>
                </ul>
                <div className="clients pt-16">
                  <h6 className={`mb-6 flex items-center text-xs font-normal text-body-color ${lightMode ? 'text-black' : 'text-white'}`}>
                    Some Of Our Clients
                    <span className="ml-3 inline-block h-px w-8 bg-body-color"></span>
                  </h6>

                </div>
              </div>
            </div>
            <div className="hidden px-4 lg:block lg:w-1/12"></div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="lg:ml-auto lg:text-right">
                <div className="relative z-10 inline-block pt-11 lg:pt-0">
                  <img
                    src={logo}
                    alt="hero"
                    className="max-w-full lg:ml-auto"
                  />
                  <span className="absolute -bottom-8 -left-8 z-[-1]">
                    <svg
                      width="93"
                      height="93"
                      viewBox="0 0 93 93"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="90.5" r="2.5" fill="#3056D3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default HeroAria;