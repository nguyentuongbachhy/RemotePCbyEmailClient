import React, { useEffect, useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { TransitionGroup } from 'react-transition-group';
import Message from './Message';

const MessageList = ({ messages, lightMode }) => {
    const scrollbarsRef = useRef(null);

    useEffect(() => {
        scrollbarsRef.current.scrollToBottom();
    }, [messages]);

    return (
        <div className={`flex flex-col h-[70vh]  ${lightMode ? 'bg-white border border-x-black' : 'bg-dark border border-x-white'}`}>
            <Scrollbars ref={scrollbarsRef}
                style={{ width: '100%', height: '100%' }}
                autoHide
            >
                <TransitionGroup>
                    {messages.map((message, index) => (
                        <Message key={index} text={message.text} sender={message.sender} lightMode={lightMode} />
                    ))}
                </TransitionGroup>
            </Scrollbars>
        </div>
    );
};

export default MessageList;
