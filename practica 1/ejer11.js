const promesa = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(5);
  }, 1000);
});

promesa
  .then((num) => {
    console.log("Primer resultado:", num);
    return num * 2;
  })
  .then((num) => {
    console.log("Segundo resultado:", num);
    return num + 3;
  })
  .then((num) => {
    console.log("Resultado final:", num);
  });