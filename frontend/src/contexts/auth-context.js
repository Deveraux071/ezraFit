import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase.js';
import { database } from '../firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, deleteUser, updatePassword, updateEmail } from 'firebase/auth'
const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function useDatabase() {
    return database;
}
export function AuthProvider( {children} ) {
    const [user, setUser] = useState()

    function register(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

    function updateEm(email) {
        return updateEmail(auth.currentUser, email)
    }

    function updatePW(password) {
        return updatePassword(auth.currentUser, password)
    }

    function updateName(name) {
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    function deleteAccount() {
        return deleteUser(auth.currentUser)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user)
        })

        return unsubscribe
    }, [])
    
    const value = {
        user,
        register,
        login,
        logout,
        updateEm,
        updatePW,
        updateName,
        deleteAccount
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}