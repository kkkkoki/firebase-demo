const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate((user: any) => {
    return db.doc(`users/${user.uid}`).set({
      name: user.displayName,
      avatarURL: user.photoURL,
      email: user.email,
    });
  });

export const deleteUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete((user: any) => {
    return db.doc(`users/${user.uid}`).delete();
  });
