import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from 'firebase/app';
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBa9aAViQWl0_4s0e5tRS-7-XGR4ek-tas",
    authDomain: "fill-blank.firebaseapp.com",
    projectId: "fill-blank",
    storageBucket: "fill-blank.appspot.com",
    messagingSenderId: "684782266805",
    appId: "1:684782266805:web:25fb75eddd9bb97764d1fc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION);

createApp(App).use(store).use(router).mount('#app');