var g_id_usuario = "";
function listarUsuario() {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/usuario?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_usuario').DataTable();
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
//Funcion para completar la fila de la tabla
function completarFila(element, index, arr) {
  var fechaHoraFormateada = formatearFechaHora(element.fecha_registro);
  arr[index] = document.querySelector("#tbl_usuario tbody").innerHTML +=
    `<tr>
      <td>${element.id_usuario}</td>
      <td>${element.dv}</td>
      <td>${element.nombres}</td>
      <td>${element.apellidos}</td>
      <td>${element.email}</td>
      <td>${element.celular}</td>
      <td>${element.username}</td>
      <td>${fechaHoraFormateada}</td>
      <td>
        <a href="actualizar.html?id=${element.id_usuario}" class="btn btn-warning">Actualizar</a>
        <a href="eliminar.html?id=${element.id_usuario}" class="btn btn-danger">Eliminar</a>
    
    </tr>`
}

//Funcion para agregar un nuevo Usuario

function agregarUsuario() {
  //Obtenemos los datos del formulario
  var id_usuario = document.getElementById("txt_rut").value;
  var dv = document.getElementById("txt_dv").value;
  var nombres = document.getElementById("txt_nombres").value;
  var apellidos = document.getElementById("txt_apellidos").value;
  var email = document.getElementById("txt_email").value; 
  var celular = document.getElementById("txt_celular").value;
  var username = document.getElementById("txt_username").value;
  var password = document.getElementById("txt_password").value;

  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  //variable para obtener la fecha y hora actual
  var fechaHoraActual = obtenerFechaHora();

  //Carga util de los datos
  const raw = JSON.stringify({
    "id_usuario": id_usuario,
    "dv": dv,
    "nombres": nombres,
    "apellidos": apellidos,
    "email": email,
    "celular": celular,
    "username": username,
    "password": password,
    "fecha_registro": fechaHoraActual
  });


  //Opciones de la solicitud
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  //Ejecutamos la solicitud - debo agregar el puerto :8080 desde ahora en adelante
  fetch("http://144.126.210.74:8080/api/usuario", requestOptions)
    .then((response) => {
      if (response.status == 200) {
        location.href = "listar.html";
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}


function obtenerIdActualizar() {
  //Obtener los datos de la solicitud
  const queryString = window.location.search;
  //Obtenemos todos los parametros de la url
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parametro y obtenemos su valor actual
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;
  obtenerDatosActualizar(p_id_usuario);
}
//Funcion para eliminar un Usuario
function obtenerIdEliminar() {
  //Obtener los datos de la solicitud
  const queryString = window.location.search;
  //Obtenemos todos los parametros de la url
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parametro y obtenemos su valor actual
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;
  obtenerDatosEliminar(p_id_usuario);
}


function obtenerDatosEliminar(p_id_usuario){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+p_id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function obtenerDatosActualizar(p_id_usuario) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/usuario/" +p_id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function completarEtiqueta(element,index,arr){
  var nombre_usuario = element.nombres + " " + element.apellidos;
  document.getElementById('lbl_eliminar').innerHTML ="Desea eliminar el Usuario? <b>" + nombre_usuario + "</b>";
};

function completarFormulario(element, index, arr) {
  var id_usuario = element.id_usuario;
  document.getElementById("txt_rut").value = id_usuario;

  var dv = element.dv;
  document.getElementById("txt_dv").value = dv;

  var nombres = element.nombres;
  document.getElementById("txt_nombres").value = nombres;

  var apellidos = element.apellidos;
  document.getElementById("txt_apellidos").value = apellidos;

  var email = element.email;
  document.getElementById("txt_email").value = email;

  var celular = element.celular;
  document.getElementById("txt_celular").value = celular;

  var username = element.username;
  document.getElementById("txt_username").value = username;


}

//Funcion para actualizar
function actualizarUsuario() {
  //Obtenemos los datos del formulario
  var id_usuario = document.getElementById("txt_rut").value;
  var dv = document.getElementById("txt_dv").value;
  var nombres = document.getElementById("txt_nombres").value;
  var apellidos = document.getElementById("txt_apellidos").value;
  var email = document.getElementById("txt_email").value; 
  var celular = document.getElementById("txt_celular").value;
  var username = document.getElementById("txt_username").value;


  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  //Carga util de los datos
  const raw = JSON.stringify({
    "id_usuario": id_usuario,
    "dv": dv,
    "nombres": nombres,
    "apellidos": apellidos,
    "email": email,
    "celular": celular,
    "username": username,
  });

  //Opciones de la solicitud
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  //Ejecutamos la solicitud - debo agregar el puerto :8080 desde ahora en adelante
  fetch("http://144.126.210.74:8080/api/usuario/" +g_id_usuario, requestOptions)
    .then((response) => {
      if (response.status == 200) {
        location.href = "listar.html";
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}

function eliminarUsuario (){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/usuario/" +g_id_usuario, requestOptions)
  .then ((response) => {
    if(response.status == 200){
      location.href = "listar.html";
    }
    if(response.status == 400){
      alert("No se puede eliminar el Usuario, tiene registros asociados");
    }
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}




//FUNCION PARA LA HORA Y FECHA ACTUAL

function obtenerFechaHora() {

  var fechaHoraActual = new Date();
  var fechaHoraFormateada = fechaHoraActual.toLocaleString('es-ES', { 
    hour12 : false, //para que la hora sea de 24 horas
    year : 'numeric', //numeric para que sea 2024 - 2-digit para que sea 24
    month : '2-digit', //2-digit para que sea 02 -  numeric para que sea 2 
    day : '2-digit', //2-digit para que sea 02 -  numeric para que sea 2
    hour : '2-digit', //2-digit para que sea 02 -  numeric para que sea 2
    minute : '2-digit', //2-digit para que sea 02 -  numeric para que sea 2
    second : '2-digit' //2-digit para que sea 02 -  numeric para que sea 2
  }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6'); //con esto reemplazo la hora y fecha para ponerla en el formato que quiero
  return fechaHoraFormateada;

}

//esto tiene que estar en todos los listar
//new date obtiene la fecha y hora actual del sistema
//la de arribaentrega la hora de fercha actual y la de abajo entrega una fecha y hora formateada

function formatearFechaHora(fecha_registro) {

  var fechaHoraActual = new Date(fecha_registro);
  var fechaHoraFormateada = fechaHoraActual.toLocaleString('es-ES', { 
    hour12 : false, //para que la hora sea de 24 horas
    year : 'numeric', //numeric para que sea 2024 - 2-digit para que sea 24
    month : '2-digit', //2-digit para que sea 02 -  numeric para que sea 2 
    day : '2-digit', //2-digit para que sea 02 -  numeric para que sea 2
    hour : '2-digit', //2-digit para que sea 02 -  numeric para que sea 2
    minute : '2-digit', //2-digit para que sea 02 -  numeric para que sea 2
    second : '2-digit', //2-digit para que sea 02 -  numeric para que sea 2
    timeZone : 'UTC', //para que la hora sea en UTC
  }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6'); //con esto reemplazo la hora y fecha para ponerla en el formato que quiero
  return fechaHoraFormateada;
}