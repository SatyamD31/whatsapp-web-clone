import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC-wCJWZzAr8SN6vE30VD6c6_nwViNv0pI",
    authDomain: "whatsapp-clone-8fe1e.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-8fe1e.firebaseio.com",
    projectId: "whatsapp-clone-8fe1e",
    storageBucket: "whatsapp-clone-8fe1e.appspot.com",
    messagingSenderId: "797979711882",
    appId: "1:797979711882:web:cb42a1af27818400eb1073",
    measurementId: "G-03LJP71SLL"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;