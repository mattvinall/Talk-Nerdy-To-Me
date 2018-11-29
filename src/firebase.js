import firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyBhKdCnV30GelKE_X5aij1HU7DwRNtF7zE",
    authDomain: "talk-nerdy-to-me-3c015.firebaseapp.com",
    databaseURL: "https://talk-nerdy-to-me-3c015.firebaseio.com",
    projectId: "talk-nerdy-to-me-3c015",
    storageBucket: "talk-nerdy-to-me-3c015.appspot.com",
    messagingSenderId: "867117437170"

};
firebase.initializeApp(config);

// this exports the CONFIGURED version of firebase
export default firebase;
