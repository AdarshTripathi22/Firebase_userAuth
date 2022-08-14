import React, { useContext, useState, useEffect } from 'react'
// import { auth } from "../firebase"
// import {  onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth'

const AuthContext = React.createContext()
// const x = getAuth();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider ({ children, value }) {
    // const [currentUser, setCurrentUser] = useState();
    // const [loading, setLoading] = useState(true)

    // function signup(email, password) {
    //     return createUserWithEmailAndPassword(auth, email, password)
    // }

    // function logout() {
    //     return auth.signOut();
    // }

    // function login(email, password) {
    //     return signInWithEmailAndPassword(auth , email, password);
    // }

    // useEffect(()=>{
    //     const unsubscribe = onAuthStateChanged(auth , user => {
    //         setCurrentUser(user)
    //         setLoading(false)
    //     })

    //     return unsubscribe
    // },[])

    // const value = {
    //     currentUser,
    //     login,
    //     logout,
    //     signup
    // }

  return (
    <AuthContext.Provider value = {value}>
        {/* {!loading && children} */}
        {children}        
    </AuthContext.Provider>
  )
}
