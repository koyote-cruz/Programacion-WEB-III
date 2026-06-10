function obtenerUsuario(){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve({id:1, nombre:"Jair"});
    },1000);
  });
}

function obtenerPedidos(id){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve(["pedido1","pedido2"]);
    },1000);
  });
}

function obtenerTotal(pedidos){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve(pedidos.length);
    },1000);
  });
}

async function mostrarDatos(){

  const usuario = await obtenerUsuario();
  const pedidos = await obtenerPedidos(usuario.id);
  const total = await obtenerTotal(pedidos);

  console.log(usuario.nombre);
  console.log(pedidos);
  console.log(total);

}

mostrarDatos();