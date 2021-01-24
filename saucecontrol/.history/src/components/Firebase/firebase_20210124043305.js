import app from 'firebase';
import firebase from 'firebase/app'
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
    this.storage = app.storage();
  }
  async getParent(uid) {
    return await this.db.collection('recipes').doc(uid).get.data().parent;
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
    var par = state.parent;

    var db = this.db;
    var recipeId = this.db.collection("recipes").add({
      title: state.title,
      ingredients: state.ingredients,
      steps: state.steps,
      summary: state.summary,
      user: email,
      photoURL: "none",
      parent: (state.parent !== undefined ? state.parent : undefined),
      visible: state.visible,
      date: Date.now(),
      children: []
  })
    var db = this.db;
    var storage = this.storage;
    recipeId.then(function(docRef){
      console.log("doc ref is ")
      console.log(docRef.path.split("/")[1])
      console.log("par is")
      if (par !== undefined && docRef !== undefined) {
        db.collection("recipes").doc(par).update({
          "children": firebase.firestore.FieldValue.arrayUnion(docRef.path.split("/")[1])
      });
      }
      //insert image to storage if exists
      if(state.pictureFile !== null) {
        console.log('gonna try to add to storage')
        const key = Date().toLocaleString() + state.user.bT;
        const img = storage.ref().child(key);

        img.put(state.pictureFile).then((snap) => {
            console.log("Metadata: " + snap.metadata)
            storage.ref().child(key).getDownloadURL().then(function(downloadURL) {
                console.log(downloadURL)
                db.collection('recipes').doc(docRef.id).update({
                  photoURL: downloadURL
                })
            })
        })
      }
      else {
        console.log('SIKE')
      }

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
