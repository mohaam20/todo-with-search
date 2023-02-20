var firebaseConfig = {
  apiKey: "AIzaSyBpwczi5U-uvxudaAwHaKshlzv5TEoQD_A",
  authDomain: "mobox-f68c0.firebaseapp.com",
  databaseURL:
    "https://mobox-f68c0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mobox-f68c0",
  storageBucket: "mobox-f68c0.appspot.com",
  messagingSenderId: "598637698065",
  appId: "1:598637698065:web:3ac96cb19a5c333c2a25b0",
  measurementId: "G-LYCD5G4KYQ",
};
// Initialize Firebase

// window.addEventListener("load", syncBase);
let alsIts = localStorage.getItem("todos");
let refrence = localStorage.setItem("station", alsIts);
let cloudd = document.querySelector("#cloud");
let lastUpdate;
let fromCloud;
// window.addEventListener("load", syncBase);
window.addEventListener("beforeunload", updateBase);
cloudd.addEventListener("pointerup", updateBase);
firebase.initializeApp(firebaseConfig);
// Initialize variables
window.addEventListener("click", checkIn);
const auth = firebase.auth();
const database = firebase.database();

const sentReg = document.querySelector("#subUser");
const sentlog = document.querySelector("#logUser");
const outlog = document.querySelector("#outa");

// sentReg.addEventListener("pointerup", () => {
//   console.log(email, password);
// });

sentReg.addEventListener("pointerup", register);
sentlog.addEventListener("pointerup", login);
function login() {
  // Get all our input fields
  let email = document.querySelector("#userV").value;
  let password = document.querySelector("#passV").value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password is Outta Line!!");
    return;
    // Don't continue running the code
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        last_login: Date.now(),
        email: email,
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).update(user_data);
      outlog.classList.toggle("hidden");
      // DOne
      alert("User Logged In!!");
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}

function register() {
  let email = document.querySelector("#userV").value;
  let password = document.querySelector("#passV").value;
  console.log(email, password);
  // Get all our input fields

  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password is Outta Line!!");
    return;
    // Don't continue running the code
  }
  //   if (
  //     validate_field(full_name) == false ||
  //     validate_field(favourite_song) == false ||
  //     validate_field(milk_before_cereal) == false
  //   ) {
  //     alert("One or More Extra Fields is Outta Line!!");
  //     return;
  //   }

  // Move on with Auth
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();
      console.log(
        localStorage.getItem("todos"),
        localStorage.getItem("checked") || JSON.stringify([])
      );
      // Create User data
      var user_data = {
        email: email,
        alldt: localStorage.getItem("todos") || JSON.stringify([]),
        allFlat: localStorage.getItem("checked") || JSON.stringify([]),
        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).set(user_data);

      // DOne
      alert("User Created!!");
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}

function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    // Email is good
    return true;
  } else {
    // Email is not good
    return false;
  }
}

function checkIn() {
  var user = auth.currentUser;

  if (user) {
    // User is signed in
    console.log("User is logged in.");
    // console.log(user);
  } else {
    // User is not signed in
    console.log("User is not logged in.");
  }
}

outlog.addEventListener("pointerup", () => {
  console.log("resssss");
  auth
    .signOut()
    .then(function () {
      todolist.innerHTML = "";
      localStorage.setItem("todos", JSON.stringify([]));
      localStorage.setItem("checked", JSON.stringify([]));
      outlog.classList.add("hidden");
      readLocal();
      // Sign-out successful.
    })
    .catch(function (error) {
      // An error happened.
      console.log(error.message);
    });
});

function updateBase() {
  let finall = localStorage.getItem("todos");
  let hold = localStorage.getItem("station");
  console.log(finall == hold);
  console.log(finall);
  console.log(hold);
  console.log(localStorage.getItem("checked") || JSON.stringify([]));
  if (finall !== hold) {
    let inst = Date.now();
    localStorage.setItem("lastLocal", inst);
    lastUpdate = inst;
    var database_ref = database.ref();
    var user = auth.currentUser;
    database_ref.child("users/" + user.uid).update({
      alldt: localStorage.getItem("todos"),
      allFlat: localStorage.getItem("checked") || JSON.stringify([]),
      last_login: lastUpdate,
    });
  }
  console.log("ahmed basha");
  console.log(user);

  // Create User data
  // var user_data = {
  //   alldt: localStorage.getItem("todos"),
  // };

  // database_ref.child("users/" + user.uid).set(user_data);
}

// function syncBase() {

// }

firebase.auth().onAuthStateChanged(function (user) {
  console.log(user);

  var database_ref = database.ref(`users/${user.uid}/last_login`);
  var database_bulck = database.ref(`users/${user.uid}`);

  if (user) {
    outlog.classList.toggle("hidden");
  }
  // Create User data
  // console.log(database_ref.child("users/" + user.uid));
  database_ref
    .once("value")
    .then(function (snapshot) {
      let data = snapshot.val();
      console.log(data);
      console.log(data > localStorage.getItem("lastLocal"));
      if (data >= localStorage.getItem("lastLocal")) {
        database_bulck.once("value").then((snap) => {
          let book = snap.val();
          console.log(book);
          localStorage.setItem("todos", book.alldt || JSON.stringify([]));
          localStorage.setItem("checked", book.allFlat || JSON.stringify([]));
          todolist.innerHTML = "";
          readLocal();
        });
      }
    })
    .catch(function (error) {
      console.error("Error reading data:", error);
    });
  var user_data = { alldt: JSON.stringify(localStorage.getItem("todos")) };

  // database_ref.child("users/" + user.uid).set(user_data);
});
