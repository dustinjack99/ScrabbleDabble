let bank = document.querySelector("#word-bank");
let time = document.querySelector("#time");
let tileDiv = document.querySelector("#tiles");
let tileNum = document.querySelector("#tile-num");
let input = document.querySelector("#input");
let submit = document.querySelector("#submit");



let scores = { 'A' : 1, 'B' : 3, 'C' : 3, 'D' : 2, 'E' : 1, 'F' : 4, 'G' : 2, 'H' : 4, 'I' : 1, 'J' : 8, 'K' : 5, 'L' : 1, 'M' : 3, 'N' : 1, 'O' : 1, 'P' : 3, 'Q' : 10, 'R' : 1, 'S' : 1, 'T' : 1, 'U' : 1, 'V' : 4, 'W' : 4, 'X' : 8, 'Y' : 4, 'Z' : 10 };
let tileBag = "AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYYZ";

let spl = tileBag.split("");
console.log(spl);

let sum = 0;

submit.addEventListener("click", submitWord)

function submitWord (e) {
    e.preventDefault();
    let word = input.value;
    word = word.toUpperCase();
    for (var i = 0; i < word.length; ++i) {
        sum += scores[word.charAt(i)] || 0;
    }
    console.log(word);
}