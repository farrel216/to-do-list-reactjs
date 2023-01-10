import { useState, createContext, useContext } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";


const AuthContext = createContext();

function AuthProvider({children}){
    const auth = useAuthProvider();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext);

const useAuthProvider = () => {
    const [token, setToken] = useState("");
    const [expire, setExpire] = useState();
    const [isLogin, setIsLogin] = useState();

    const getToken = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/token`,{withCredentials:true})
          console.log(response)
          setToken(response.data.accessToken)
          const decoded = jwtDecode(response.data.accessToken)
          setExpire(decoded.exp)
          setIsLogin(true)
          return response.data.accessToken
        } catch (error) {
          console.log(error)
        }
    }
    const logout = async() =>{
        try {
          await axios.delete(`${process.env.REACT_APP_API_URL}/auth/logout`,{withCredentials:true})
          setIsLogin(false)
          setToken("")
        } catch (error) {
          console.log(error)
        }
      }

    return { isLogin, token, expire, getToken, logout };
}

export { AuthProvider, useAuth };