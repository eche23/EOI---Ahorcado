import {otherSearch} from './search';
import {loadLayout, keyboard, timmer} from './screen';


export function initial(){

    let time = localStorage.getItem("time");
    let lives = localStorage.getItem("lives");

    if(localStorage.getItem("points") == null){
        localStorage.setItem("points", 0);
    }

    if(lives == 0 || time == 0 || lives == null || time == null){
        otherSearch();

    }else{
        loadLayout();
        document.getElementById("select").style.display = "none";
        document.getElementById("film").style.display = "none";
        document.getElementById("search").style.display = "none";
        document.getElementById("select-film").style.display = "none";

        keyboard();
        
        localStorage.getItem("letterFalse").split("").forEach(array => {
            document.getElementById(array).style.background = "red";
            document.getElementById(array).disabled = true;
        });
        localStorage.getItem("letterTrue").split("").forEach(array => {
            document.getElementById(array).style.background = "green";
            document.getElementById(array).disabled = true;
        });
        timmer();
        
        
    }
    
}

