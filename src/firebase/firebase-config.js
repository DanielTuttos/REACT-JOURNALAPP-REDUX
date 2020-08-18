import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDymZ2sdwA8RbmEsfwStfG86d2JNWkgT80",
    authDomain: "react-journalapp-redux.firebaseapp.com",
    databaseURL: "https://react-journalapp-redux.firebaseio.com",
    projectId: "react-journalapp-redux",
    storageBucket: "react-journalapp-redux.appspot.com",
    messagingSenderId: "454794807747",
    appId: "1:454794807747:web:c10375993ea926ea6c9576"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db, 
    googleAuthProvider,
    firebase
}