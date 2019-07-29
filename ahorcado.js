var list = [["Star Wars", "HOLA", "ADIOS"], ["Titanic",  "HOLA", "ADIOS"], ["Fast and Furious",  "HOLA", "ADIOS"]];

var position;
var abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
var helps = 1;
var lowBar = [];
var numHelps = 2;
var lives = 6;
var time = 60;
var timmerID;


const selectFilm = list =>{
    position = parseInt(Math.random() * (list.length));
}

const drawLowBar = position => {
    let film = list[position][0].split("");
    film.forEach(array => {
        if(array == " "){
            lowBar.push(" ");
            
        }else{
            lowBar.push("_");
        }
        
    });
    document.getElementById("low-bar").innerHTML = lowBar.join('');
    
}


function timmer() {
    save();
    if(time <= 10 && numHelps == 1){
        numHelps = 0;
        document.getElementById("btn-help").disabled = true;
        document.getElementById("num-helps").innerHTML = numHelps;
    } 
    if(time <= 5 && numHelps == 2){
        numHelps = 0;
        document.getElementById("btn-help").disabled = true;
        document.getElementById("num-helps").innerHTML = numHelps;
    }
    document.getElementById("timmer").innerHTML = "Time: " + time + " s.";
    if(time == 0){
        
        document.getElementById("fin").innerHTML = "END";
        var arrayAbecedario = abecedario.split("");
        arrayAbecedario.forEach(array => {
            document.getElementById(array).disabled = true;
        });
        
        setTimeout(function() {
            initial();
        }, 2000);
        
        
    }else{
        time -= 1;
        timmerID = setTimeout("timmer()", 1000);
        
    } 
    
    
}




function help () {
    if(numHelps == 2){
        time -= 5;
        numHelps = 1;
        document.getElementById("help").innerHTML = list[position][helps];
        document.getElementById("num-helps").innerHTML = numHelps;
        helps++;
        
    }else if(numHelps == 1){
        time -= 10;
        numHelps = 0;

        document.getElementById("help").innerHTML = list[position][helps];
        document.getElementById("btn-help").disabled = true;
        //document.getElementById("help").innerHTML = "Ayuda 2";
        document.getElementById("num-helps").innerHTML = numHelps;
    
        
    } else {

    }
    document.getElementById("timmer").innerHTML = "Time: " + time + " s.";
    save();

}

function teclado() {    
    var arrayAbecedario = abecedario.split("");
    arrayAbecedario.forEach(array => {
        document.getElementById("teclado").innerHTML += "<button value='" + array + "' onclick='selectLetter(\"" + array + "\")' class='letter' id='"+array+"'>" + array + "</button>";
    });
}





const selectLetter = letter => {
    document.getElementById(letter).disabled = true;
    let film = list[position][0];
    film=film.toUpperCase();
    if(film.indexOf(letter) != -1){
        for(i=0; i<film.length;i++){
            if(film[i] == letter){
                if(i==0 || lowBar[i-1] == " ") lowBar[i] = letter;
                else lowBar[i] = letter.toLowerCase();
            }
        }
        document.getElementById("low-bar").innerHTML = lowBar.join('');
    }else{
        document.getElementById("image"+lives).style.display = "none";
        document.getElementById("live"+lives).style.visibility = "hidden";
        lives -= 1;
        document.getElementById("image"+lives).style.display = "block";
        
        if(lives == 0){
            var arrayAbecedario = abecedario.split("");
            arrayAbecedario.forEach(array => {
                document.getElementById(array).disabled = true;
            });
            document.getElementById("fin").innerHTML = "END";
            setTimeout(function() {
                initial();
            }, 2000);
        }
    }
    
    save();
    checkEnd();
}

function checkEnd() {
    if(lowBar.indexOf("_") == -1){
        document.getElementById("fin").innerHTML = "Congratulations";
        var arrayAbecedario = abecedario.split("");
        arrayAbecedario.forEach(array => {
            document.getElementById(array).disabled = true;
        });
        document.getElementById("btn-help").disabled = true;
        setTimeout(function() {
            initial();
        }, 2000);
    }
}

function initial(){
    helps = 1;
    time = 60;
    numHelps = 2;
    lives = 6;
    lowBar = [];

    time = localStorage.getItem("time");
    lives = localStorage.getItem("lives");

    if(lives == 0 || time == 0 || lives == null || time == null){
        
        document.getElementById("image"+lives).style.display = "none";

        helps = 1;
        time = 60;
        numHelps = 2;
        lives = 6;
        lowBar = [];
        
        for(i=lives; i > 0; i--){
            console.log(i);
            document.getElementById("live"+i).style.visibility = "visible";
        }

        clearTimeout(timmerID);
        document.getElementById("teclado").innerHTML = "";
        document.getElementById("fin").innerHTML = "";
        document.getElementById("help").innerHTML = "";
        document.getElementById("btn-help").disabled = false;
        document.getElementById("num-helps").innerHTML = numHelps;
        document.getElementById("image"+lives).style.display = "block";
    
    
        teclado();
        selectFilm(list);
        drawLowBar(position);
        timmer();
    }else{
        

        position = localStorage.getItem("position");
        lowbar = localStorage.getItem("film").split("");
        numHelps = localStorage.getItem("num-helps");
        helps = localStorage.getItem("helps");

        document.getElementById("image"+lives).style.display = "block";
        document.getElementById("num-helps").innerHTML = numHelps;
        for(i=lives; i > 0; i--){
            console.log(i);
            document.getElementById("live"+i).style.visibility = "visible";
        }
        drawLowBar(position);
        timmer();
        teclado();
        
    }
    
    

    
}


function save(){
    localStorage.setItem("time", time);
    localStorage.setItem("position", position);
    localStorage.setItem("film", lowBar.join(""));
    localStorage.setItem("num-helps", numHelps);
    localStorage.setItem("helps", helps);
    localStorage.setItem("lives", lives);


}


function select(){
    var peli = prompt("PELICULA");
    console.log(encodeURI(peli));
    /* $.getJson('https://www.omdbapi.com/?apikey=5964f305&s='+encodeURI(peli).then(function (responde){
        console.log(responde);
    })); */
    fetch('https://www.omdbapi.com/?apikey=5964f305&s='+encodeURI(peli)).then(function(responde){
        return responde.json().then(function(data){
            console.log(data);
        });
    });
}


window.onload = select();

