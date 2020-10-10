import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB_8cX0jpOvzWXTEXifPE70u25ogTu4QNY",
  authDomain: "my-todo-app-b388b.firebaseapp.com",
  databaseURL: "https://my-todo-app-b388b.firebaseio.com",
  projectId: "my-todo-app-b388b",
  storageBucket: "my-todo-app-b388b.appspot.com",
  messagingSenderId: "701377289734",
  appId: "1:701377289734:web:925f49eb2795708cac6d87",
  measurementId: "G-LZWSC61RV7",
});

const db = firebaseApp.firestore();

export default db;
