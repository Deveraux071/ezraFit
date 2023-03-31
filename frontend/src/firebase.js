import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const app = firebase.initializeApp({
    apiKey: "AIzaSyAjCdDCnmWx2NWwSLDFeHcD1jLem4jV1fU",
    authDomain: "ezrafit-e157e.firebaseapp.com",
    databaseURL: "https://ezrafit-e157e-default-rtdb.firebaseio.com",
    projectId: "ezrafit-e157e",
    storageBucket: "ezrafit-e157e.appspot.com",
    messagingSenderId: "940654216053",
    appId: "1:940654216053:web:b0d874482b3d3a186bc93c",
    measurementId: "G-YSXP4J9PSW"
})

export const auth = app.auth()
export default app

