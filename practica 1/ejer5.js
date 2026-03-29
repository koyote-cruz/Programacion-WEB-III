const miFuncion = (texto) => {
  let invertida = texto.split("").reverse().join("");
  return texto === invertida;
}

let band = miFuncion("oruro");
console.log(band); // true

band = miFuncion("hola");
console.log(band); // false