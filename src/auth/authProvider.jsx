import React from 'react'
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react";

const AuthContext = createContext();

function AuthProvider({children}) {
    const [token, setToken] = useState();
    // Memorized value of the authentication context
    const authContext = useMemo(
        () => ({
        token,
        setToken
        }),
        [token]
    );
    // useEffect(()=> {
    //    sessionStorage.setItem('token', token);
    // }, [token]);
    
    return (
        <AuthContext.Provider value={{authContext}}>{children}</AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider