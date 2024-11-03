import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyDvGPN31tbVaXDkZb8VqbnPrGtPiXMdz68",
    authDomain: "peekmarks.firebaseapp.com",
    projectId: "peekmarks",
    storageBucket: "peekmarks.firebasestorage.app",
    messagingSenderId: "227954109074",
    appId: "1:227954109074:web:b8b1c8f7ac97ec09b7944b"
};




const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const usersCollectionRef = collection(db, "users");
addDoc(usersCollectionRef, {
    firstName: "John",
    lastName: "Doe",
    age: 30,
});
console.log('hello')