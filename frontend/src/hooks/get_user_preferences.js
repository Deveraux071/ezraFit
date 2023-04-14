import { useEffect } from 'react';
import { onValue, ref } from "firebase/database";
import { useAuth, useDatabase } from '../contexts/auth-context';

export function useUserPreferences({ initialPreferences, setPreferences }) {
    const db = useDatabase();
    const { user } = useAuth()

    useEffect(() => {
        const docRef = ref(db, '/users/' + user?.uid + '/preferences')
        onValue(docRef, (snapshot) => {
            if (snapshot.exists()){
                const pref_list = snapshot.val()
                const starter = [...initialPreferences] // shallow copy of array
                starter.forEach((s, i) => {
                    s.push(pref_list[i])
                })
                setPreferences(starter)
            }
        })
    }, [user, db]) 
}
