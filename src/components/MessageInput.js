import React from 'react';

const MessageInput = ({ setMessage, sendMessage, message, lightMode }) => {
    return (
        <div className="flex">
            <input
                className={`flex-grow p-2 outline-none rounded-l text-[18px] ${lightMode ? 'bg-white text-black border border-l-black border-y-black' : 'bg-[#333] text-white border border-l-white border-y-white'}`}
                type="text"
                value={message}
                placeholder='Message'
                onChange={(event) => setMessage(event.target.value)}
            />
            <button className={`bg-blue-500  ${lightMode ? 'text-white border border-y-black border-r-black' : 'text-black border border-y-white border-r-white'} p-2 rounded-r text-[18px] w-[64px]`} onClick={sendMessage}>
                Send
            </button>
        </div>
    )
}

export default MessageInput