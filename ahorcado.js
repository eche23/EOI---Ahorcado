var lista = [["Star Wars", ""], ["Titanic", ""], ["Fast and Furious", ""]];
var pelicula = "";
var guiones = [];

console.log(lista.length);

const elegirPelicula = lista =>{
    var i = parseInt(Math.random() * (lista.length));
    pelicula = lista[i][0];
    console.log(pelicula);

}

elegirPelicula(lista);

const dibujarGuiones = pelicula => {
    var peliculaArray = pelicula.split("");
    peliculaArray.forEach(array => {
        if(array == " "){
            guiones.push(" ");
        }else{
            guiones.push("_");
        }
        
    });
    var a = guiones.split("")
    console.log();
    //document.getElementById("guiones").innerHTML = guiones.split("");
    
}

dibujarGuiones(pelicula);

function teclado() {
    var abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    var arrayAbecedario = abecedario.split("");
    console.log(arrayAbecedario);
    arrayAbecedario.forEach(array => {
        console.log(array);
        document.getElementById("teclado").innerHTML += "<button value='" + array + "' onclick='intento(\"" + array + "\")' class='letra' id='"+array+"'>" + array + "</button>";
    });
}

teclado();