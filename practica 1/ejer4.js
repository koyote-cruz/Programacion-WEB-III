const miFuncion = (numero) =>{
    x=0; y=999;
    
    
    
    for (let n of numero) {
        if (n>x){
            x=n
        }
        if (n<y){
            y=n
        }

    }
    const final= {mayor:x, menor:y};
    return final;
}



let obj = miFuncion([3,1,5,4,2]);
console.log(obj); // { mayor: 5, menor: 1 }