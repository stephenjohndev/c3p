import firebase from 'firebase/app';
import firebaseui from 'firebaseui';
// Add the Firebase services that you want to use
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

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

// Configure Firestore
var db = firebase.firestore();
var xdb = indexedDB.open('foo');
xdb.onsuccess = () => {
  db.enablePersistence().catch(error => {
    console.error('persistence error');
    console.error(error);
  });
};
xdb.onerror = () => { /* don't enable persistence */ };

// Configure Storage
var storageRef = firebase.storage().ref();

export { firebaseui, db, storageRef };
export default firebase;
