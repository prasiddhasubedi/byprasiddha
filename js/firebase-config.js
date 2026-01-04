// firebase-config.js

// Replace with your actual Firebase credentials
const firebaseConfig = {
  apiKey: "AIzaSyBI9yc2IrLQ_S5KW_doGtXNWX1883un_lw",
  authDomain: "my-site-92874.firebaseapp.com",
  projectId: "my-site-92874",
  storageBucket: "my-site-92874.firebasestorage.app",
  messagingSenderId: "575232040342",
  appId: "1:575232040342:web:e4ce6274f43ba320a211b7",
  measurementId: "G-6CC0FXCQN1", // Optional for Analytics
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Make configuration available globally
window.firebaseConfig = firebaseConfig;
