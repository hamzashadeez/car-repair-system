  
import firebase from 'firebase'

var firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC2L5D5hW0Tt3mgsvUTHStJktY0cXAJKws",
    authDomain: "car-repair-system.firebaseapp.com",
    projectId: "car-repair-system",
    storageBucket: "car-repair-system.appspot.com",
    messagingSenderId: "102088087661",
    appId: "1:102088087661:web:e624ae3735a6eda7b28764",
    measurementId: "G-DN8FBWP3SN"
  });

  const storage = firebaseApp.storage();
  const auth = firebaseApp.auth();
  const db = firebaseApp.firestore();

  export {db, storage, auth}; 

