// Message.jsx
import React from 'react';
import { CSSTransition } from 'react-transition-group';

const Message = ({ text, sender, lightMode }) => {
    const isUser = sender === 'user';

    return (
        <CSSTransition
            in={true}
            timeout={isUser ? 300 : 1000}
            classNames={isUser ? 'message-right' : 'message-left'}
            unmountOnExit
        >
            <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`py-1 px-3 m-1 rounded-xl max-w-xs text-[18px] ${isUser ? (lightMode ? 'bg-blue-500 text-white' : 'bg-violet-500 text-white') : (lightMode ? 'bg-[#EEE] text-black' : 'bg-[#333] text-white')}`}>
                    <p>{text}</p>
                </div>
            </div>
        </CSSTransition>
    );
};

export default Message;
