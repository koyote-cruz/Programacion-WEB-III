//PROMESA

function obtenerNumero(){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve(10);
    },1000);
  });
}

obtenerNumero()
.then((num)=>{
  console.log(num);
});


//ASYNC/AWAIT
function obtenerNumero(){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve(10);
    },1000);
  });
}

async function mostrar(){
  const num = await obtenerNumero();
  console.log(num);
}

mostrar();