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
      alert("Error: " + errorCode + ". " + errorMessage);
    });
}

conectar.onclick = function () {
  var email = document.getElementById("email2").value;
  var psd = document.getElementById("contrasena2").value;

  firebase.auth().signInWithEmailAndPassword(email, psd)
  .then(function(){
    $("#botones").css("visibility", "hidden");
    $("#cerrarconexion").css("display", "inline");
  })
  .catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorCode);
    console.log(errorMessage);
    alert("Error: " + errorCode + ". " + errorMessage);
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
  var contenido = document.getElementById("contenido");
  if (usuario.emailVerified) {
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
      <input type="text" id="nacimiento" placeholder="Introduzca el año de su nacimiento" class="form-control my-3 col-sm-1" maxlegth="4"
        pattern="\d{4}">
    </div>
    <div class="form-inline">
      <label class="col-sm-1 col-form-label">Tipo T.:</label>
      <input type="text" id="tipo" placeholder="Introduzca el Tipo T. (1-10)" class="form-control my-3 col-sm-1" maxlegth="2"
        pattern="[1-9]|10">
    </div>
    <div class="form-inline">
      <label class="col-sm-1 col-form-label">Territorio:</label>
      <input type="text" id="territorio" placeholder="Introduzca el territorio (1-300)" class="form-control my-3 col-sm-1" maxlegth="3"
      pattern="[1-2][0-9][0-9]|300">
    </div>
    <div class="form-inline">
      <label class="col-sm-1 col-form-label">Fecha Inicial:</label>
      <input type="text" id="finicial" placeholder="Introduzca la fecha inicial" class="form-control my-3 col-sm-1" maxlegth="4"
        pattern="[A-Za-zÑñÁÉÍÓÚáéíóúÇç\s]">
    </div>
    <div class="form-inline">
      <label class="col-sm-1 col-form-label">Fecha Final:</label>
      <input type="text" id="ffinal" placeholder="Introduzca la fecha final" class="form-control my-3 col-sm-1" maxlegth="4"
        pattern="[A-Za-zÑñÁÉÍÓÚáéíóúÇç\s]">
    </div>
    <div class="form-inline">
      <label class="col-sm-1 col-form-label">Cuándo:</label>
      <input type="text" id="cuando" placeholder="Introduzca cuando" class="form-control my-3 col-sm-4" maxlegth="50"
        pattern="[A-Za-zÑñÁÉÍÓÚáéíóúÇç\s]{50}">
    </div>
    <div class="form-inline">
      <label class="col-sm-1 col-form-label">Quién:</label>
      <input type="text" id="quien" placeholder="Introduzca quién (1-120)" class="form-control my-3 col-sm-1" maxlegth="4"
        pattern="1[0-2][0-9]">
    </div>
    <button class="btn btn-info my-3" id="guardar">Guardar</button>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Año Nacimiento</th>
          <th scope="col">Tipo T.</th>
          <th scope="col">Territorio</th>
          <th scope="col">F. Inicial</th>
          <th scope="col">F. Final</th>
          <th scope="col">Cuándo</th>
          <th scope="col">Quién</th>
          <th scope="col">Editar</th>
          <th scope="col">Eliminar</th>
        </tr>
      </thead>
      <tbody id="tabla">
      </tbody>
    </table>
  `;
    cargarTabla();
    $("#cerrarconexion").html(`<button id="cerrar" class="btn btn-info btn-sm ml-2">Cerrar sesión</button>`);
    var ce = document.getElementById("cerrar");
    ce.addEventListener("click", cerrar, false);
    var gu = document.getElementById("guardar");
    gu.addEventListener("click", guardar, false);

    }else{
      contenido.innerHTML = `
      <div class="alert alert-warning alert-dismissible fade show mt-3" role="alert">
        <h4 class="alert-heading">¡Bienvenido ${usuario.email}!</h4>
        <p>Activa tu cuenta para ver nuestros contenidos para usuarios registrados.</p>
        <hr>
        <p class="mb-0">Revisa tu correo electrónico</p>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      `;
  }
}

function cerrar() {
  firebase.auth().signOut()
    .then(function () {
      console.log("Saliendo...");
      $("#botones").css("visibility", "visible");
      $("#cerrarconexion").css("display", "none");
      contenido.innerHTML = `
      <div class="alert alert-warning alert-dismissible fade show mt-3" role="alert">
        <strong>¡Cáspitas!</strong> Esperamos verte pronto otra vez por nuestro portal.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      `;
      cerrarconexion.innerHTML = "";
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
    nacimiento: document.getElementById("nacimiento").value,
    tipo: document.getElementById("tipo").value,
    territorio: document.getElementById("territorio").value,
    finicial: document.getElementById("finicial").value,
    ffinal: document.getElementById("ffinal").value,
    cuando: document.getElementById("cuando").value,
    quien: document.getElementById("quien").value
  };
  db.collection("usuarios").add(usuario)
    .then(function (docRef) {
      console.log("Documento escrito con ID: ", docRef.id);
      document.getElementById("nombre").value = "";
      document.getElementById("apellido").value = "";
      document.getElementById("nacimiento").value = "";
      document.getElementById("tipo").value = "";
      document.getElementById("territorio").value = "";
      document.getElementById("finicial").value = "";
      document.getElementById("ffinal").value = "";
      document.getElementById("cuando").value = "";
      document.getElementById("quien").value = "";
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
        <td>${doc.data().tipo}</td>
        <td>${doc.data().territorio}</td>
        <td>${doc.data().finicial}</td>
        <td>${doc.data().ffinal}</td>
        <td>${doc.data().cuando}</td>
        <td>${doc.data().quien}</td>
        <td><button class="btn btn-success" onclick="editar('${doc.id}', '${doc.data().nombre}',
            '${doc.data().apellido}', '${doc.data().nacimiento}', '${doc.data().tipo}', '${doc.data().territorio}',
            '${doc.data().finicial}', '${doc.data().ffinal}', '${doc.data().cuando}', '${doc.data().quien}');">Editar</button></td>
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
function editar(parId, parNombre, parApellido, parNacimiento, parTipo, parTerritorio, parFinicial, parFfinal, parCuando, parQuien){
  document.getElementById("nombre").value = parNombre;
  document.getElementById("apellido").value = parApellido;
  document.getElementById("nacimiento").value = parNacimiento;
  document.getElementById("tipo").value = parTipo;
  document.getElementById("territorio").value = parTerritorio;
  document.getElementById("finicial").value = parFinicial;
  document.getElementById("ffinal").value = parFfinal;
  document.getElementById("cuando").value = parCuando;
  document.getElementById("quien").value = parQuien;

  var bot = document.getElementById("actualizar");
  $("#guardar").attr("id", "actualizar");

  bot.removeEventListener('click', guardar, false);
  bot.addEventListener("click", function(){
    var userRef = db.collection("usuarios").doc(parId);

// Set the "capital" field of the city 'DC'
  return userRef.update({
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    nacimiento: document.getElementById("nacimiento").value,
    tipo: document.getElementById("tipo").value,
    territorio: document.getElementById("territorio").value,
    finicial: document.getElementById("finicial").value,
    ffinal: document.getElementById("ffinal").value,
    cuando: document.getElementById("cuando").value,
    quien: document.getElementById("quien").value
  })
    .then(function() {
      console.log("Usuario actualizado correctamente.");
      $("#actualizar").attr("id", "guardar");
      bot.addEventListener("click", guardar, false);
    })
    .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error actualizando usuario: ", error);
  });
  }, false);
}

observador();