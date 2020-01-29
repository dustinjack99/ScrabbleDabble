const bank = document.querySelector("#word-bank");
const time = document.querySelector("#time");
const tileDiv = document.querySelector("#tiles");
const tileNum = document.querySelector("#tile-num");
const input = document.querySelector(".pure-input-rounded");
const submit = document.querySelector("#submit");
const letterValue = document.querySelectorAll(".letter-value");
const letterFace = document.querySelectorAll(".letter");
const form = document.querySelector(".pure-form");
const score = document.querySelector("#score");
const image = document.querySelector("#returnImg");
const tileButton = document.querySelector('.letter');
const tableBody = document.querySelector("#table-body");
const table = document.querySelector(".pure-table");
const gameBody = document.querySelector("#game-container");
const newTilesBtn = document.querySelector('#new-tile-btn');
const validContainer = document.querySelector('#validity');

let userScore = 0;
let displayedLetters = [];
let validWord = true;
let scores = { 'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2, 'H': 4, 'I': 1, 'J': 8, 'K': 5, 'L': 1, 'M': 3, 'N': 1, 'O': 1, 'P': 3, 'Q': 10, 'R': 1, 'S': 1, 'T': 1, 'U': 1, 'V': 4, 'W': 4, 'X': 8, 'Y': 4, 'Z': 10 };
let spl = "AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYYZ";
let tileBag = spl.split("");
let leftTiles = tileBag.length;
let timer = 5;
let consumedLetters = [];
let changeAllTiles = false;


tileNum.textContent = "Tiles left: " + leftTiles;
score.textContent = "Score: " + userScore;
input.value = '';

count();
// *********************** GLOBAL FUNCTIONS ******************************

function count() {

    let s = 60;
    let tick = setInterval(ticker, 1000);
    function stopCount() {
        clearInterval(tick);
    }
    ticker();
    function ticker() {
        let m = timer / 60;
        if (timer > 0) {
            timer--;
            s--;
            time.textContent = "Time: " + `${Math.floor(m)} min, ` + `${s + 1} sec`;
        } if (s === 0) {
            s = s + 60;
        } if (timer === 0 || tileBag.length <= 0) {

            stopCount ();
            let p = document.createElement("p");
            let form = document.createElement("form");
            let name = document.createElement("input");
            let button = document.createElement("button");
            
            gameBody.replaceWith(p);
            p.textContent = "Game over! Enter your name to submit score:";
            p.className = 'game-over-msg';
            p.appendChild(form);

            form.appendChild(name);
            form.appendChild(button);
            button.textContent = "Submit";
            form.setAttribute("class", "pure-form");
            button.setAttribute("class", "pure-button pure-button-primary");
            button.setAttribute("id", "endBtn");
            name.setAttribute("class", "pure-input-rounded");
            name.setAttribute("id", "inp");

            let endBtn = document.querySelector("#endBtn");
            let inp = document.querySelector("#inp");
            console.log(endBtn);
            endBtn.addEventListener('click', function (e) {
                e.preventDefault();
                let highScores = JSON.parse(localStorage.getItem("highscores"));
                if (highScores == null) highScores = [];
                let userName = inp.value;
                let user = {
                    user: userName,
                    score: userScore
                };

                localStorage.setItem("user", JSON.stringify(user));

                highScores.push(user);
                localStorage.setItem("highscores", JSON.stringify(highScores));
                window.location.href = "scores.html";
            });
        }
    };
};


function compareLetters() {
    let userWord = input.value.trim().toUpperCase();
    let userLetters = userWord.split("");
    var testingLetters = displayedLetters.slice(0);
    for (let i = 0; i < userLetters.length; i++) {
        let thisLetter = userLetters[i]
        if (userLetters.length < 2) {
            displayInvalidWork();
            consumedLetters = [];
            validWord = false;
            return;
        } else if (displayedLetters.indexOf(thisLetter) > -1) {
            consumedLetters.push(thisLetter);
            if (testingLetters.indexOf(thisLetter) > -1) {
                testingLetters.splice(testingLetters.indexOf(thisLetter), 1)
            } else {
                displayInvalidWork();
                consumedLetters = [];
                validWord = false;
                return;
            }
        } else {
            displayInvalidWork();
            consumedLetters = [];
            validWord = false;
            return;
        }
    }
};

function getTilesToReplace() {
    for (let i = 0; i < consumedLetters.length; i++) {
        let consumedLetter = consumedLetters[i];
        let tileIndex = displayedLetters.indexOf(consumedLetter);
        let index = Math.floor(Math.random() * tileBag.length)
        let replacementLetter = tileBag[index]
        tileBag.splice(index, 1);
        var leftTiles = tileBag.length;
        tileNum.textContent = "Tiles left: " + leftTiles;
        displayedLetters.splice(tileIndex, 1, replacementLetter);
    }
    for (let i = 0; i < letterFace.length; i++) {
        letterFace[i].textContent = displayedLetters[i];
    }
    console.log(letterFace);
    getTileValue();
    consumedLetters = [];
}

function populateTiles() {
    displayedLetters = [];
    for (let i = 0; i < letterFace.length; i++) {
        let index = Math.floor(Math.random() * tileBag.length)
        let letter = tileBag[index]
        if (!changeAllTiles) {
            tileBag.splice(index, 1);
        } 
        var leftTiles = tileBag.length;
        letterFace[i].textContent = letter;
        tileNum.textContent = "Tiles left: " + leftTiles;
        displayedLetters.push(letter);
    }
};

function getTileValue() {
    for (let i = 0; i < letterFace.length; i++) {
        let letter = letterFace[i].textContent
        let score = scores[letter]
        letterValue[i].textContent = score;
    }
};


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
            if (typeof json[0] === 'object') {
                console.log('its a word');
                submittedWord = word.toUpperCase();
                printWords();
                input.value = '';

                //fetch for Giphy API
                fetch(gifUrl)
                    .then(function (r) {
                        return r.json();
                    }).then(function (j) {
                        let randImg = Math.floor(Math.random() * 25)
                        let gif = j.data[randImg].images.original.url;
                        image.setAttribute("src", gif);
                    });
                getTilesToReplace();
            } else {
                //need to update this ********************
                displayInvalidWork();
                console.log('this is not a word');
                consumedLetters = [];
            }
        });
};

function displayInvalidWork() {
    validContainer.textContent = 'Sorry, that is not a valid word. Try again!';
    input.value = '';
    setTimeout(function () {
        validContainer.textContent = '';
    }, 2000);
};


function printWords() {
    let scoreOfWord = 0;
    let userWord = input.value.trim().toUpperCase();
    let userLetters = userWord.split("");
    let bonusOfWord = 0;
    let row = tableBody.insertRow(0);
    let wordCell = row.insertCell(0);
    let scoreCell = row.insertCell(1);
    let bonusCell = row.insertCell(2);
    for (let i = 0; i < userLetters.length; i++) {
        let thisLetter = userLetters[i];
        let scoreOfLetter = scores[thisLetter];
        scoreOfWord = scoreOfWord + scoreOfLetter;
    };
    console.log("The score of " + userWord + " is " + scoreOfWord + ". Great Job!");
    // bonus for length of word 
    if (userLetters.length > 6) {
        bonusOfWord = 10;
    } else if (userLetters.length > 5) {
        bonusOfWord = 5;
    } else if (userLetters.length > 4) {
        bonusOfWord = 3;
    } else if (userLetters.length > 3) {
        bonusOfWord = 1;
    }
    //populate the table and update score 
    wordCell.innerHTML = userWord;
    scoreCell.innerHTML = scoreOfWord;
    bonusCell.innerHTML = bonusOfWord;
    if (bonusOfWord === 1) {
        bonusCell.style.background = 'rgb(165, 210, 224)';
    } else if (bonusOfWord === 3) {
        bonusCell.style.background = 'rgb(255, 192, 203)';
    } else if (bonusOfWord === 5) {
        bonusCell.style.background = 'rgb(211, 6, 6)';
    } else if (bonusOfWord === 10) {
        bonusCell.style.background = 'rgb(6, 95, 95)';
    }
    userScore = userScore + scoreOfWord + bonusOfWord;
    score.textContent = "Score: " + userScore;
};

// ******** Start Game State ********* 

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

newTilesBtn.addEventListener('click', function (e) {
    e.preventDefault();
    changeAllTiles = true;
    populateTiles();
    userScore -= 2;
    score.textContent = "Score: " + userScore;

});
