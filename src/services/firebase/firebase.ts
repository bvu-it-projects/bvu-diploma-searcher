import firebase from 'firebase';
import 'firebase/analytics';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBbXSqmge_ROAQx1QNO-8AzmDXByUEZnYc',
  authDomain: 'pybot-builder.firebaseapp.com',
  databaseURL: 'https://pybot-builder-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'pybot-builder',
  storageBucket: 'pybot-builder.appspot.com',
  messagingSenderId: '585518828639',
  appId: '1:585518828639:web:6906924533cc519c6d5fea',
  measurementId: 'G-7F0VQJBSX7',
};

export function initializeFirebaseApp() {
  firebase.initializeApp(firebaseConfig);
}
