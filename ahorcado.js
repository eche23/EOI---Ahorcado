
var abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
var lowBar = [];
var numHelps;
var lives;
var time;
var title_film = "";
var timmerID;
var filmSelect;
var points = 0;
var letterFalse = [];
var letterTrue = [];
var year = "";
var rating = "";

function initVar(){
    localStorage.clear();
    clearTimeout(timmerID);
    lowBar = [];
    time = 60;
    lives = 6;
    numHelps = 2;
    letterFalse = [];
    letterTrue = [];
    
    document.getElementById("btn-help").disabled = false;
    document.getElementById("btn-help").style.background = "gray";

    save();
}

//Function that I use for select a film of the list
function selectFilm(film){
    if(lives == null){
        document.getElementById("image"+0).style.display = "none";
    }else{
        document.getElementById("image"+lives).style.display = "none";
    }
    document.getElementById("teclado").innerHTML = "";
    document.getElementById("fin").innerHTML = "";
    document.getElementById("select").style.display = "none";
    document.getElementById("list").innerHTML = "";
    document.getElementById("otherSearch").style.display = "none";
    document.getElementById("select-film").style.display = "none";
    
    
    title_film = film;
    fetch('https://www.omdbapi.com/?apikey=5964f305&t='+encodeURI(title_film)).then(function(responde){
        return responde.json().then(function(data){
            filmSelect = data;
            year = filmSelect.Year;
            rating = filmSelect.Ratings[0].Value;
            document.getElementById("year").innerHTML = "YEAR: " + year;
            document.getElementById("rating").innerHTML = "RATING: " + rating;
            
        });
    });
    
    initGame();

}

//Function that I use for init the new game
function initGame(){
    initVar();
    loadLayout();
    drawLowBar(title_film);
    timmer();
    teclado();
}

//Function that I use for draw the Low Bars of the title of film
function drawLowBar (title) {
    let film = title.split("");    
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
    document.getElementById("low-bar").innerHTML = lowBar.join('');
    
}

//Function that I use for controller the time of the game
function timmer() {
    
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
    if(time != 0){
        time -= 1;
        document.getElementById("timmer").innerHTML = "Time: " + time + " s.";
        timmerID = setTimeout("timmer()", 1000);
        save();
        checkEnd();
    }

    
    

}

//Function that I use for see the help
function help () {
    if(numHelps == 2){
        time -= 5;
        numHelps = 1;
        document.getElementById("help").innerHTML = filmSelect.Actors;
        document.getElementById("num-helps").innerHTML = numHelps;        
        
    }else if(numHelps == 1){
        time -= 10;
        numHelps = 0;
        document.getElementById("help").innerHTML = filmSelect.Director;
        document.getElementById("btn-help").disabled = true;
        document.getElementById("btn-help").style.background = "red";
        document.getElementById("num-helps").innerHTML = numHelps;
    
        
    } 
    document.getElementById("timmer").innerHTML = "Time: " + time + " s.";
    save();

}

//Function that I use for put the keyboard
function teclado() {    
    var arrayAbecedario = abecedario.split("");
    arrayAbecedario.forEach(array => {
        document.getElementById("teclado").innerHTML += "<button value='" + array + "' onclick='selectLetter(\"" + array + "\")' class='letter' id='"+array+"'>" + array + "</button>";
    });
}

//Function that I use for check the letter select.
const selectLetter = letter => {
    document.getElementById(letter).disabled = true;
    let film = title_film.toUpperCase();
    if(film.indexOf(letter) != -1){
        for(i=0; i<film.length;i++){
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
    }else if(film.indexOf("&") != -1){
        for(i=0; i<film.length;i++){
            if(film[i] == "&" && letter == "Y"){
                lowBar[i] = "&";
                document.getElementById(letter).style.background = "green";
                
            }
        }
        letterTrue.push(letter);
        document.getElementById("low-bar").innerHTML = lowBar.join('');
    }else{
        document.getElementById(letter).style.background = "red";
        document.getElementById("image"+lives).style.display = "none";
        document.getElementById("live"+lives).style.visibility = "hidden";
        lives -= 1;
        document.getElementById("image"+lives).style.display = "block";
        letterFalse.push(letter);
        
    }
    
    save();
    checkEnd();
}

function checkEnd() {
    let arrayAbecedario = abecedario.split("");
    if(lowBar.indexOf("_") == -1){
        document.getElementById("fin").innerHTML = "Congratulations";
        arrayAbecedario.forEach(array => {
            document.getElementById(array).disabled = true;
        });
        document.getElementById("btn-help").disabled = true;
        points += lives*numHelps;
        document.getElementById("points").innerHTML = points;
        clearTimeout(timmerID);
        localStorage.clear();
        setTimeout(function() {
            
            otherSearch();
        }, 2000);
    }else if(lives == 0 || time == 0){
        arrayAbecedario.forEach(array => {
            document.getElementById(array).disabled = true;
        });
        document.getElementById("fin").innerHTML = "END";
        document.getElementById("solution").disabled = true;
        document.getElementById("btn-help").disabled = true;
        localStorage.clear();
        clearTimeout(timmerID);
        setTimeout(function() {
            
            //document.getElementById("image"+lives).style.display = "none";
            otherSearch();
        }, 2000);
    }
}

function initial(){

    time = localStorage.getItem("time");
    lives = localStorage.getItem("lives");

    if(lives == 0 || time == 0 || lives == null || time == null){
        console.log("sfhugj");
        otherSearch();

    }else{
        loadData();
        loadLayout();
        document.getElementById("select").style.display = "none";
        document.getElementById("film").style.display = "none";
        document.getElementById("search").style.display = "none";
        document.getElementById("select-film").style.display = "none";

        teclado();
        letterFalse.forEach(array => {
            document.getElementById(array).style.background = "red";
            document.getElementById(array).disabled = true;
        });
        letterTrue.forEach(array => {
            document.getElementById(array).style.background = "green";
            document.getElementById(array).disabled = true;
        });
        timmer();

        
    }
    
}


function loadLayout(){
    document.getElementById("timmer").innerHTML = "Time: " + time + " s.";
    document.getElementById("points").innerHTML = "POINTS: " + points;
    document.getElementById("year").innerHTML = "YEAR: " + year;
    document.getElementById("rating").innerHTML = "RATING: " + rating;
    document.getElementById("num-helps").innerHTML = "HELPS: " + numHelps;
    for(i=lives; i > 0; i--){
        document.getElementById("live"+i).style.visibility = "visible";
    }
    
    if(numHelps == 0){
        document.getElementById("btn-help").style.background = "red";
        document.getElementById("btn-help").disabled = true;
    }
    document.getElementById("low-bar").innerHTML = lowBar.join("");
    document.getElementById("image"+lives).style.display = "block";

}

function save(){
    localStorage.setItem("time", time);
    localStorage.setItem("title", title_film);
    localStorage.setItem("film", lowBar.join(""));
    localStorage.setItem("num-helps", numHelps);
    localStorage.setItem("lives", lives);
    localStorage.setItem("letterFalse", letterFalse.join(""));
    localStorage.setItem("letterTrue", letterTrue.join(""));
    localStorage.setItem("points", points);
    localStorage.setItem("year", year);
    localStorage.setItem("rating", rating);

}

function loadData(){
    lowBar = localStorage.getItem("film").split('');
    numHelps = localStorage.getItem("num-helps");
    title_film = localStorage.getItem("title");
    letterFalse = localStorage.getItem("letterFalse").split("");
    letterTrue = localStorage.getItem("letterTrue").split("");
    points = parseInt(localStorage.getItem("points"));
    year = localStorage.getItem("year");
    rating = localStorage.getItem("rating");

}


function select(){
    document.getElementById("otherSearch").style.display = "flex"
    var peli = document.getElementById("film").value;
    document.getElementById("film").style.display = "none";
    document.getElementById("search").style.display = "none";
    fetch('https://www.omdbapi.com/?apikey=5964f305&s='+encodeURI(peli)).then(function(responde){
        return responde.json().then(function(data){
            var busqueda = data.Search.forEach(array => {
                var title = array.Title;
                document.getElementById("list").innerHTML += "<button value='" + title + "' onclick='selectFilm(\"" + title + "\")' class='letter' id='"+title+"'>" + title + "</button>";
                
            });
            

            
        });
    });
    
}

function otherSearch(){
    document.getElementById("select-film").style.display = "block";
    document.getElementById("select").style.display = "flex";
    document.getElementById("list").innerHTML = "";
    document.getElementById("otherSearch").style.display = "none";
    document.getElementById("film").style.display = "flex";
    document.getElementById("search").style.display = "flex";
    document.getElementById("film").value = "";
}

function solution(){
    points -= (5+(lives*numHelps));
    document.getElementById("points").innerHTML = points;
    clearTimeout(timmerID);
    lowbar = lowBar.splice(0, lowBar.length);
    document.getElementById("low-bar").innerHTML = title_film;
    setTimeout(function() {
        document.getElementById("image"+lives).style.display = "none";
        otherSearch();
    }, 2000);
}

window.onload = initial();

