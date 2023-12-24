import React, { useState } from 'react';

const Button = ({ number, content, sendMessage, lightMode }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className="relative inline-block">
            <button
                className={`bg-blue-500 text-white m-1 rounded-full transition-all duration-300 shadow-md text-lg font-semibold focus:outline-none focus:ring focus:border-blue-300 transform`}
                style={{
                    width: isHovered ? '132px' : '32px',
                    height: '32px',
                    lineHeight: '32px',
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => sendMessage({ number, content })}
            >
                {isHovered ? `${number}. ${content}` : `${number}`}
            </button>
        </div>
    );
};

export default Button;
