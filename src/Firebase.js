import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyA7MLRjpa82plGuFgDkB5iyaPSg0KQrD7g",
    authDomain: "auth-development-6fc32.firebaseapp.com",
    projectId: "auth-development-6fc32",
    storageBucket: "auth-development-6fc32.appspot.com",
    messagingSenderId: "390072226399",
    appId: "1:390072226399:web:a1e2c69608aab9822881ea",
    measurementId: "G-07WQY1BQZG"
  };

  const app = initializeApp(firebaseConfig)

  export const auth = getAuth(app)