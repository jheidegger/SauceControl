import app from 'firebase';
const functions = require('firebase-functions');
const admin = require('firebase-admin')
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
  async getRecipe(recipeTitle) {
    const recipes = await this.db.collection('recipes').doc(recipeTitle).get().data();
    console.log(recipes)
    return recipes
  }
  async whiteout_recipe(state) {
    console.log("parent to be invisd is " + state)
    this.db.collection("recipes").doc(state).update({visible: false})
  }
  async insert_recipe(state) {
    var email = "none";
    if(state.user !== null) {
      email = state.user.jt;
    }
    
    var recipeId = this.db.collection("recipes").add({
      title: state.title,
      ingredients: state.ingredients,
      steps: state.steps,
      summary: state.summary,
      parent: (state.parent !== undefined ? state.parent : undefined),
      user: email,
      visible: state.visible,
      date: Date.now(),
      children: []
    })
    if (state.parent !== undefined) {
      this.db.collection("recipes").doc(state.parent).update({

        "children": FieldValue.arrayUnion(recipeId)
    });
    }
    var db = this.db;
    recipeId.then(function(docRef){
      
      console.log(docRef.id);
      var query =db.collection("Users").where("email", "==", email).get();
      
      query.then(function(querySnapshot) {
        console.log(querySnapshot.size)
          if (querySnapshot.size !== 0) {

          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            db.collection("Users").doc(doc.id).collection('recipes').add({
              recipeId:docRef.id
            })
          })
        }
      })
    })
    
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }
  checkUser = (email) => {
    var query = this.db.collection("Users").where("email", "==", email).get();
    var db = this.db;
    query.then(function(querySnapshot) {
      console.log(querySnapshot.size)
      if (querySnapshot.size === 0) {
        db.collection("Users").add({
          email: email
        })
      }
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}
}


export default Firebase;
