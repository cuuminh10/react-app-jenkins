import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDILZmDj6r65f2rP79Zgqn1q1aipJqKfgI',
  authDomain: 'gmcexperterp.firebaseapp.com',
  databaseURL: 'https://gmcexperterp-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'gmcexperterp',
  storageBucket: 'gmcexperterp.appspot.com',
  messagingSenderId: '535463218312',
  appId: '1:535463218312:web:cf60d023dfa313c800233d',
  measurementId: 'G-714Z566E2Z'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
