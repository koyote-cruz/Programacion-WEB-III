const miPromesa = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Operación exitosa después de 3 segundos");
  }, 3000);
});

miPromesa.then((mensaje) => {
  console.log(mensaje);
});