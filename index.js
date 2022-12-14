let editar = false;
let formulario = document.getElementById("formulario");
let data = [];

fetch("json.json") 
  .then(res => res.json())
  .then(json => {
  data = json
  renderItem()
  })
  .catch(err => console.log("Hubo un error:", err))
  

function clearForm() {
  formulario.reset();
}

function renderItem() {
  let html = "";

  data.forEach(item => {
    html += `
      <tr>
        <td>${item.codigo}</td>
        <td>${item.descripcion}</td>
        <td>${item.precio}</td>
        <td>${item.cantidad}</td>
        <td>${item.rubro}</td>
        <td style="text-align: center;">
          <a href="#" onclick="Eliminar(${item.codigo})">Eliminar</a> | <a href="#" onclick="Editar(${item.codigo})">Editar</a>
        </td>
      </tr>
    `
    document.getElementById("tabla-contenido").innerHTML = html;
  });
  editar = false
}

function Guardar() {
  let codigo = document.querySelector('#codigo').value;
  if (!codigo) return;

  // Ya existe el codigo
  let existe = data.some(item => item.codigo == codigo);
  if (!editar && existe) return alert('El codigo ya existe');

  let descripcion = document.querySelector('#descripcion').value;
  if (!descripcion) return;

  let precio = document.querySelector('#precio').value;
  if (!precio) return;

  let cantidad = document.querySelector('#cantidad').value;
  if (!cantidad) return;

  let rubro = document.querySelector('#rubro').value;
  if (!rubro) return;

  if (editar) {
    let index = data.findIndex(item => item.codigo == codigo);
    data[index].codigo = codigo;
    data[index].descripcion = descripcion;
    data[index].precio = precio;
    data[index].cantidad = cantidad;
    data[index].rubro = rubro;
  } else {
    data = [...data, { codigo, descripcion, precio, cantidad, rubro }];
  }
  localStorage.setItem('articulos', JSON.stringify(data));
  clearForm();
  renderItem();
/* Libreria Sweet Alert */
  Swal.fire({
    position: 'top-mid',
    icon: 'success',
    title: 'Guardado con éxito',
    showConfirmButton: false,
    timer: 3000
  })
}

function Editar(codigo) {
  let articulo = data.find(item => item.codigo == codigo);

  document.querySelector('#codigo').value = articulo.codigo;
  document.querySelector('#descripcion').value = articulo.descripcion;
  document.querySelector('#precio').value = articulo.precio;
  document.querySelector('#cantidad').value = articulo.cantidad;
/* Libreria Sweet Alert */
  Swal.fire({
    title: 'Deseas editar?',
    icon: 'question',
    iconHtml: '؟',
    confirmButtonText: 'Si',
    cancelButtonText: 'No',
    showCancelButton: true,
    showCloseButton: true
  })

  let rubro = document.getElementById("rubro");
  rubro.value = articulo.rubro;
  editar = true;
}

function Eliminar(codigo) {
  let index = data.findIndex(item => item.codigo == codigo)
  let contenido = document.getElementById("tabla-contenido")
  contenido.getElementsByTagName("tr")[index].remove();
  data.splice(index, 1);
  localStorage.setItem('articulos', JSON.stringify(data));
  renderItem();
  
}

