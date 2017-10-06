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
        console.log('set Result for ' + year + ' ' + month + ' ' + role);
        const ref = this.db.ref('results/' + year + '/' + month + '/' + role + '/history/' + user);
        //const a = ref.once('value');
        return ref;
    },  
    
    getRole(user) {
        console.log('get Role for ' + user);
        const ref = this.db.ref('users');
        const a = ref.once('value');
        return a;
    },

    getColleges(role) {
        console.log('get Colleges for ' + role);
        const ref = this.db.ref('users');
        const a = ref.once('value');
        return a;
    },
    
    getCriterion(role) {
        console.log('get Criterion for ' + role);
        const ref = this.db.ref('criterion');
        const a = ref.once('value');
        return a;
    }
};

export { db };
export default app;
