import React, { useEffect, useState } from 'react';
import { ButtonList, Header, Loading, MessageInput, MessageList } from '../../components';
import { useColor } from '../../components/UseLightMode';


const BoxChat = ({ username }) => {

    const { lightMode } = useColor()

    const [showOptions, setShowOptions] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [FilePath, setFilePath] = useState('')
    const [SystemPassword, setSystemPassword] = useState(null)
    const [Pid, setPid] = useState(null)
    const [AppName, setAppName] = useState(null)
    const [loading, setLoading] = useState(false)

    const MessageServer = (text, time) => {
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    text,
                    sender: 'server',
                },
            ]);
        }, time);
    }

    useEffect(() => {
        const timeout = MessageServer(`Hello ${username}! Please give me your email password to continue using our services`, 1000);
        return () => clearTimeout(timeout);
    }, [username]);

    const sendMessage = () => {
        if (message.trim().length > 0) {
            localStorage.setItem('password', message)
            setMessages([...messages,
            { text: message, sender: 'user' },
            ]);
            setMessage('');
            setShowOptions(true);
            localStorage.setItem('password', message)
            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        text:
                            'Thank you for giving us your password. Now you can use our services!',
                        sender: 'server',
                    },
                ]);
            }, 1000);
        }
    };

    const sendMail = async (requestName) => {
        try {
            const token = localStorage.getItem('token')
            const Email = localStorage.getItem('email')
            const Password = localStorage.getItem('password')
            const url = `http://localhost:8080/api/send-message`
            setLoading(true)
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    senderEmail: Email,
                    senderPassword: Password,
                    recipientEmail: 'nguyentuongbachhy@gmail.com',
                    subject: `Request from client: Request ${requestName}`,
                    content: `Request: ${requestName}`,
                    filePath: null,
                    imagePath: null,
                })
            })
            if (response.ok) {
                if (requestName === "Get List Processes") {
                    MessageServer('Your request is completed! Please check your email to see list of applications', 2000);
                } else if (requestName === "ScreenShot") {
                    MessageServer('Your request is completed! Please check your email to see screenshot', 2000)
                } else if (requestName === "Keylog") {
                    MessageServer('Please press any key to log', 2000);
                    setMessage('Keylog');
                } else if (requestName === "Shutdown") {
                    MessageServer('Your request is completed! Server was shutdown!!!', 2000);
                } else if (requestName === "Get File") {
                    MessageServer('Your request is completed! Please check your email to see file you want to see', 2000);
                } else {
                    MessageServer('Your request is completed! Please check your email to see all files in server', 2000);
                }
            } else {
                const errorData = await response.json();
                MessageServer('Error when sending email' + errorData.message, 2000);
            }

            setLoading(false)
        } catch (error) {
            setLoading(false)
            MessageServer('Error when sending Email: ' + error, 2000);
        }
    }

    const handleGetFile = async () => {
        if (FilePath.length > 0) {
            setMessage(null);
            try {
                const token = localStorage.getItem('token')
                const Email = localStorage.getItem('email')
                const Password = localStorage.getItem('password')
                const url = `http://localhost:8080/api/send-message`
                setLoading(true)
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        senderEmail: Email,
                        senderPassword: Password,
                        recipientEmail: 'nguyentuongbachhy@gmail.com',
                        subject: 'Request from client: Request Get File',
                        content: "Request Get File",
                        filePath: FilePath,
                        imagePath: null,
                    })
                })
                MessageServer('Your request is sent to server by email', 1000);
                if (response.ok) {
                    MessageServer('Your request is completed! Please check your email to see file you want to see', 2000);
                }
                else {
                    const errorData = await response.json();
                    MessageServer('Error when sending email' + errorData.message, 2000);
                }
                setLoading(false)

            } catch (error) {
                setLoading(false)
                MessageServer('Error when sending Email: ' + error, 2000);
            }
        }
    }

    const handleKeyDown = async (event) => {
        if (event && event.code) {
            let pressedKey = event.code;

            switch (pressedKey) {
                case 'Space':
                case 'Enter':
                case 'Escape':
                case 'Backspace':
                    // No need to do anything special for Escape and Backspace
                    break;
                case 'ShiftLeft':
                case 'ShiftRight':
                    pressedKey = 'Shift';
                    break;
                default:
                    // Extract the last character from the code as the key value
                    pressedKey = pressedKey.slice(-1);
                    break;
            }

            try {
                const token = localStorage.getItem('token');
                const url = 'http://localhost:8080/api/log-key';

                // Create a new event with the correct key value
                const keyEvent = new KeyboardEvent('keydown', { key: pressedKey });

                // Dispatch the event synchronously
                document.dispatchEvent(keyEvent);

                // Now, send the request with the modified pressedKey
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        key: pressedKey
                    }),
                });

                if (response.ok) {
                    console.log('Key logged successfully!');
                } else {
                    const errorData = await response.json();
                    console.log('Error logging key: ', errorData);
                }
            } catch (error) {
                console.log('Error logging key: ', error);
            }
        }
    };




    const handleStopLogging = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const Email = localStorage.getItem('email')
            const url = 'http://localhost:8080/api/stop-logging'
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    senderEmail: Email
                }),
            })

            if (response.ok) {
                MessageServer('Key logging stopped! Please check your email to see keylog file', 2000);
            } else {
                const errorData = await response.json();
                MessageServer('Error stopping key logging' + errorData, 2000);
            }
            setMessage(null);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            MessageServer('Error stopping key logging' + error, 2000);
            setMessage(null);
        }
    }

    const handleSendSystemPassword = () => {
        if (SystemPassword === 'PTKT2701@projectMMT') {
            MessageServer('Your order is shutdown', 1000);
            sendMail("Shutdown")
            setMessage(null);
        }
        else {
            MessageServer('System password is incorrect! Please choose another requests', 500);
            setMessage(null);
        }
        setSystemPassword(null)
    }

    const handleKillApp = async () => {
        const pid = parseInt(Pid);
        console.log(pid);
        const Email = localStorage.getItem('email');
        const Password = localStorage.getItem('password')

        if (!isNaN(pid) && Email && Password) {
            setLoading(true)
            try {
                const token = localStorage.getItem('token');
                const url = 'http://localhost:8080/api/kill-app';

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        pidCode: pid,
                        nameApp: '',
                        senderEmail: Email,
                        senderPassword: Password
                    })
                });

                if (response.ok) {
                    MessageServer('Kill app successfully!', 2000);
                } else {
                    const errorData = await response.json();
                    MessageServer(`Kill app failed! Error: ${errorData}`, 2000);
                }

                setMessage(null);
            } catch (error) {
                MessageServer(`Error when sending email: ${error}`, 2000);
                setMessage(null);
            }
            setLoading(false)
        } else {
            MessageServer('Invalid Pid, Email, or Password', 2000);
        }
        setPid(null);
    }

    const handleStartApp = async () => {
        try {
            console.log(AppName);
            const token = localStorage.getItem('token')
            const Email = localStorage.getItem('email')
            const Password = localStorage.getItem('password')
            const url = 'http://localhost:8080/api/start-app'
            setLoading(true)
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    pidCode: 0,
                    nameApp: AppName,
                    senderEmail: Email,
                    senderPassword: Password
                })
            })


            if (response.ok) {
                MessageServer('Start app successfully!', 2000);
            } else {
                const errorData = await response.json()
                MessageServer(`Start app failed! Error: ${errorData}`, 2000);
            }
            setMessage(null)

        } catch (error) {
            MessageServer(`Error when sending email: ${error}`, 2000)
            setMessage(null)
        }
        setLoading(false)
        setAppName(null)
    }

    const clickSendMessage = ({ number, content }) => {
        setMessages([...messages, { text: `Button ${number} - ${content} clicked`, sender: 'user' }]);

        switch (number) {
            case 1:
                MessageServer('Your request is get list of applications are running in our server!', 1000)
                sendMail("Get List Processes")
                break;
            case 2:
                MessageServer('Your request is take our screen!', 1000);
                sendMail("ScreenShot");
                break;
            case 3:
                MessageServer('Your request is take keylog', 1000);
                sendMail("Keylog")
                break;
            case 4:
                MessageServer('Please enter system password to shutdown server', 1000);
                setMessage('Shutdown');
                break;
            case 5:
                MessageServer('Your request is get file', 1000);
                MessageServer('Please enter file path you want to get', 2000);
                setMessage('Get File')
                break;
            case 6:
                MessageServer('Your request is get all files', 1000);
                sendMail("Get All Files")
                break;
            case 7:
                MessageServer('Please enter AppPID', 1000);
                setMessage('Kill App')
                break;
            case 8:
                MessageServer('Please enter name of app you want to start', 1000);
                setMessage('Start App')
                break;
            default:
                break;
        }
    };

    return (
        <div className={`p-4 h-[90vh] relative ${lightMode ? 'bg-white' : 'bg-dark'}`}>
            {loading && <Loading />}
            <Header lightMode={lightMode} />
            <MessageList messages={messages} lightMode={lightMode} />
            {showOptions ?
                (message === 'Keylog' ?
                    (<div className='flex'>
                        <input
                            className={`flex-grow p-2 outline-none rounded-l text-[18px] ${lightMode ? 'bg-white text-black border border-l-black border-y-black' : 'bg-[#333] text-white border border-l-white border-y-white'}`}
                            type='text'
                            placeholder='Type and press any key to log'
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            className={`bg-blue-500  ${lightMode ? 'text-white border border-y-black border-r-black' : 'text-black border border-y-white border-r-white'} p-2 rounded-r text-[18px] w-[64px]`}
                            onClick={handleStopLogging}
                        >
                            Stop
                        </button>
                    </div>)
                    : (message === 'Get File' ?
                        (<div className='flex'>
                            <input
                                className={`flex-grow p-2 outline-none rounded-l text-[18px] ${lightMode ? 'bg-white text-black border border-l-black border-y-black' : 'bg-[#333] text-white border border-l-white border-y-white'}`}
                                type="text"
                                placeholder='Enter File Path (Example: A/B/C/...)'
                                value={FilePath}
                                onChange={(e) => setFilePath(e.target.value)}
                            />
                            <button
                                className={`bg-blue-500  ${lightMode ? 'text-white border border-y-black border-r-black' : 'text-black border border-y-white border-r-white'} p-2 rounded-r text-[18px] w-[64px]`}
                                onClick={handleGetFile}
                            >
                                Send
                            </button>
                        </div>)
                        : (message === 'Shutdown' ?
                            (<div className='flex'>
                                <input
                                    className={`flex-grow p-2 outline-none rounded-l text-[18px] ${lightMode ? 'bg-white text-black border border-l-black border-y-black' : 'bg-[#333] text-white border border-l-white border-y-white'}`}
                                    type="password"
                                    placeholder='Enter System Password'
                                    value={SystemPassword}
                                    onChange={(e) => setSystemPassword(e.target.value)}
                                />
                                <button
                                    className={`bg-blue-500  ${lightMode ? 'text-white border border-y-black border-r-black' : 'text-black border border-y-white border-r-white'} p-2 rounded-r text-[18px] w-[64px]`}
                                    onClick={handleSendSystemPassword}
                                >
                                    Send
                                </button>
                            </div>)
                            : (message === 'Kill App' ?
                                (<div className='flex'>
                                    <input
                                        className={`flex-grow p-2 outline-none rounded-l text-[18px] ${lightMode ? 'bg-white text-black border border-l-black border-y-black' : 'bg-[#333] text-white border border-l-white border-y-white'}`}
                                        type="text"
                                        placeholder='Enter PID App'
                                        value={Pid}
                                        onChange={(e) => setPid(e.target.value)}
                                    />
                                    <button
                                        className={`bg-blue-500  ${lightMode ? 'text-white border border-y-black border-r-black' : 'text-black border border-y-white border-r-white'} p-2 rounded-r text-[18px] w-[64px]`}
                                        onClick={handleKillApp}
                                    >
                                        Send
                                    </button>
                                </div>)
                                : (message === 'Start App' ?
                                    (<div className='flex'>
                                        <input
                                            className={`flex-grow p-2 outline-none rounded-l text-[18px] ${lightMode ? 'bg-white text-black border border-l-black border-y-black' : 'bg-[#333] text-white border border-l-white border-y-white'}`}
                                            type="text"
                                            placeholder='Enter Name of Application you want to start'
                                            value={AppName}
                                            onChange={(e) => setAppName(e.target.value)}
                                        />
                                        <button
                                            className={`bg-blue-500  ${lightMode ? 'text-white border border-y-black border-r-black' : 'text-black border border-y-white border-r-white'} p-2 rounded-r text-[18px] w-[64px]`}
                                            onClick={handleStartApp}
                                        >
                                            Send
                                        </button>
                                    </div>)
                                    : (<ButtonList sendMessage={clickSendMessage} lightMode={lightMode} />))))))
                : (<MessageInput setMessage={setMessage} sendMessage={sendMessage} message={message} lightMode={lightMode} />)}
        </div>
    );
};

export default BoxChat;
