/* ISHU STORE XYZ — Firebase config
   Backup rules (paste in Firebase Console → Realtime Database):
   { "rules": { ".read": true, ".write": true } }
   Storage rules:
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /{allPaths=**} { allow read, write: if true; }
     }
   }
   FIRESTORE (Cloud Firestore → Rules tab):
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} { allow read, write: if true; }
     }
   }
   NOTE: Firestore ko Firebase Console → Build → Firestore Database → Create database
   karke ENABLE karna zaroori hai (rules test mode rakh sakte ho).
*/
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyBxOgUTjX89jgXyg2Mk_H_ZR3Q8h-J_Ru4",
  authDomain: "ishu-xyz-store.firebaseapp.com",
  projectId: "ishu-xyz-store",
  storageBucket: "ishu-xyz-store.firebasestorage.app",
  messagingSenderId: "367007533383",
  appId: "1:367007533383:web:0619f77a6d75f16f412462",
  measurementId: "G-4741BR7694"
};