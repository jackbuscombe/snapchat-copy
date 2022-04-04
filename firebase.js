import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDBeV6OAroV-goglhlRtagM9vUJ7-Qjk_0",
	authDomain: "snapchat-copy-b1db9.firebaseapp.com",
	projectId: "snapchat-copy-b1db9",
	storageBucket: "snapchat-copy-b1db9.appspot.com",
	messagingSenderId: "767538376850",
	appId: "1:767538376850:web:3314dad6cd10ddc24db64b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { db, auth, storage, provider };
