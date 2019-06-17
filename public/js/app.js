//Autor: Mar Mazuelas
//Fecha: 14/06/2019
//Descripción: Novedades y mejoras en el ejercicio Firebase

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
    .then(function () {
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
      $("#botones").css("visibility", "hidden");
      $("#cerrarconexion").css("display", "inline");
    } else {
      // User is signed out.
      console.log("No existe ningún usuario activo.");
      var contenido = document.getElementById("contenido");
      contenido.innerHTML += `
      <p>Conéctate para ver los contenidos exclusivos para usuarios registrados.</p>
      `;
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
    <p>Los campos marcados con * son obligatorios</p>
    <div class="form-row">
    <div class="col-md-2 mb-3">
      <label for="tipo">Tipo T.*:</label>
      <input type="text" id="tipo" placeholder="Introduzca el Tipo T. (1-10)" class="form-control" maxlegth="2"
        onchange="validarTipo();" required>
    </div>
    <div class="col-md-2 mb-3">
      <label for="territorio">Territorio*:</label>
      <input type="text" id="territorio" placeholder="Introduzca el territorio (1-300)" class="form-control" maxlegth="3"
      onchange="validarTerritorio();" required>
    </div>
    <div class="col-md-4 mb-3">
      <label for="finicial">Fecha Inicial*:</label>
      <input type="text" id="finicial" placeholder="Introduzca la fecha inicial" class="form-control" maxlegth="10"
        onchange="compararFechas();" required>
    </div>
    <div class="col-md-4 mb-3">
      <label for="ffinal">Fecha Final*:</label>
      <input type="text" id="ffinal" placeholder="Introduzca la fecha final" class="form-control" maxlegth="10"
        onchange="compararFechas();" required>
    </div>
    </div>
    <div class="form-row">
    <div class="col-md-4 mb-3">
      <label for="cuando">Cuándo*:</label>
      <input type="text" id="cuando" placeholder="Introduzca cuando" class="form-control" maxlegth="50"
        onchange="validarCuando();" required>
    </div>
    <div class="col-md-4 mb-3">
      <label for="quien">Quién*:</label>
      <input type="text" id="quien" placeholder="Introduzca quién (1-120)" class="form-control" maxlegth="4"
         onchange="validarQuien();" required>
    </div>
    </div>
    <button class="btn btn-info my-3" id="guardar" onsubmit="validaDatos();">Guardar</button>
    <div id="act"></div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
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
    $("#botones").css("visibility", "hidden");
    $("#cerrarconexion").css("display", "inline");
    $("#cerrarconexion").css("visibility", "visible");
    var ce = document.getElementById("cerrar");
    ce.addEventListener("click", cerrar, false);
    var gu = document.getElementById("guardar");
    gu.onclick = guardar;

  } else {
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
  var ti = document.getElementById("tipo").value;
  var te = document.getElementById("territorio").value;
  var fi = document.getElementById("finicial").value;
  var ff = document.getElementById("ffinal").value;
  var cu = document.getElementById("cuando").value;
  var qu = document.getElementById("quien").value;

  if (ti.trim() === "" || te.trim() === "" || fi.trim() === "" || ff.trim() === "" || cu.trim() === "" || qu.trim() === "") {
    alert("Todos los datos son obligatorios.");
  } else {
    var usuario = {
      tipo: ti,
      territorio: te,
      finicial: fi,
      ffinal: ff,
      cuando: cu,
      quien: qu
    }
  };
  db.collection("usuarios").add(usuario)
    .then(function (docRef) {
      console.log("Documento escrito con ID: ", docRef.id);
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

function cargarTabla() {
  //Lectura de los documentos (de la base de datos)
  db.collection("usuarios").onSnapshot((querySnapshot) => {
    var tabla = document.getElementById("tabla");
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
      //console.log(`${doc.id} => ${doc.data().nombre}`);
      tabla.innerHTML += `
      <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().tipo}</td>
        <td>${doc.data().territorio}</td>
        <td>${doc.data().finicial}</td>
        <td>${doc.data().ffinal}</td>
        <td>${doc.data().cuando}</td>
        <td>${doc.data().quien}</td>
        <td><button class="linea btn btn-success" onclick="editar('${doc.id}', '${doc.data().tipo}', '${doc.data().territorio}',
            '${doc.data().finicial}', '${doc.data().ffinal}', '${doc.data().cuando}', '${doc.data().quien}');">Editar</button></td>
        <td><button class="linea btn btn-danger" onclick="borrar('${doc.id}');">Eliminar</button></td>
      </tr>
      `;

    });
  });
}

//Borrar datos de documentos
function borrar(parId) {
  db.collection("usuarios").doc(parId).delete()
    .then(function () {
      console.log("Usuario eliminado correctamente.");
    }).catch(function (error) {
      console.error("Error borrando el usuario: ", error);
    });
}

//Editar datos del documento
function editar(parId, parTipo, parTerritorio, parFinicial, parFfinal, parCuando, parQuien) {
  document.getElementById("tipo").value = parTipo;
  document.getElementById("territorio").value = parTerritorio;
  document.getElementById("finicial").value = parFinicial;
  document.getElementById("ffinal").value = parFfinal;
  document.getElementById("cuando").value = parCuando;
  document.getElementById("quien").value = parQuien;

  $("#guardar").css("display", "none");
  $(".linea").attr("disabled", true);
  $("#act").append("<button class='btn btn-info my-3' id='actualizar'>Guardar</button>");
  $("#actualizar").on("click", function () {
    var userRef = db.collection("usuarios").doc(parId);
    var ti = document.getElementById("tipo").value;
    var te = document.getElementById("territorio").value;
    var fi = document.getElementById("finicial").value;
    var ff = document.getElementById("ffinal").value;
    var cu = document.getElementById("cuando").value;
    var qu = document.getElementById("quien").value;

    if (ti.trim() === "" || te.trim() === "" || fi.trim() === "" || ff.trim() === "" || cu.trim() === "" || qu.trim() === "") {
      alert("Todos los campos son obligatorios.");
    } else if (!validaDatos()) {
      return false;
    } else {
      // Set the "capital" field of the city 'DC'
      return userRef.update({
          tipo: ti,
          territorio: te,
          finicial: fi,
          ffinal: ff,
          cuando: cu,
          quien: qu
        })
        .then(function () {
          console.log("Usuario actualizado correctamente.");
          document.getElementById("tipo").value = "";
          document.getElementById("territorio").value = "";
          document.getElementById("finicial").value = "";
          document.getElementById("ffinal").value = "";
          document.getElementById("cuando").value = "";
          document.getElementById("quien").value = "";
          $("#guardar").css("display", "inline");
          $(".linea").attr("disabled", false);
          $("#act").empty();
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error actualizando usuario: ", error);
        });
      return true;
    }
  });
}

function validarTipo() {
  var patron = /^[1-9]$|^10$/;
  var tipo = document.getElementById("tipo").value;

  if (!patron.test(tipo)) {
    alert("El tipo introducido no es correcto. Introduzca un dato del 1 al 10.");
    return false;
  }
  return true;
}

function validarTerritorio() {
  var patron = /^([1-9]\d?|[12]\d\d|300)$/;
  var ter = document.getElementById("territorio").value;

  if (!patron.test(ter)) {
    alert("El territorio no es correcto. Introduzca un territorio del 1 al 300.");
    return false;
  }
  return true;
}

function compararFechas() {
  //Comprobamos que tenga formato correcto
  var fechaIni = document.getElementById("finicial");
  var fecha_aux1 = fechaIni.value.split("/");
  var fecha_aux2 = document.getElementById("ffinal").value.split("/");
  var fecha1 = new Date(parseInt(fecha_aux1[2]), parseInt(fecha_aux1[1] - 1), parseInt(fecha_aux1[0]));
  var fecha2 = new Date(parseInt(fecha_aux2[2]), parseInt(fecha_aux2[1] - 1), parseInt(fecha_aux2[0]));
  var hoy = new Date(); //fecha actual del sistema

  //Comprobamos si existe la fecha
  if (isNaN(fecha1) || isNaN(fecha2)) {
    alert("Fecha introducida incorrecta.");
    return false;
  } else if (fecha1 >= hoy || fecha2 >= hoy) {
    alert("Fecha introducida incorrecta. Introduzca una fecha anterior a hoy.");
    return false;
  } else if (fecha1 >= fecha2) {
    alert("Fecha introducida incorrecta. Introduzca una fecha posterior a la fecha inicial.");
    return false;
  }
  return true;
  //else {
  //alert("La fecha que has introducido es "+fecha1);
  //fechaIni.innerHTML = "<div class='is-valid'><div class='valid-feedback'>Correcto.</div>";
  //}
}

function validarCuando() {
  var patron = /^[A-Za-zÑñÁÉÍÓÚáéíóúÇç\s]{1,50}$/;
  var cua = document.getElementById("cuando").value;

  if (!patron.test(cua)) {
    alert("Introduzca un máximo de 50 caracteres.");
    return false;
  }
  return true;
}

function validarQuien() {
  var patron = /^(120|1[0-1][0-9]|[1-9]?[0-9])$/;
  var qui = document.getElementById("quien").value;

  if (!patron.test(qui)) {
    alert("Intruduzca un número entre el 1 y el 120.");
    return false;
  }
  return true;
}

function validaDatos() {
  if (!validarTipo()) {
    return false;
  }
  if (!validarTerritorio()) {
    return false;
  }
  if (!compararFechas()) {
    return false;
  }
  if (!validarCuando()) {
    return false;
  }
  if (!validarQuien()) {
    return false;
  }
  return true;
}

observador();