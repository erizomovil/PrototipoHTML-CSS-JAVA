// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import {  getDatabase, ref, onValue, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const FIREBASE_CONFIG = {
    apiKey: "AIzaSyA2CV0McfmpwxIYxzs7R_J90d5akpqUmFE",
    authDomain: "rincon-literario-f280a.firebaseapp.com",
    databaseURL: "https://rincon-literario-f280a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "rincon-literario-f280a",
    storageBucket: "rincon-literario-f280a.appspot.com",
    messagingSenderId: "331389414561",
    appId: "1:331389414561:web:ec86ad4c4a87db7b0414e0",
    measurementId: "G-Z6VS7TB3MR"
  };

  // Initialize Firebase
  initializeApp(FIREBASE_CONFIG);

  const DB = getDatabase();

function initialize() {
  const CHAT_FORM = document.getElementById("chat-form");
  CHAT_FORM.addEventListener("submit", addNewMessage);


  const MESSAGES_REF = ref(DB, "messages/");

  onValue(MESSAGES_REF, showMessages);
}

function showMessages(snapshot) {
  const MESSAGES_FORM_FIREBASE = snapshot.val();
  const MESSAGE_LIST = document.getElementById("messages-list");
  MESSAGE_LIST.innerHTML = ``;
  for (let m in MESSAGES_FORM_FIREBASE) {
    const TEXT = MESSAGES_FORM_FIREBASE[m].text;
    const SENDER = MESSAGES_FORM_FIREBASE[m].sender;
    MESSAGE_LIST.innerHTML += `<p><strong>${SENDER}:</strong> ${TEXT}</p>`;
  }
}

function addNewMessage(event) {
  event.preventDefault();

  const SENDER = event.target["message-sender"].value;
  const TEXT = event.target["message-text"].value;

  const newMESSAGE = {
    sender: SENDER,
    text: TEXT
  }
  const MESSAGES_REF = ref(DB, "messages/");
  push(MESSAGES_REF, newMESSAGE);
  event.target["message-sender"].value = "";
  event.target["message-text"].value = "";
}
initialize();