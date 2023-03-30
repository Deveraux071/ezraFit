import { createContext, useContext, useEffect } from 'react';
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
        user.updateEmail(email)
    }

    function updatePassword(password) {
        user.updatePassword(password)
    }

    function updateName(name) {
        user.updateProfile({
            displayName: name
        })
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
        updateName
    }

    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}