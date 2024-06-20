var g_id_resultado = "";
function listarResultado() {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/resultado?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_resultado').DataTable();
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
//Funcion para completar la fila de la tabla
function completarFila(element, index, arr) {
  var fechaHoraFormateada = formatearFechaHora(element.fecha_registro);
  arr[index] = document.querySelector("#tbl_resultado tbody").innerHTML +=
    `<tr>
      <td>${element.id_resultado}</td>
      <td>${element.nombre_resultado}</td>
      <td>${fechaHoraFormateada}</td>
      <td>
        <a href="actualizar.html?id=${element.id_resultado}" class="btn btn-warning">Actualizar</a>
        <a href="eliminar.html?id=${element.id_resultado}" class="btn btn-danger">Eliminar</a>
    
    </tr>`
}

//Funcion para agregar un nuevo Resultado

function agregarResultado() {
  //Obtenemos los datos del formulario
  var nombre_resultado = document.getElementById("txt_resultado").value;

  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  //variable para obtener la fecha y hora actual
  var fechaHoraActual = obtenerFechaHora();

  //Carga util de los datos
  const raw = JSON.stringify({
    "nombre_resultado": nombre_resultado,
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
  fetch("http://144.126.210.74:8080/api/resultado", requestOptions)
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
  const p_id_resultado = parametros.get('id');
  g_id_resultado = p_id_resultado;
  obtenerDatosActualizar(p_id_resultado);
}
//Funcion para eliminar un Resultado
function obtenerIdEliminar() {
  //Obtener los datos de la solicitud
  const queryString = window.location.search;
  //Obtenemos todos los parametros de la url
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parametro y obtenemos su valor actual
  const p_id_resultado = parametros.get('id');
  g_id_resultado = p_id_resultado;
  obtenerDatosEliminar(p_id_resultado);
}


function obtenerDatosEliminar(p_id_resultado){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/resultado/"+p_id_resultado, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function obtenerDatosActualizar(p_id_resultado) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/resultado/" +p_id_resultado, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function completarEtiqueta(element,index,arr){
  var nombre_resultado = element.nombre_resultado;
  document.getElementById('lbl_eliminar').innerHTML ="Desea eliminar el resultado? <b>" + nombre_resultado + "</b>";
};

function completarFormulario(element, index, arr) {
  var nombre_resultado = element.nombre_resultado;
  document.getElementById("txt_resultado").value = nombre_resultado;

}

//Funcion para actualizar
function actualizarResultado() {
  //Obtenemos los datos del formulario
  var nombre_resultado = document.getElementById("txt_resultado").value;


  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  //Carga util de los datos
  const raw = JSON.stringify({
    "nombre_resultado": nombre_resultado,

  });

  //Opciones de la solicitud
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  //Ejecutamos la solicitud - debo agregar el puerto :8080 desde ahora en adelante
  fetch("http://144.126.210.74:8080/api/resultado/" +g_id_resultado, requestOptions)
    .then((response) => {
      if (response.status == 200) {
        location.href = "listar.html";
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}

function eliminarResultado (){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/resultado/" +g_id_resultado, requestOptions)
  .then ((response) => {
    if(response.status == 200){
      location.href = "listar.html";
    }
    if(response.status == 400){
      alert("No se puede eliminar el Resultado, tiene registros asociados");
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