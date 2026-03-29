const miFuncion = (texto) => {
  return texto.split("").reverse().join("");
};

let cad = miFuncion("abcd");
console.log(cad); // dcba