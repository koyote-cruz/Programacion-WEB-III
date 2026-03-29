function obtenerUsuario(){
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, nombre: "Jair" });
    }, 1000);
  });
}

function obtenerPedidos(usuarioId){
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["pedido1", "pedido2"]);
    }, 1000);
  });
}

async function mostrarDatos(){
  const usuario = await obtenerUsuario();
  const pedidos = await obtenerPedidos(usuario.id);

  console.log("Usuario:", usuario.nombre);
  console.log("Pedidos:", pedidos);
}

mostrarDatos();