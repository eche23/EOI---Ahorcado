var list = [["Star Wars", ""], ["Titanic", ""], ["Fast and Furious", ""]];

var position;
var helps = 0;
var lowBar = [];



const selectFilm = list =>{
    position = parseInt(Math.random() * (list.length));
}

selectFilm(list);

const drawLowBar = position => {
    let film = list[position][helps].split("");
    film.forEach(array => {
        if(array == " "){
            lowBar.push(" ");
            
        }else{
            lowBar.push("_");
        }
        
    });
    document.getElementById("low-bar").innerHTML += lowBar.join('');
    
}

drawLowBar(position);

var time = 60;
function timmer() {
    
    document.getElementById("timmer").innerHTML = time + " s.";
    if(time == 0){

    }else{
        time -= 1;
        setTimeout("timmer()", 1000);
    }

}

timmer();

function help (position) {
    time -= 5;
}

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