let scoreDiv;
let li;
let deleteBtn;
let list = JSON.parse(localStorage.getItem("highscores"));
let scoreBoard = document.querySelector("#scoreboard");

console.log(list);

list.sort(function (a, b) {
  return b.score - a.score;
});

for (i = 0; i < list.length; i++) {
  scoreDiv = document.createElement("div");
  scoreBoard.appendChild(scoreDiv);
  li = document.createElement("li");
  li.textContent = list[i].user + "'s score:   " + list[i].score;
  scoreDiv.appendChild(li);
  deleteBtn = document.createElement("i");
  deleteBtn.className = 'fas fa-times';
  scoreDiv.appendChild(deleteBtn);
}

// function to delete score from local storage
function deleteScore() {
  JSON.parse(localStorage.getItem("highscores"));
}

// event listener on delete icon to call delete function
scoreDiv.addEventListener('click', function() {
  deleteScore();
})
