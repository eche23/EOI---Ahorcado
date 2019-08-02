import {abecedario} from './app';
import {otherSearch} from './search';


export const selectLetter = letter => {
    document.getElementById(letter).disabled = true;
    let film = localStorage.getItem("title").toUpperCase();
    let lowBar = localStorage.getItem("film").split("");
    let letterTrue = localStorage.getItem("letterTrue").split("");
    let letterFalse = localStorage.getItem("letterFalse").split("");
    let lives = localStorage.getItem("lives");
    if(film.indexOf(letter) != -1){
        for(let i=0; i<film.length;i++){
            if(film[i] == letter){
                if(i==0 || lowBar[i-1] == " "){
                    lowBar[i] = letter;
                    document.getElementById(letter).style.background = "green";
                } 
                else{
                    lowBar[i] = letter.toLowerCase();
                    document.getElementById(letter).style.background = "green";
                } 
            }
        }
        letterTrue.push(letter);
        document.getElementById("low-bar").innerHTML = lowBar.join('');
    }else{
        if(film.indexOf("&") != -1 && letter == "Y"){
            for(let i=0; i<film.length;i++){
                if(film[i] == "&" && letter == "Y"){
                    lowBar[i] = "&";
                    document.getElementById(letter).style.background = "green";
                }
            }
            if(letter == "Y")letterTrue.push(letter);
            document.getElementById("low-bar").innerHTML = lowBar.join('');
        }else{
            document.getElementById(letter).style.background = "red";
            document.getElementById("image"+lives).style.display = "none";
            document.getElementById("live"+lives).style.visibility = "hidden";
            lives -= 1;
            document.getElementById("image"+lives).style.display = "block";
            letterFalse.push(letter);
        }
        

    }
    localStorage.setItem("lives", lives);
    localStorage.setItem("letterFalse", letterFalse.join(""));
    localStorage.setItem("letterTrue", letterTrue.join(""));
    localStorage.setItem("film", lowBar.join(""));
    //save();
    checkEnd();
}

export function checkEnd() {
    let arrayAbecedario = abecedario.split("");
    let lowBar = localStorage.getItem("film").split("");
    let points = parseInt(localStorage.getItem("points"));
    let lives = localStorage.getItem("lives");
    let timmerID = localStorage.getItem("timmerID");
    let numHelps = localStorage.getItem("num-helps");
    let time = localStorage.getItem("time");

    if(lowBar.indexOf("_") == -1){
        document.getElementById("fin").innerHTML = "Congratulations";
        arrayAbecedario.forEach(array => {
            document.getElementById(array).disabled = true;
        });
        document.getElementById("btn-help").disabled = true;
        points += (lives*numHelps);
        document.getElementById("points").innerHTML = "POINTS: " + points;
        clearTimeout(timmerID);
        //localStorage.clear();

        localStorage.setItem("points", points);
        localStorage.setItem("timmerID", timmerID);
        localStorage.setItem("title", "");
        localStorage.setItem("film", "");

        setTimeout(function() {
            document.getElementById("image"+lives).style.display = "none";
            
            otherSearch();
        }, 2000);
    }else if(lives == 0 || time == 0){
        arrayAbecedario.forEach(array => {
            document.getElementById(array).disabled = true;
        });
        document.getElementById("fin").innerHTML = "END";
        document.getElementById("solution").disabled = true;
        document.getElementById("btn-help").disabled = true;
        //localStorage.clear();
        clearTimeout(timmerID);

        localStorage.setItem("points", points);
        localStorage.setItem("timmerID", timmerID);
        localStorage.setItem("title", "");
        localStorage.setItem("film", "");

        setTimeout(function() {
            
            document.getElementById("image"+lives).style.display = "none";
            otherSearch();
        }, 2000);
    }


    
}