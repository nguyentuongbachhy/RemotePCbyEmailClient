import React from 'react';

const Header = ({ lightMode }) => {
    return (
        <header className={`bg-violet-500 p-4 rounded-t-xl ${lightMode ? 'text-black' : 'text-white'}`}>
            <h1 className="text-xl">Remote PC UI</h1>
        </header>
    )
}

export default Header