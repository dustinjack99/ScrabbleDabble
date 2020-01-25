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
let image = document.querySelector("#returnImg");
let userScore = 0
let displayedLetters = [];
let validWord = true;
let scores = { 'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2, 'H': 4, 'I': 1, 'J': 8, 'K': 5, 'L': 1, 'M': 3, 'N': 1, 'O': 1, 'P': 3, 'Q': 10, 'R': 1, 'S': 1, 'T': 1, 'U': 1, 'V': 4, 'W': 4, 'X': 8, 'Y': 4, 'Z': 10 };
let spl = "AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYYZ";
let tileBag = spl.split("");
let leftTiles = tileBag.length;
let timer = 120;

tileNum.textContent = "Tiles left: " + leftTiles;
score.textContent = "Score: " + userScore;
input.value = '';

count();

//timer countdown
function count() {
    let s = 60;
    setInterval(function () {
        let m = timer / 60; 
        if (timer > 0) {
            timer--;
            s--;
            time.textContent = "Time: " + `${Math.floor(m)} min, ` + `${s + 1} sec`;
            
        } if (s === 0) {
            s = s + 60;
            console.log(s);
        } if (timer === 0) {
            ///Put the link to splash screen here
        }

    }, 1000);
}

function compareLetters() {
    let userWord = input.value.trim().toUpperCase();
    let userLetters = userWord.split("");
    for (let i = 0; i < userLetters.length; i++) {
        let thisLetter = userLetters[i]
        if (displayedLetters.indexOf(thisLetter) > -1) {
            console.log('valid letter');
        } else {
            console.log('letter not included');
            alert('Not a valid word');
            validWord = false;
            return;
        }
    }
}

function populateTiles() {
    displayeLetters = [];
    /// this may cause a problem user doesn't use each letter - come back to this 
    for (let i = 0; i < letterFace.length; i++) {
        let index = Math.floor(Math.random() * tileBag.length)
        let letter = tileBag[index]
        console.log(letter);
        tileBag.splice(index, 1);
        console.log(tileBag.length);
        var leftTiles = tileBag.length;
        letterFace[i].textContent = letter;
        displayedLetters.push(letter);
    }
}

function getTileValue() {
    for (let i = 0; i < letterFace.length; i++) {
        let letter = letterFace[i].textContent
        let score = scores[letter]
        letterValue[i].textContent = score;


    }
}

function checkIfWord() {
    let word = input.value;
    word = word.toUpperCase();
    let apiKey = "055bd940-2f3e-4ceb-aecb-c172dfea4116";
    let url = `https://www.dictionaryapi.com/api/v3/references/sd2/json/${word}?key=${apiKey}`;
    let gifUrl = `https://api.giphy.com/v1/gifs/search?api_key=7kwL3XTkF7VONSgoTjSPV7HpPUgMvkPu&q=${word}&limit=25&offset=0&rating=G&lang=en`;

    //fetch for Dictionary API
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (json) {

            console.log(json);
            if (typeof json[0] === 'object') {
                console.log('its a word');
                submittedWord = word.toUpperCase();
                input.value = '';
                
                //fetch for Giphy API
                fetch(gifUrl)
                    .then(function (r) {
                        return r.json();
                    }).then(function (j) {
                        let randImg = Math.floor(Math.random() * 25)
                        let gif = j.data[randImg].images.original.url;
                        console.log(randImg);
                        image.setAttribute("src", gif);
                    });
            } else {

                console.log('this is not a word');
            }
        });


}


populateTiles();
getTileValue();

submit.addEventListener("click", function (e) {
    e.preventDefault();
    compareLetters();
    if (validWord) {
        checkIfWord();
    }
    validWord = true;
});

// add click event functionality to allow users to click on the letters (will be helpful for mobile)

// update the tabl with word, scoree, and bonus 

// update the score in the upper total 

//

// update the tile count 

// remove used tiles from the div 

// add new tiles to the tiles div 

// add some bonus functionality 

// check for spelling 
// loop thru the returned JSON array - if we don't find the exact word match, return a neg score and error 




//     //validate the initials are entered 
//     if (userName.value === "") {
//         alert('Please enter your initials, Dabbler');
//         return;
//     };
//     // Log high score into local storage 

//     var scoreToLog = {
//         'userName': userName.value.trim(),
//         'userScore': userScore
//     };

//     // add high score to local storage 

//     var previousHighScores = JSON.parse(localStorage.getItem('previousHighScores'));
//     if (previousHighScores == null) previousHighScores = [];
//     previousHighScores.push(scoreToLog);
//     localStorage.setItem("previousHighScores", JSON.stringify(previousHighScores));