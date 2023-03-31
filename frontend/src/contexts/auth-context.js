import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase'
const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}
export function AuthProvider( {children} ) {
    const [user, setUser] = useState()

    function register(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function updateEmail(email) {
        return user.updateEmail(email)
    }

    function updatePassword(password) {
        return user.updatePassword(password)
    }

    function updateName(name) {
        return user.updateProfile({
            displayName: name
        })
    }

    function deleteAccount() {
        return user.delete()
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
        updateEmail,
        updatePassword,
        updateName,
        deleteAccount
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}