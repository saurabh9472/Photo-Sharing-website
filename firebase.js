
import firebase from "firebase";




  const firebaseApp =firebase.initializeApp(
      {

        apiKey: "AIzaSyBvHoqgBz-NPysxvzrTKNmIjgh5whU2rbY",
        authDomain: "instareact-1966b.firebaseapp.com",
        databaseURL: "https://instareact-1966b-default-rtdb.firebaseio.com",
        projectId: "instareact-1966b",
        storageBucket: "instareact-1966b.appspot.com",
        messagingSenderId: "490799749621",
        appId: "1:490799749621:web:dd33184fc1b785d8e028bc",
        measurementId: "G-GY5K4V43GD"
      }
  );

  const db= firebaseApp.firestore();
  const auth=firebase.auth();
  const storage= firebase.storage();
  export { db,auth ,storage};


  //export default db;
