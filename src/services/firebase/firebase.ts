import firebase from 'firebase';
import 'firebase/analytics';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDihc0ObMgwBfe2m4wWxil1x1P3dT0ChwY',
  authDomain: 'bvu-dormitory.firebaseapp.com',
  databaseURL: 'https://bvu-dormitory-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'bvu-dormitory',
  storageBucket: 'bvu-dormitory.appspot.com',
  messagingSenderId: '425901189217',
  appId: '1:425901189217:web:ac779f91a435b95cb1a220',
  measurementId: 'G-Y4FH289Z84',
};

export function initializeFirebaseApp() {
  // const analytics = getAnalytics(app);
  firebase.initializeApp(firebaseConfig);
}
