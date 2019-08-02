import {abecedario} from './app';
import {selectLetter, checkEnd} from './check';
import {help, solution} from './help'

export function initGame(){
    initVar();
    drawLowBar();
    loadLayout();
    timmer();
    keyboard();
}

function initVar(){

    clearTimeout(localStorage.getItem("timmerID"));

    localStorage.setItem("time", 60);
    localStorage.setItem("lives", 6);
    localStorage.setItem("num-helps", 2);
    localStorage.setItem("letterFalse", []);
    localStorage.setItem("letterTrue", []);
    localStorage.setItem("film", []);

    document.getElementById("btn-help").disabled = false;
    document.getElementById("btn-help").style.background = "gray";

}

function drawLowBar () {
    let film = localStorage.getItem("title").split("");
    let lowBar = localStorage.getItem("film").split("");    
    film.forEach(array => {
        if(array == " "){
            lowBar.push(" ");
        } else if(array == ":"){
            lowBar.push(":");
        } else if(array == "-"){
            lowBar.push("-");
        }else if(!isNaN(parseInt(array))){
            lowBar.push(array);
        }else if(array == "!"){
            lowBar.push("!");
        }else if(array == "?"){
            lowBar.push("?");
        }else{
            lowBar.push("_");
        }
        
    });
    localStorage.setItem("film", lowBar.join(''));
}

export function loadLayout(){
    document.getElementById("timmer").innerHTML = "Time: " + localStorage.getItem("time") + " s.";
    document.getElementById("points").innerHTML = "POINTS: " + localStorage.getItem("points");
    document.getElementById("year").innerHTML = "YEAR: " + localStorage.getItem("year");
    document.getElementById("rating").innerHTML = "RATING: " + localStorage.getItem("rating");
    document.getElementById("num-helps").innerHTML = "HELPS: " + localStorage.getItem("num-helps");
    document.getElementById("btn-help").onclick = help;
    document.getElementById("solution").onclick = solution;
    document.getElementById("help").innerHTML = "";

    for(let i=localStorage.getItem("lives"); i > 0; i--){
        document.getElementById("live"+i).style.visibility = "visible";
    }
    
    if(localStorage.getItem("num-helps") == 0){
        document.getElementById("help").innerHTML = localStorage.getItem("help2");
        document.getElementById("btn-help").style.background = "red";
        document.getElementById("btn-help").disabled = true;
    }else if (localStorage.getItem("num-helps") == 1){
        document.getElementById("help").innerHTML = localStorage.getItem("help1");
    }
    
    document.getElementById("low-bar").innerHTML = localStorage.getItem("film");
    document.getElementById("image"+localStorage.getItem("lives")).style.display = "block";

}

export function keyboard() {    
    var arrayAbecedario = abecedario.split("");
    arrayAbecedario.forEach(array => {
        document.getElementById("teclado").innerHTML += "<button value='" + array + "' class='letter' id='"+array+"'>" + array + "</button>";
    });
        let arr = Array.prototype.slice.call(document.getElementsByClassName('letter') );
    console.log(arr);
    arr.forEach( arry => {
        arry.onclick = (e) => {selectLetter(e.target.innerText)};
    });
}

export function timmer() {
    let time = localStorage.getItem("time");
    let numHelps = localStorage.getItem("num-helps");

    if(time <= 10 && numHelps == 1){
        numHelps = 0;
        document.getElementById("btn-help").disabled = true;
        document.getElementById("num-helps").innerHTML = "HELPS: " + numHelps; ;
    } 
    if(time <= 5 && numHelps == 2){
        numHelps = 0;
        document.getElementById("btn-help").disabled = true;
        document.getElementById("num-helps").innerHTML = "HELPS: " + numHelps; ;
    }
    if(time != 0){
        time -= 1;
        document.getElementById("timmer").innerHTML = "Time: " + time + " s.";
        localStorage.setItem("timmerID", setTimeout(function(){
            timmer();
        }, 1000));   
        localStorage.setItem("time", time);
        localStorage.setItem("num-helps", numHelps);
    }

    checkEnd();
    

}