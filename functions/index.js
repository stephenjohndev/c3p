const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

// const createProfile = ({ uid }, context) => {
//   return db
//     .collection('users')
//     .doc(uid)
//     .set({ isAuthorized: false })
//     .catch(console.error);
// };

// exports.recordNewAccount = functions.auth.user().onCreate(createProfile);
