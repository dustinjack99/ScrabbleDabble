let bank = document.querySelector("#word-bank");
let time = document.querySelector("#time");
let tileDiv = document.querySelector("#tiles");
let tileNum = document.querySelector("#tile-num");
let input = document.querySelector("#input");
let submit = document.querySelector("#submit");
let letterValue = document.querySelectorAll(".letter-value");
let letterFace = document.querySelectorAll(".letter");
let form = document.querySelector(".pure-form");
let score = document.querySelector("#score");
let userScore = 0
score.textContent = "score : " + userScore;
let image = document.querySelector("#returnImg");


let scores = { 'A' : 1, 'B' : 3, 'C' : 3, 'D' : 2, 'E' : 1, 'F' : 4, 'G' : 2, 'H' : 4, 'I' : 1, 'J' : 8, 'K' : 5, 'L' : 1, 'M' : 3, 'N' : 1, 'O' : 1, 'P' : 3, 'Q' : 10, 'R' : 1, 'S' : 1, 'T' : 1, 'U' : 1, 'V' : 4, 'W' : 4, 'X' : 8, 'Y' : 4, 'Z' : 10 };
let spl = "AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYYZ";

let tileBag = spl.split("");
console.log(tileBag);
let leftTiles = tileBag.length;
console.log(leftTiles);
tileNum.textContent = "tiles left : " + leftTiles;


let sum = 0;

submit.addEventListener("click", submitWord)

function submitWord (submit) {
    submit.preventDefault();
    let word = input.value;
    let apiKey = "055bd940-2f3e-4ceb-aecb-c172dfea4116";
    // let giphyKey = "7kwL3XTkF7VONSgoTjSPV7HpPUgMvkPu";
    let url = `https://www.dictionaryapi.com/api/v3/references/sd2/json/${word}?key=${apiKey}`;
    let gifUrl = `https://api.giphy.com/v1/gifs/search?api_key=7kwL3XTkF7VONSgoTjSPV7HpPUgMvkPu&q=${word}&limit=25&offset=0&rating=G&lang=en`;
    
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json)

            if (json[0].shortdef === 'null') {
                console.log('this is not a word');
            }

            word = word.toUpperCase();
            console.log(word);

            input.value = '';

        });


    fetch(gifUrl)
        .then(function (r) {
            return r.json();
        }).then(function (j) {
            let randImg = Math.floor(Math.random()*25)
            let gif = j.data[randImg].images.original.url;
            console.log(randImg)
            

        
            image.setAttribute("src", gif)

        });



    // for (var i = 0; i < word.length; ++i) {
    //     sum += scores[word.charAt(i)] || 0;
    // }
    
}

    // add click event functionality to allow users to click on the letters (will be helpful for mobile)

// update the tabl with word, scoree, and bonus 

    // update the score in the upper total 

    // update the tile count 

    // remove used tiles from the div 

    // add new tiles to the tiles div 

    // add some bonus functionality 

    // check for spelling 
        // loop thru the returned JSON array - if we don't find the exact word match, return a neg score and error 


    
