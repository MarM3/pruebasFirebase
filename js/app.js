registrar.onclick = function () {
  var email = document.getElementById("email1").value;
  var psd = document.getElementById("contrasena1").value;

  firebase.auth().createUserWithEmailAndPassword(email, psd).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}

conectar.onclick = function () {
  var email = document.getElementById("email2").value;
  var psd = document.getElementById("contrasena2").value;

  firebase.auth().signInWithEmailAndPassword(email, psd).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });
}

function observador(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("Existe usuario activo.");
      contenidosUsuarioRegistrado();
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      console.log(user);
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      console.log("No existe ningún usuario activo.");
    }
  });
}
observador();

function contenidosUsuarioRegistrado(){
  var contenido = document.getElementById("contenido");
  contenido.innerHTML = `
  <p>¡Bienvenido!</p>
  <button id="cerrar">Cerrar sesión</button>
  `;

  var ce = document.getElementById("cerrar");
  ce.addEventListener("click", cerrar, false);

}

function cerrar(){
  firebase.auth().signOut()
  .then(function(){
    console.log("Saliendo...");
    contenido.innerHTML = "";
  })
  .catch(function(error){
    console.log(error);
  });
}