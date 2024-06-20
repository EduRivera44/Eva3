var g_id_cliente = "";
//Funcion para listar clientes
function listarCliente() {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
  
    fetch("http://144.126.210.74:8080/api/cliente?_size=200", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        json.forEach(completarFila);
        $('#tbl_cliente').DataTable();
      })
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
}
  //Funcion para completar la fila de la tabla
  function completarFila(element, index, arr) {
    var fechaHoraFormateada = formatearFechaHora(element.fecha_registro);
    arr[index] = document.querySelector("#tbl_cliente tbody").innerHTML +=
      `<tr>
        <td>${element.id_cliente}</td>
        <td>${element.dv}</td>
        <td>${element.nombres}</td>
        <td>${element.apellidos}</td>
        <td>${element.email}</td>
        <td>${element.celular}</td>
        <td>${fechaHoraFormateada}</td>
        <td>
          <a href="actualizar.html?id=${element.id_cliente}" class="btn btn-warning">Actualizar</a>
          <a href="eliminar.html?id=${element.id_cliente}" class="btn btn-danger">Eliminar</a>
       
      </tr>`
}

//Funcion para agregar un nuevo cliente

function agregarCliente() {
  //Obtenemos los datos del formulario
  var id_cliente = document.getElementById("txt_rut").value;
  var dv = document.getElementById("txt_dv").value;
  var nombres = document.getElementById("txt_nombres").value;
  var apellidos = document.getElementById("txt_apellidos").value;
  var email = document.getElementById("txt_email").value; 
  var celular = document.getElementById("txt_celular").value;



  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  //variable para obtener la fecha y hora actual
  var fechaHoraActual = obtenerFechaHora();

  //Carga util de los datos
  const raw = JSON.stringify({
    "id_cliente": id_cliente,
    "dv": dv,
    "nombres": nombres,
    "apellidos": apellidos,
    "email": email,
    "celular": celular,
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
  fetch("http://144.126.210.74:8080/api/cliente", requestOptions)
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
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;
  obtenerDatosActualizar(p_id_cliente);
}
//Funcion para eliminar un cliente
function obtenerIdEliminar() {
  //Obtener los datos de la solicitud
  const queryString = window.location.search;
  //Obtenemos todos los parametros de la url
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parametro y obtenemos su valor actual
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;
  obtenerDatosEliminar(p_id_cliente);
}


function obtenerDatosEliminar(p_id_cliente){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+p_id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function obtenerDatosActualizar(p_id_cliente) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/cliente/" +p_id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function completarEtiqueta(element,index,arr){
  var nombre_cliente = element.nombres + " " + element.apellidos;
  document.getElementById('lbl_eliminar').innerHTML ="Desea eliminar el Cliente? <b>" + nombre_cliente + "</b>";
};

function completarFormulario(element, index, arr) {
  var id_cliente = element.id_cliente;
  document.getElementById("txt_rut").value = id_cliente;

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
}

//Funcion para actualizar
function actualizarCliente() {
  //Obtenemos los datos del formulario
  var id_cliente = document.getElementById("txt_rut").value;
  var dv = document.getElementById("txt_dv").value;
  var nombres = document.getElementById("txt_nombres").value;
  var apellidos = document.getElementById("txt_apellidos").value;
  var email = document.getElementById("txt_email").value; 
  var celular = document.getElementById("txt_celular").value;


  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  //Carga util de los datos
  const raw = JSON.stringify({
    "id_cliente": id_cliente,
    "dv": dv,
    "nombres": nombres,
    "apellidos": apellidos,
    "email": email,
    "celular": celular,
  });

  //Opciones de la solicitud
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  //Ejecutamos la solicitud - debo agregar el puerto :8080 desde ahora en adelante
  fetch("http://144.126.210.74:8080/api/cliente/" + g_id_cliente, requestOptions)
    .then((response) => {
      if (response.status == 200) {
        location.href = "listar.html";
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}

function eliminarCliente (){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/cliente/" + g_id_cliente, requestOptions)
  .then ((response) => {
    if(response.status == 200){
      location.href = "listar.html";
    }
    if(response.status == 400){
      alert("No se puede eliminar el cliente, tiene registros asociados");
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