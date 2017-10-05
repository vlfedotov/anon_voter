import * as firebase from 'firebase';

const app = firebase.initializeApp({
    apiKey: "AIzaSyB78FQRpo7gDnKPcBxzSxm68z0RwNEjCqg",
    authDomain: "b2bvoter.firebaseapp.com",
    databaseURL: "https://b2bvoter.firebaseio.com",
    projectId: "b2bvoter",
    storageBucket: "b2bvoter.appspot.com",
    messagingSenderId: "401962735618"
});

export default app;
