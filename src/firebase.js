import * as firebase from 'firebase/app';
import firebaseui from 'firebaseui';
// Add the Firebase services that you want to use
import 'firebase/firestore';
import 'firebase/auth';

var config = {
  apiKey: 'AIzaSyDijaSaSlFKTWjWGiKx_sbH06DuoA-ShLk',
  authDomain: 'c3p-website.firebaseapp.com',
  databaseURL: 'https://c3p-website.firebaseio.com',
  projectId: 'c3p-website',
  storageBucket: 'c3p-website.appspot.com',
  messagingSenderId: '814304727595'
};

// Initialize Firebase
firebase.initializeApp(config);

export { firebaseui };
export var db = firebase.firestore();
export default firebase;
