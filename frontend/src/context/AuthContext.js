import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) =>{

    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)
    const navigate  = useNavigate()

    let loginUser = async (e )=> {

        e.preventDefault() //to prevent refresh the bege
        // console.log('form Submitted')
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(
                {
                'username':e.target.username.value, 
                'password':e.target.password.value
                })
        })
        let data = await response.json()
        console.log('data:', data)
        console.log('response:', response)
        if(response.status === 200){
            toast.success('Login Succesfully')
            setAuthTokens(data) // we will store it in state and in local storage.
            setUser(jwt_decode(data.access)) // jwt_decode: to take some data from the access token
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/candidates')
        }
        else{
            toast.error('somthing went wrong!')
            toast.error(data.detail)
        }
    }

    // logout functionality : add the function that changes state, removes that local storage and redirects a user 
    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/')

    }

    let updateToken = async () => {
        console.log('Update token called')
        let response = await fetch(`http://127.0.0.1:8000/api/token/refresh/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(
                {
                'refresh': authTokens.refresh, 
                })
        })
        let data = await response.json()
        
        if(response.status === 200){
            setAuthTokens(data) // we will store it in state and in local storage.
            setUser(jwt_decode(data.access)) // jwt_decode: to take some data from the access token
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }
    }

        let contextData = {
           user:user,
           authTokens:authTokens,
           loginUser:loginUser,
           logoutUser:logoutUser,
    }

    useEffect(()=>{

        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return()=> clearInterval(interval)
    },[authTokens, loading])


    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}


// npm install jwt-decode  // this library to decode the token