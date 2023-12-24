import React, { createContext, useContext, useState } from 'react';

const UseLightMode = createContext();

export const UseLightModeProvider = ({ children }) => {
    const [lightMode, setLightMode] = useState(true);

    return (
        <UseLightMode.Provider value={{ lightMode, setLightMode }}>
            {children}
        </UseLightMode.Provider>
    );
};

export const useColor = () => {
    return useContext(UseLightMode);
};


