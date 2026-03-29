const miFuncion = (callback) => {
  setTimeout(() => {
    callback();
  }, 2000);
}

const mensaje = () => {
  console.log("La función callback se ejecutó después de 2 segundos");
}

miFuncion(mensaje);