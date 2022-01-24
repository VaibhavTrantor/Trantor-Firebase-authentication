import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,sendPasswordResetEmail,updateEmail,updatePassword ,signInWithPopup} from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { auth, googleprovider,twitterprovider,gitprovider } from '../Authentication/firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [currentuser, setCurrentuser] = useState()
    const [Loading, setLoading] = useState(true)
    const signup = (email,password)=>{
        
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const login = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
       
    }
    const logout = ()=>{
        return signOut(auth)
       
    }
    const googlelogin = ()=>{
        return signInWithPopup(auth,googleprovider)
    }
    const gitlogin = ()=>{
        return signInWithPopup(auth,gitprovider)
    }
    const twitterlogin = ()=>{
        return signInWithPopup(auth,twitterprovider)
    }
    const updatepassword1 = (password)=>{
        return updatePassword(currentuser,password)
       
    }
    const updateemail1 = (email)=>{
        return updateEmail(currentuser,email)
       
    }
    
    const resetpassword = (email)=>{
        return sendPasswordResetEmail(auth,email)
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user=>{
            setCurrentuser(user)
            setLoading(false)
        }) 
        return unsubscribe
    }, [])
    const value = {currentuser,signup,login,logout,resetpassword,updateemail1,updatepassword1,googlelogin,twitterlogin,gitlogin}
    return (
        <AuthContext.Provider value={value}>
            {!Loading && children}
        </AuthContext.Provider>
    )
}


