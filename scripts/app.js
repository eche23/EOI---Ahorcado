import {initial} from "./init";

export var abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
export var lowBar = [];
export var numHelps;
export var lives = localStorage.getItem("lives");
export var time = localStorage.getItem("time");
export var title_film = "";
export var timmerID;
export var filmSelect;
export var points = 0;
export var letterFalse = [];
export var letterTrue = [];
export var year = "";
export var rating = "";

window.onload = initial();