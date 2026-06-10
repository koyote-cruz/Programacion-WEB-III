
//CALLBACK

function sumar(a, b, callback){
  setTimeout(()=>{
    let resultado = a + b;
    callback(resultado);
  },1000);
}

sumar(3,4,(res)=>{
  console.log(res);
});


//PROMESA
function sumar(a,b){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      let resultado = a + b;
      resolve(resultado);
    },1000);
  });
}

sumar(3,4).then((res)=>{
  console.log(res);
});