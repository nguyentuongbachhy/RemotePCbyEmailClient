import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import paths from '../../utils/paths';

const Activate = () => {
    const { email, activationCode } = useParams();
    const [activated, setActivated] = useState(false);
    const [announce, setAnnounce] = useState('');

    useEffect(() => {
        const handleActivate = async () => {
            if (!email || !activationCode) {
                setAnnounce('Invalid activation link');
                return;
            }

            const url = `http://localhost:8080/api/user-account/activate-account?email=${email}&activationCode=${activationCode}`;

            try {
                const response = await fetch(url, { method: 'GET' });

                if (response.ok) {
                    setActivated(true);
                } else {
                    const errorMessage = await response.text();
                    setAnnounce(`Activation failed: ${errorMessage}`);
                }
            } catch (error) {
                console.error('Error when activating account:', error);
                setAnnounce(`Error when activating account: ${error.message}`);
            }
        };

        handleActivate();
    }, [email, activationCode]);

    return (
        <>
            <section className="relative z-10 bg-blue-500 py-[120px]">
                <div className="container mx-auto">
                    <div className="-mx-4 flex">
                        <div className="w-full px-4">
                            <div className="mx-auto max-w-[400px] text-center">
                                <h4 className="mb-3 text-[22px] font-semibold leading-tight text-white">
                                    Activate Your Account
                                </h4>
                                <p className={`mb-8 text-lg text-white ${activated ? 'hidden' : ''}`}>
                                    {announce}
                                </p>
                                {activated && (
                                    <p className="mb-8 text-lg text-white">
                                        Activation Success! Please log in to use our services!
                                    </p>
                                )}
                                {activated && (
                                    <NavLink
                                        to={`/${paths.LOGIN_PAGE}`}
                                        className="inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-white hover:text-blue-500"
                                    >
                                        Go To Login Page
                                    </NavLink>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
                    <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
                    <div className="flex h-full w-1/3">
                        <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
                        <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
                    </div>
                    <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
                </div>
            </section>
        </>
    );
};

export default Activate;
