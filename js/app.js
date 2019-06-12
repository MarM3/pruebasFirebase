// Your web app's Firebase configuration
var config = {
  apiKey: "AIzaSyDhMuaTZGBM4tGjSyvvmRCTf4n5dEDn-PQ",
  authDomain: "usuarios-a35e4.firebaseapp.com",
  databaseURL: "https://usuarios-a35e4.firebaseio.com",
  projectId: "usuarios-a35e4",
  storageBucket: "usuarios-a35e4.appspot.com",
  messagingSenderId: "237602566939",
  appId: "1:237602566939:web:ed11c6f3053b0154"
};

// Initialize Firebase
firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

//Creacion de funciones para el funcionamiento del formulario de acceso y registro
registrar.onclick = function () {
  var email = document.getElementById("email1").value;
  var psd = document.getElementById("contrasena1").value;

  firebase.auth().createUserWithEmailAndPassword(email, psd)
    .then(function () {
      confirmar();
      $("#botones").css("visibility", "hidden");
      $("#cerrarconexion").css("display", "inline");
      $("#exampleModal").modal("hide");
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
}

conectar.onclick = function () {
  var email = document.getElementById("email2").value;
  var psd = document.getElementById("contrasena2").value;

  firebase.auth().signInWithEmailAndPassword(email, psd).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });
}

function observador() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("Existe usuario activo.");
      contenidosUsuarioRegistrado(user);
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...

      console.log("Usuario Verificado: " + emailVerified);
    } else {
      // User is signed out.
      console.log("No existe ningún usuario activo.");
      contenido.innerHTML = `
      <div class="alert alert-warning alert-dismissible fade show mt-3" role="alert">
        <strong>¡Cáspitas!</strong> Esperamos verte pronto otra vez por nuestro portal.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
      </div>
      `;
      cerrarconexion.innerHTML = "";
    }
  });
}

function contenidosUsuarioRegistrado(usuario) {
  if (usuario.emailVerified) {
    var contenido = document.getElementById("contenido");

    if(usuario.emailVerified){
    contenido.innerHTML = `
    <div class="alert alert-warning alert-dismissible fade show mt-3" role="alert">
      <h4 class="alert-heading">¡Bienvenido, ${usuario.email}!</h4>
      <p>Siéntete a gusto en nuestro portal.</p>
      <hr>
      <p class="mb-0">Tenemos muchos contenidos exclusivos para usuarios registrados como tú.</p>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </div>
    <h2>Añadir usuarios</h2>
    <div class="form-inline">
      <label class="col-sm-1 col-form-label">Nombre:</label>
      <input type="text" id="nombre" placeholder="Introduzca su nombre" class="form-control my-3 col-sm-4" maxlenght="50"
        pattern="[A-Za-zÑñÁÉÍÓÚáéíóúÇç\s]">
    </div>
    <div class="form-inline">
      <label class="col-sm-1 col-form-label">Apellido:</label>
      <input type="text" id="apellido" placeholder="Introduzca su apellido" class="form-control my-3 col-sm-4" maxlenght="50"
        pattern="[A-Za-zÑñÁÉÍÓÚáéíóúÇç\s]">
    </div>
    <div class="form-inline">
      <label class="col-sm-1 col-form-label">Año Nacimiento:</label>
      <input type="text" id="nacimiento" placeholder="Introduzca el año de su nacimiento" class="form-control my-3 col-sm-1" maxlegth="4">
    </div>
    <button class="btn btn-info my-3" id="guardar">Guardar</button>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Año Nacimiento</th>
          <th scope="col">Editar</th>
          <th scope="col">Eliminar</th>
        </tr>
      </thead>
      <tbody id="tabla">
      </tbody>
    </table>
  `;
    cargarTabla();
    $("#cerrarconexion").html(`<button id="cerrar" class="btn btn-info">Cerrar sesión</button>`);
    var ce = document.getElementById("cerrar");
    ce.addEventListener("click", cerrar, false);
    var gu = document.getElementById("guardar");
    gu.addEventListener("click", guardar, false);

    }else{}
  }
}

function cerrar() {
  firebase.auth().signOut()
    .then(function () {
      console.log("Saliendo...");
    })
    .catch(function (error) {
      console.log(error);
    });
}

function confirmar() {
  var user = firebase.auth().currentUser;

  user.sendEmailVerification().then(function () {
    // Email sent.
    console.log("Enviando correo...");
  }).catch(function (error) {
    // An error happened.
    console.log(error);
  });
}

function guardar() {
  //Añadir documentos a la coleccion dentro de la base de datos firebase
  var usuario = {
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    nacimiento: document.getElementById("nacimiento").value
  };
  db.collection("usuarios").add(usuario)
    .then(function (docRef) {
      console.log("Documento escrito con ID: ", docRef.id);
      document.getElementById("nombre").value = "";
      document.getElementById("apellido").value = "";
      document.getElementById("nacimiento").value = "";
    })
    .catch(function (error) {
      console.error("Error añadiendo el documento: ", error);
    });
}

function cargarTabla(){
//Lectura de los documentos (de la base de datos)
db.collection("usuarios").onSnapshot((querySnapshot) => {
  var tabla = document.getElementById("tabla");
  tabla.innerHTML = '';
  querySnapshot.forEach((doc) => {
    //console.log(`${doc.id} => ${doc.data().nombre}`);
    tabla.innerHTML += `
      <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().apellido}</td>
        <td>${doc.data().nacimiento}</td>
        <td><button class="btn btn-success" onclick="editar('${doc.id}', '${doc.data().nombre}', 
            '${doc.data().apellido}', '${doc.data().nacimiento}');">Editar</button></td>
        <td><button class="btn btn-danger" onclick="borrar('${doc.id}');">Eliminar</button></td>
      </tr>
      `;

  });
});
}

//Borrar datos de documentos
function borrar(parId){
  db.collection("usuarios").doc(parId).delete()
    .then(function() {
      console.log("Usuario eliminado correctamente.");
    }).catch(function(error) {
      console.error("Error borrando el usuario: ", error);
  });
}

//Editar datos del documento
function editar(parId, parNombre, parApellido, parNacimiento){
  document.getElementById("nombre").value = parNombre;
  document.getElementById("apellido").value = parApellido;
  document.getElementById("nacimiento").value = parNacimiento;

  var bot = document.getElementById("boton");
  bot.addEventListener("click", function(){
    var userRef = db.collection("usuarios").doc(parId);

// Set the "capital" field of the city 'DC'
  return userRef.update({
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    nacimiento: document.getElementById("nacimiento").value
  })
    .then(function() {
      console.log("Usuario actualizado correctamente.");
      bot.addEventListener("click", guardar, false);
    })
    .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error actualizando usuario: ", error);
  });
  });
}

observador();