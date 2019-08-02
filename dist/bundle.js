/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "abecedario", function() { return abecedario; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lowBar", function() { return lowBar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numHelps", function() { return numHelps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lives", function() { return lives; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "time", function() { return time; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "title_film", function() { return title_film; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timmerID", function() { return timmerID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filmSelect", function() { return filmSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "points", function() { return points; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "letterFalse", function() { return letterFalse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "letterTrue", function() { return letterTrue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "year", function() { return year; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rating", function() { return rating; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__init__ = __webpack_require__(3);

var abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
var lowBar = [];
var numHelps;
var lives = localStorage.getItem("lives");
var time = localStorage.getItem("time");
var title_film = "";
var timmerID;
var filmSelect;
var points = 0;
var letterFalse = [];
var letterTrue = [];
var year = "";
var rating = "";
window.onload = Object(__WEBPACK_IMPORTED_MODULE_0__init__["a" /* initial */])();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export select */
/* harmony export (immutable) */ __webpack_exports__["a"] = otherSearch;
/* unused harmony export selectFilm */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__screen__ = __webpack_require__(2);


function select() {
  document.getElementById("otherSearch").style.display = "flex";
  document.getElementById("otherSearch").onclick = otherSearch;
  let peli = document.getElementById("film").value;
  document.getElementById("film").style.display = "none";
  document.getElementById("search").style.display = "none";
  fetch('https://www.omdbapi.com/?apikey=5964f305&s=' + encodeURI(peli)).then(function (responde) {
    return responde.json().then(function (data) {
      let busqueda = data.Search.forEach(array => {
        var title = array.Title;
        let poster = array.Poster;
        document.getElementById("list").innerHTML += "<div class='list-film'> <img id='poster' src=" + poster + "><button value='" + title + "' onclick='selectFilm(\"" + title + "\")' class='film' id='" + title + "'>" + title + "</button></div>";
        console.log(title);
      });
      var arr = Array.prototype.slice.call(document.getElementsByClassName('film'));
      console.log(arr);
      arr.forEach(arry => {
        arry.onclick = e => {
          selectFilm(e.target.innerText);
        };
      });
    });
  });
}
function otherSearch() {
  document.getElementById("select-film").style.display = "block";
  document.getElementById("select").style.display = "flex";
  document.getElementById("list").innerHTML = "";
  document.getElementById("otherSearch").style.display = "none";
  document.getElementById("film").style.display = "flex";
  document.getElementById("search").style.display = "flex";
  document.getElementById("search").onclick = select;
  document.getElementById("film").value = "";
}
function selectFilm(film) {
  if (__WEBPACK_IMPORTED_MODULE_0__app__["lives"] == null) {
    document.getElementById("image" + 0).style.display = "none";
  } else {
    document.getElementById("image" + __WEBPACK_IMPORTED_MODULE_0__app__["lives"]).style.display = "none";
  }

  document.getElementById("teclado").innerHTML = "";
  document.getElementById("fin").innerHTML = "";
  document.getElementById("select").style.display = "none";
  document.getElementById("list").innerHTML = "";
  document.getElementById("otherSearch").style.display = "none";
  document.getElementById("select-film").style.display = "none";
  localStorage.setItem("title", film);
  fetch('https://www.omdbapi.com/?apikey=5964f305&t=' + encodeURI(film)).then(function (responde) {
    return responde.json().then(function (data) {
      localStorage.setItem("data", data);
      localStorage.setItem("year", data.Year);
      localStorage.setItem("rating", data.Ratings[0].Value);
      localStorage.setItem("help1", data.Actors);
      localStorage.setItem("help2", data.Director);
      document.getElementById("year").innerHTML = "YEAR: " + data.Year;
      document.getElementById("rating").innerHTML = "RATING: " + data.Ratings[0].Value;
    });
  });
  Object(__WEBPACK_IMPORTED_MODULE_1__screen__["a" /* initGame */])();
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initGame;
/* harmony export (immutable) */ __webpack_exports__["c"] = loadLayout;
/* harmony export (immutable) */ __webpack_exports__["b"] = keyboard;
/* harmony export (immutable) */ __webpack_exports__["d"] = timmer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__check__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__help__ = __webpack_require__(5);



function initGame() {
  initVar();
  drawLowBar();
  loadLayout();
  timmer();
  keyboard();
}

function initVar() {
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

function drawLowBar() {
  let film = localStorage.getItem("title").split("");
  let lowBar = localStorage.getItem("film").split("");
  film.forEach(array => {
    if (array == " ") {
      lowBar.push(" ");
    } else if (array == ":") {
      lowBar.push(":");
    } else if (array == "-") {
      lowBar.push("-");
    } else if (!isNaN(parseInt(array))) {
      lowBar.push(array);
    } else if (array == "!") {
      lowBar.push("!");
    } else if (array == "?") {
      lowBar.push("?");
    } else {
      lowBar.push("_");
    }
  });
  localStorage.setItem("film", lowBar.join(''));
}

function loadLayout() {
  document.getElementById("timmer").innerHTML = "Time: " + localStorage.getItem("time") + " s.";
  document.getElementById("points").innerHTML = "POINTS: " + localStorage.getItem("points");
  document.getElementById("year").innerHTML = "YEAR: " + localStorage.getItem("year");
  document.getElementById("rating").innerHTML = "RATING: " + localStorage.getItem("rating");
  document.getElementById("num-helps").innerHTML = "HELPS: " + localStorage.getItem("num-helps");
  document.getElementById("btn-help").onclick = __WEBPACK_IMPORTED_MODULE_2__help__["a" /* help */];
  document.getElementById("solution").onclick = __WEBPACK_IMPORTED_MODULE_2__help__["b" /* solution */];
  document.getElementById("help").innerHTML = "";

  for (let i = localStorage.getItem("lives"); i > 0; i--) {
    document.getElementById("live" + i).style.visibility = "visible";
  }

  if (localStorage.getItem("num-helps") == 0) {
    document.getElementById("help").innerHTML = localStorage.getItem("help2");
    document.getElementById("btn-help").style.background = "red";
    document.getElementById("btn-help").disabled = true;
  } else if (localStorage.getItem("num-helps") == 1) {
    document.getElementById("help").innerHTML = localStorage.getItem("help1");
  }

  document.getElementById("low-bar").innerHTML = localStorage.getItem("film");
  document.getElementById("image" + localStorage.getItem("lives")).style.display = "block";
}
function keyboard() {
  var arrayAbecedario = __WEBPACK_IMPORTED_MODULE_0__app__["abecedario"].split("");
  arrayAbecedario.forEach(array => {
    document.getElementById("teclado").innerHTML += "<button value='" + array + "' class='letter' id='" + array + "'>" + array + "</button>";
  });
  let arr = Array.prototype.slice.call(document.getElementsByClassName('letter'));
  console.log(arr);
  arr.forEach(arry => {
    arry.onclick = e => {
      Object(__WEBPACK_IMPORTED_MODULE_1__check__["b" /* selectLetter */])(e.target.innerText);
    };
  });
}
function timmer() {
  let time = localStorage.getItem("time");
  let numHelps = localStorage.getItem("num-helps");

  if (time <= 10 && numHelps == 1) {
    numHelps = 0;
    document.getElementById("btn-help").disabled = true;
    document.getElementById("num-helps").innerHTML = "HELPS: " + numHelps;
    ;
  }

  if (time <= 5 && numHelps == 2) {
    numHelps = 0;
    document.getElementById("btn-help").disabled = true;
    document.getElementById("num-helps").innerHTML = "HELPS: " + numHelps;
    ;
  }

  if (time != 0) {
    time -= 1;
    document.getElementById("timmer").innerHTML = "Time: " + time + " s.";
    localStorage.setItem("timmerID", setTimeout(function () {
      timmer();
    }, 1000)); //save();        

    localStorage.setItem("time", time);
    localStorage.setItem("num-helps", numHelps);
  }

  Object(__WEBPACK_IMPORTED_MODULE_1__check__["a" /* checkEnd */])();
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initial;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__search__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__screen__ = __webpack_require__(2);


function initial() {
  let time = localStorage.getItem("time");
  let lives = localStorage.getItem("lives");

  if (localStorage.getItem("points") == null) {
    localStorage.setItem("points", 0);
  }

  if (lives == 0 || time == 0 || lives == null || time == null) {
    Object(__WEBPACK_IMPORTED_MODULE_0__search__["a" /* otherSearch */])();
  } else {
    Object(__WEBPACK_IMPORTED_MODULE_1__screen__["c" /* loadLayout */])();
    document.getElementById("select").style.display = "none";
    document.getElementById("film").style.display = "none";
    document.getElementById("search").style.display = "none";
    document.getElementById("select-film").style.display = "none";
    Object(__WEBPACK_IMPORTED_MODULE_1__screen__["b" /* keyboard */])();
    localStorage.getItem("letterFalse").split("").forEach(array => {
      document.getElementById(array).style.background = "red";
      document.getElementById(array).disabled = true;
    });
    localStorage.getItem("letterTrue").split("").forEach(array => {
      document.getElementById(array).style.background = "green";
      document.getElementById(array).disabled = true;
    });
    Object(__WEBPACK_IMPORTED_MODULE_1__screen__["d" /* timmer */])();
  }
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = checkEnd;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search__ = __webpack_require__(1);


const selectLetter = letter => {
  document.getElementById(letter).disabled = true;
  let film = localStorage.getItem("title").toUpperCase();
  let lowBar = localStorage.getItem("film").split("");
  let letterTrue = localStorage.getItem("letterTrue").split("");
  let letterFalse = localStorage.getItem("letterFalse").split("");
  let lives = localStorage.getItem("lives");

  if (film.indexOf(letter) != -1) {
    for (let i = 0; i < film.length; i++) {
      if (film[i] == letter) {
        if (i == 0 || lowBar[i - 1] == " ") {
          lowBar[i] = letter;
          document.getElementById(letter).style.background = "green";
        } else {
          lowBar[i] = letter.toLowerCase();
          document.getElementById(letter).style.background = "green";
        }
      }
    }

    letterTrue.push(letter);
    document.getElementById("low-bar").innerHTML = lowBar.join('');
  } else {
    if (film.indexOf("&") != -1 && letter == "Y") {
      for (let i = 0; i < film.length; i++) {
        if (film[i] == "&" && letter == "Y") {
          lowBar[i] = "&";
          document.getElementById(letter).style.background = "green";
        }
      }

      if (letter == "Y") letterTrue.push(letter);
      document.getElementById("low-bar").innerHTML = lowBar.join('');
    } else {
      document.getElementById(letter).style.background = "red";
      document.getElementById("image" + lives).style.display = "none";
      document.getElementById("live" + lives).style.visibility = "hidden";
      lives -= 1;
      document.getElementById("image" + lives).style.display = "block";
      letterFalse.push(letter);
    }
  }

  localStorage.setItem("lives", lives);
  localStorage.setItem("letterFalse", letterFalse.join(""));
  localStorage.setItem("letterTrue", letterTrue.join(""));
  localStorage.setItem("film", lowBar.join("")); //save();

  checkEnd();
};
/* harmony export (immutable) */ __webpack_exports__["b"] = selectLetter;

function checkEnd() {
  let arrayAbecedario = __WEBPACK_IMPORTED_MODULE_0__app__["abecedario"].split("");
  let lowBar = localStorage.getItem("film").split("");
  let points = parseInt(localStorage.getItem("points"));
  let lives = localStorage.getItem("lives");
  let timmerID = localStorage.getItem("timmerID");
  let numHelps = localStorage.getItem("num-helps");
  let time = localStorage.getItem("time");

  if (lowBar.indexOf("_") == -1) {
    document.getElementById("fin").innerHTML = "Congratulations";
    arrayAbecedario.forEach(array => {
      document.getElementById(array).disabled = true;
    });
    document.getElementById("btn-help").disabled = true;
    points += lives * numHelps;
    document.getElementById("points").innerHTML = "POINTS: " + points;
    clearTimeout(timmerID); //localStorage.clear();

    localStorage.setItem("points", points);
    localStorage.setItem("timmerID", timmerID);
    localStorage.setItem("title", "");
    localStorage.setItem("film", "");
    setTimeout(function () {
      document.getElementById("image" + lives).style.display = "none";
      Object(__WEBPACK_IMPORTED_MODULE_1__search__["a" /* otherSearch */])();
    }, 2000);
  } else if (lives == 0 || time == 0) {
    arrayAbecedario.forEach(array => {
      document.getElementById(array).disabled = true;
    });
    document.getElementById("fin").innerHTML = "END";
    document.getElementById("solution").disabled = true;
    document.getElementById("btn-help").disabled = true; //localStorage.clear();

    clearTimeout(timmerID);
    localStorage.setItem("points", points);
    localStorage.setItem("timmerID", timmerID);
    localStorage.setItem("title", "");
    localStorage.setItem("film", "");
    setTimeout(function () {
      document.getElementById("image" + lives).style.display = "none";
      Object(__WEBPACK_IMPORTED_MODULE_1__search__["a" /* otherSearch */])();
    }, 2000);
  }
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = help;
/* harmony export (immutable) */ __webpack_exports__["b"] = solution;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__search__ = __webpack_require__(1);

function help() {
  let numHelps = localStorage.getItem("num-helps");
  let time = localStorage.getItem("time");

  if (numHelps == 2) {
    time -= 5;
    numHelps = 1;
    document.getElementById("help").innerHTML = localStorage.getItem("help1");
    document.getElementById("num-helps").innerHTML = "HELPS: " + numHelps;
  } else if (numHelps == 1) {
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
function solution() {
  let numHelps = parseInt(localStorage.getItem("num-helps"));
  let lives = parseInt(localStorage.getItem("lives"));
  let points = localStorage.getItem("points");
  let timmerID = localStorage.getItem("timmerID");
  points -= 5 + lives * numHelps;
  document.getElementById("points").innerHTML = "POINTS: " + points;
  clearTimeout(timmerID);
  localStorage.setItem("points", points);
  localStorage.setItem("timmerID", timmerID);
  document.getElementById("low-bar").innerHTML = localStorage.getItem("title");
  setTimeout(function () {
    document.getElementById("image" + lives).style.display = "none";
    localStorage.setItem("title", "");
    localStorage.setItem("film", "");
    localStorage.setItem("film", "");
    Object(__WEBPACK_IMPORTED_MODULE_0__search__["a" /* otherSearch */])();
  }, 2000);
}

/***/ })
/******/ ]);