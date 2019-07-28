var list = [["Star Wars", ""], ["Titanic", ""], ["Fast and Furious", ""]];

var position;
var abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
var helps = 0;
var lowBar = [];
var numHelps = 2;
var lives = 6;
var time = 30;


const selectFilm = list =>{
    position = parseInt(Math.random() * (list.length));
}

const drawLowBar = position => {
    let film = list[position][helps].split("");
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
    if(time == 10 && numHelps == 1) document.getElementById("btn-help").disabled = true;
    if(time == 5 && numHelps == 2) document.getElementById("btn-help").disabled = true;
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
        setTimeout("timmer()", 1000);
        
    }

}




function help () {
    if(numHelps == 2){
        time -= 5;
        numHelps = 1;
        document.getElementById("help").innerHTML = "Ayuda 1";
        
    }else if(numHelps == 1){
        time -= 10;
        numHelps = 0;
        document.getElementById("btn-help").disabled = true;
        document.getElementById("help").innerHTML = "Ayuda 2";
        
    } else {

    }
    document.getElementById("timmer").innerHTML = "Time: " + time + " s.";

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
        document.getElementById("image"+lives).style.visibility = "hidden";
        lives -= 1;
        document.getElementById("image"+lives).style.visibility = "visible";
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
    console.log(lives);
    
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
    time = 30;
    numHelps = 2;
    lives = 6;
    lowBar = [];
    document.getElementById("teclado").innerHTML = "";
    document.getElementById("fin").innerHTML = "";
    document.getElementById("help").innerHTML = "";
    //document.getElementById("dummy").innerHTML = "<img src='img/ahorcado_"+lives+".png' alt='' id='image"+lives+"'>"
    document.getElementById("btn-help").disabled = false;
    
    document.getElementById("image"+lives).style.visibility = "visible";
    
    teclado();
    selectFilm(list);
    drawLowBar(position);
    timmer();
    
    

}





window.onload =  initial();

