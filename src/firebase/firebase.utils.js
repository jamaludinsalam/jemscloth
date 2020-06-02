import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC9w381ZE5KN47j5Ov_L1oFlMqqsTYs4Yw",
    authDomain: "jems-cloth.firebaseapp.com",
    databaseURL: "https://jems-cloth.firebaseio.com",
    projectId: "jems-cloth",
    storageBucket: "jems-cloth.appspot.com",
    messagingSenderId: "724204603671",
    appId: "1:724204603671:web:32acd34e5f3c2a30f40f52",
    measurementId: "G-SY70W6NGL1"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
 
  
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ 
  prompt: 'select_account' , 
  'login_hint': 'user@example.com'
});
// export const signInWithGoogle = () => auth.signInWithPopup(provider) ;
export const signInWithGoogle = () => auth.signInWithPopup(provider)  ;


export default firebase;