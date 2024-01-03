// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDGzxx6Hw_0s6PWUQ3uVkP3YvREEkYAh-A',
  authDomain: 'familytodo-8e013.firebaseapp.com',
  databaseURL:
    'https://familytodo-8e013-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'familytodo-8e013',
  storageBucket: 'familytodo-8e013.appspot.com',
  messagingSenderId: '582327765484',
  appId: '1:582327765484:web:de364df22ece7cc34ad8c9',
}

// Initialize Firebase
initializeApp(firebaseConfig)
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
