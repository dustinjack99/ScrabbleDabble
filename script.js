let bank = document.querySelector("#word-bank");
let time = document.querySelector("#time");
let tileDiv = document.querySelector("#tiles");
let tileNum = document.querySelector("#tile-num");
let input = document.querySelector(".pure-input-rounded");
let submit = document.querySelector("#submit");
let letterValue = document.querySelectorAll(".letter-value");
let letterFace = document.querySelectorAll(".letter");
let form = document.querySelector(".pure-form");
let score = document.querySelector("#score");
let image = document.querySelector("#returnImg");
let tileButton = document.querySelector('.letter');
let tableBody = document.querySelector("#table-body");
let table = document.querySelector(".pure-table");
let gameBody = document.querySelector("#game-container");

let userScore = 0;
let displayedLetters = [];
let validWord = true;
let scores = { 'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2, 'H': 4, 'I': 1, 'J': 8, 'K': 5, 'L': 1, 'M': 3, 'N': 1, 'O': 1, 'P': 3, 'Q': 10, 'R': 1, 'S': 1, 'T': 1, 'U': 1, 'V': 4, 'W': 4, 'X': 8, 'Y': 4, 'Z': 10 };
let spl = "AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYYZ";
let tileBag = spl.split("");
let leftTiles = tileBag.length;
let timer = 10;

tileNum.textContent = "Tiles left: " + leftTiles;
score.textContent = "Score: " + userScore;
input.value = '';

count();
//timer countdown
// *********************** GLOBAL FUNCTIONS ******************************
function count() {
    
    let s = 60;
    let tick = setInterval(ticker, 1000);
    function stopCount () {
        clearInterval(tick); 
    }
    ticker();
    function ticker () {
        let m = timer / 60;
        if (timer > 0) {
            timer--;
            s--;
            time.textContent = "Time: " + `${Math.floor(m)} min, ` + `${s + 1} sec`;
        } if (s === 0) {
            s = s + 60;
        } if (timer === 0 || tileBag.length <= 0) {
            stopCount ();
            let h1 = document.createElement("p");
            let form = document.createElement("form");
            let name = document.createElement("input");
            let button = document.createElement("button");
            
            gameBody.replaceWith(h1);
            h1.textContent = "You're Done! Enter your name to submit score.";
            h1.appendChild(form);
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
            endBtn.addEventListener('click', function(e) {
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
        console.log(timer)
    };
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
            //need to update this ********************
            alert('Not a valid word');
            validWord = false;
            return;
        }
    }
};

function populateTiles() {
    displayedLetters = [];
    /// this may cause a problem user doesn't use each letter - come back to this 
    for (let i = 0; i < letterFace.length; i++) {

        let index = Math.floor(Math.random() * tileBag.length)
        let letter = tileBag[index]

        tileBag.splice(index, 1);
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

            console.log(json);
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
                        // console.log(randImg);
                        image.setAttribute("src", gif);
                    });
            } else {
                //need to update this ********************
                alert('Try again, that aint not a word no one can use.')
                console.log('this is not a word');
            }
        });
};


function printWords() {
    let scoreOfWord = 0;
    let userWord = input.value.trim().toUpperCase();
    let userLetters = userWord.split("");
    let bonusOfWord = 0;
    var row = tableBody.insertRow(0);
    var wordCell = row.insertCell(0);
    var scoreCell = row.insertCell(1);
    var bonusCell = row.insertCell(2);
    for (let i = 0; i < userLetters.length; i++) {
        let thisLetter = userLetters[i];
        let scoreOfLetter = scores[thisLetter];
        scoreOfWord = scoreOfWord + scoreOfLetter;
    };
    console.log("The score of " + userWord + " is " + scoreOfWord + ". Great Job!");
    // bonus for lenght of word 
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
    userScore = userScore + scoreOfWord + bonusOfWord;
    score.textContent = "Score: " + userScore;
};

//// ******** start game state ********* ////

populateTiles();
getTileValue();

tileButton.addEventListener('click', function (e) {
    console.log('a tile broheim');
}); 

submit.addEventListener("click", function (e) {
    e.preventDefault();
    compareLetters();
    if (validWord) {
        checkIfWord();
    }
    validWord = true;

    //populateTiles();
});

// add click event functionality to allow users to click on the letters (will be helpful for mobile)

// update the tabl with word, scoree, and bonus 

// update the score in the upper total 



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

    // var previousHighScores = JSON.parse(localStorage.getItem('previousHighScores'));
    // if (previousHighScores == null) previousHighScores = [];
    // previousHighScores.push(scoreToLog);
    // localStorage.setItem("previousHighScores", JSON.stringify(previousHighScores));
