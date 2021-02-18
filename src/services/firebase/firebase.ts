import firebase from 'firebase';
import 'firebase/analytics';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCDkasNb3Kk9rNa6ja50nLfkVyGStRWpbY',
  authDomain: 'diploma-searcher.firebaseapp.com',
  databaseURL: 'https://diploma-searcher-default-rtdb.firebaseio.com',
  projectId: 'diploma-searcher',
  storageBucket: 'diploma-searcher.appspot.com',
  messagingSenderId: '625287339057',
  appId: '1:625287339057:web:fb6406c8372773acf0c910',
  measurementId: 'G-ETD4JFL3SL',
};

export function initializeFirebaseApp() {
  firebase.initializeApp(firebaseConfig);
}
