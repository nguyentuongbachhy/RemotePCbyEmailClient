// Loading.js
import React from 'react';

const Loading = () => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="animate-spin rounded-full h-[72px] w-[72px] border-t-2 border-blue-500"></div>
        </div>
    );
};

export default Loading;
