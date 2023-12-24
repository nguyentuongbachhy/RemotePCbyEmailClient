import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react';
import { useColor } from '../../components/UseLightMode';
import { useUser } from '../../components/UserContext';
import BoxChat from './BoxChat';
import HeroAria from './HeroArea';
const Home = () => {
    const { username, setUsername } = useUser()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const userData = jwtDecode(token)
            if (userData) setUsername(userData.sub)
            else setUsername(null)
        } else setUsername(null)
    }, [setUsername])
    const { lightMode } = useColor()


    return (
        <div className={`px-4 ${lightMode ? 'bg-white' : 'bg-dark'}`}>
            {username !== null ? <BoxChat username={username} /> : <HeroAria />}
        </div>
    );
}

export default Home