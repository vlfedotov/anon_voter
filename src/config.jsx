import * as firebase from 'firebase';

const app = firebase.initializeApp({
    apiKey: "AIzaSyB78FQRpo7gDnKPcBxzSxm68z0RwNEjCqg",
    authDomain: "b2bvoter.firebaseapp.com",
    databaseURL: "https://b2bvoter.firebaseio.com",
    projectId: "b2bvoter",
    storageBucket: "b2bvoter.appspot.com",
    messagingSenderId: "401962735618"
});

const db = {
    db: app.database(),

    setResult(year, month, user, role) {
        return this.db.ref('results/' + year + '/' + month + '/' + role + '/history/' + user);
    },
    
    getRole(user) {
        return this.db.ref('users').once('value');
    },

    getColleges(role) {
        return this.db.ref('users').once('value');
    },
    
    getCriterion(role) {
        return this.db.ref('criterion').once('value');
    }
};

export { db };
export default app;
