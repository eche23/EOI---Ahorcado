
import {otherSearch} from './search';

export function help () {
    let numHelps = localStorage.getItem("num-helps");
    let time = localStorage.getItem("time");

    if(numHelps == 2){
        time -= 5;
        numHelps = 1;
        document.getElementById("help").innerHTML = localStorage.getItem("help1");
        document.getElementById("num-helps").innerHTML = "HELPS: " + numHelps;        
        
    }else if(numHelps == 1){
        time -= 10;
        numHelps = 0;
        document.getElementById("help").innerHTML = localStorage.getItem("help2");
        document.getElementById("btn-help").disabled = true;
        document.getElementById("btn-help").style.background = "red";
        document.getElementById("num-helps").innerHTML = "HELPS: " + numHelps; 
    
        
    } 
    document.getElementById("timmer").innerHTML = "Time: " + time + " s.";
    localStorage.setItem("time", time);
    localStorage.setItem("num-helps", numHelps);
}

export function solution(){
    let numHelps = parseInt(localStorage.getItem("num-helps"));
    let lives = parseInt(localStorage.getItem("lives"));
    let points = localStorage.getItem("points");
    let timmerID = localStorage.getItem("timmerID");

    points -= (5+(lives*numHelps));
    document.getElementById("points").innerHTML = "POINTS: "+points;
    clearTimeout(timmerID);
    
    localStorage.setItem("points", points);
    localStorage.setItem("timmerID", timmerID);

    document.getElementById("low-bar").innerHTML = localStorage.getItem("title");
    setTimeout(function() {
        document.getElementById("image"+lives).style.display = "none";
        localStorage.setItem("title", "");
        localStorage.setItem("film", "");
        localStorage.setItem("film", "");
        otherSearch();

    }, 2000);
}