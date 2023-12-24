import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Outlet } from 'react-router-dom';
import { Navbar } from "../../components";

const PublicPage = () => {

    return (
        <div className='flex flex-col w-[100%] h-[100vh] m-auto z-50'>
            <div className='w-full z-50'>
                <Navbar />
            </div>
            <Scrollbars style={{ width: '100%', height: '100%' }}>
                <Outlet />
            </Scrollbars>
        </div>
    )
}

export default PublicPage