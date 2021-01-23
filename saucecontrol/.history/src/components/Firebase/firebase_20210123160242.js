import app from 'firebase';

const config = {
  apiKey: "AIzaSyCDqiQUjFutaS5jkn7KxKoEAqR_uoIY-nY",
  authDomain: "saucecontrol-bc59e.firebaseapp.com",
  projectId: "saucecontrol-bc59e",
  storageBucket: "saucecontrol-bc59e.appspot.com",
  messagingSenderId: "998848435894",
  appId: "1:998848435894:web:188df51561202bdb86f817",
  measurementId: "G-SWHT2FX75X"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    /* app.initializeApp({
      apiKey: "AIzaSyCDqiQUjFutaS5jkn7KxKoEAqR_uoIY-nY",
      authDomain: "saucecontrol-bc59e.firebaseapp.com",
      projectId: 'saucecontrol-bc59e'
    }); */
    this.db = app.firestore();
  }

  async dump_database() {
    this.db.collection("recipes").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
      });
  });
  }
  async insert_recipe(state) {
    this.db.collection("recipes").doc(state.name).set({
      ingredients: state.ingredients,
      steps: state.steps
  })
  }
}



export default Firebase;
