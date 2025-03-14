import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode as jwt_decode } from 'jwt-decode';  

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null); 
    const [motherTongue, setMotherTongue] = useState(null)

    // console.log(`userId: ${userId}`);
    //  console.log(`motherTongue: ${motherTongue}`);
    
    
    const loginUser = (id, motherTongue) => {
        setUserId(id); 
        setMotherTongue(motherTongue);
        localStorage.setItem('token', id);
    };

    const logoutUser = () => {
        setUserId(null);
        setMotherTongue(null);
        localStorage.removeItem('token');  
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        //console.log(`user Token: ${token}`);
        
        if (token) {
            try {
                const decodedToken = jwt_decode(token);
                //console.log("Decoded Token:", JSON.stringify(decodedToken, null, 2));
                
                setUserId(decodedToken.userId);
                setMotherTongue(decodedToken.motherTongue)
            } catch (error) {
                console.error("Invalid token:", error);
                setUserId(null);
                 setMotherTongue(null);
            }
        }
    }, []);  

    const isAuthenticated = userId !== null;

    const contextValue = {
        userId, 
        motherTongue,
        loginUser,
        logoutUser,
        isAuthenticated
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};
