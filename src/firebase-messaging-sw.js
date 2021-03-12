
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js');
// import { environment } from '../environments/environment';
// const messagingSenderId = environment.firebase.messagingSenderId;
// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '903064996507'
});
function test() {
  window.location.replace("https://docs.google.com/spreadsheets/d/1cx2Ao6Wf0V0SutYseiCe825Rptr8Lt_zy7emIDUE_lU/edit?usp=sharing");
}

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
