import {lives}  from './app';
import {initGame} from './screen';

export function select() {
    document.getElementById("otherSearch").style.display = "flex";
    document.getElementById("otherSearch").onclick = otherSearch;

    let peli = document.getElementById("film").value;
    document.getElementById("film").style.display = "none";
    document.getElementById("search").style.display = "none";
    fetch('https://www.omdbapi.com/?apikey=5964f305&s='+encodeURI(peli)).then(function(responde){
        return responde.json().then(function(data){
            let busqueda = data.Search.forEach(array => {
                var title = array.Title;
                let poster = array.Poster;
                document.getElementById("list").innerHTML += "<div class='list-film'> <img id='poster' src="+poster+"><button value='" + title + "' onclick='selectFilm(\"" + title + "\")' class='film' id='"+title+"'>" + title + "</button></div>";
                console.log(title);
                
            });
            var arr = Array.prototype.slice.call(document.getElementsByClassName('film') );
            console.log(arr);
            arr.forEach( arry => {
                arry.onclick = (e) => {selectFilm(e.target.innerText)};
            });


        });
    });
    
}

export function otherSearch() {
    document.getElementById("select-film").style.display = "block";
    document.getElementById("select").style.display = "flex";
    document.getElementById("list").innerHTML = "";
    document.getElementById("otherSearch").style.display = "none";
    document.getElementById("film").style.display = "flex";
    document.getElementById("search").style.display = "flex";
    document.getElementById("search").onclick = select;
    document.getElementById("film").value = "";

}

export function selectFilm(film){
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
     
    localStorage.setItem("title", film);
    
    fetch('https://www.omdbapi.com/?apikey=5964f305&t='+encodeURI(film)).then(function(responde){
        return responde.json().then(function(data){
            localStorage.setItem("data", data);
            localStorage.setItem("year", data.Year);
            localStorage.setItem("rating", data.Ratings[0].Value);
            localStorage.setItem("help1", data.Actors);
            localStorage.setItem("help2", data.Director);
            document.getElementById("year").innerHTML = "YEAR: " + data.Year;
            document.getElementById("rating").innerHTML = "RATING: " + data.Ratings[0].Value;
            
        });
    });
    
    initGame();
    
}
