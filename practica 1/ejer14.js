//PROMESA

function obtenerNumero(){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve(10);
    },2000);
  });
}

//CALLBACK
function obtenerNumero(callback){
  setTimeout(()=>{
    callback(10);
  },2000);
}

obtenerNumero((num)=>{
  console.log(num);
});