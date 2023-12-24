import React from 'react';
import Button from './Button';

const ButtonList = ({ sendMessage, lightMode }) => {
    const buttonData = [
        { number: 1, content: 'Get List' },
        { number: 2, content: 'ScreenShot' },
        { number: 3, content: 'Keylog' },
        { number: 4, content: 'Shutdown' },
        { number: 5, content: 'Get File' },
        { number: 6, content: 'Get All Files' },
        { number: 7, content: 'Kill App' },
        { number: 8, content: 'Start App' },
    ];

    return (
        <div className={`flex ${lightMode ? 'bg-white border border-x-black border-b-black' : 'bg-dark border border-x-white border-b-white'}  rounded-b-xl`}>
            {buttonData.map(({ number, content }) => (
                <Button key={number} number={number} content={content} sendMessage={sendMessage} lightMode={lightMode} />
            ))}
        </div>
    );
};

export default ButtonList