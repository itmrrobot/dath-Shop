import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({children}) {
    const [user,setUser] = useState(null||JSON.parse(localStorage.getItem("user")));
    const [isLogin,setIsLogin] = useState(false);
    return (
        <AuthContext.Provider value={{user,setUser,isLogin,setIsLogin}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const AuthState = () => {
    return useContext(AuthContext);
}