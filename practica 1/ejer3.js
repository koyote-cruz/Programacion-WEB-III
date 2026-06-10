const miFuncion = (numeros) => {
  const resultado = { pares: [], impares: [] };

  for (let n of numeros) {
    if (n % 2 === 0) {
      resultado.pares.push(n);
    } else {
      resultado.impares.push(n);
    }
  }

  return resultado;
};

let obj = miFuncion([1,2,3,4,5]);
console.log(obj); // { pares: [2,4], impares: [1,3,5] }