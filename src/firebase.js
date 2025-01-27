
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyA3L45m5Otprk2FaRsEAys91kbfrGmcIFA",
    authDomain: "myapp-a1baf.firebaseapp.com",
    projectId: "myapp-a1baf",
    storageBucket: "myapp-a1baf.firebasestorage.app",
    messagingSenderId: "12757156775",
    appId: "1:12757156775:web:64b881846ab83f30b3ec82",
    measurementId: "G-Z16RWZSB21"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };
