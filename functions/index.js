const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

const createProfile = ({ uid }, context) => {
  return db
    .collection('users')
    .doc(uid)
    .set({ isAuthorized: false })
    .catch(console.error);
};

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.recordNewAccount = functions.auth.user().onCreate(createProfile);
